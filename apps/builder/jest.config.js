module.exports = {
  testEnvironment: "jsdom",
  coverageDirectory: "./jest-coverage/",
  coverageReporters: ["lcov"],
  collectCoverage: true,
  coverageProvider: "v8",
  collectCoverageFrom: [
    "./src/**/*.(ts|tsx)",
    "!./src/**/*.test.(ts|tsx)",
    "!./src/**/*.e2e.(ts|tsx)",
  ],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  modulePathIgnorePatterns: ["<rootDir>/examples"],
  snapshotSerializers: ["@emotion/jest/serializer"],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/plop-templates/",
  ],
  moduleNameMapper: {
    "^react($|/.+)": "<rootDir>/node_modules/react$1", // makes sure all React imports are running off of the one in this package.
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
  },
  setupFilesAfterEnv: ['<rootDir>/illa-design/setup-jest.js'],
  roots: ["./src"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
      useESM: true,
    },
  },
  preset: "ts-jest",
}
