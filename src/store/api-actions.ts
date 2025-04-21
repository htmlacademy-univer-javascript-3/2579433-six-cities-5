import { AxiosInstance, isAxiosError} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import { UserData, AuthData } from '../types/userdata';
import { OfferInfo, FullOfferInfo } from '../types/offer';
import { redirectTo } from './action';
import { APIRoute, AppRoute } from '../const';
import { saveToken, dropToken } from '../service/token';
import { CommentInfo, Comment } from '../types/comment';

export const fetchOffersAction = createAsyncThunk<OfferInfo[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: { api: AxiosInstance };
}>(
  'FETCH_OFFERS',
  async (_arg, {extra: {api}}) => {
    const {data} = await api.get<OfferInfo[]>(APIRoute.Offers);
    return data;
  }
);

export const fetchCurrentOfferAction = createAsyncThunk<FullOfferInfo, string, {
  dispatch: AppDispatch;
  state: State;
  extra: { api: AxiosInstance };
}>(
  'FETCH_CURRENT_OFFER',
  async (id, {dispatch, extra: {api}}) => {
    try{
      const {data} = await api.get<FullOfferInfo>(`${APIRoute.OfferID}${id}`);
      return data;
    }catch(error){
      if(isAxiosError(error) && error.response?.status === 404){
        dispatch(redirectTo(AppRoute.NotFound));
      }
      throw error;
    }
  },
);

export const fetchCommentsAction = createAsyncThunk<CommentInfo[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: { api: AxiosInstance };
}>(
  'FETCH_COMMENTS',
  async (id, {dispatch, extra: {api}}) => {
    try{
      const {data} = await api.get<CommentInfo[]>(`${APIRoute.Comments}${id}`);
      return data;
    }catch(error){
      if(isAxiosError(error) && error.response?.status === 404){
        dispatch(redirectTo(AppRoute.NotFound));
      }
      throw error;
    }
  },
);

export const fetchNearbyAction = createAsyncThunk<OfferInfo[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: { api: AxiosInstance };
}>(
  'FETCH_NEARBY',
  async (id, {dispatch, extra: {api}}) => {
    try{
      const {data} = await api.get<OfferInfo[]>(`${APIRoute.OfferID}${id}${APIRoute.Nearby}`);
      return data;
    }catch(error){
      if(isAxiosError(error) && error.response?.status === 404){
        dispatch(redirectTo(AppRoute.NotFound));
      }
      throw error;
    }
  },
);

export const postComment = createAsyncThunk<CommentInfo, Comment, {
  dispatch: AppDispatch;
  state: State;
  extra: { api: AxiosInstance };
}>(
  'ADD_COMMENT',
  async ({offerId, comment, rating}, {extra: {api}}) => {
    const {data} = await api.post<CommentInfo>(`${APIRoute.Comments}${offerId}`, {comment, rating});
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: { api: AxiosInstance };
}>(
  'CHECK_AUTH',
  async (_arg, {extra: {api}}) => {
    await api.get<UserData>(APIRoute.Login);
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: { api: AxiosInstance };
}>(
  'LOGIN',
  async ({email, password}, {dispatch, extra: {api}}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(redirectTo(AppRoute.Main));
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: { api: AxiosInstance };
}>(
  'LOGOUT',
  async (_arg, {extra: {api}}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);
