const path = require('path')
const cz = require('commitizen/dist/cli/strategies/git-cz').default

const dir = path.join(__dirname, 'adapter')

exports.plugin = commit

function commit (program) {
  program
    .command('commit [gitArgs...]')
    .description('Prompts for powerful git commits')
    .action(function (gitArgs) {
      cz(gitArgs, { cliPath: process.cwd() }, {
        path: dir
      })
    })
}
