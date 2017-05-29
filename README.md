React Hackathon Board
=======================

Web application to manage Hackathon events. This project is a full rewrite of [hackathon-board](https://github.com/hirako2000/hackathon-board), This time using ReactJS and Semantic-ui on the front end, Node/Express and MongoDB on the backend.
See features [here](https://hirako2000.github.io/2016/12/17/React-Hackathon-Board.html)

[![Build Status](https://travis-ci.org/hirako2000/react-hackathon-board.svg?branch=master)](https://travis-ci.org/hirako2000/react-hackathon-board)
[![Dependency Status](https://david-dm.org/hirako2000/react-hackathon-board.svg?style=flat)](https://david-dm.org/hirako2000/react-hackathon-board)
[![devDependency Status](https://david-dm.org/hirako2000/react-hackathon-board/dev-status.svg)](https://david-dm.org/hirako2000/react-hackathon-board#info=devDependencies)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](https://github.com/hirako2000/react-hackathon-board/edit/master/LICENSE)

Table of Contents
-----------------
1. [Install on Ubuntu 16](#install-on-ubuntu-16)
1. [Requirements](#requirements)
1. [Features](#features)
1. [Getting Started](#getting-started)
1. [Dev](#usage)
1. [CLI Generators](#cli-generators)
1. [Structure](#structure)
1. [Webpack](#webpack)
1. [Server](#server)
1. [Styles](#styles)
1. [Testing](#testing)
1. [Deployment](#deployment)
1. [Troubleshooting](#troubleshooting)
1. [Thank You](#thank-you)

Install on Ubuntu 16
--------------------

After many tries and tries...

```
$ pacman -S mongodb
$ systemctl start mongodb
$ git clone https://github.com/kyanh-huynh/react-hackathon-board
$ nvm install 6
$ nvm install
$ nvm rebuild node-sass
$ ## edit config/_production.js and use your custom URL.
$ nvm run deploy
$ nvm run start:prod
```

Requirements
------------

* node `7.3.0`
* npm `3.10.10`

Features
--------

See features [here](https://hirako2000.github.io/2016/12/17/React-Hackathon-Board.html).

Getting Started
---------------

Clone the repo and install the necessary node modules:

```shell
$ git clone https://github.com/hirako2000/react-hackathon-board.git
$ cd react-hackathon-board
$ npm install                   # Install Node modules listed in ./package.json (may take a while the first time)
```

Start mongodb
```shell
$ mongod
```

Start the node application (dev - hot module reloading)
```shell
$ npm run start:dev  # Compile and launch
```
Deploy and start for production (with npm)
```shell
$ npm run deploy  # Compile all to ./dist
$ npm run start:prod
```

Deploy and start for production (with pm2)
```shell
$ npm run deploy
$ pm2 start npm --name=react-hackathton-board -- start
```

Dev
-----

Here's a brief summary of the three which will most likely be your bread and butter:

* Doing live development? Use `npm run start:dev` to spin up the dev server.
* Compiling the application to disk? Use `npm run compile`.

**NOTE:** This package makes use of [debug](https://github.com/visionmedia/debug) to improve your debugging experience. For convenience, all of messages are prefixed with `app:*`. If you'd like to to change what debug statements are displayed, you can override the `DEBUG` environment variable via the CLI (e.g. `DEBUG=app:* npm run start:dev`) or tweak the npm scripts (`betterScripts` in `package.json`).

Great, now that introductions have been made here's everything in full detail:

|`npm run...`|Description|
|---|---|
|`start:dev`|Spins up Koa server to serve your app at `localhost:3000`. HMR will be enabled in development.|
|`compile`|Compiles the application to disk (`~/dist` by default).|
|`dev`|Same as `npm run start:dev`, but enables nodemon to automatically restart the server when server-related code is changed.|
|`dev:nw`|Same as `npm run dev`, but opens the redux devtools in a new window.|
|`dev:no-debug`|Same as `npm run dev` but disables redux devtools.|
|`test`|Runs unit tests with Karma and generates a coverage report.|
|`test:dev`|Runs Karma and watches for changes to re-run tests; does not generate coverage reports.|
|`deploy`|Runs linter, tests, and then, on success, compiles your application to disk.|
|`deploy:dev`|Same as `deploy` but overrides `NODE_ENV` to "development".|
|`deploy:prod`|Same as `deploy`.|
|`flow:check`|Analyzes the project for type errors.|
|`lint`|Lint all `.js` files.|
|`lint:fix`|Lint and fix all `.js` files. [Read more on this](http://eslint.org/docs/user-guide/command-line-interface.html#fix).|

**NOTE:** Deploying to a specific environment? Make sure to specify your target `NODE_ENV` so webpack will use the correct configuration. For example: `NODE_ENV=production npm run compile` will compile your application with `~/config/_production.js`.

### Configuration

Basic project configuration can be found in `~/config/_base.js`. Here you'll be able to redefine your `src` and `dist` directories, adjust compilation settings, tweak your vendor dependencies, and more. For the most part, you should be able to make changes in here **without ever having to touch the webpack build configuration**.

If you need environment-specific overrides (useful for dynamically setting API endpoints, for example), create a file with the name of target `NODE_ENV` prefixed by an `_` in `~/config` (e.g. `~/config/_production.js`). This can be entirely arbitrary, such as `NODE_ENV=staging` where the config file is `~/config/_staging.js`.

Common configuration options:

|Key|Description|
|---|---|
|`dir_src`|application source code base path|
|`dir_dist`|path to build compiled application to|
|`server_host`|hostname for the Koa server|
|`server_port`|port for the Koa server|
|`compiler_css_modules`|whether or not to enable CSS modules|
|`compiler_devtool`|what type of source-maps to generate (set to `false`/`null` to disable)|
|`compiler_vendor`|packages to separate into to the vendor bundle|

CLI Generators
--------------

This project integrates with [Redux CLI](https://github.com/SpencerCDixon/redux-cli) out of the box. If you used it to generate this project you have immediate access to the generators listed below (if you cloned/forked the project you have these features as well, but make sure to install the CLI first!).

|Script|Description|Options|
|---|---|---|
|`redux g dumb <comp name>`|generates a dumb component and test file||
|`redux g smart <smart name>`|generates a smart connected component and test file||
|`redux g layout <comp name>`|generates functional layout component||
|`redux g view <comp name>`|generates a view component||
|`redux g form <form name>`|generates a form component (assumes redux-form)||
|`redux g duck <duck name>`|generates a redux duck and test file||
|`redux g blueprint <new blueprint>`|generates an empty blueprint for you to make||
**NOTE**: `redux-form` is not a dependency by default. If you wish to use it make sure to `npm i --save redux-form`, or if you wish to modify the skeleton you can update the blueprint in `~/blueprints/form/files/...`.

All of these blueprints are available (and can be overridden) in the `~/blueprints` folder so you can customize the
default generators for your project's specific needs. If you have an existing app you can run `redux init` to set up the CLI, then
make sure to copy over the `blueprints` folder in this project.

[See the Redux CLI github repo](https://github.com/SpencerCDixon/redux-cli#creating-blueprints) for more information on how to create and use blueprints.

Structure
---------

The folder structure provided is only meant to serve as a guide, it is by no means prescriptive. It is something that has worked very well for me and my team, but use only what makes sense to you.

```
.
├── bin                      # Build/Start scripts
├── blueprints               # Blueprint files for redux-cli
├── build                    # All build-related configuration
│   └── webpack              # Environment-specific configuration files for webpack
├── config                   # Project configuration settings
├── interfaces               # Type declarations for Flow
├── server                   # Koa application (uses webpack middleware)
│   └── main.js              # Server application entry point
├── src                      # Application source code
│   ├── components           # Generic React Components (generally Dumb components)
│   ├── containers           # Components that provide context (e.g. Redux Provider)
│   ├── layouts              # Components that dictate major page structure
│   ├── redux                # Redux-specific pieces
│   │   ├── modules          # Collections of reducers/constants/actions
│   │   └── utils            # Redux-specific helpers
│   ├── routes               # Application route definitions
│   ├── static               # Static assets (not imported anywhere in source code)
│   ├── styles               # Application-wide styles (generally settings)
│   ├── views                # Components that live at a route
│   └── main.js              # Application bootstrap and rendering
└── tests                    # Unit tests
```

### Components vs. Views vs. Layouts

**TL;DR:** They're all components.

This distinction may not be important for you, but as an explanation: A **Layout** is something that describes an entire page structure, such as a fixed navigation, viewport, sidebar, and footer. Most applications will probably only have one layout, but keeping these components separate makes their intent clear. **Views** are components that live at routes, and are generally rendered within a **Layout**. What this ends up meaning is that, with this structure, nearly everything inside of **Components** ends up being a dumb component.

Webpack
-------

### Vendor Bundle
You can add which packages to bundle separately by modifying `compiler_vendor` in `~/config/_base.js`. These default to:

```js
[
  'history',
  'react',
  'react-redux',
  'react-router',
  'react-router-redux',
  'redux',
  ...
]
```

### Webpack Root Resolve
Webpack is configured to make use of [resolve.root](http://webpack.github.io/docs/configuration.html#resolve-root), which lets you import local packages as if you were traversing from the root of your `~/src` directory. Here's an example:

```js
// current file: ~/src/views/some/nested/View.js

// What used to be this:
import SomeComponent from '../../../components/SomeComponent'

// Can now be this:
import SomeComponent from 'components/SomeComponent' // Hooray!
```

### Globals

These are global variables available to you anywhere in your source code. If you wish to modify them, they can be found as the `globals` key in `~/config/_base.js`. When adding new globals, also add them to `~/.eslintrc`.

|Variable|Description|
|---|---|
|`process.env.NODE_ENV`|the active `NODE_ENV` when the build started|
|`__DEV__`|True when `process.env.NODE_ENV` is `development`|
|`__PROD__`|True when `process.env.NODE_ENV` is `production`|
|`__TEST__`|True when `process.env.NODE_ENV` is `test`|
|`__DEBUG__`|True when `process.env.NODE_ENV` is `development` and cli arg `--no_debug` is not set (`npm run dev:no-debug`)|
|`__BASENAME__`|[npm history basename option](https://github.com/rackt/history/blob/master/docs/BasenameSupport.md)|

Server
------

This app comes Koa 2 as server.

Styles
------

Both `.scss` and `.css` file extensions are supported out of the box and are configured to use [CSS Modules](https://github.com/css-modules/css-modules). After being imported, styles will be processed with [PostCSS](https://github.com/postcss/postcss) for minification and autoprefixing, and will be extracted to a `.css` file during production builds.

**NOTE:** If you're importing styles from a base styles directory (useful for generic, app-wide styles), you can make use of the `styles` alias, e.g.:

```js
// current file: ~/src/components/some/nested/component/index.jsx
import 'styles/core.scss' // this imports ~/src/styles/core.scss
```

Furthermore, this `styles` directory is aliased for sass imports, which further eliminates manual directory traversing; this is especially useful for importing variables/mixins.

Here's an example:

```scss
// current file: ~/src/styles/some/nested/style.scss
// what used to be this (where base is ~/src/styles/_base.scss):
@import '../../base';

// can now be this:
@import 'base';
```

Testing
-------

To add a unit test, simply create a `.spec.js` file anywhere in `~/tests`. Karma will pick up on these files automatically, and Mocha and Chai will be available within your test without the need to import them. If you are using `redux-cli`, test files should automatically be generated when you create a component or redux module (duck).

Coverage reports will be compiled to `~/coverage` by default. If you wish to change what reporters are used and where reports are compiled, you can do so by modifying `coverage_reporters` in `~/config/_base.js`.

Deployment
----------

Out of the box, this app is deployable by serving the `~/dist` folder generated by `npm run compile` (make sure to specify your target `NODE_ENV` as well). This project does not concern itself with the details of server-side rendering or API structure, since that demands an opinionated structure that makes it difficult to extend the app. However, if you do need help with more advanced deployment strategies, here are a few tips:

If you are serving the application via a web server such as nginx, make sure to direct incoming routes to the root `~/dist/index.html` file and let react-router take care of the rest. The Koa server that comes with the app is able to be extended to serve as an API or whatever else you need, but that's entirely up to you.


Troubleshooting
---------------

### `npm run dev:nw` produces `cannot read location of undefined.`

This is most likely because the new window has been blocked by your popup blocker, so make sure it's disabled before trying again.


### Babel Issues

Running into issues with Babel? Babel 6 can be tricky, please either report an issue or try out the [stable v0.18.1 release]

### Babel Polyfill

By default this repo does not bundle the babel polyfill in order to reduce bundle size. If you want to include it, you can use [this commit](https://github.com/jokeyrhyme/react-redux-starter-kit/commit/f3f095b547ee63474b9361128bb95d370da04b35) from [jokeyrhyme](https://github.com/jokeyrhyme) as a reference.

### Deployment Issues (Generally Heroku)

Make sure that your environment is installing both dependencies _and_ devDependencies, since the latter are required to build the application.

### High editor CPU usage after compilation

While this is common to any sizable application, it's worth noting for those who may not know: if you happen to notice higher CPU usage in your editor after compiling the application, you may need to tell your editor not to process the dist folder. For example, in Sublime you can add:

```
	"folder_exclude_patterns": [".svn",	".git",	".hg", "CVS",	"node_modules",	"dist"]
```

Thank You
---------

This project wouldn't be possible without help from the community, so I'd like to highlight some project that helped getting started. Thank you all for your hard work, you've made my life a lot easier and taught me a lot in the process.

* https://github.com/davezuko/react-redux-starter-kit

And to everyone else who has contributed, even if you are not listed here your work is appreciated.
