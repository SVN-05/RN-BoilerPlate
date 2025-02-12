import {APP_TAB} from '../navigation/screenNames';

const config = {
  screens: {
    Home: APP_TAB,
  },
};

const linking = {
  prefixes: ['https://example.com'], //BASE or HOST URL
  config,
};

export default linking;
