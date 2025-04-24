import { AxiosInstance, isAxiosError} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import { UserData, AuthData } from '../types/userdata';
import { OfferInfo, FullOfferInfo, StatusChangeRequest, FavoritePointInfo } from '../types/offer';
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
  rejectValue: string;
}>(
  'FETCH_CURRENT_OFFER',
  async (id, {dispatch, extra: {api}, rejectWithValue}) => {
    try{
      const {data} = await api.get<FullOfferInfo>(`${APIRoute.OfferID}${id}`);
      return data;
    }catch(error){
      if(isAxiosError(error) && error.response?.status === 404){
        dispatch(redirectTo(AppRoute.NotFound));
        return rejectWithValue('Offer not found');
      }
      return rejectWithValue('Unknown error');
    }
  },
);

export const fetchCommentsAction = createAsyncThunk<CommentInfo[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: { api: AxiosInstance };
  rejectValue: string;
}>(
  'FETCH_COMMENTS',
  async (id, {dispatch, extra: {api}, rejectWithValue}) => {
    try{
      const {data} = await api.get<CommentInfo[]>(`${APIRoute.Comments}${id}`);
      return data;
    }catch(error){
      if(isAxiosError(error) && error.response?.status === 404){
        dispatch(redirectTo(AppRoute.NotFound));
        return rejectWithValue('Offer not found');
      }
      return rejectWithValue('Unknown error');
    }
  },
);

export const fetchNearbyAction = createAsyncThunk<OfferInfo[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: { api: AxiosInstance };
  rejectValue: string;
}>(
  'FETCH_NEARBY',
  async (id, {dispatch, extra: {api}, rejectWithValue}) => {
    try{
      const {data} = await api.get<OfferInfo[]>(`${APIRoute.OfferID}${id}${APIRoute.Nearby}`);
      return data;
    }catch(error){
      if(isAxiosError(error) && error.response?.status === 404){
        dispatch(redirectTo(AppRoute.NotFound));
        return rejectWithValue('Offer not found');
      }
      return rejectWithValue('Unknown error');
    }
  },
);

export const postComment = createAsyncThunk<CommentInfo, Comment, {
  dispatch: AppDispatch;
  state: State;
  extra: { api: AxiosInstance };
  rejectValue: string;
}>(
  'ADD_COMMENT',
  async ({offerId, comment, rating}, {dispatch, extra: {api}, rejectWithValue}) => {
    try{
      const {data} = await api.post<CommentInfo>(`${APIRoute.Comments}${offerId}`, {comment, rating});
      return data;
    }catch(error){
      if(isAxiosError(error) && error.response){
        switch(error.response.status){
          case 404:
            dispatch(redirectTo(AppRoute.NotFound));
            return rejectWithValue('Offer not found');
          case 400:
            return rejectWithValue('Incorrect comment fields');
          case 401:
            return rejectWithValue('Unauthorized');
          default:
            return rejectWithValue('Unknown error');
        }
      }
      return rejectWithValue('Unknown error');
    }
  },
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: { api: AxiosInstance };
}>(
  'CHECK_AUTH',
  async (_arg, {extra: {api}}) => {
    const {data} = await api.get<UserData>(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: { api: AxiosInstance };
  rejectValue: string;
}>(
  'LOGIN',
  async ({email, password}, {dispatch, extra: {api}, rejectWithValue}) => {
    try{
      const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(data.token);
      dispatch(redirectTo(AppRoute.Main));
      return data;
    }catch(error){
      if(isAxiosError(error) && error.response?.status === 400){
        return rejectWithValue('Incorrect login or password');
      }else{
        return rejectWithValue('Unknown error');
      }
    }
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

export const fetchFavoriteOffersAction = createAsyncThunk<OfferInfo[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: { api: AxiosInstance };
  rejectValue: string;
}>(
  'FETCH_FAVORITE',
  async (_arg, {extra: {api}, rejectWithValue}) => {
    try{
      const {data} = await api.get<OfferInfo[]>(APIRoute.Favorites);
      return data;
    }catch(error){
      if(isAxiosError(error) && error.response?.status === 401){
        return rejectWithValue('Unauthorized');
      }
      return rejectWithValue('Unknown error');
    }
  }
);

export const changeOfferStatus = createAsyncThunk<FavoritePointInfo, StatusChangeRequest, {
  dispatch: AppDispatch;
  state: State;
  extra: { api: AxiosInstance };
  rejectValue: string;
}>(
  'CHANGE_STATUS',
  async ({offerId, status}, {extra: {api}, rejectWithValue}) => {
    try{
      const {data} = await api.post<FavoritePointInfo>(`${APIRoute.Favorites}/${offerId}/${status}`);
      return data;
    }catch(error){
      if(isAxiosError(error) && error.response){
        switch(error.response.status){
          case 404:
            return rejectWithValue('Offer not found');
          case 400:
            return rejectWithValue('Incorrect comment fields');
          case 401:
            return rejectWithValue('Unauthorized');
          case 409:
            return rejectWithValue('Offer already has this status');
          default:
            return rejectWithValue('Unknown error');
        }
      }
      return rejectWithValue('Unknown error');
    }
  },
);
