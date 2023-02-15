module.exports = {
  preset: 'ts-jest',
  bail: false,
  verbose: true,
  testRunner: 'jest-circus/runner',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: [
    '**/*.d.ts',
    '**/__e2e__/',
    '**/__integration__/',
    'packages/amplify-e2e-core/',
    'packages/amplify-e2e-tests/',
    'packages/amplify-console-integration-tests/',
    'packages/graphql-transformers-e2e-tests/',
    'packages/amplify-util-mock/src/__e2e__/',
    'packages/amplify-ui-tests/',
    'packages/amplify-graphql-transformer-interfaces/',
    'packages/amplify-cli-shared-interfaces/',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'core', 'node'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/.(ts|tsx|js|jsx)$', '!src/**/*.test.(ts|tsx|js|jsx)$', '!src/**/*.d.ts'],
  coverageDirectory: 'coverage',
  projects: [
    '<rootDir>/packages/amplify-app',
    '<rootDir>/packages/amplify-appsync-simulator',
    '<rootDir>/packages/amplify-category-analytics',
    '<rootDir>/packages/amplify-category-auth',
    '<rootDir>/packages/amplify-category-geo',
    '<rootDir>/packages/amplify-category-function',
    '<rootDir>/packages/amplify-category-hosting',
    '<rootDir>/packages/amplify-console-hosting',
    '<rootDir>/packages/amplify-category-interactions',
    '<rootDir>/packages/amplify-category-notifications',
    '<rootDir>/packages/amplify-category-predictions',
    '<rootDir>/packages/amplify-category-storage',
    '<rootDir>/packages/amplify-cli',
    '<rootDir>/packages/amplify-cli-core',
    '<rootDir>/packages/amplify-cli-logger',
    '<rootDir>/packages/amplify-dynamodb-simulator',
    '<rootDir>/packages/amplify-frontend-android',
    '<rootDir>/packages/amplify-frontend-ios',
    '<rootDir>/packages/amplify-frontend-javascript',
    // '<rootDir>/packages/amplify-graphiql-explorer',
    '<rootDir>/packages/amplify-provider-awscloudformation',
    '<rootDir>/packages/amplify-storage-simulator',
    '<rootDir>/packages/amplify-util-mock',
    // '<rootDir>/packages/amplify-velocity-template', // todo: enable after migration to Jest
  ],
};
