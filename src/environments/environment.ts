// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { IEnvironment } from './envrionment.model';

export const environment: IEnvironment = {
  production: false,
  // API_HOST: 'https://7rhpjdl0sg.execute-api.us-east-2.amazonaws.com',
  API_HOST: 'http://localhost:8080',
  // API_HOST: 'https://f2f-api.mindstone.cc',
  EV_PATH: 'v1',
  Channel_PATH: 'channel',
  INITIALIZE_PATH: 'channel/initialize',
  PEER_PATH: 'peer'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
