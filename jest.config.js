module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest"
  },
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy"
  },
  transformIgnorePatterns: ["/node_modules/"],
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "./test_jest", 
        outputName: "junit.xml"          
      }
    ]
  ]
};
