# Northbrook Plugins

This is a living document for the default plugins provided by Northbrook and the
plugin API used for creating plugins.

# Table of Contents
- [Default Plugins](#default-plugins)
  - [`exec`](#exec)
  - [`link`](#link)
  - [`commit`](#commit)
  - [`release`](#release)
- [Plugin API](#plugin-api)
  - [Basic Example](#example)
  - [Each Handler](#each-handler)
  - [Changed Packages](#changed-packages)

## Default Plugins

#### `exec`

> Execute commands inside of *all* of your managed packages.

Typically used for monorepo developement, it is often useful to run the
same command in all of you packages, such as `npm install` or `npm test`.

```sh
# used as
# northbrook exec -- your_command_here
northbrook exec -- npm install

northbrook exec -- npm test
```

These commands will, one by one, enter each package directory and run the command
as if your were in that package directory. It is important to note that this process
is synchronous, if a failure occurs in 1 package all others will cease to execute.

#### `link`

> Link inter-dependent packages together.

Typically used for monorepo developement, it is often useful to "link" together
packages that are inter-dependent on each other so that you can accelerate the
development process.

```sh
# used as
northbrook link
```

This will look for all inter-dependent packages and create a proxy `package.json`
to link the packages together.

#### `commit`

> Powerful git commit messages.

This is an alternative to running `git commit`, that is highly(!) recommended.
This command will bring you through a series of prompts to create highly organized
commit messaged that can reliably be parsed to do some really awesome things, such
as generate changelogs automagically, and do automated releases.

```
# used as
northbrook commit
```

#### `release`

> Automated package release

In conjunction with well-organized commit messages from `northbrook commit`,
`release` will step through the following process to help you organize the release
of your packages to NPM using git.

1. Check if you have a clean git history (avoid accidental releases)
2. Run `npm test`
3. Find all packages that have not previously been released
4. Bump the version number of all packages (using compatible or semantic versioning)
5. Ask for you to login to NPM (`npm login`)
6. Publish the packages to NPM
7. Generate git tags for each package
8. Generate a changelog for each package
9. Push changes back to your `master` branch

```
# used as
northbrook release
```

Options

#### Boolean Flags

- **`--check`** Check to see what releases are currently required without performing steps 4-9.
- **`--comver`** Use compatible versioning for package release (default)
- **`--semver`** Use semantic versioning for your package release
- **`--skip-login`** Skip the `npm login` step

#### Flags with values
- **`--release-branch branch_name`** Define the branch to push to, defaults to `master`.
- **`--access (public | private)`** Define whether packages are public (default) or private.
---

## Plugin API

Plugins are [`Reginn`](https://github.com/TylorS/reginn) commands, with modified
[`handler`](https://github.com/TylorS/reginn#handlers) functions.

Knowing that there are [2 ways to consume plugins](https://github.com/northbrookjs/northbrookjs#plugins), there are
also different ways to write you plugins, but its very easy to support both methods.

If you want you plugin to be require()-able automatically, your package must export a
property of `plugin`.

##### Example

```js
// commonjs
// note that all Reginn functions are re-exported by northbrook for convenience
const { command, alias } = require('northbrook');

module.exports = {
  plugin: command(alias('awesome'))
};
// or
exports.plugin = command(alias('awesome'));

// ES2015
import { command, alias } from 'northbrook';

export const plugin = command(alias('awesome'));
```

If for any reason you choose not to provide this option, make sure this is documented
in your README of your plugin to help anyone trying to get started with your plugin!

Okay, know that Northbrook plugins are just Reginn commands, it can be very helpful
to step through the [walkthrough](https://github.com/TylorS/reginn#basic-usage-and-tutorial) that Reginn has
documented.

In addition to all that Reginn has to offer, Northbrook provides two APIs that are especially
useful for writing plugins.

#### Each Handler

Wait just a while longer for this to be documented, [see it in action](https://github.com/northbrookjs/northbrookjs/blob/master/src/plugins/exec/index.ts#L16),
or submit a pull request to help us better document this feature!

#### Changed Packages

Wait just a while longer for this to be documented, or submit a pull request to
help us better document this feature!