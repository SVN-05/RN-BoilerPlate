import {jwtDecode} from 'jwt-decode';
import EncryptedStorage from 'react-native-encrypted-storage';
import Toast from 'react-native-toast-message';
import {LOGIN_SCREEN} from '../../navigation/ScreenNames';
import {clearAllData, setLogoutUser} from '../../store/slice/userSlice';
import {BASE_URL, SubUrl} from '../api/api';
import {
  resetMixPanel,
  trackMixpanel,
} from '../Third-Party/Mixpanel/InitializeMixPanel';
import {
  mixpanel_cta_names,
  mixpanel_property_names,
} from '../Third-Party/Mixpanel/data.ts';
import {ApiRequest} from '../../store/services/ApiRequest';
import {replace} from './navigation';

export const onLogout = async (
  dispatch: (arg0: {
    payload: undefined;
    type: `${string}/resetApiState` | 'user/clearAllData';
  }) => any,
  is_manual = false,
) => {
  if (is_manual === false) {
    trackMixpanel(mixpanel_cta_names.auto_logout, {
      [mixpanel_property_names.cta_name]: mixpanel_cta_names.auto_logout,
      [mixpanel_property_names.action]: 'Logged out due to session expiration.',
    });
  }
  resetMixPanel();
  await dispatch(clearAllData());
  await dispatch(ApiRequest.util.resetApiState());
  await EncryptedStorage.clear();
  Toast.show({
    type: 'success',
    text2: is_manual
      ? 'Logged out successfully.'
      : 'Session expired. Please login again.',
  });
  replace(LOGIN_SCREEN);
};

export const getAccessToken = async () => {
  return await EncryptedStorage.getItem('access_token');
};

export const setAccessToken = async (token: string) => {
  await EncryptedStorage.setItem('access_token', token);
};

export const getRefreshToken = async () => {
  return await EncryptedStorage.getItem('refresh_token');
};

export const setRefreshToken = async (refreshToken: string) => {
  await EncryptedStorage.setItem('refresh_token', refreshToken);
};

export const refreshAuthToken = async (
  body: {refresh_token: string | null},
  dispatch: (arg0: any) => void,
) => {
  try {
    const response = await fetch(`${BASE_URL}${SubUrl.REFRESH_API}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!response?.ok) {
      Toast.show({type: 'error', text2: 'Token refresh failed.'});
      dispatch(setLogoutUser(true));
      throw new Error('Token refresh failed');
    }

    const data = await response?.json();
    const {access_token, refresh_token} = data?.token;

    await setAccessToken(access_token);
    await setRefreshToken(refresh_token);
  } catch (error) {
    Toast.show({type: 'error', text2: 'Token refresh failed.'});
    dispatch(setLogoutUser(true));
    console.error('Error refreshing token:', error);
    throw error;
  }
};

export const checkToken = async (dispatch: (arg0: any) => void) => {
  const acc_token = await getAccessToken();
  if (acc_token) {
    const decoded = await jwtDecode(acc_token);
    const {exp} = decoded || {};
    const currentTime = Math.floor(Date.now() / 1000);
    if (exp && currentTime >= exp) {
      const ref_token = await getRefreshToken();
      if (ref_token) {
        const decodedRefresh = await jwtDecode(ref_token);
        const {exp: ref_exp} = decodedRefresh || {};
        if (ref_exp && currentTime >= ref_exp) {
          dispatch(setLogoutUser(true));
        } else {
          const body = {refresh_token: ref_token};
          refreshAuthToken(body, dispatch);
        }
      } else {
        dispatch(setLogoutUser(true));
      }
    }
  } else {
    dispatch(setLogoutUser(true));
  }
};
