module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  //transform: { "^.+\\.(ts|tsx)$": "ts-jest" },
  //preset: 'ts-jest',
  testEnvironment: 'node',
  preset: 'ts-jest',
  transform: {
    "\\.(gql|graphql)$": "jest-transform-graphql",
    '^.+\\.tsx?$': 'babel-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json'
    }
  }
};
