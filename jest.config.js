module.exports = {
  testEnvironment: "jsdom",
  coverageDirectory: "./jest-coverage/",
  coverageReporters: ["json"],
  collectCoverage: true,
  collectCoverageFrom: ["**/src/**/*.(ts|tsx)"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  modulePathIgnorePatterns: ["<rootDir>/examples"],
  snapshotSerializers: ["@emotion/jest/serializer"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/plop-templates/"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  preset: "ts-jest",
}
