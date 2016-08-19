const { join } = require('path')
const { statSync } = require('fs')

const Khaos = require('khaos')
const prompt = require('prompt-for')

const { exec, logSeparator, clear } = require('../../util')

const version = require(join(__dirname, '../../../package.json')).version

exports.plugin = init

function init (program, config, workingDir) {
  program
    .command('init')
    .alias('i')
    .description('Initialize a new northbrook repository')
    .action((env, options) => initializeRepository(config, workingDir, env, options))
}

function initializeRepository (config, workingDir, env, options) {
  const templateDirectory = join(__dirname, 'template/')
  const destinationDirectory = process.cwd()

  if (isFile(join(destinationDirectory, 'northbrook.json'))) {
    return console.log('This directory is already initialized')
  }

  const khaos = new Khaos(templateDirectory)

  readFiles(khaos, function (files) {
    promptForInformation(function (promptAnswers) {
      const githubRepo = promptAnswers.githubUsername.trim() + '/' + promptAnswers.packageName.trim()
      const answers = Object.assign({}, promptAnswers, {
        githubRepo,
        northbrookVersion: version
      })

      clear()
      writeFiles(khaos, destinationDirectory, files, answers)
        .then(() => extras(answers))
    })
  })
}

function extras ({ githubRepo }) {
  logSeparator()

  const config = { silent: true }

  console.log('Running npm install...')
  exec('npm install', config, () => console.log('Running npm install...'))
    .then(([out]) => console.log(out) ||
      exec('git init', config, () => 'Running git init...')
    )
    .then(([out]) => console.log(out) ||
      exec(`git remote add origin https://github.com/${githubRepo}.git`, config,
        () => console.log('Initializing git remote...'))
    )
    .then(([out]) => console.log(out))
    .catch(([, err]) => console.log(err))
}

function isFile (pathname) {
  try {
    return statSync(pathname).isFile()
  } catch (e) {
    return false
  }
}

function readFiles (khaos, callback) {
  khaos.read(function (err, files) {
    if (err) throw err

    callback(files)
  })
}

const schemaForPrompt =
  {
    'packageName': 'string',
    'description': 'string',
    'authorName': 'string',
    'authorEmail': 'string',
    'githubUsername': 'string'
  }

function promptForInformation (callback) {
  prompt(schemaForPrompt, function (err, answers) {
    if (err) throw err

    callback(answers)
  })
}

function writeFiles (khaos, destination, files, answers) {
  return new Promise(function (resolve, reject) {
    khaos.write(destination, files, answers, function (err) {
      if (err) reject(err)
      resolve()
    })
  })
}
