import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accessToken: null,
    refreshToken: null,
    userName: null,
    userId: null,
    userRole: null
};

// ==============================|| SLICE - userInfo ||============================== //

const userInfo = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.userName = action.payload.userName;
      state.userId = action.payload.userId;
      state.userRole = action.payload.userRole;
    }
  }
});

export default userInfo.reducer;

export const { setUserInfo } = userInfo.actions;