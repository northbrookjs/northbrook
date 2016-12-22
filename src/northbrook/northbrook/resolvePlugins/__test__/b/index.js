const { command, flag, alias, description } = require('reginn');

const plugin =
  command(
    alias('awesome', 'a'),
    flag('string', alias('opt', 'o'), description('The most awesome command')));

module.exports = { plugin };