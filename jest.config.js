module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: 'tests?.tsx?$',
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
