import {
  configureStore,
  createImmutableStateInvariantMiddleware,
  isRejectedWithValue,
} from '@reduxjs/toolkit';
import userReducer from '../store/slice/userSlice';
import Toast from 'react-native-toast-message';
import {checkToken} from '../utils/functions/jwtFunctions';
import {ApiRequest} from './services/ApiRequest';

export const extractErrorMessage = (error: any): string => {
  if (typeof error === 'string') {
    return error;
  }
  if (Array.isArray(error)) {
    return (
      error.find(item => typeof item === 'string') ||
      'An unknown error occurred'
    );
  }
  if (typeof error === 'object' && error !== null) {
    for (const key of Object.keys(error)) {
      const value = error[key];
      const message = extractErrorMessage(value);
      if (message) {
        return message;
      }
    }
  }
  return 'An unknown error occurred';
};

interface DispatchType {
  dispatch: any;
  getState: any;
}

interface ActionType {
  type: string;
  payload?: any;
  meta?: {
    arg?: {
      endpointName?: string;
    };
  };
}

export const rtkQueryErrorLogger =
  ({dispatch}: DispatchType) =>
  (next: (action: ActionType) => any) =>
  (action: ActionType) => {
    if (isRejectedWithValue(action)) {
      console.log('aaaa', action, action?.payload?.data?.data);
      const apiError =
        action?.payload?.error ??
        action?.payload?.data?.error ??
        action?.payload?.data?.message ??
        action?.payload?.data?.detail ??
        action?.payload?.data?.data;
      const errMsg = extractErrorMessage(apiError);
      // 403 is the status code for token invalid or expired
      if ([403]?.includes(action?.payload?.status)) {
        checkToken(dispatch);
      } else if (action?.meta?.arg?.endpointName !== 'appForceUpdate') {
        Toast.show({text2: errMsg, type: 'error'});
      }
    }
    return next(action);
  };
const immutableInvariantMiddleware = createImmutableStateInvariantMiddleware();

export const store = configureStore({
  reducer: {
    [ApiRequest.reducerPath]: ApiRequest.reducer,
    //   Can add multiple services/api request here
    userSlice: userReducer,
    //   Can add multiple slices here
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: true,
      immutableCheck: true,
    }).concat([
      ApiRequest.middleware,
      //   Add the api request we are having
      immutableInvariantMiddleware,
      rtkQueryErrorLogger,
    ]),
});
