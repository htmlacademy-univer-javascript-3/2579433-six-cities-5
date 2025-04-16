import { AxiosInstance, isAxiosError} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import { AuthData } from '../types/authdata';
import { UserData } from '../types/userdata';
import { OfferInfo } from '../types/offer';
import { loadOffers, redirectTo, setLoadingStatus, requireAuthorization } from './action';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { saveToken, dropToken } from '../service/token';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: { api: AxiosInstance };
}>(
  'FETCH_OFFERS',
  async (_arg, {dispatch, extra: {api}}) => {
    try{
      dispatch(setLoadingStatus(true));
      const {data} = await api.get<OfferInfo[]>(APIRoute.Offers);
      dispatch(loadOffers(data));
    }catch(error){
      if(isAxiosError(error)){
        switch (error.response?.status){
          case 404:
            dispatch(redirectTo(AppRoute.NotFound));
            break;
          case 401:
            dispatch(redirectTo(AppRoute.Login));
            break;
          default:
            throw error;
        }
      }
    }finally{
      dispatch(setLoadingStatus(false));
    }
  },
);


export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: { api: AxiosInstance };
}>(
  'CHECK_AUTH',
  async (_arg, {dispatch, extra: {api}}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: { api: AxiosInstance };
}>(
  'LOGIN',
  async ({email, password}, {dispatch, extra: {api}}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectTo(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: { api: AxiosInstance };
}>(
  'LOGOUT',
  async (_arg, {dispatch, extra: {api}}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
