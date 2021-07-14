// eslint-disable-next-line import/no-extraneous-dependencies
import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
};

export default config;
