# v3.0.2 (2016-09-04)
---


## Bug Fixes

- fix(northbrook): move .babelrc to test folder as it's the only place needed [8c10c56e](https://github.com/northbrookjs/northbrook/commits/8c10c56e70361c95b0acb43baa5e4f0ee24b24c8)


# v3.0.1 (2016-09-03)
---


## Bug Fixes

- fix(northbrook): ensure buba is installed for build step in postinstall [2577ac32](https://github.com/northbrookjs/northbrook/commits/2577ac32c1c66f0e9b54e492258bf9d31c809212)


# v3.0.0 (2016-09-03)
---


## Breaking Changes

- feat(northbrook): remove \\`nb init\\` in favor of post-install script [6f922d3e](https://github.com/northbrookjs/northbrook/commits/6f922d3e102b743902791001e1e190ba9247c5f4)

## Features

- feat(northbrook): add utility functions to modify configuration files [5f51da37](https://github.com/northbrookjs/northbrook/commits/5f51da37e76a4e3e932ac031129b839f36b2ac9c)


# v2.5.0 (2016-09-02)
---


## Features

- feat(northbrook): add option to skip git commands [2752de2e](https://github.com/northbrookjs/northbrook/commits/2752de2ea5265aff944bbe4092b5a1cfc96045c9)
- feat(northbrook): refactor util into smaller files and export from external api [c9850351](https://github.com/northbrookjs/northbrook/commits/c985035136cb44f8e74fc86be7fe1b838ab1a657)

## Bug Fixes

- fix(northbrook): fix invalid commit message errors with validate-commit-msg [5f1153b6](https://github.com/northbrookjs/northbrook/commits/5f1153b63bf42172b5035d1549a4dd288292c408)
- fix(northbrook): actually fix commit message errors [skip ci] [31073682](https://github.com/northbrookjs/northbrook/commits/3107368246a7c3eb9c3dc3abca7f7e1310ffaf27)
- fix(northbrook): fix login input [95bf9b8e](https://github.com/northbrookjs/northbrook/commits/95bf9b8e87a9a46a01bbc1383a9e26de04737ee8)
- fix(northbrook): should always create a git tag [c7693813](https://github.com/northbrookjs/northbrook/commits/c7693813478fd7a2121762b1e544824d7a3176ff)
- fix(northbrook): use correct execute command [1b0adb72](https://github.com/northbrookjs/northbrook/commits/1b0adb722f4e6f02fe5bc5032400ce20aa074953)
- fix(northbrook): improve output of release commands [3c589daa](https://github.com/northbrookjs/northbrook/commits/3c589daabbbc2d5ec13b2c25a7d8cb9805d9d7dd)


# v2.4.0 (2016-08-31)
---


## Features

- feat(northbrook): add colors to separator [19527c68](https://github.com/northbrookjs/northbrook/commits/19527c68e5cb47ed9d1cd970a55801bf80022bbb)
- feat(northbrook): colorize release output [9f478947](https://github.com/northbrookjs/northbrook/commits/9f4789479ab089468dc4250d5e17b4f955af8f13)
- feat(northbrook): add core command run [af512714](https://github.com/northbrookjs/northbrook/commits/af51271458e1f8c214ea21c309b88c9b954f2483)
- feat(northbrook): add run to default plugins [2b92cee3](https://github.com/northbrookjs/northbrook/commits/2b92cee3695a5c131972b82afec2a2ca69ba2376)
- feat(northbrook): print changelog in check mode [skip ci] [b0efa08d](https://github.com/northbrookjs/northbrook/commits/b0efa08da055e28d7836507366a32226518877c1)
- feat(northbrook): add --skip-login option [cd36e378](https://github.com/northbrookjs/northbrook/commits/cd36e37878bdcd1089523c5bdda6a2f29ecb2d3c)

## Bug Fixes

- fix(northbrook): git will usually log to stdout [0aff15e5](https://github.com/northbrookjs/northbrook/commits/0aff15e5a303f0df24720ff98fe91fa0904d2497)
- fix(northbrook): adjust templates to new information [31e8f6de](https://github.com/northbrookjs/northbrook/commits/31e8f6de155d604152bc2bce881e793b3bd06c8c)
- fix(northbrook): use working directory when no packages are defined [49d43e05](https://github.com/northbrookjs/northbrook/commits/49d43e05b682b807ebb0e5c97de2e243b1e5144e)
- fix(northbrook): always assign packages [c26d42ec](https://github.com/northbrookjs/northbrook/commits/c26d42ecf746b9d301e47aeea7ca0faf9cfd01ab)
- fix(northbrook): only show new stuff in check mode [bd23089f](https://github.com/northbrookjs/northbrook/commits/bd23089fca6422c61bbe6d617125fc995cea0ccf)
- fix(northbrook): fix styling of separator output [d4b66f4f](https://github.com/northbrookjs/northbrook/commits/d4b66f4f8ff5509f99385bbc8a9809e4b2375ee6)
- fix(northbrook): provide backwards compatible exec method [e33ae9f0](https://github.com/northbrookjs/northbrook/commits/e33ae9f0f0cdda4aff07655fab87eeed53b922e0)
- fix(northbrook): use backwards compatible exec method [951e3a27](https://github.com/northbrookjs/northbrook/commits/951e3a2707b2f2aeb8293c286849db8d7a54ae50)
- fix(northbrook): share the stdin/stdout in exec [909df8cd](https://github.com/northbrookjs/northbrook/commits/909df8cdcbec0e414a2c5f46912a41f9fe74c3f9)
- fix(northbrook): allow executing commmands that require input [fad0c873](https://github.com/northbrookjs/northbrook/commits/fad0c87341d86baa85b77886f4195d2485b1590c)
- fix(northbrook): should not show loader during interactive prompts [3f25afe3](https://github.com/northbrookjs/northbrook/commits/3f25afe32e10f0a4f2e75a004433563218bd2bc2)
- fix(northbrook): build lib to run tests [873e5f02](https://github.com/northbrookjs/northbrook/commits/873e5f0276282f254d7adecf8baa2dfedb85d89e)
- fix(northbrook): use new exec command correctly [ee735086](https://github.com/northbrookjs/northbrook/commits/ee735086c7896982fd9e88af54854a32819d6812)


# v2.3.0 (2016-08-31)
---


## Features

- feat(northbrook): add the ability to extend configurations [e328c636](https://github.com/northbrookjs/northbrook/commits/e328c636c706909d9ee2eafe56c751e776fdbee6)


# v2.2.7 (2016-08-26)
---


## Bug Fixes

- fix(northbrook): fix commit tests [8faff272](https://github.com/northbrookjs/northbrook/commits/8faff27260bf8976a0308dcf043b7011a480a9a3)


# v2.2.6 (2016-08-26)
---


## Bug Fixes

- fix(northbrook): use @northbrook/commit-types [6120e61e](https://github.com/northbrookjs/northbrook/commits/6120e61e90b754e09f0a165298e62129b25e51d0)


# v2.2.5 (2016-08-26)
---


## Bug Fixes

- fix(northbrook): switch to using @northbrook/commit-types [c9e9fd4a](https://github.com/northbrookjs/northbrook/commits/c9e9fd4abde3a89e6afec06ec555a467b1f188ec)


# v2.2.4 (2016-08-26)
---


## Bug Fixes

- fix(northbrook): fix deployment script [6d795277](https://github.com/northbrookjs/northbrook/commits/6d7952778d212cbc40c760be320973a23ab4b571)
- fix(northbrook): single quotes are not supported by bash [90d32eab](https://github.com/northbrookjs/northbrook/commits/90d32eab6e2ba22bb74e7b4324b30843c155ad48)


# v2.2.3 (2016-08-25)
---


## Bug Fixes

- fix(northbrook): github hostname for origin typo fix (#30) [976153ea](https://github.com/northbrookjs/northbrook/commits/976153ea1ecc022a726577cbc337dfa68a8ed325)


# v2.2.2 (2016-08-25)
---


## Bug Fixes

- fix(northbrook): remove unneeded console.log [0cf0a188](https://github.com/northbrookjs/northbrook/commits/0cf0a1885d72b21b81cc5b1338902e149c750364)


# v2.2.1 (2016-08-25)
---


## Bug Fixes

- fix(northbrook): move deploy script to user travis ci env vars [2932b913](https://github.com/northbrookjs/northbrook/commits/2932b9135482acd978e5b7bfd69c90e57064ea65)


# v2.2.0 (2016-08-25)
---


## Features

- feat(northbrook): add --skip-npm option to release [ea5008c3](https://github.com/northbrookjs/northbrook/commits/ea5008c3747caa33fe2173d3ad4a7a912ebf993a)


# v2.1.2 (2016-08-25)
---


## Bug Fixes

- fix(northbrook): delete unneeded console.log()s [2adf32dc](https://github.com/northbrookjs/northbrook/commits/2adf32dcd271a37fb4ce18e9c9316d752eea2a35)


# v2.1.1 (2016-08-25)
---


## Bug Fixes

- fix(northbrook): fix commit and release for scoped packages [3f863905](https://github.com/northbrookjs/northbrook/commits/3f863905c34586849beb5fffa722e72867df933d)


# v2.1.0 (2016-08-25)
---


## Features

- feat(northbrook): make yes the default for confirming commits [f45db15c](https://github.com/northbrookjs/northbrook/commits/f45db15cd96216cb9282ab45c7beeea6c1a04ddd)
- feat(northbrook): resolve @northbrook scoped plugins [fb1b36ff](https://github.com/northbrookjs/northbrook/commits/fb1b36ffc68c16ff6f3eaa2b4655bd2c1e58ec9f)

## Bug Fixes

- fix(northbrook): ensure releases happen in proper directory and are synchronous [10fb42d1](https://github.com/northbrookjs/northbrook/commits/10fb42d1e387496f970df25a3810624ccb6c92ff)


# v2.0.20 (2016-08-25)
---


## Bug Fixes

- fix(northbrook): fix commit msgs for monorepos [e3f44754](https://github.com/northbrookjs/northbrook/commits/e3f44754db868c4b1e9d0d807c28ae27314e97d0)


# v2.0.19 (2016-08-24)
---


## Bug Fixes

- fix(northbrook): fix github tags for monorepos (#24) [40d7c37e](https://github.com/northbrookjs/northbrook/commits/40d7c37e58ccf8481fcd916883582a39b7498a88)


# v2.0.18 (2016-08-24)
---


## Bug Fixes

- fix(northbrook): fix process.stdout errors [857e445d](https://github.com/northbrookjs/northbrook/commits/857e445d9470300d1f45fe0882a5a9f6d7f339f5)
- fix(northbrook): add [skip ci] to all commits [781a7453](https://github.com/northbrookjs/northbrook/commits/781a7453534b59382db5483d7788d8e90f52279e)


# v2.0.17 (2016-08-24)
---


## Bug Fixes

- fix(northbrook): execute commands inside of package directory (#23) [31f0c8e2](https://github.com/northbrookjs/northbrook/commits/31f0c8e2d77b9ddbef10347dc1a112a06e2be529)


# v2.0.16 (2016-08-24)
---


## Bug Fixes

- fix(northbrook): fix publishing to npm [b20b7d7b](https://github.com/northbrookjs/northbrook/commits/b20b7d7bc9f4eee934a7a128a856ee2b364e02fe)
- fix(northbrook): publishing failed [462840ef](https://github.com/northbrookjs/northbrook/commits/462840efb05ace085b26533af8874919d8ff23a6)


# v2.0.15 (2016-08-24)
---


## Bug Fixes

- fix(northbrook): turn back on auto-deployment [379a738a](https://github.com/northbrookjs/northbrook/commits/379a738ac46eb2d3dc71b7f88f1ad1c9d8d80228)


# v2.0.14 (2016-08-24)
---


## Bug Fixes

- fix(northbrook): resolve promise when changelog is finished writing [6a99747f](https://github.com/northbrookjs/northbrook/commits/6a99747f9ec16326506a0f58e98c2f90e2b9528b)


# v2.0.13 (2016-08-24)
---


## Bug Fixes

- fix(northbrook): end write stream after generation [4e439907](https://github.com/northbrookjs/northbrook/commits/4e439907013ff5222f445a36126b1d8e510ec03c)


# v2.0.12 (2016-08-24)
---


## Bug Fixes

- fix(northbrook): publish seems to hang even when run successfully [dc875eb1](https://github.com/northbrookjs/northbrook/commits/dc875eb10ca0dee65183b1e29060040a4b72d64d)
- fix(northbrook): changelog options did not have all information it needed at creation [dc021411](https://github.com/northbrookjs/northbrook/commits/dc021411d370e4438e3d95e82788772e960ebf1a)
- fix(northbrook): fix type in commit output [43c27735](https://github.com/northbrookjs/northbrook/commits/43c27735ed1ae3285c103f5543983c03925297fc)
- fix(northbrook): better styling for output [b9ce1986](https://github.com/northbrookjs/northbrook/commits/b9ce1986e3365da64f020737997cd36322627ca3)
- fix(northbrook): write to stdout when in check mode [d93978e4](https://github.com/northbrookjs/northbrook/commits/d93978e48fe217639cb12d433a1fe2beac5dad46)
- fix(northbrook): add space between generated output [b09fbe4a](https://github.com/northbrookjs/northbrook/commits/b09fbe4a08b194c4c551b990ae367f70242b854e)
- fix(northbrook): dont create file stream before checking directory [185f396b](https://github.com/northbrookjs/northbrook/commits/185f396b6552f0aa017112d4a1dd928eb3a07f41)
- fix(northbrook): create write stream on generation [849eec4e](https://github.com/northbrookjs/northbrook/commits/849eec4e2232744e32fff10ce9b512cfbb343047)


# v2.0.11 (2016-08-24)
---


## Bug Fixes

- fix(northbrook): improve output to user [d6a1ad57](https://github.com/northbrookjs/northbrook/commits/d6a1ad57bad937e3b726709a3a3caf012a0464e3)


# v2.0.10 (2016-08-24)
---


## Bug Fixes

- fix(northbrook): wrap generateChangelog in a Promise to ensure it is generated when further commands [9a9f1e9c](https://github.com/northbrookjs/northbrook/commits/9a9f1e9c003d9c19678b9ecac0bd564f5470f5e7)
- fix(northbrook): log error if it occurs [83725747](https://github.com/northbrookjs/northbrook/commits/83725747655cd7ab4e602f7ab7371d52e9046f5d)
- fix(northbrook): go through commits in reverse [1a6227cf](https://github.com/northbrookjs/northbrook/commits/1a6227cf30f5fcc2c294ffd42b3fb3b0d9b64fed)
- fix(northbrook): do not publish unless EVERYTHING else has gone perfectly [209f3743](https://github.com/northbrookjs/northbrook/commits/209f37435ef4632be77076fffb1eed971befd55c)
- fix(northbrook): continue instead of return since using for-loop directly [d61edfeb](https://github.com/northbrookjs/northbrook/commits/d61edfeb32873075717221c16887eaa62e5371b8)


# v2.0.9 (2016-08-24)
---


## Bug Fixes

- fix(northbrook): ensure lib/ is built before publishing to npm [928a7c70](https://github.com/northbrookjs/northbrook/commits/928a7c705472bb8b7bb4f7e2b6209308bea9ee9f)
- fix(northbrook): switch to releaseBranch before doing anything [0627114a](https://github.com/northbrookjs/northbrook/commits/0627114ab3c9d440d852933a54f63be715dcb748)


# v2.0.8 (2016-08-24)
---


## Bug Fixes

- fix(northbrook): use getConfig exported from public api [853869be](https://github.com/northbrookjs/northbrook/commits/853869bee4ae31abf792838ef545b889abf53a6c)
- fix(northbrook): fix error when no northbrook.json can be found [f6b0a87e](https://github.com/northbrookjs/northbrook/commits/f6b0a87eae916cfe633e552b2efa9bbdafd63472)
- fix(northbrook): only generate changelog all is well [33fd7efb](https://github.com/northbrookjs/northbrook/commits/33fd7efbf2c58adb5aaaf70f316dd0f343118b86)
