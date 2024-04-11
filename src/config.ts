import {DevToolConfigModel, EnvironmentsConfigModel} from 'models';

const environments: EnvironmentsConfigModel = {
  DEVELOPMENT: {
    enableLog: true,
    version: {
      phase: 1,
      release: 0,
      build: 0,
    },
    baseUrl: 'http://localhost:3000/v1/api/',
    staleTime: 1000 * 15,
    tokenName: 'firebase-token',
  },
  STAGING: {
    enableLog: true,
    version: {
      phase: 1,
      release: 0,
      build: 0,
    },
    baseUrl: 'https://test-firebase.adaptable.app/v1/api/',
    staleTime: 1000 * 15,
    tokenName: 'firebase-token',
  },
  PRODUCTION: {
    enableLog: false,
    version: {
      phase: 1,
      release: 0,
      build: 0,
    },
    baseUrl: '',
    staleTime: 1000 * 15,
    tokenName: 'firebase-token',
  },
} as const;

/**
 * *******************************
 * *** change environment here ***
 * *******************************
 */
export const config = environments.DEVELOPMENT;

/**
 * debug log for response api
 */
export const devToolConfig: DevToolConfigModel = {
  delayFetching: 0, // delay fetch data from server
};
