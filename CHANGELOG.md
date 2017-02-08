<a name="4.6.3"></a>
## [4.6.3](https://github.com/northbrookjs/northbrook/compare/v4.6.2...v4.6.3) (2017-01-30)


### Bug Fixes

* **each:** some plugins can reject with void ([8856e0e](https://github.com/northbrookjs/northbrook/commit/8856e0e))



<a name="4.6.2"></a>
## [4.6.2](https://github.com/northbrookjs/northbrook/compare/v4.6.1...v4.6.2) (2017-01-30)


### Bug Fixes

* **yarn:** update yarn.lock ([8e0dd90](https://github.com/northbrookjs/northbrook/commit/8e0dd90))



<a name="4.6.1"></a>
## [4.6.1](https://github.com/northbrookjs/northbrook/compare/v4.6.0...v4.6.1) (2017-01-30)


### Bug Fixes

* **package:** update dependencies ([1c9bdea](https://github.com/northbrookjs/northbrook/commit/1c9bdea))



<a name="4.6.0"></a>
# [4.6.0](https://github.com/northbrookjs/northbrook/compare/v4.5.5...v4.6.0) (2017-01-24)


### Bug Fixes

* **changedPackages:** conditionally split affects string ([bf06698](https://github.com/northbrookjs/northbrook/commit/bf06698))


### Features

* **northbrook:** show version number during release ([5c5bc16](https://github.com/northbrookjs/northbrook/commit/5c5bc16))



<a name="4.5.5"></a>
## [4.5.5](https://github.com/northbrookjs/northbrook/compare/v4.5.4...v4.5.5) (2017-01-24)


### Bug Fixes

* **northbrook:** fix for releasing ([726cf9d](https://github.com/northbrookjs/northbrook/commit/726cf9d))



<a name="4.5.4"></a>
## [4.5.4](https://github.com/northbrookjs/northbrook/compare/v4.5.3...v4.5.4) (2017-01-24)


### Bug Fixes

* **changedPackages:** fix for the affects field ([5bcddf0](https://github.com/northbrookjs/northbrook/commit/5bcddf0))



<a name="4.5.3"></a>
## [4.5.3](https://github.com/northbrookjs/northbrook/compare/v4.5.2...v4.5.3) (2017-01-23)


### Bug Fixes

* **parseCommitMessage:** hotfix for commit parsing ([73e8a03](https://github.com/northbrookjs/northbrook/commit/73e8a03))


### Features

* **release:** allow releasing previously unreleased packages ([fcbaef8](https://github.com/northbrookjs/northbrook/commit/fcbaef8))



<a name="4.5.2"></a>
## [4.5.2](https://github.com/northbrookjs/northbrook/compare/v4.5.1...v4.5.2) (2017-01-21)


### Bug Fixes

* **changedPackages:** allow getting changed packages without previous git tag ([a4770de](https://github.com/northbrookjs/northbrook/commit/a4770de))
* **commit:** only ask questions if there are changes staged ([93f19f1](https://github.com/northbrookjs/northbrook/commit/93f19f1))
* **northbrook:** only display northbrook config warning in debug mode ([2b0620b](https://github.com/northbrookjs/northbrook/commit/2b0620b))



<a name="4.5.1"></a>
## [4.5.1](https://github.com/northbrookjs/northbrook/compare/v4.5.0...v4.5.1) (2017-01-17)


### Bug Fixes

* **commit:** Use neither/nor ([#87](https://github.com/northbrookjs/northbrook/issues/87)) ([1e935b5](https://github.com/northbrookjs/northbrook/commit/1e935b5))



<a name="4.5.0"></a>
# [4.5.0](https://github.com/northbrookjs/northbrook/compare/v4.4.6...v4.5.0) (2017-01-16)


### Features

* **northbrook:** build a dependency graph for more correct tooling ([c2ed7e3](https://github.com/northbrookjs/northbrook/commit/c2ed7e3))



<a name="4.4.6"></a>
## [4.4.6](https://github.com/northbrookjs/northbrook/compare/v4.4.5...v4.4.6) (2017-01-16)


### Bug Fixes

* **resolvePlugins:** make debug conditional again ([063082c](https://github.com/northbrookjs/northbrook/commit/063082c))



<a name="4.4.5"></a>
## [4.4.5](https://github.com/northbrookjs/northbrook/compare/v4.4.4...v4.4.5) (2017-01-16)


### Bug Fixes

* **resolvePlugins:** remove console.log ([00ce540](https://github.com/northbrookjs/northbrook/commit/00ce540))



<a name="4.4.4"></a>
## [4.4.4](https://github.com/northbrookjs/northbrook/compare/v4.4.3...v4.4.4) (2017-01-16)


### Bug Fixes

* **npmLogin:** allow retrying NPM login ([7b1d8db](https://github.com/northbrookjs/northbrook/commit/7b1d8db))
* **tryRequire:** fix test usage ([e9f0884](https://github.com/northbrookjs/northbrook/commit/e9f0884))



<a name="4.4.3"></a>
## [4.4.3](https://github.com/northbrookjs/northbrook/compare/v4.4.2...v4.4.3) (2017-01-16)


### Bug Fixes

* **northbrook:** solve weird require() issues ([e954543](https://github.com/northbrookjs/northbrook/commit/e954543))



<a name="4.4.2"></a>
## [4.4.2](https://github.com/northbrookjs/northbrook/compare/v4.4.1...v4.4.2) (2017-01-16)


### Bug Fixes

* **changedPackages:** ensure no failures occur with poorly formatted commit messages ([65e7883](https://github.com/northbrookjs/northbrook/commit/65e7883))
* **errors:** attempt to handle error messages more clearly ([62f5501](https://github.com/northbrookjs/northbrook/commit/62f5501))
* **link:** clean up destination before linking ([4e16ba3](https://github.com/northbrookjs/northbrook/commit/4e16ba3))



<a name="4.4.1"></a>
## [4.4.1](https://github.com/northbrookjs/northbrook/compare/v4.4.0...v4.4.1) (2017-01-14)


### Bug Fixes

* **link:** fix mutation issues ([1baa80c](https://github.com/northbrookjs/northbrook/commit/1baa80c))



<a name="4.4.0"></a>
# [4.4.0](https://github.com/northbrookjs/northbrook/compare/v4.3.7...v4.4.0) (2017-01-14)


### Bug Fixes

* **release:** fix tslint errors ([57f0ca0](https://github.com/northbrookjs/northbrook/commit/57f0ca0))


### Features

* **northbrook:** load [@northbrook](https://github.com/northbrook)/ and northbrook- prefixed plugins by default ([1964268](https://github.com/northbrookjs/northbrook/commit/1964268))



<a name="4.3.7"></a>
## [4.3.7](https://github.com/northbrookjs/northbrook/compare/v4.3.6...v4.3.7) (2017-01-13)


### Bug Fixes

* **changedPackages:** do not use release commits ([df73ce8](https://github.com/northbrookjs/northbrook/commit/df73ce8))
* **each:** attempt to print error messages and exit on 1 ([2db07c0](https://github.com/northbrookjs/northbrook/commit/2db07c0))
* **release:** exit on 0 for --check ([1f64771](https://github.com/northbrookjs/northbrook/commit/1f64771))



<a name="4.3.6"></a>
## [4.3.6](https://github.com/northbrookjs/northbrook/compare/v4.3.5...v4.3.6) (2017-01-11)


### Bug Fixes

* **run:** fix regex for windows ([100bf88](https://github.com/northbrookjs/northbrook/commit/100bf88))



<a name="4.3.5"></a>
## [4.3.5](https://github.com/northbrookjs/northbrook/compare/v4.3.4...v4.3.5) (2017-01-05)


### Bug Fixes

* **resolvePlugins:** fix failing tests with newer versions of dependencies ([7247acf](https://github.com/northbrookjs/northbrook/commit/7247acf))



<a name="4.3.4"></a>
## [4.3.4](https://github.com/northbrookjs/northbrook/compare/v4.3.3...v4.3.4) (2017-01-04)


### Bug Fixes

* **release:** associate git tags to commit hashes ([e622423](https://github.com/northbrookjs/northbrook/commit/e622423))



<a name="4.3.3"></a>
## [4.3.3](https://github.com/northbrookjs/northbrook/compare/v4.3.2...v4.3.3) (2017-01-04)


### Bug Fixes

* **release:** log when pushing to release branch ([2172aa8](https://github.com/northbrookjs/northbrook/commit/2172aa8))



<a name="4.3.2"></a>
## [4.3.2](https://github.com/northbrookjs/northbrook/compare/v4.3.1...v4.3.2) (2017-01-04)


### Bug Fixes

* **release:** small wording changes ([47aa949](https://github.com/northbrookjs/northbrook/commit/47aa949))



<a name="4.3.1"></a>
## [4.3.1](https://github.com/northbrookjs/northbrook/compare/v4.3.0...v4.3.1) (2017-01-04)


### Bug Fixes

* **release:** provide sequential releases for reliability ([d6a4f0e](https://github.com/northbrookjs/northbrook/commit/d6a4f0e))



<a name="4.3.0"></a>
# [4.3.0](https://github.com/northbrookjs/northbrook/compare/v4.2.3...v4.3.0) (2017-01-03)


### Bug Fixes

* **northbrook:** fix displaying northbrook flags in --help menu ([a9cf249](https://github.com/northbrookjs/northbrook/commit/a9cf249))


### Features

* **northbrook:** add global changed flag and implementation for each ([fe68790](https://github.com/northbrookjs/northbrook/commit/fe68790))



<a name="4.2.3"></a>
## [4.2.3](https://github.com/northbrookjs/northbrook/compare/v4.2.2...v4.2.3) (2016-12-31)


### Bug Fixes

* **changedPackages:** fix for parsing merge commits ([9e40651](https://github.com/northbrookjs/northbrook/commit/9e40651))



<a name="4.2.2"></a>
## [4.2.2](https://github.com/northbrookjs/northbrook/compare/v4.2.1...v4.2.2) (2016-12-31)


### Bug Fixes

* **release:** skip ci on changelog generation commit ([0164fd4](https://github.com/northbrookjs/northbrook/commit/0164fd4))



<a name="4.2.1"></a>
## [4.2.1](https://github.com/northbrookjs/northbrook/compare/v4.2.0...v4.2.1) (2016-12-31)


### Bug Fixes

* **release:** watch pacman eat ([d2d01c4](https://github.com/northbrookjs/northbrook/commit/d2d01c4))



<a name="4.2.0"></a>
# [4.2.0](https://github.com/northbrookjs/northbrook/compare/v4.1.10...v4.2.0) (2016-12-31)


### Features

* **release:** allow skipping tests ([8b5d5ac](https://github.com/northbrookjs/northbrook/commit/8b5d5ac))



<a name="4.1.10"></a>
## [4.1.10](https://github.com/northbrookjs/northbrook/compare/v4.1.9...v4.1.10) (2016-12-31)


### Bug Fixes

* **exec:** exit on exec failures ([488567c](https://github.com/northbrookjs/northbrook/commit/488567c))



<a name="4.1.9"></a>
## [4.1.9](https://github.com/northbrookjs/northbrook/compare/v4.1.8...v4.1.9) (2016-12-31)


### Bug Fixes

* **northbrook:** commit execute fixes ([e5d0218](https://github.com/northbrookjs/northbrook/commit/e5d0218))



<a name="4.1.8"></a>
## [4.1.8](https://github.com/northbrookjs/northbrook/compare/v4.1.7...v4.1.8) (2016-12-31)


### Bug Fixes

* **execute:** reject promise when child process exits with non-zero ([90613f5](https://github.com/northbrookjs/northbrook/commit/90613f5))



<a name="4.1.7"></a>
## [4.1.7](https://github.com/northbrookjs/northbrook/compare/v4.1.6...v4.1.7) (2016-12-31)


### Bug Fixes

* **northbrook:** exit with code 1 on errors with each callback ([98144b7](https://github.com/northbrookjs/northbrook/commit/98144b7))



<a name="4.1.6"></a>
## [4.1.6](https://github.com/northbrookjs/northbrook/compare/v4.1.5...v4.1.6) (2016-12-29)


### Bug Fixes

* **exec:** exit with code 1 on errors ([5ba2634](https://github.com/northbrookjs/northbrook/commit/5ba2634))



<a name="4.1.5"></a>
## [4.1.5](https://github.com/northbrookjs/northbrook/compare/v4.1.4...v4.1.5) (2016-12-25)


### Bug Fixes

* **northbrook:** use app so that flags are inherited correctly ([1b3c313](https://github.com/northbrookjs/northbrook/commit/1b3c313))



<a name="4.1.4"></a>
## [4.1.4](https://github.com/northbrookjs/northbrook/compare/v4.1.3...v4.1.4) (2016-12-23)


### Bug Fixes

* **package:** depend on types directly so users do not have to ([0040260](https://github.com/northbrookjs/northbrook/commit/0040260))



<a name="4.1.3"></a>
## [4.1.3](https://github.com/northbrookjs/northbrook/compare/v4.1.2...v4.1.3) (2016-12-23)


### Bug Fixes

* **release:** use bugs url to generate links ([81a1ab1](https://github.com/northbrookjs/northbrook/commit/81a1ab1))



<a name="4.1.2"></a>
## [4.1.2](https://github.com/northbrookjs/northbrook/compare/v4.1.1...v4.1.2) (2016-12-23)


### Bug Fixes

* **release:** do not run tests in silent mode ([0c69fdc](https://github.com/northbrookjs/northbrook/commit/0c69fdc))
* **release:** fix changelog generation ([fc281f8](https://github.com/northbrookjs/northbrook/commit/fc281f8))



<a name="4.1.1"></a>
## [4.1.1](https://github.com/northbrookjs/northbrook/compare/v4.1.0-northbrook...v4.1.1) (2016-12-23)


### Bug Fixes

* **release:** create correct git tag for scoped packages ([580931f](https://github.com/northbrookjs/northbrook/commit/580931f))



<a name="4.1.0-northbrook"></a>
# [4.1.0-northbrook](https://github.com/northbrookjs/northbrook/compare/v4.0.4-northbrook...v4.1.0-northbrook) (2016-12-23)


### Features

* **helpers:** extract and export packagesToExecute ([e8e6fa4](https://github.com/northbrookjs/northbrook/commit/e8e6fa4))
* **types:** add Pkg type to exported types ([edc1327](https://github.com/northbrookjs/northbrook/commit/edc1327))



<a name="4.0.4-northbrook"></a>
## [4.0.4-northbrook](https://github.com/northbrookjs/northbrook/compare/v4.0.3-northbrook...v4.0.4-northbrook) (2016-12-23)


### Bug Fixes

* **northbrook:** correctly resolve already required plugins ([f1c7e6b](https://github.com/northbrookjs/northbrook/commit/f1c7e6b))



<a name="4.0.3-northbrook"></a>
## [4.0.3-northbrook](https://github.com/northbrookjs/northbrook/compare/v4.0.2-northbrook...v4.0.3-northbrook) (2016-12-23)


### Bug Fixes

* **northbrook:** fix for displaying flags ([44a4a30](https://github.com/northbrookjs/northbrook/commit/44a4a30))



<a name="4.0.2-northbrook"></a>
## [4.0.2-northbrook](https://github.com/northbrookjs/northbrook/compare/v4.0.1-northbrook...v4.0.2-northbrook) (2016-12-22)


### Bug Fixes

* **release:** improve logging ([886312b](https://github.com/northbrookjs/northbrook/commit/886312b))
* **release:** use standard git message type ([42d2106](https://github.com/northbrookjs/northbrook/commit/42d2106))



<a name="4.0.1-northbrook"></a>
## [4.0.1-northbrook](https://github.com/northbrookjs/northbrook/compare/v4.0.0-northbrook...v4.0.1-northbrook) (2016-12-22)


### Bug Fixes

* **release:** allow using comver for release --check ([19e623a](https://github.com/northbrookjs/northbrook/commit/19e623a))
* **release:** include package.json in commits ([d75fa2e](https://github.com/northbrookjs/northbrook/commit/d75fa2e))



<a name="4.0.0-northbrook"></a>
# [4.0.0-northbrook](https://github.com/northbrookjs/northbrook/compare/v3.2.1-northbrook...v4.0.0-northbrook) (2016-12-22)


### Bug Fixes

* **bin:** switch back to join ([94b0586](https://github.com/northbrookjs/northbrook/commit/94b0586))
* **bin:** use require instead of join ([462a34b](https://github.com/northbrookjs/northbrook/commit/462a34b))
* **commit:** remove unneeded checkForStagedCommits ([7a78b0e](https://github.com/northbrookjs/northbrook/commit/7a78b0e))
* **commit:** use arrows to show placement ([e3a22ab](https://github.com/northbrookjs/northbrook/commit/e3a22ab))
* **plugin:** fix imports of plugins ([cb95524](https://github.com/northbrookjs/northbrook/commit/cb95524))
* **release:** add newline ([d4c7ecd](https://github.com/northbrookjs/northbrook/commit/d4c7ecd))
* **release:** add the final touches ([88f62ac](https://github.com/northbrookjs/northbrook/commit/88f62ac))
* **release:** correctly reassign new version ([b8d4e30](https://github.com/northbrookjs/northbrook/commit/b8d4e30))
* **release:** do not show progress before npm login ([d17a2f2](https://github.com/northbrookjs/northbrook/commit/d17a2f2))
* **release:** getting closer to a working release ([b3e9462](https://github.com/northbrookjs/northbrook/commit/b3e9462))
* **release:** improved flow ([3f74466](https://github.com/northbrookjs/northbrook/commit/3f74466))
* **release:** remove extra log message ([9bfe73c](https://github.com/northbrookjs/northbrook/commit/9bfe73c))
* **release:** remove listr ([73043ca](https://github.com/northbrookjs/northbrook/commit/73043ca))
* **release:** remove unused import ([ea270fc](https://github.com/northbrookjs/northbrook/commit/ea270fc))
* **release:** silence switchToReleaseBranch ([d98ed46](https://github.com/northbrookjs/northbrook/commit/d98ed46))
* **release:** stop spinner ([20e126f](https://github.com/northbrookjs/northbrook/commit/20e126f))


### Features

* **northbrook:** from-scratch reimplementation ([e8f3657](https://github.com/northbrookjs/northbrook/commit/e8f3657))
* **northbrook:** include northbrook folder ([482db74](https://github.com/northbrookjs/northbrook/commit/482db74))
* **northbrook:** make check output prettier ([6064257](https://github.com/northbrookjs/northbrook/commit/6064257))
* **release:** allow usage of comver and semver ([18e692b](https://github.com/northbrookjs/northbrook/commit/18e692b))
* **release:** format release header ([dedac28](https://github.com/northbrookjs/northbrook/commit/dedac28))
* **release:** use bold text ([faf9e3c](https://github.com/northbrookjs/northbrook/commit/faf9e3c))
* **release:** use listr for task list ([b381732](https://github.com/northbrookjs/northbrook/commit/b381732))


### BREAKING CHANGES

* northbrook: northbrook.json is now northbrook.js or northbrook.ts. `packages` and `plugins` are the only config options left.



<a name="3.2.1-northbrook"></a>
## [3.2.1-northbrook](https://github.com/northbrookjs/northbrook/compare/v3.2.0-northbrook...v3.2.1-northbrook) (2016-09-21)


### Bug Fixes

* **northbrook:** fix exec plugin ([a5cf5fc](https://github.com/northbrookjs/northbrook/commit/a5cf5fc))



<a name="3.2.0-northbrook"></a>
# [3.2.0-northbrook](https://github.com/northbrookjs/northbrook/compare/v3.1.3-northbrook...v3.2.0-northbrook) (2016-09-21)


### Features

* **northbrook:** add option to exclude packages from exec ([8dd2d72](https://github.com/northbrookjs/northbrook/commit/8dd2d72))



<a name="3.1.3-northbrook"></a>
## [3.1.3-northbrook](https://github.com/northbrookjs/northbrook/compare/v3.1.2-northbrook...v3.1.3-northbrook) (2016-09-21)


### Bug Fixes

* **northbrook:** real fixes for symlink behavior ([bcb3477](https://github.com/northbrookjs/northbrook/commit/bcb3477))



<a name="3.1.2-northbrook"></a>
## [3.1.2-northbrook](https://github.com/northbrookjs/northbrook/compare/v3.1.1-northbrook...v3.1.2-northbrook) (2016-09-21)


### Bug Fixes

* **northbrook:** fix linking scoped packages ([aa32750](https://github.com/northbrookjs/northbrook/commit/aa32750))



<a name="3.1.1-northbrook"></a>
## [3.1.1-northbrook](https://github.com/northbrookjs/northbrook/compare/v3.1.0-northbrook...v3.1.1-northbrook) (2016-09-21)


### Bug Fixes

* **northbrook:** fix for linking packages ([e2fe103](https://github.com/northbrookjs/northbrook/commit/e2fe103))



<a name="3.1.0-northbrook"></a>
# [3.1.0-northbrook](https://github.com/northbrookjs/northbrook/compare/v3.0.7-northbrook...v3.1.0-northbrook) (2016-09-04)


### Bug Fixes

* **northbrook:** extend defaults rather than replacing them ([a6a2bbb](https://github.com/northbrookjs/northbrook/commit/a6a2bbb))
* **northbrook:** use deepmerge to properly extend configurations ([99585df](https://github.com/northbrookjs/northbrook/commit/99585df))


### Features

* **northbrook:** add NORTHBROOK_EXEC_DIR to env for exec scripts to use ([c7ea34f](https://github.com/northbrookjs/northbrook/commit/c7ea34f))
* **northbrook:** allow extending multiple confiurations and additional options to methods ([83fe26d](https://github.com/northbrookjs/northbrook/commit/83fe26d))



<a name="3.0.7-northbrook"></a>
## [3.0.7-northbrook](https://github.com/northbrookjs/northbrook/compare/v3.0.6-northbrook...v3.0.7-northbrook) (2016-09-04)


### Bug Fixes

* **northbrook:** make exec entirely synchronous ([f548469](https://github.com/northbrookjs/northbrook/commit/f548469))



<a name="3.0.6-northbrook"></a>
## [3.0.6-northbrook](https://github.com/northbrookjs/northbrook/compare/v3.0.5-northbrook...v3.0.6-northbrook) (2016-09-04)


### Bug Fixes

* **northbrook:** fix post-install script ([dff1632](https://github.com/northbrookjs/northbrook/commit/dff1632))



<a name="3.0.5-northbrook"></a>
## [3.0.5-northbrook](https://github.com/northbrookjs/northbrook/compare/v3.0.4-northbrook...v3.0.5-northbrook) (2016-09-04)


### Bug Fixes

* **northbrook:** move postinstall script to plain es5 ([a9f4dba](https://github.com/northbrookjs/northbrook/commit/a9f4dba))
* **northbrook:** only run post-install script on postinstall when not on travis-ci ([06f41d7](https://github.com/northbrookjs/northbrook/commit/06f41d7))
* **northbrook:** remove export statement ([e62e207](https://github.com/northbrookjs/northbrook/commit/e62e207))



<a name="3.0.4-northbrook"></a>
## [3.0.4-northbrook](https://github.com/northbrookjs/northbrook/compare/v3.0.3-northbrook...v3.0.4-northbrook) (2016-09-04)


### Bug Fixes

* **northbrook:** run fixpack on package.json ([a859d6a](https://github.com/northbrookjs/northbrook/commit/a859d6a))



<a name="3.0.3-northbrook"></a>
## [3.0.3-northbrook](https://github.com/northbrookjs/northbrook/compare/v3.0.2-northbrook...v3.0.3-northbrook) (2016-09-04)


### Bug Fixes

* **northbrook:** json-beautify is a dep not devdep ([b7ddc50](https://github.com/northbrookjs/northbrook/commit/b7ddc50))



<a name="3.0.2-northbrook"></a>
## [3.0.2-northbrook](https://github.com/northbrookjs/northbrook/compare/v3.0.1-northbrook...v3.0.2-northbrook) (2016-09-04)


### Bug Fixes

* **northbrook:** move .babelrc to test folder as it's the only place needed ([8c10c56](https://github.com/northbrookjs/northbrook/commit/8c10c56))



<a name="3.0.1-northbrook"></a>
## [3.0.1-northbrook](https://github.com/northbrookjs/northbrook/compare/v3.0.0-northbrook...v3.0.1-northbrook) (2016-09-03)


### Bug Fixes

* **northbrook:** ensure buba is installed for build step in postinstall ([2577ac3](https://github.com/northbrookjs/northbrook/commit/2577ac3))



<a name="3.0.0-northbrook"></a>
# [3.0.0-northbrook](https://github.com/northbrookjs/northbrook/compare/v2.5.0-northbrook...v3.0.0-northbrook) (2016-09-03)


### Features

* **northbrook:** add utility functions to modify configuration files ([5f51da3](https://github.com/northbrookjs/northbrook/commit/5f51da3))
* **northbrook:** remove \\`nb init\\` in favor of post-install script ([6f922d3](https://github.com/northbrookjs/northbrook/commit/6f922d3))


### BREAKING CHANGES

* northbrook: removes \\`nortbrook init\\`



<a name="2.5.0-northbrook"></a>
# [2.5.0-northbrook](https://github.com/northbrookjs/northbrook/compare/v2.4.0-northbrook...v2.5.0-northbrook) (2016-09-02)


### Bug Fixes

* **northbrook:** actually fix commit message errors [skip ci] ([3107368](https://github.com/northbrookjs/northbrook/commit/3107368))
* **northbrook:** fix invalid commit message errors with validate-commit-msg ([5f1153b](https://github.com/northbrookjs/northbrook/commit/5f1153b))
* **northbrook:** fix login input ([95bf9b8](https://github.com/northbrookjs/northbrook/commit/95bf9b8))
* **northbrook:** improve output of release commands ([3c589da](https://github.com/northbrookjs/northbrook/commit/3c589da))
* **northbrook:** should always create a git tag ([c769381](https://github.com/northbrookjs/northbrook/commit/c769381))
* **northbrook:** use correct execute command ([1b0adb7](https://github.com/northbrookjs/northbrook/commit/1b0adb7))


### Features

* **northbrook:** add option to skip git commands ([2752de2](https://github.com/northbrookjs/northbrook/commit/2752de2))
* **northbrook:** refactor util into smaller files and export from external api ([c985035](https://github.com/northbrookjs/northbrook/commit/c985035))



<a name="2.4.0-northbrook"></a>
# [2.4.0-northbrook](https://github.com/northbrookjs/northbrook/compare/v2.3.0-northbrook...v2.4.0-northbrook) (2016-08-31)


### Bug Fixes

* **northbrook:** adjust templates to new information ([31e8f6d](https://github.com/northbrookjs/northbrook/commit/31e8f6d))
* **northbrook:** allow executing commmands that require input ([fad0c87](https://github.com/northbrookjs/northbrook/commit/fad0c87))
* **northbrook:** always assign packages ([c26d42e](https://github.com/northbrookjs/northbrook/commit/c26d42e))
* **northbrook:** build lib to run tests ([873e5f0](https://github.com/northbrookjs/northbrook/commit/873e5f0))
* **northbrook:** fix styling of separator output ([d4b66f4](https://github.com/northbrookjs/northbrook/commit/d4b66f4))
* **northbrook:** git will usually log to stdout ([0aff15e](https://github.com/northbrookjs/northbrook/commit/0aff15e))
* **northbrook:** only show new stuff in check mode ([bd23089](https://github.com/northbrookjs/northbrook/commit/bd23089))
* **northbrook:** provide backwards compatible exec method ([e33ae9f](https://github.com/northbrookjs/northbrook/commit/e33ae9f))
* **northbrook:** share the stdin/stdout in exec ([909df8c](https://github.com/northbrookjs/northbrook/commit/909df8c))
* **northbrook:** should not show loader during interactive prompts ([3f25afe](https://github.com/northbrookjs/northbrook/commit/3f25afe))
* **northbrook:** use backwards compatible exec method ([951e3a2](https://github.com/northbrookjs/northbrook/commit/951e3a2))
* **northbrook:** use new exec command correctly ([ee73508](https://github.com/northbrookjs/northbrook/commit/ee73508))
* **northbrook:** use working directory when no packages are defined ([49d43e0](https://github.com/northbrookjs/northbrook/commit/49d43e0))


### Features

* **northbrook:** add --skip-login option ([cd36e37](https://github.com/northbrookjs/northbrook/commit/cd36e37))
* **northbrook:** add colors to separator ([19527c6](https://github.com/northbrookjs/northbrook/commit/19527c6))
* **northbrook:** add core command run ([af51271](https://github.com/northbrookjs/northbrook/commit/af51271))
* **northbrook:** add run to default plugins ([2b92cee](https://github.com/northbrookjs/northbrook/commit/2b92cee))
* **northbrook:** colorize release output ([9f47894](https://github.com/northbrookjs/northbrook/commit/9f47894))
* **northbrook:** print changelog in check mode [skip ci] ([b0efa08](https://github.com/northbrookjs/northbrook/commit/b0efa08))



<a name="2.3.0-northbrook"></a>
# [2.3.0-northbrook](https://github.com/northbrookjs/northbrook/compare/v2.2.7-northbrook...v2.3.0-northbrook) (2016-08-31)


### Features

* **northbrook:** add the ability to extend configurations ([e328c63](https://github.com/northbrookjs/northbrook/commit/e328c63))



<a name="2.2.7-northbrook"></a>
## [2.2.7-northbrook](https://github.com/northbrookjs/northbrook/compare/v2.2.6-northbrook...v2.2.7-northbrook) (2016-08-26)


### Bug Fixes

* **northbrook:** fix commit tests ([8faff27](https://github.com/northbrookjs/northbrook/commit/8faff27))



<a name="2.2.6-northbrook"></a>
## [2.2.6-northbrook](https://github.com/northbrookjs/northbrook/compare/v2.2.5-northbrook...v2.2.6-northbrook) (2016-08-26)


### Bug Fixes

* **northbrook:** use [@northbrook](https://github.com/northbrook)/commit-types ([6120e61](https://github.com/northbrookjs/northbrook/commit/6120e61))



<a name="2.2.5-northbrook"></a>
## [2.2.5-northbrook](https://github.com/northbrookjs/northbrook/compare/v2.2.4-northbrook...v2.2.5-northbrook) (2016-08-26)


### Bug Fixes

* **northbrook:** switch to using [@northbrook](https://github.com/northbrook)/commit-types ([c9e9fd4](https://github.com/northbrookjs/northbrook/commit/c9e9fd4))



<a name="2.2.4-northbrook"></a>
## [2.2.4-northbrook](https://github.com/northbrookjs/northbrook/compare/v2.2.3-northbrook...v2.2.4-northbrook) (2016-08-26)


### Bug Fixes

* **northbrook:** fix deployment script ([6d79527](https://github.com/northbrookjs/northbrook/commit/6d79527))
* **northbrook:** single quotes are not supported by bash ([90d32ea](https://github.com/northbrookjs/northbrook/commit/90d32ea))



<a name="2.2.3-northbrook"></a>
## [2.2.3-northbrook](https://github.com/northbrookjs/northbrook/compare/v2.2.2-northbrook...v2.2.3-northbrook) (2016-08-25)


### Bug Fixes

* **northbrook:** github hostname for origin typo fix ([#30](https://github.com/northbrookjs/northbrook/issues/30)) ([976153e](https://github.com/northbrookjs/northbrook/commit/976153e))



<a name="2.2.2-northbrook"></a>
## [2.2.2-northbrook](https://github.com/northbrookjs/northbrook/compare/v2.2.1-northbrook...v2.2.2-northbrook) (2016-08-25)


### Bug Fixes

* **northbrook:** remove unneeded console.log ([0cf0a18](https://github.com/northbrookjs/northbrook/commit/0cf0a18))



<a name="2.2.1-northbrook"></a>
## [2.2.1-northbrook](https://github.com/northbrookjs/northbrook/compare/v2.2.0-northbrook...v2.2.1-northbrook) (2016-08-25)


### Bug Fixes

* **northbrook:** move deploy script to user travis ci env vars ([2932b91](https://github.com/northbrookjs/northbrook/commit/2932b91))



<a name="2.2.0-northbrook"></a>
# [2.2.0-northbrook](https://github.com/northbrookjs/northbrook/compare/v2.1.2-northbrook...v2.2.0-northbrook) (2016-08-25)


### Features

* **northbrook:** add --skip-npm option to release ([ea5008c](https://github.com/northbrookjs/northbrook/commit/ea5008c))



<a name="2.1.2-northbrook"></a>
## [2.1.2-northbrook](https://github.com/northbrookjs/northbrook/compare/v2.1.1-northbrook...v2.1.2-northbrook) (2016-08-25)


### Bug Fixes

* **northbrook:** delete unneeded console.log()s ([2adf32d](https://github.com/northbrookjs/northbrook/commit/2adf32d))



<a name="2.1.1-northbrook"></a>
## [2.1.1-northbrook](https://github.com/northbrookjs/northbrook/compare/v2.1.0-northbrook...v2.1.1-northbrook) (2016-08-25)


### Bug Fixes

* **northbrook:** fix commit and release for scoped packages ([3f86390](https://github.com/northbrookjs/northbrook/commit/3f86390))



<a name="2.1.0-northbrook"></a>
# [2.1.0-northbrook](https://github.com/northbrookjs/northbrook/compare/v2.0.20...v2.1.0-northbrook) (2016-08-25)


### Bug Fixes

* **northbrook:** ensure releases happen in proper directory and are synchronous ([10fb42d](https://github.com/northbrookjs/northbrook/commit/10fb42d))


### Features

* **northbrook:** make yes the default for confirming commits ([f45db15](https://github.com/northbrookjs/northbrook/commit/f45db15))
* **northbrook:** resolve [@northbrook](https://github.com/northbrook) scoped plugins ([fb1b36f](https://github.com/northbrookjs/northbrook/commit/fb1b36f))



<a name="2.0.20"></a>
## [2.0.20](https://github.com/northbrookjs/northbrook/compare/v2.0.19...v2.0.20) (2016-08-25)


### Bug Fixes

* **northbrook:** fix commit msgs for monorepos ([e3f4475](https://github.com/northbrookjs/northbrook/commit/e3f4475))



<a name="2.0.19"></a>
## [2.0.19](https://github.com/northbrookjs/northbrook/compare/v2.0.18...v2.0.19) (2016-08-24)


### Bug Fixes

* **northbrook:** fix github tags for monorepos ([#24](https://github.com/northbrookjs/northbrook/issues/24)) ([40d7c37](https://github.com/northbrookjs/northbrook/commit/40d7c37))



<a name="2.0.18"></a>
## [2.0.18](https://github.com/northbrookjs/northbrook/compare/v2.0.17...v2.0.18) (2016-08-24)


### Bug Fixes

* **northbrook:** add [skip ci] to all commits ([781a745](https://github.com/northbrookjs/northbrook/commit/781a745))
* **northbrook:** fix process.stdout errors ([857e445](https://github.com/northbrookjs/northbrook/commit/857e445))



<a name="2.0.17"></a>
## [2.0.17](https://github.com/northbrookjs/northbrook/compare/v2.0.16...v2.0.17) (2016-08-24)


### Bug Fixes

* **northbrook:** execute commands inside of package directory ([#23](https://github.com/northbrookjs/northbrook/issues/23)) ([31f0c8e](https://github.com/northbrookjs/northbrook/commit/31f0c8e))



<a name="2.0.16"></a>
## [2.0.16](https://github.com/northbrookjs/northbrook/compare/v2.0.15...v2.0.16) (2016-08-24)


### Bug Fixes

* **northbrook:** fix publishing to npm ([b20b7d7](https://github.com/northbrookjs/northbrook/commit/b20b7d7))
* **northbrook:** fix publishing to npm ([9dbb34c](https://github.com/northbrookjs/northbrook/commit/9dbb34c))
* **northbrook:** fix publishing to npm ([a6a33c3](https://github.com/northbrookjs/northbrook/commit/a6a33c3))
* **northbrook:** publishing failed ([462840e](https://github.com/northbrookjs/northbrook/commit/462840e))



<a name="2.0.15"></a>
## [2.0.15](https://github.com/northbrookjs/northbrook/compare/v2.0.14...v2.0.15) (2016-08-24)


### Bug Fixes

* **northbrook:** turn back on auto-deployment ([379a738](https://github.com/northbrookjs/northbrook/commit/379a738))



<a name="2.0.14"></a>
## [2.0.14](https://github.com/northbrookjs/northbrook/compare/v2.0.13...v2.0.14) (2016-08-24)


### Bug Fixes

* **northbrook:** resolve promise when changelog is finished writing ([6a99747](https://github.com/northbrookjs/northbrook/commit/6a99747))



<a name="2.0.13"></a>
## [2.0.13](https://github.com/northbrookjs/northbrook/compare/v2.0.12...v2.0.13) (2016-08-24)


### Bug Fixes

* **northbrook:** end write stream after generation ([4e43990](https://github.com/northbrookjs/northbrook/commit/4e43990))



<a name="2.0.12"></a>
## [2.0.12](https://github.com/northbrookjs/northbrook/compare/v2.0.11...v2.0.12) (2016-08-24)


### Bug Fixes

* **northbrook:** add space between generated output ([b09fbe4](https://github.com/northbrookjs/northbrook/commit/b09fbe4))
* **northbrook:** better styling for output ([b9ce198](https://github.com/northbrookjs/northbrook/commit/b9ce198))
* **northbrook:** changelog options did not have all information it needed at creation ([dc02141](https://github.com/northbrookjs/northbrook/commit/dc02141))
* **northbrook:** create write stream on generation ([849eec4](https://github.com/northbrookjs/northbrook/commit/849eec4))
* **northbrook:** dont create file stream before checking directory ([185f396](https://github.com/northbrookjs/northbrook/commit/185f396))
* **northbrook:** fix type in commit output ([43c2773](https://github.com/northbrookjs/northbrook/commit/43c2773))
* **northbrook:** publish seems to hang even when run successfully ([dc875eb](https://github.com/northbrookjs/northbrook/commit/dc875eb))
* **northbrook:** write to stdout when in check mode ([d93978e](https://github.com/northbrookjs/northbrook/commit/d93978e))



<a name="2.0.11"></a>
## [2.0.11](https://github.com/northbrookjs/northbrook/compare/v2.0.10...v2.0.11) (2016-08-24)


### Bug Fixes

* **northbrook:** improve output to user ([d6a1ad5](https://github.com/northbrookjs/northbrook/commit/d6a1ad5))



<a name="2.0.10"></a>
## [2.0.10](https://github.com/northbrookjs/northbrook/compare/v2.0.9...v2.0.10) (2016-08-24)


### Bug Fixes

* **northbrook:** continue instead of return since using for-loop directly ([d61edfe](https://github.com/northbrookjs/northbrook/commit/d61edfe))
* **northbrook:** do not publish unless EVERYTHING else has gone perfectly ([209f374](https://github.com/northbrookjs/northbrook/commit/209f374))
* **northbrook:** go through commits in reverse ([1a6227c](https://github.com/northbrookjs/northbrook/commit/1a6227c))
* **northbrook:** log error if it occurs ([8372574](https://github.com/northbrookjs/northbrook/commit/8372574))
* **northbrook:** wrap generateChangelog in a Promise to ensure it is generated when further commands ([9a9f1e9](https://github.com/northbrookjs/northbrook/commit/9a9f1e9))



<a name="2.0.9"></a>
## [2.0.9](https://github.com/northbrookjs/northbrook/compare/v2.0.8...v2.0.9) (2016-08-24)


### Bug Fixes

* **northbrook:** ensure lib/ is built before publishing to npm ([928a7c7](https://github.com/northbrookjs/northbrook/commit/928a7c7))
* **northbrook:** switch to releaseBranch before doing anything ([0627114](https://github.com/northbrookjs/northbrook/commit/0627114))



<a name="2.0.8"></a>
## [2.0.8](https://github.com/northbrookjs/northbrook/compare/v2.0.7...v2.0.8) (2016-08-24)


### Bug Fixes

* **northbrook:** fix error when no northbrook.json can be found ([f6b0a87](https://github.com/northbrookjs/northbrook/commit/f6b0a87))
* **northbrook:** only generate changelog all is well ([33fd7ef](https://github.com/northbrookjs/northbrook/commit/33fd7ef))
* **northbrook:** use getConfig exported from public api ([853869b](https://github.com/northbrookjs/northbrook/commit/853869b))



<a name="2.0.7"></a>
## [2.0.7](https://github.com/northbrookjs/northbrook/compare/v2.0.6...v2.0.7) (2016-08-23)


### Bug Fixes

* **northbrook:** fix changelog generation ([be9a7d3](https://github.com/northbrookjs/northbrook/commit/be9a7d3))
* **northbrook:** fix git commands ([1a39f84](https://github.com/northbrookjs/northbrook/commit/1a39f84))
* **northbrook:** remove greenkeeper-postpublish ([a586f9f](https://github.com/northbrookjs/northbrook/commit/a586f9f))



<a name="2.0.3"></a>
## [2.0.3](https://github.com/northbrookjs/northbrook/compare/v2.0.1...v2.0.3) (2016-08-23)


### Bug Fixes

* **northbrook:** checkout in deployment ([33f89d0](https://github.com/northbrookjs/northbrook/commit/33f89d0))
* **northbrook:** do not use execute helper ([4eacbec](https://github.com/northbrookjs/northbrook/commit/4eacbec))
* **northbrook:** don't run in check mode if directory is unclean ([9e60b67](https://github.com/northbrookjs/northbrook/commit/9e60b67))
* **northbrook:** fix deploy script ([6256832](https://github.com/northbrookjs/northbrook/commit/6256832))
* **northbrook:** fix execution order ([762d1fa](https://github.com/northbrookjs/northbrook/commit/762d1fa))
* **northbrook:** fix for deployment ([20f4820](https://github.com/northbrookjs/northbrook/commit/20f4820))



<a name="2.0.1"></a>
## [2.0.1](https://github.com/northbrookjs/northbrook/compare/v1.2.0...v2.0.1) (2016-08-23)


### Bug Fixes

* **northbrook:** fix commiting new changelog ([ac97868](https://github.com/northbrookjs/northbrook/commit/ac97868))
* **northbrook:** fix deployment script typo ([a2bbfb3](https://github.com/northbrookjs/northbrook/commit/a2bbfb3))
* **northbrook:** fix release issues ([#14](https://github.com/northbrookjs/northbrook/issues/14)) ([de987ed](https://github.com/northbrookjs/northbrook/commit/de987ed))


### Features

* **northbrook:** Rewrite to be unit testable ([#12](https://github.com/northbrookjs/northbrook/issues/12)) ([9a6b10e](https://github.com/northbrookjs/northbrook/commit/9a6b10e))


### BREAKING CHANGES

* northbrook: Removes \\`version\\` from northbrook.json

ISSUES CLOSED: #8 #10

* chore(northbrook): remove version from northbrook.json

* chore(northbrook): fix dependencies to match v2.0.0

* chore(northbrook): add conventional-commit-type to dependencies

* chore(northbrook): mv commit-types to dependencies

Place commit types in proper location

* chore(northbrook): attempt to configure auto-deployment when pushed to master



<a name="1.2.0"></a>
# [1.2.0](https://github.com/northbrookjs/northbrook/compare/v1.1.2...v1.2.0) (2016-08-20)


### Features

* **northbrook:** remove changelog generation ([3f0bf3a](https://github.com/northbrookjs/northbrook/commit/3f0bf3a))



<a name="1.1.2"></a>
## [1.1.2](https://github.com/northbrookjs/northbrook/compare/v1.1.1...v1.1.2) (2016-08-20)


### Bug Fixes

* **northbrook:** fix changelog generation ([7f39768](https://github.com/northbrookjs/northbrook/commit/7f39768))



<a name="1.1.1"></a>
## [1.1.1](https://github.com/northbrookjs/northbrook/compare/v1.1.0...v1.1.1) (2016-08-20)


### Bug Fixes

* **northbrook:** fix error when config is not defined yet ([e3c1370](https://github.com/northbrookjs/northbrook/commit/e3c1370))
* **northbrook:** fix order of release tasks ([2629850](https://github.com/northbrookjs/northbrook/commit/2629850))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/northbrookjs/northbrook/compare/v1.0.5...v1.1.0) (2016-08-20)


### Features

* **northbrook:** allow glob matching packages, and not prefixing with 'northbrook' for plugins ([a8315c2](https://github.com/northbrookjs/northbrook/commit/a8315c2))



<a name="1.0.5"></a>
## [1.0.5](https://github.com/northbrookjs/northbrook/compare/v1.0.4...v1.0.5) (2016-08-20)


### Bug Fixes

* **northbrook:** better plugin resolution ([52a580a](https://github.com/northbrookjs/northbrook/commit/52a580a))



<a name="1.0.4"></a>
## [1.0.4](https://github.com/northbrookjs/northbrook/compare/v1.0.3...v1.0.4) (2016-08-20)


### Bug Fixes

* **northbrook:** improve plugin resolution and make releasing safer ([ce9af28](https://github.com/northbrookjs/northbrook/commit/ce9af28))



<a name="1.0.3"></a>
## [1.0.3](https://github.com/northbrookjs/northbrook/compare/v1.0.0...v1.0.3) (2016-08-19)


### Bug Fixes

* **northbrook:** fix incorrect wording ([6ec2b95](https://github.com/northbrookjs/northbrook/commit/6ec2b95))
* **northbrook:** fix resolving of local plugins ([5b00aa9](https://github.com/northbrookjs/northbrook/commit/5b00aa9))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/northbrookjs/northbrook/compare/v0.0.2...v1.0.0) (2016-08-19)


### Bug Fixes

* **release:** fix some edge cases around releasing ([f384d1c](https://github.com/northbrookjs/northbrook/commit/f384d1c))



<a name="0.0.2"></a>
## [0.0.2](https://github.com/northbrookjs/northbrook/compare/v0.0.1...v0.0.2) (2016-08-19)


### Bug Fixes

* **init:** add empty .npmignore ([4a311d7](https://github.com/northbrookjs/northbrook/commit/4a311d7))



<a name="0.0.1"></a>
## 0.0.1 (2016-08-19)



