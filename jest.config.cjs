module.exports = {
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!(axios)/)'],
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
  },
};
