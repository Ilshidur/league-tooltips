import 'babel-polyfill';
import 'whatwg-fetch';
import _ from 'lodash';

(() => {

  // $BASE_ROUTE won't be minified by Webpack and will be replaced on-the-fly with the base route set in the middleware configuration
  const BASE_ROUTE_FROM_CONFIG = $BASE_ROUTE || null;
  if (!BASE_ROUTE_FROM_CONFIG) {
    console.warn('[league-tooltips] $BASE_ROUTE is not set');
  }
  const BASE_ROUTE = (BASE_ROUTE_FROM_CONFIG + '/') || '/tooltips/';

  // Use http://youmightnotneedjquery.com/#ready ?
  window.onload = () => {
    initTips();
    console.log('league-tips loaded.');
  };

  let datasCache = {};

  const tooltip = {
    id: 'league-tooltip',
    offsetx: 10,
    offsety: 10,
    _x: 0,
    _y: 0,
    _tooltipElement: null,
    _saveonmouseover: null
  };

  tooltip.show = function (e) {
    const htmlelement = e.target;

    if (document.getElementById) {
      this._tooltipElement = document.getElementById(this.id);
    } else if (document.all) {
      this._tooltipElement = document.all[this.id].style;
    }

    this._saveonmouseover = document.onmousemove;
    document.onmousemove = this.mouseMove;

    this.moveTo(this._x + this.offsetx, this._y + this.offsety);

    if (this._tooltipElement.style) {
      this._tooltipElement.style.visibility = 'visible';
    } else {
      this._tooltipElement.visibility = 'visible';
    }

    this.render(htmlelement.dataset);

    return false;
  };
  tooltip.hide = function (e) {
    if (this._tooltipElement.style) {
      this._tooltipElement.style.visibility = 'hidden';
    } else {
      this._tooltipElement.visibility = 'hidden';
    }
    document.onmousemove = this._saveonmouseover;
    this._tooltipElement.innerHTML = '';
  };

  tooltip.mouseMove = function (e) {
    if (e == undefined) {
      e = event;
    }
    if (e.pageX != undefined) { // gecko, konqueror,
      tooltip._x = e.pageX;
      tooltip._y = e.pageY;
    } else if (event != undefined && event.x != undefined && event.clientX == undefined) { // ie4
      tooltip._x = event.x;
      tooltip._y = event.y;
    } else if (e.clientX != undefined ) { // IE6,  IE7, IE5.5
      if (document.documentElement) {
        tooltip._x = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
        tooltip._y = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
      } else {
        tooltip._x = e.clientX + document.body.scrollLeft;
        tooltip._y = e.clientY + document.body.scrollTop;
      }
    } else {
      tooltip._x = 0;
      tooltip._y = 0;
    }
    tooltip.moveTo(tooltip._x + tooltip.offsetx, tooltip._y + tooltip.offsety);
  };

  tooltip.moveTo = function (xL, yL) {
    if (this._tooltipElement.style) {
      this._tooltipElement.style.left = xL + 'px';
      this._tooltipElement.style.top = yL + 'px';
    } else {
      this._tooltipElement.left = xL;
      this._tooltipElement.top = yL;
    }
  };

  tooltip.render = async function (dataset) {
    let dataType = null;
    let id = null;
    const allowedDatas = ['champion', 'item', 'spell', 'rune', 'mastery'];
    for (let allowedData of allowedDatas) {
      if (dataset[allowedData]) {
        dataType = allowedData;
        id = dataset[allowedData];
      }
    }

    if (!dataType) {
      return;
    }

    let templateHtml = null;
    if (!datasCache.hasOwnProperty(dataType) || !datasCache[dataType].hasOwnProperty(id) || !datasCache[dataType][id].template) {
      const tooltipQuery = await fetch(BASE_ROUTE + `html/${dataType}.html`);
      const tooltipHtml = await tooltipQuery.text();
      templateHtml = tooltipHtml;
    } else {
      templateHtml = datasCache[dataType][id].template;
    }
    const template = _.template(templateHtml);

    let jsonData;
    if (!datasCache.hasOwnProperty(dataType) || !datasCache[dataType].hasOwnProperty(id) || !datasCache[dataType][id].data) {
      const queryUrl = BASE_ROUTE + dataType + '/' + id;
      try {
        const response = await fetch(queryUrl);
        jsonData = await response.json();
      } catch (e) {
        console.error(e);
      }
      jsonData = _.merge(jsonData, { patchVersion: datasCache['patch'] });
    } else {
      jsonData = datasCache[dataType][id].data;
    }
    this._tooltipElement.innerHTML = template(jsonData);

    if (!datasCache[dataType]) {
      datasCache[dataType] = {};
    }
    datasCache[dataType][id] = {
      data: jsonData,
      template: templateHtml
    };
  };

  async function initTips () {
    try {
      const patchResponse = await fetch(BASE_ROUTE + 'patch');
      datasCache['patch'] = await patchResponse.json();
    } catch (e) {
      console.error(e);
    }

    let tooltipElementDiv = document.createElement('div');
    tooltipElementDiv.id = 'league-tooltip';
    if (tooltipElementDiv.style) {
      tooltipElementDiv.style.visibility = 'hidden';
    } else {
      tooltipElementDiv.visibility = 'hidden';
    }

    const cssLink = document.createElement('link');
    cssLink.href = BASE_ROUTE + `styles/tooltip.css`;
    cssLink.type = 'text/css';
    cssLink.rel = 'stylesheet';
    cssLink.media = 'screen,print';
    document.getElementsByTagName('head')[0].appendChild(cssLink);

    document.body.insertBefore(tooltipElementDiv, document.body.childNodes[0]);
    const tooltips = document.getElementsByClassName('league-tooltip');
    for (let index = 0; index < tooltips.length; index++) {
      const tooltipElement = tooltips.item(index);
      tooltipElement.addEventListener('mouseover', tooltip.show.bind(tooltip));
      tooltipElement.addEventListener('mouseout', tooltip.hide.bind(tooltip));
    }
  }
})();
