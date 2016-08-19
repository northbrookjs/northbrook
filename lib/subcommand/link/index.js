const { join } = require('path')

const mkdirp = require('mkdirp')
const symlinkSync = require('symlink-or-copy').sync

const { isInitialized, isFile, logSeparator } = require('../../util')

exports.plugin = link

function link (program, config, workingDir) {
  program
    .command('link')
    .description('Link managed packages that depend upon each other')
    .action(() => linkLikeABoss(config, workingDir))
}

function linkLikeABoss (config, workingDir) {
  isInitialized(config)

  if (config.packages.length === 0) {
    console.log('No packages are configured!')
    return
  }

  const packages = config.packages.map(getPackage(workingDir)).filter(Boolean)

  const packageNames = packages.map(prop('name'))

  const findPackagesToSymlink = getPackagesToSymlink(packageNames)

  packages.forEach(function (pkg, index) {
    const { name, dependencies = false, devDependencies = false } = pkg

    // exit early if there are not dependencies to analyze
    if (!dependencies && !devDependencies) return

    const packageNamesToSymlink = findPackagesToSymlink(dependencies)
      .concat(findPackagesToSymlink(devDependencies))
      .map(toManagedNames(packageNames, config.packages))

    logSeparator(name)

    if (packageNamesToSymlink.length === 0) {
      console.log(modOutput('no packages to link to'))
      return logSeparator()
    }

    console.log('symlinking packages for ' + name)
    symlink(packageNamesToSymlink, config.packages[index], workingDir)

    logSeparator()
  })
}

function symlink (packagesToSymlink, symlinkToName, workingDir) {
  const nodeDir = join(workingDir, symlinkToName, 'node_modules')

  packagesToSymlink.forEach(function (pkg) {
    const srcDir = join(workingDir, pkg)
    const srcName = require(join(srcDir, 'package.json')).name
    const destinationDir = join(nodeDir, pkg)

    mkdirp(nodeDir, function (err) {
      if (err) throw err

      console.log(modOutput('Symlinking ' + srcName + '...'))

      symlinkSync(srcDir, destinationDir)
    })
  })
}

function modOutput (output) {
  return '    ' + output.replace('\n', '\n    ')
}

function toManagedNames (packageNames, packages) {
  return function (npmName) {
    return packages[packageNames.indexOf(npmName)]
  }
}

const getPackagesToSymlink = packageNames => dependencies =>
  dependencies
  ? Object.keys(dependencies).filter(name => packageNames.indexOf(name) > -1)
  : []

const prop = x => obj => obj[x]

function getPackage (workingDir) {
  return function (packageName) {
    const packagejson = join(workingDir, packageName, 'package.json')

    if (!isFile(packagejson)) {
      return false
    }

    return Object.assign({}, require(packagejson))
  }
}
