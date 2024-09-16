import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["<rootDir>/node_modules/(?!@foo)"],
  coverageReporters: ["json", "html"],
  transform: {
    "\\.[jt]sx?$": ["ts-jest", {
      tsconfig: "<rootDir>/tsconfig.jest.json"
    }],
  },
  moduleDirectories: ["node_modules", "src"],
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/configs/jest/utils/fileMock.ts",
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },
  notify: true,
  notifyMode: "failure-change",
  preset: "ts-jest",
  setupFiles: ["<rootDir>/configs/jest/utils/polyfill.ts"],
  setupFilesAfterEnv: [
    "jest-extended/all"
  ],
  testEnvironment: "jsdom",
  testMatch: ["**/__tests__/**/*.test.ts?(x)"],
};

export default config;
