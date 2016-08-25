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
