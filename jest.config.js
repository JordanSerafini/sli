module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest"
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(css|scss)$": "identity-obj-proxy"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(.*\\.mjs$))"
  ],
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "./test_jest", 
        outputName: "junit.xml"          
      }
    ]
  ],
  testMatch: [
    "**/__tests__/**/*.(test|spec).(ts|tsx|js|jsx)",
    "**/*.(test|spec).(ts|tsx|js|jsx)"
  ]
};
