module.exports = function (wallaby) {
  return {
    files: [
      { pattern: `src/**/__test__/**/*.*`, instrument: false },
      { pattern: `src/**/index.ts`, instrument: false },
      `!src/**/*.test.ts`,
      `src/**/*.ts`,
    ],

    tests: [
      `src/**/*.test.ts`,
      `src/**/__test__/**/*.*`
    ],

    debug: true,

    testFramework: 'mocha',

    env: {
      type: 'node'
    }
  }
}
