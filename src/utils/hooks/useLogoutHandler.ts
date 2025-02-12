import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {checkToken, getRefreshToken, onLogout} from '../functions/jwtFunctions';
import {useLogoutUserMutation} from '../../store/Services/ApiRequest';

export const useLogoutHandler = () => {
  const dispatch = useDispatch();
  const {logoutUser} = useSelector(
    (state: {userSlice: {logoutUser: boolean}}) => state.userSlice,
  );
  const [logoutCallBack, {data, error}] = useLogoutUserMutation();

  useEffect(() => {
    if (data || error) {
      onLogout(dispatch);
    }
  }, [data, error, dispatch]);

  const onLogoutPress = useCallback(async () => {
    const refresh_token = await getRefreshToken();
    await logoutCallBack({refresh_token});
  }, [logoutCallBack]);

  useEffect(() => {
    if (logoutUser) {
      onLogoutPress();
    }
  }, [logoutUser, onLogoutPress]);

  useEffect(() => {
    checkToken(dispatch);
  }, [dispatch]);
};
