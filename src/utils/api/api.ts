import {isProd} from '../../constants/constants';

export const BASE_URL = isProd ? 'Prod URL' : 'Staging URL';

export const SubUrl = {
  LOGIN_USER: '',
  REFRESH_API: '',
  LOGOUT_USER: '',
};
