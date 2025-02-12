import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  logoutUser: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogoutUser: (state, action) => {
      state.logoutUser = action.payload;
    },
    clearAllData: state => {
      state.logoutUser = false;
    },
  },
});

export const {setLogoutUser, clearAllData} = userSlice.actions;

export default userSlice.reducer;
