import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest';
import { loadConfig } from 'tsconfig-paths';

const tsConfig = loadConfig('.');

if (tsConfig.resultType === 'failed') {
  console.error('Could not load tsconfig to map paths, aborting.');
  process.exit(1);
}

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 60000,
  maxWorkers: 2,
  roots: ['<rootDir>'],
  modulePaths: [tsConfig.absoluteBaseUrl],
  moduleNameMapper: pathsToModuleNameMapper(tsConfig.paths)
};

export default config;
