import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL, SubUrl} from '../../utils/api/api';
import {getAccessToken} from '../../utils/functions/jwtFunctions';

// Tags for Redux
const TAG_LOGIN_USER = 'login_user';

const ALL_TAG_TYPES = [TAG_LOGIN_USER];

export const ApiRequest = createApi({
  reducerPath: 'ApiRequest',
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      immutableCheck: true,
      serializableCheck: true,
    }),
  keepUnusedDataFor: 5,
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async headers => {
      const userToken = await getAccessToken();
      if (userToken) {
        headers.set('Authorization', `Bearer ${userToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ALL_TAG_TYPES,
  endpoints: builder => ({
    loginUser: builder.mutation({
      query: body => ({url: SubUrl.LOGIN_USER, method: 'POST', body: body}),
      invalidatesTags: [TAG_LOGIN_USER],
    }),
    logoutUser: builder.mutation({
      query: body => ({url: SubUrl.LOGOUT_USER, method: 'POST', body: body}),
      invalidatesTags: [TAG_LOGIN_USER],
    }),
  }),
});

export const {useLoginUserMutation, useLogoutUserMutation} = ApiRequest;
