const { join } = require('path')
const { isInitialized, exec } = require('../../util')

const { generateChangelogs } = require('./changelogs')
const { checkRelease } = require('./check-release')
const { performRelease } = require('./release')

exports.plugin = release

function release (program, config, workingDir) {
  program
    .command('release')
    .description('Publishes updates; Append to Changelogs')
    .action(() => releaseLikeABoss(config, workingDir))
}

function releaseLikeABoss (config, workingDir) {
  isInitialized(config)

  checkRelease(config.packages.map(fixDefault(workingDir)), function (status) {
    if (!status) return

    const packages = Object.keys(status).map(fixDefault(workingDir))
    const releasedPackages = packages.map(function (packageName) {
      const { increment } = status[packageName]
      if (increment === 0) return null

      return performRelease(workingDir, packageName, increment)
    }).filter(Boolean)

    releasedPackages.forEach(function (packageName) {
      generateChangelogs([packageName], workingDir, function () {
        const add = `git add ${packageName}/CHANGELOG.md`

        exec(add, { silent: true }, function () {
          console.log(`${packageName} successfully released.`)
        })
      })
    })
  })
}

const fixDefault = workingDir => name =>
  name === '.' ? require(join(workingDir, name, 'package.json')).name : name
