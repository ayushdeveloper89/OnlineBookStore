import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    appLoading: true,
    mobileView: false
};


const appStatus = createSlice({
    name: 'appStatus',
    initialState,
    reducers: {
        setAppLoadingStatus(state, action) {
            state.appLoading = action.payload.status;
        },
        setStoreMobileViewStatus(state, action) {
            state.mobileView = action.payload.status;
        },
    }
});

export default appStatus.reducer;

export const {
    setAppLoadingStatus,
    setStoreMobileViewStatus } = appStatus.actions;