# league-tooltips - change log

# 2.0.5 (Jan. 9th 2018)

* Fixed 'for' loop that broke the tooltips
* Updated dependencies

# 2.0.4 (Oct. 3rd 2017)

## **Fixed :**

* fix multiple dependencies vulnerabilities

# 2.0.3 (July 29th 2017)

## **Fixed :**

* fix the caching with Redis that was always set to 'localhost:6379' with the same key prefix that was caused by the Riot API client (see [this issue](https://github.com/ChauTNguyen/kindred-api/issues/22))
* Update GitHub path to the new one in package.json file

# 2.0.2 (July 21th 2017)

## **Changed :**

* Updated dependencies

# 2.0.1 (July 10th 2017)

## **Fixed :**

* Fix main script path
* Fix `prod` config not working

# 2.0.0 (July 7th 2017)

## **BREAKING CHANGES :**

* [Server] Cache : removed `checkperiod` option.
* [Server] Options : removed `protocol` option.

## **Changes :**

* Now uses the V3 version of the Riot API.

## **Features :**

* [Server] Caching with [Redis](https://redis.io). More details in the ['cache' section in the README](https://github.com/league-of-legends-devs/league-tooltips#--cache-object);

# 1.6.3 (June. 29th 2017)

* Debug log of app mount path

# 1.6.2 (June. 26th 2017)

* Fix README docs

# 1.6.1 (June. 25th 2017)

* Fix package.json file typos

# 1.6.0 (June. 25th 2017)

* Fix #3

# 1.5.2 (May. 26th 2017)

* Update dependencies
* Fix license

# 1.5.1 (May. 23th 2017)

* Update dependencies

# 1.5.0 (Nov. 13th 2016)

## **Fixed :**

* [Client] Round the champions stats
* [Server] Fix requested language strings endpoint always returning the same language regardless the given locale
* [Client] Make the tooltip box no longer overflows after it is rendered with the datas
* [Client] Fix unwanted ending '/' on the base route
* [Client] Remove useless debug log
* Multiple code and linting fixes

## **Added :**

* [Client] Use the retrieved languages strings in order to display the proper language
* [Demo] Add Yarn support for the deploy script
* [Demo] Exclude eslint
* [Demo] Fix public folder not found when the demo is ran outside its directory
* [Server] Fix log being called too early

# 1.4.3 (Nov. 9th 2016)

## **Fixed :**

* [Server] The Router no longer keep the API as an attribute for security purposes.

# 1.4.2 (Nov. 8th 2016)

## **Added :**

* [Client] The tooltip box no longer overflows after it is rendered with the datas.

## **Changed :**

* Yarn support
* Use Airbnb Javascript guidelines
* Little code fixes

# 1.4.1 (Oct. 22th 2016)

## **Fixed :**

* [Server] Fix `base` option interfering with the main router, causing wrong base route

# 1.4.0 (Oct. 22th 2016)

## **Added :**

* [Server] Set the locale in the api requests instead of a static value in the middleware config
* [Client] Request the locales to server
* [Server] `/version` route
* [Server] `base` middleware option

## **Changed :**

* `leagueTooltipsDebug` changed to `leagueTooltips.debug`

# 1.3.0 (Oct. 21th 2016)

## **Added :**

* [Server] Use node-cache for server side caching.

# 1.2.2 (Oct. 17th 2016)

## **Added :**

* [Client] Display and error if the datas cannot be retrieved

## **Fixed :**

* [Client] Adjust the tooltip position regarding the cursor position and the viewport size

# 1.2.1 (Oct. 15th 2016)

## **Added :**

* [Client] Tooltip's `z-index` property set to 100

# 1.2.0 (Oct. 15th 2016)

## **Added :**

* [debug module](https://www.npmjs.com/package/debug) added (see [here](https://github.com/league-of-legends-devs/league-tooltips#debug))
* [cors](https://github.com/league-of-legends-devs/league-tooltips#--cors) option

# 1.1.1 (Oct. 15th 2016)

## **Fixed :**

* [Server] Fix "Resource interpreted as Stylesheet but transferred with MIME type" warning message on stylesheets.

# 1.1.0 (Oct. 11th 2016)

## **Added :**

* [Client] Show the tooltip error if the request is errored.
* [Client & Server] Add champion spell tooltip.
* [Client] Show "Display error" if the template rendering failed.
* [Client] Retry patch fetching if the patch is empty or errored.
* [Server] Serve sitemaps.

## **Changed :**

* [Server] Remove the "domain.tld" part of the `options.url` as the `fetch()` cross-origin policy will deny the request to other domains.
* [Client] Change 'data-spell' attribute to 'data-summonerspell' for better clarity.

## **Fixed :**

* [Server] Fix "undefined e" error when throwing errors.

# 1.0.4 (Oct. 10th 2016)

## **Fixed :**

* Fix undefined "sources" variable.

# 1.0.3 (Oct. 10th 2016)

## **Fixed :**

* Fix "forbidden protocol" message if undefined and fix protocol not being used properly in the API.
* Fix undefined url not being set to the default value.

# 1.0.2 (Oct. 10th 2016)

## **Removed :**

* Unpublish demo directory on npm.

# 1.0.1 (Oct. 10th 2016)

## **Fixed :**

* Fix missing index.js file causing require fail.

# 1.0.0 (Oct. 10th 2016)

First publish
