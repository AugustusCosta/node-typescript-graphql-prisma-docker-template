import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/tests'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/index.ts", // Ignora o index.ts principal (apenas inicialização)
    "!src/tests/**"  // Ignora a própria pasta de testes
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/']
};

export default config;
