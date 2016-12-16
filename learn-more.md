# Learn more

Want to learn more about how STAT Dataviz works? You've come to the right place.

## Scaffolding

When you run `brunch new [path] -s statnews/brunch-stat-dataviz`, the following steps are completed for you:

* The [brunch-stat-dataviz](https://github.com/statnews/brunch-stat-dataviz) Brunch [Skeleton](http://brunch.io/skeletons) is copied from GitHub in to the `[path]` you specified above.
* An `npm install` is run by Brunch to install all Node dependencies as specified in the project's `package.json` file
* A custom npm postinstall script, `stat-skeleton.js` is run. This creates a one-time local clone of the [Interactive: Tracking Zika virus, country by country](https://www.statnews.com/2016/03/25/zika-globe-interactive/) article from www.statnews.com and saves it to the `app/assets/` directory. This is also where you start developing your dataviz app's code.

## Directory Structure

A STAT Dataviz project mostly implements the standard Brunch directory layout. Brunch's Getting Started document has a good overview of what files should go where. Below we cover our implementation of the app/ subdirectory and describe what each folder contains.

* `app/`
    * `initialize.js`: This is the app's main initialization JavaScript file. Within this file you will `require()`  your main dataviz JavaScript file/module.
    * `assets/`: This folder contains all of your static dataviz assets such as the main `index.html` skeleton file along with any other static dependencies such as image and data input files (*.csv, *.json, etc.)
        * `index.html`: This is the STAT sandbox/skeleton file where you will be developing your dataviz app. This file should already contain the standard/empty STAT dataviz container, which looks like: `<div class="dataviz" id="dataviz-chart"></div>`. This file is also setup to auto-load the `initialize.js` module mentioned above, as well as any CSS files you put in the `css/` folder described below.
        * `vendor/`: This directory contains all of the `index.html` skeleton article's file dependencies such as images, fonts, scripts, styles, etc.
    * `css/`: Put your dataviz .css files in this folder and they will be automatically processed by Brunch during the build process
    * `js/`: Put your dataviz. js file in this folder and they will be automatically processed by Brunch during the build process

## Build Steps

When a build runs, Brunch will compile CSS and JavaScript as follows:

* Combine all the CSS files in the `app/css`.
* Run [Autoprefixer](https://github.com/postcss/autoprefixer) on the CSS.
  * This step will generate the appropriate vendor prefixes for your CSS, so you don't need to write them yourself.
* Combine all the CommonJS modules used by `app/js/initialize.js` into a single file.
* If running a production build, minify the CSS and JavaScript.
* If _not_ running a production build, include LiveReload in the JavaScript.
* Generate `stat-dataviz.json` (see below).

## STAT Brunch Build Customizations

We've integrated a couple custom Node scripts into the Brunch build process. We use a Brunch plugin called [after-brunch](https://github.com/Creative-Licence-Digital/after-brunch) to run these scripts every time a Brunch build is performed. These scripts are described in more detail below:

* `stat-gitignore.js`: This script auto-updates the skeleton project's `.gitignore` file and removes entries that a target dataviz project would want to be able to save to a git repository.
* `stat-dataviz.js`: This script generates a file in `public/` called `stat-dataviz.json` each time a Brunch build is performed. This file contains JSON-formatted metadata describing the project structure of the current dataviz app. We read this file from www.statnews.com in order to know what files and assets we need to load in order to render an externally hosted dataviz app on the STAT website.
