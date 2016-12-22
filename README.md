# Northbrook ![](https://img.shields.io/badge/license-MIT-blue.svg) [![ComVer](https://img.shields.io/badge/ComVer-compliant-brightgreen.svg)](https://github.com/staltz/comver)

> Reproducible tooling & configuration

## What is this all about?

Northbrook is a bridge between the [`Node Package Manager (NPM)`](https://www.npmjs.com/)
and your terminal. Northbrook orchestrates [`plugins`](#plugins) to help you
manage your projects, including multi-package projects (monorepos). It does so
with [`Reginn`](https://github.com/TylorS/reginn) dynamically adding to the
command line interface.

Leveraging NPM allows users to install plugins that setup or manage all parts of
your applications lifecycle from scaffolding to releasing.
[Configured](#northbrook-configuration) through a simple JavaScript file, you
can `npm install` other configurations for reuse or extension across any project!

## This is for me!
```sh
# with npm
npm install --save-dev northbrook
# with yarn
yarn add --dev northbrook
```

---

## Table of Contents

- [Project Goals](#general-project-goals)
- [Documentation Goals](#documentation-goals)
- [Community Goals](#community-goals)
- [Northbrook CLI Options](#northbrook-command-line-options)
- [Northbrook Configuration](#northbrook-configuration)
- [Plugins](#plugins)
- [Additional Feature for Monorepos](#additional-features-for-monorepos)
- [Packages for monorepos](#packages-for-monorepos)

## Additional Documentation

- [Default Plugins and Plugin API](https://github.com/northbrookjs/northbrookjs/tree/master/PLUGINS.md)
- [Using Northbrook Programatically](https://github.com/northbrookjs/northbrookjs/tree/master/NORTHBROOK_API.md)

---

## General Project Goals

- Manage projects with ease, including multi-package repositories (monorepos)
- Useful out of box with no configuration
- Extensible and configurable via plugins
- Highly reusable, and versionable, configurations (installed via NPM)
- Well Documented

## Documentation Goals

This is a passion project, and as such it's too easy to write
documentation that assumes knowledge that perhaps only core contributors have.
A real goal of the project is to make as many user's lives as easy as possible
and documentation is paramount to that goal. Please, if you see something that isn't
documented, isn't clear, or just plain sucks, open an issue! Let us know! Better
yet, your contribution as a pull request would be graciously welcomed!

## Community Goals

Building Community around a project is so important for the longevity of a project.
We want to personally state that everyone is welcome here, and any misconduct will
not be tolerated. Your contributions in the form of bug reports, pull requests,
and feature requests are vital and I want to hear them all, don't be shy. :smile:

Please be mindful that this is an open-source project developed only on the free
time of it's contributors. We want to help, but time is a precious thing, so please
be understanding and sensitive to these types of circumstances.

---

## Northbrook Command Line Options

Northbrook does not do very much out of the box other than orchestrate plugins,
but it does have some configurable CLI flags that make using Northbrook just a
bit easier.

**`--only, -o`** Execute plugins only in specific packages

```sh
# run northbrook exec only in packageA
northbrook --only packageA exec -- npm install
```

**`--config, -c`** Explicitly define where to look for a northbrook configuration file.

```sh
northbrook --config .config/northbrook.production.js
```

**`--debug, -d`** Turn on a debug mode, where Northbrook will print to the console more
information about what it is doing to orchestrate your plugins. Useful to find out
how Northbrook operates, and for debugging errors that may be occuring.

---

## Northbrook Configuration

Northbrook introduces a single file to use to configure how Northbrook works, out
of the box, if the defaults work for you, you shouldn't have to even touch a configuration file.
If you need to tweak some things, add or configure new plugins, this is where that
can be done. By default this configuration file should be named either
`northbrook.js` or `northbrook.ts` if TypeScript is for you. Throughout the
documentation these two files will used interchangably but rules or
guidelines that apply to one apply to all Northbrook configurations.

```typescript
// as a TypeScript interface
interface NorthbrookConfig {
  packages?: Array<string>;
  plugins?: Array<string | App | Command>;
}
```

By default, and if no `packages` are defined, just the project-level package will be
used as the only package. Likely you will never need to use the field unless you plan to develop
more than one package in a monorepo. If you are developing a monorepo see more
documentation on packages for monorepos [here](#packages-for-monorepos).

By default, and if no `plugins` are defined, a set of default plugins will be
imported and used from `northbrook/plugins`. The next section will go further in
depth about plugins.

## Plugins

Plugins are used to introduce new functionality to Northbrook, as a matter of
fact, Northbrook does very little other than facilitate the creation and management
of plugins. Plugins can introduce tools to transpile your source code, to help
you get started with testing, build documentation, or anything that can be done
with node.js. Some examples may be

- Building with TypeScript / Babel / Buble
- Testing with Mocha / Karma
- Bundling with Rollup / Browserify / Webpack
- Building documentation
- Scaffolding new packages

As a general philosophy Northbrook likes to follow, it is encouraged that
plugins should **not** introduce configuration into a `northbrook.js` that
is already covered by other mechanisms. For instance, a plugin for Babel has no
need to introduce a way to configure Babel plugins since there already exists a
`.babelrc` to do just that. The same goes for a plugin for TypeScript as
`tsconfig.json` already exists to configure how to build your projects. This is
especially important when it come to editor integrations that already exist using
these files, no need to duplicate work!

Configuring plugins should look like this

```js
// northbrook.js

const typescriptPlugin = require('some-typescript-plugin');

module.exports = {
  plugins: [
    'northrbook/plugins', // leave it to northbrook to do the require()ing
    typescriptPlugin, // a plugin can be user-required
    'tslint'
  ]
}
```

```typescript
// northbrook.ts
export = {
  plugins: [
    'northbrook/plugins',
    'typescript',
    'tslint'
  ]
}
```

Plugins can either be a `require()`-able string or in the form of a Reginn
[App](https://github.com/tylors/reginn#app) or [Command](https://github.com/tylors/reginn#command).

By default `northbrook/plugins` will be used if no configuration is applied.
For information about the default plugins or creating plugins please see
[PLUGINS.md](https://github.com/northbrookjs/northbrookjs/tree/master/PLUGINS.md).

---

## Additional Features for Monorepos

The design of Northbrook is agnostic to the number of packages that you need to
manage. This means, that you can just as easily use it to manage a single
package or a monorepo with 100+ packages and share the same benefits.

### Single installation of dependencies

Northbrook has been designed to allow plugins to move your devDependencies to
the top-level. Allowing for a dependency like TypeScript to be installed 1 time
and used for all managed packages. This could help cut the build time for your
projects to focus on the important stuff, tests!

Benefits:

- All packages use the same version of a given dependency
- Dependency installation time is reduced
- Less storage is needed

### Single configuration

Just like dependencies, configurations are now allowed to exist at the top-level
to only be configured once when it makes sense. Configurations such as a
`tsconfig.json` can be declared once at the root level, and reused across all
of your package. These leads to less duplication and configuration.

---

## Packages for monorepos

When developing a monorepo, you will need to interact with a `northbrook.js`
configuration file to setup where to look for each packages. Each package is
to be defined as a relative path to it.

```js
//northbrook.js
// commonjs
module.exports = {
  packages: ['relative/path/to/packageA', 'relative/path/to/packageB']
}
```

Additionally, if you have many packages co-located in a specific folder, it is
possible to use a short-hand syntax `/**` to automatically find all packages in a directory.

```js
module.exports = {
  packages: ['relativePath/**']
}
```

It is important to note that this syntax is not recursive and will only look for
packages at the top-level of the relative path.