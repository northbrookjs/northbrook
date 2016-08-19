# Northbrook

> A configurable tool for managing projects with NPM

# Features and Design Goals
---

- [x] Manage many interlinks or closely related packages with ease
- [x] Useful out-of-box without configuration
- [x] Manage commit messages
- [x] Automatic Semantic Versioning
- [x] Automated Deployment to NPM
- [x] Automated Changelog generation
- [x] Powerful plugin system

# Why another thing?
---

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
configurations for your build|test|linting|code-coverage ever again!


# Let me have it!

```sh
npm install --save-dev northbrook

mkdir myNewThingy
cd myNewThingy

northbrook init
# or abbreviated
nb init
```

# **Command Line Interface**

### **northbrook init**

Initialized your new `northbrook` managed project with default configurations. Will
generate the following files for you.

- northbrook.json
- package.json
- LICENSE.md (MIT)
- .gitignore

#### **northbrook commit**

Used to enforce good commit messages that are used to follow semantic
versioning as well as generate changelogs when your go to run `northbrook
release`. It will bring you through a series of prompts to
generate your awesome commit messages in a nice and easy manner.

#### **northbrook release**

Publishes all modified packages to NPM following semantic versioning.
Recursively updates packages that depend upon them as long as there are no
breaking changes included. Generates changelogs and updates documentation.

### **northbrook exec [command...]**

> $ nb exec -- cat package.json

Runs a command inside of all managed packages.

### **northbrook link**

Symlinks all managed packages if they depend upon each other.
Useful for monorepo development, if required.

# **northbrook.json**
-----

The configuration for all of your needs. These 4 fields are the only options

```js
{
  "version": "0.0.0", // version of northbrook being used
  "packages": [ // array of relative paths of packages to manage
    "package1", // can be used to manage projects as a monorepo!
    "nested/package2", // but I only need it for a single directory!
    "." // manage the root dir, if you don't need monorepo capabilities
  ],
  "plugins": [ // array of plugins to be used - NPM require()-able name  
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

#### **northbrookConfig**

The `northbrook.json` file contents as a JavaScript object. Plugins can use
this to retrieve configurations stored inside of it, whether they are the   
core fields documented above, or plugin specific configurations.

### **workingDirectory**

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


## Caveats


##### Supports only Node 6 and NPM 3 +

The approach relies heavily upon the flattening of that NPM 3 does in order
to find plugins in a way that doesn't require searching all over the place
for where they might be located. Node 6 is only supported because of lots of
ES2015 features are used in the codebase, because I want to maintain this
thing with joy going forward.
