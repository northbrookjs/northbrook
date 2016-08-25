# Northbrook
![](https://img.shields.io/badge/license-MIT-blue.svg)
[![Build Status](https://travis-ci.org/northbrookjs/northbrook.svg?branch=master)](https://travis-ci.org/northbrookjs/northbrook)
[![dependencies Status](https://david-dm.org/northbrookjs/northbrook/status.svg)](https://david-dm.org/northbrookjs/northbrook)
[![devDependencies Status](https://david-dm.org/northbrookjs/northbrook/dev-status.svg)](https://david-dm.org/northbrookjs/northbrook?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/northbrookjs/northbrook.svg)](https://github.com/northbrookjs/northbrook/issues)


> A configurable tool for managing projects with NPM

# Features and Design Goals
---

- [x] Manage many interlinked or closely related packages with ease
- [x] Useful out-of-box without configuration
- [x] Manage commit messages
- [x] Automatic Semantic Versioning
- [x] Automated Changelog Generation
- [x] Automated Deployment to NPM
- [x] Powerful plugin system

# Why another thing?
---

Northbrook was originally designed to be a [lerna.js](https://github.com/lerna/lerna)
alternative focusing upon managing monorepos using TypeScript 2.x in a very strict
and absolute way. However, while doing my first refactor, when I was hoping to publish,
I realized I had created an internal plugin system and could easily be exposed to external
plugins as well. I realized that in doing so, it opens up a lot of interesting opportunities.

NPM is powerful. Why not use it to create reusable and reproducible tooling?
Your configurations are shareable via NPM, and most importantly it can be **versioned**.

Suppose you maintain a number of OSS projects (I do) and you have to set up your
build system each time right? Then along the way you learn some cool new things
and find yourself wishing that your older projects had all the bells and whistles
of your newer projects (happens to me all the time).

Enter Northbrook; Create a package that does what you need, install it, use
it. Learned that cool new trick and wish you had that thing in all your
projects? Update your plugin and all of them share the same configuration.
That is all there is to it.

When combined with something like greenkeeper, you'll never have out-dated
configurations for your build|test|lint|anything ever again!


# Let me have it!

```sh
# Install
npm install -g northbrook

# Usage
mkdir myNewThingy
cd myNewThingy

northbrook init
# or abbreviated
nb init
```

# **Command Line Interface**

### **northbrook init**

Initializes your new `northbrook` managed project with default
configurations. Will generate the following files for you.

- northbrook.json
- package.json
- LICENSE.md (MIT)
- .npmignore

#### **northbrook commit**

Used to enforce good commit messages that are used to follow semantic
versioning as well as generate changelogs when your go to run `northbrook
release`. It will bring you through a series of prompts to
generate your awesome commit messages in a nice and easy manner.

#### **northbrook release**

Publishes all modified packages to NPM following semantic versioning and generates
a changelog for each package.

##### options
`--check` - Checks what needs to be releases and generates the changelog, but only
outputs to the console.

`--skip-npm` - Useful if first time publishing scoped packages. Running release
on a previously unrelease scoped package will fail since it is not run with
`--access=public`

#### **northbrook exec [command...]**

> $ nb exec -- cat package.json

Runs a command inside of all managed packages.

##### options
`--only <packageName>` - runs the command in only the specified package.

#### **northbrook link**

Symlinks all managed packages if they depend upon each other.
Useful for monorepo development, if required.

# **northbrook.json**
-----

The configuration for all of your needs. These 3 fields are the only options
used by the default plugins.

```js
{
  "packages": [ // array of relative paths of packages to manage
    "package1", // can be used to manage projects as a monorepo!
    "nested/package2", // but I only need it for a single directory!
    "." // manage the root dir, if you don't need monorepo capabilities
    "packages/**" // special ** will load all directories inside containing a package.json file
  ],
  "plugins": [ // array of plugins to be used
   // names are to be either NPM require()-able name
   // or a relative path to a local plugin
  ],
  "ignoreDefaults": [ // array of default plugins to ignore
    "link", // names are that of the CLI commands above
    "release" // allows reusing the names for external packages
  ]
  // Whatever else is required/available to external plugins
}
```


# Plugin API
-----


All plugins are simple NPM modules, with the power to do anything node can!
A plugin looks like this:

```js
exports.plugin = function (program, northbrookConfig, workingDirectory) {
  // do awesomeness here
}
```

#### **program**

The first argument to a plugin is an instance of the amazing CLI tool
[commander](https://github.com/tj/commander.js/)! This allows for all
plugins to extend the CLI interface. Need a thing to check on your Travis CI
builds?

```js
exports.plugin = function (program) {
  program
    .command('travis')
    .description('Gets the status of your Travis CI builds')
    .action(function () {
      // do your checking
    })
}
```

Run `northbrook travis` and your plugin will execute.

#### **northbrookConfig**

The `northbrook.json` file contents as a JavaScript object. Plugins can use
this to retrieve configurations stored inside of it, whether they are the   
core fields documented above, or plugin specific configurations.

#### **workingDirectory**

The `workingDirectory` a string of the absolute path to the directory that
contains the `northbrook.json` file. Useful for finding other configuration
files that are not configured inside of `northbrook.json` or for finding the
paths of the managed packages.

```js
const { join } = require('path')

exports.plugin = function (program, northbrookConfig, workingDir) {
  northbrookConfig.packages.forEach(pkg => {
    const pkgDir = join(workingDir, pkg)

    // ... do something with each package
  })
}
```


## Caveats && FAQ


##### Supports only NPM 3 +

The approach relies heavily upon the flattening of that NPM 3 does in order
to find plugins in a way that doesn't require searching all over the place
for where they might be located.

##### Why is it running a different version than what I have installed globally?

Because installing things globally isn't really that great of an idea, its only
meant to help with `northbrook init`, so northbrook will use a locally installed
version if it can find one.

# Recommendations

###### Build Steps

If your package as a build step involved such as using TypeScript or Buble, it
is recommended that in your package.json you run your build step inside of
`preversion` in order to ensure your built library is up-to-date when published
to npm when using `northbrook release`.

```js
{
  "scripts": {
    "build": "babel src/ -d lib",
    "preversion": "npm run build" // ensures your build is published to npm
  }
}
```

###### Git Commit Hooks

Though not required, adding this to your `package.json` will allow you to enjoy
further git commit checking in case you use `git commit` out of habit. In order
to make good use of this configuration you'll need to install `ghooks` and
`validate-commit-msg` to your devDependencies.

If you are using `northbrook init` it will generate these for you, but it does
**not** install them for you.

```js
"config": {
  "ghooks": {
    "commit-msg": "node ./node_modules/.bin/validate-commit-msg"
  },
  "validate-commit-msg": {
    "types": [
      "feat",
      "fix",
      "docs",
      "style",
      "refactor",
      "perf",
      "test",
      "chore",
      "revert",
      "release" // required for doing releases if you're using validate-commit-msg
    ]
  }
}
```
