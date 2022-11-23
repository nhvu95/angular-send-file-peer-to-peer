import { IEnvironment } from "./envrionment.model";

export const environment: IEnvironment = {
  production: false,
  // API_HOST: 'https://7rhpjdl0sg.execute-api.us-east-2.amazonaws.com',
  API_HOST: 'https://f2f-api.mindstone.cc',
  EV_PATH: 'v1',
  CHANNEL_PATH: 'channel',
  FILE_PATH: 'file',
  INITIALIZE_PATH: 'channel/initialize',
  PEER_PATH: 'peer'
};
