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

Brunch will build your app in "watch" mode and startup a local web server. Open http://localhost:3333/ in your web browser to view your application running. Whenever a file is changed, Brunch will automatically run a build.

To do a one-time Brunch build without starting up the web server, run:

* `brunch build`

Assuming you are ready to release your project to production, to do a production Brunch build, run:

* `brunch build -p`

See the [Brunch Commands](https://github.com/brunch/brunch/blob/master/docs/commands.md) doc for more info on all available brunch build commands.

## Editing

You can edit your CSS, JS, and HTML files in the `app/` drectory. When Brunch runs a build, it processes all files under `app/` and copies them to the `public/` directory. The `public/` directory is where all Brunch build output goes, and this is also where the Brunch web server serves its files from as well.

We don't recommend editing files directly in `public/`, since they will be overwritten by the source files in `app/` whenever a new build is performed.

The Brunch web server supports "live reload" functionality, such that when you make any edits to your `app/` files, the web browser can automatically load those changes without a full page refresh. A browser plug-in is required to use this (see the [CSS Live Reloader](https://addons.mozilla.org/en-US/firefox/addon/css-live-reloader) add-on for Firefox, for example). This is completely optional, though highly recommended since it can speed up your workflow. Otherwise, you can just manually refresh the browser page whenever you make code changes.

## Updating the skeleton & custom URLs

If you'd like to use a different page for the skeleton, you can manually update the skeleton with a URL of your choosing. This can be useful if you'd like to test how your visualization would work in a photo essay or another post with special formatting.

Note that doing this will delete your `index.html` and any other files in `app/assets`. Files in `app/js` or `app/js` will not be affected.

To do update the skeleton, create a new project as described above, go to your project folder, and then run `node stat-skeleton.js`. Enter a URL, then enter `y` to confirm that you'd like to overwrite the assets folder.

---

### [Learn more](learn-more.md) about how STAT Dataviz works
