import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    logIn: false
};

const logIn = createSlice({
  name: 'logIn',
  initialState,
  reducers: {
    logInStatus(state, action) {
      state.logIn = action.payload.status;
    },
  }
});

export default logIn.reducer;

export const { logInStatus } = logIn.actions;