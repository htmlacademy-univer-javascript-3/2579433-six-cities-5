import {createSlice} from '@reduxjs/toolkit';
import {APIScenarios, AuthorizationStatus} from '../../const';
import {AuthProcess} from '../../types/state';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions';
import { toast } from 'react-toastify';

const initialState: AuthProcess = {
  authorizationStatus: AuthorizationStatus.NoAuth,
  userData: null
};

export const userProcess = createSlice({
  name: APIScenarios.Auth,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        toast.error(action.payload);
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = null;
      });
  }
});
