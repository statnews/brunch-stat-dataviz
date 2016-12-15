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

In the above command replace `[path]` with the actual directory name you want your new project to go in to. More info on the `brunch new` command can be found in the [Brunch Commands](http://brunch.io/docs/commands) documentation.

See the [Getting Started](http://brunch.io/docs/getting-started) page for more info on the standard Brunch setup process.

## Running a Build

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

### [Learn more](learn-more.md) about how STAT Dataviz works
