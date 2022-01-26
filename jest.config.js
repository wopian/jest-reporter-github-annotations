export default {
  clearMocks: true,
  collectCoverageFrom: ['./src/**/**.js'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js'],
  testEnvironment: 'node',
  watchPathIgnorePatterns: ['globalConfig']
}
