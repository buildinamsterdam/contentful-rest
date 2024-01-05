import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  verbose: true,
  testEnvironment: "jsdom",
  transform: { "^.+\\.tsx?$": "ts-jest" },
  roots: ["<rootDir>/tests"],
};

export default config;
