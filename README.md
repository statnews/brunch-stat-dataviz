# STAT Dataviz Brunch Application

This is a STAT Dataviz web application project, built with [Brunch](http://brunch.io).

This Brunch-powered project framework enables quick/easy prototyping of D3-powered (or any other web-based dataviz framework) data visualizations within a replica of a live www.statnews.com article page.

## System Requirements

### Node.js

On Mac OS X, the easiest way to install [Node](https://nodejs.org/en/) is via [Homebrew](http://brew.sh/). Once you have Homebrew installed, run the following command in a Terminal:

* `brew install node`

### Brunch

Once Node is installed, install [Brunch](http://brunch.io/) by running:

* `npm install -g brunch`

## Creating a New Dataviz Project

To create a new STAT Dataviz project, run the following Brunch command in a Terminal:

* `brunch new [path] -s statnews/brunch-stat-dataviz`

In the above command replace `[path]` with the actual directory name you want your new project to go in to. More info on the `brunch new` command can be found in the [Brunch Commands](https://github.com/brunch/brunch/blob/master/docs/commands.md) manual.

When you run the above command the following steps are completed for you:

* The [brunch-stat-dataviz](https://github.com/statnews/brunch-stat-dataviz) Brunch [Skeleton](http://brunch.io/skeletons) is copied from GitHub in to the `[path]` you specified above.
* An `npm install` is run by Brunch to install all Node dependencies as specified in the project's `package.json` file
* A custom npm postinstall script, `stat-skeleton.js` is run. This creates a one-time local clone of the [Interactive: Tracking Zika virus, country by country](https://www.statnews.com/2016/03/25/zika-globe-interactive/) article from www.statnews.com and saves it to the `app/assets/` directory. This is also where you start developing your dataviz app's code.

See the [Getting Started](https://github.com/brunch/brunch/tree/master/docs) doc for more info on the standard Brunch setup process.

## Dataviz Directory Structure

A STAT Dataviz project mostly implements the standard Brunch directory layout. Brunch's Getting Started document has a good overview of what files should go where. Below we cover our implementation of the app/ subdirectory and describe what each folder contains.

* `app/`
    * `initialize.js`: This is the app's main initialization JavaScript file. Within this file you will `require()`  your main dataviz JavaScript file/module.
    * `assets/`: This folder contains all of your static dataviz assets such as the main `index.html` skeleton file along with any other static dependencies such as image and data input files (*.csv, *.json, etc.)
        * `index.html`: This is the STAT sandbox/skeleton file where you will be developing your dataviz app. This file should already contain the standard/empty STAT dataviz container, which looks like: `<div class="dataviz" id="dataviz-chart"></div>`. This file is also setup to auto-load the `initialize.js` module mentioned above, as well as any CSS files you put in the `css/` folder described below.
        * `vendor/`: This directory contains all of the `index.html` skeleton article's file dependencies such as images, fonts, scripts, styles, etc.
    * `css/`: Put your dataviz .css files in this folder and they will be automatically processed by Brunch during the build process
    * `js/`: Put your dataviz. js file in this folder and they will be automatically processed by Brunch during the build process

## Run a Build

In order to test your code, you can either open the `index.html` file directly in a browser, or you can test it through the Brunch build tools (recommended). There are a couple different ways to do this:

First, Brunch easily allows you to build your app and startup a basic local testing web server. Run the following command in your main Brunch project folder to try this:

* `brunch watch -s`

Brunch will build your app in "watch" mode and startup a local web server. Open http://localhost:3333/ in your web browser to view your application running.

The Brunch web server supports "live reload" functionality, such that when you make any edits to your `app/` files, the web browser can automatically load those changes without a full page refresh. A browser plug-in is required to use this (see the [CSS Live Reloader](https://addons.mozilla.org/en-US/firefox/addon/css-live-reloader) add-on for Firefox, for example). This is completely optional, though highly recommended since it can spped up your workflow. Otherwise, you can just manually refresh the browser page whenever you make code changes.

When Brunch runs a build it processes all files under `app/` and copies them to the `public/` directory. The `public/` directory is where all Brunch build output goes, and this is also where the Brunch web server serves its files from as well. You'll never want to edit files directly in `public/`, since they will be overwritten source files in `app/` anytime a new build is performed.

To do a one-time Brunch build without starting up the web server, run:

* `brunch build`

Assuming you are ready to release your project to production, to do a production Brunch build, run:

* `brunch build -p`

See the [Brunch Commands](https://github.com/brunch/brunch/blob/master/docs/commands.md) doc for more info on all available brunch build commands.

### STAT Brunch Build Customizations

We've integrated a couple custom Node scripts into the Brunch build process. We use a Brunch plugin called [after-brunch](https://github.com/Creative-Licence-Digital/after-brunch) to run these scripts everytime a Brunch build is performed. These scripts are described in more detail below:

* `stat-gitignore.js`: This script auto-updates the skeleton project's `.gitignore` file and removes entries that a target dataviz project would want to be able to save to a git repository.
* `stat-dataviz.js`: This script generates a file in `public/` called `stat-dataviz.json` each time a Brunch build is performed. This file contains JSON-formatted metadata describing the project structure of the current dataviz app. We read this file from www.statnews.com in order to know what files and assets we need to load in order to render an externally hosted dataviz app on the STAT website.

## Further Reading

Beyond some of the STAT-specific integrations described above, this represents a fairly standard Brunch project layout. See the following links for more info on how to best use this framework for building your next STAT dataviz web application:

* [Brunch Getting Started Guide](https://github.com/brunch/brunch/blob/master/docs/README.md)
* [Brunch Advanced User Guide](https://github.com/brunch/brunch-guide#readme)
