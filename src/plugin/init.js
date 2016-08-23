import { join } from 'path'

import Khaos from 'khaos'
import inquirer from 'inquirer'
import { start, stop, change_sequence as changeSeq } from 'simple-spinner'

const version = require(join(__dirname, '../../package.json')).version
const templateDirectory = join(__dirname, '../../template/init')
const destinationDirectory = process.cwd()

import { isFile, separator, log, exec, clear } from '../util'

changeSeq(['    ', '.   ', '..  ', '... ', '....', ' ...', '  ..', '   .'])

export const plugin = function init (program, config, workingDir) {
  program.command('init')
    .description('Initialize a northbrook directory')
    .action(() => action(config, workingDir))
}

export function action (config, workingdir) {
  if (isFile(join(destinationDirectory, 'northbrook.json'))) {
    return console.log('This directory is already initialized')
  }

  const khaos = new Khaos(templateDirectory)

  readFiles(khaos).then(function (files) {
    return promptForInformation().then(function (promptAnswers) {
      const githubRepo = promptAnswers.githubUsername.trim() + '/' + promptAnswers.packageName.trim()
      const answers = Object.assign({}, promptAnswers, {
        githubRepo,
        northbrookVersion: version
      })

      return writeFiles(khaos, destinationDirectory, files, answers)
    })
    .then(extras)
  })
}

function readFiles (khaos) {
  return new Promise((resolve, reject) => {
    khaos.read(function (err, files) {
      if (err) reject(err)

      resolve(files)
    })
  })
}

function promptForInformation () {
  const questions = [
    {
      type: 'input',
      name: 'packageName',
      message: 'Please Enter Package Name:\n    >'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Please Enter Package Description:\n    >'
    },
    {
      type: 'input',
      name: 'authorName',
      message: 'Please Enter Author\'s Name:\n    >'
    },
    {
      type: 'input',
      name: 'authorEmail',
      message: 'Please Enter Author\'s Email:\n    >'
    },
    {
      type: 'input',
      name: 'githubUsername',
      message: 'Please enter Author\'s GitHub Username:\n    >'
    }
  ]

  return inquirer.prompt(questions)
}

function writeFiles (khaos, destination, files, answers) {
  return new Promise(function (resolve, reject) {
    khaos.write(destination, files, answers, function (err) {
      if (err) reject(err)
      resolve(answers)
    })
  })
}

function extras ({ githubRepo, packageName }) {
  clear()
  console.log(separator(packageName))

  const config = { hideCursor: true }

  process.stdout.write('    Running npm install')
  start(250, config)
  exec('npm install').then(function ({ code, out, err }) {
    stop()
    if (code === 0) {
      process.stdout.write('\n    Running git init')
      start(250, config)
      return exec('git init')
    } else {
      throw err
    }
  })
  .catch(err => { log('\n    failed to run npm install\n', err) && console.log(separator()) })
  .then(({ code, out, err }) => {
    stop()
    if (code === 0) {
      process.stdout.write('\n    Adding git remote origin')
      start(250, config)
      return exec(`git remote add origin https://gitub.com/${githubRepo}.git`)
    } else {
      throw err
    }
  })
  .then(() => stop() && console.log(separator()))
  .catch(() => stop() && console.log(separator()))
}
