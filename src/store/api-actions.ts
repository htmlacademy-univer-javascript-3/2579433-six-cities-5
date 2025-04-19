import { AxiosInstance, isAxiosError} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import { UserData, AuthData } from '../types/userdata';
import { OfferInfo, FullOfferInfo } from '../types/offer';
import { loadOffers, redirectTo, setLoadingStatus, requireAuthorization, loadCurrentOffer, loadNearPlaces, loadComments, addComment, changeUserData } from './action';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { saveToken, dropToken } from '../service/token';
import { CommentInfo, Comment } from '../types/comment';
import { useAppSelector } from './store';

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

export const fetchCurrentOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: { api: AxiosInstance };
}>(
  'FETCH_CURRENT_OFFER',
  async (id, {dispatch, extra: {api}}) => {
    try{
      dispatch(setLoadingStatus(true));
      const oldOfferID = useAppSelector((state) => state.currentOffer.id);
      const offer = await api.get<FullOfferInfo>(`${APIRoute.OfferID}${id}`);
      dispatch(loadCurrentOffer(offer.data));

      if(offer.data.id === oldOfferID){
        const [near, comments] = await Promise.all([
          await api.get<OfferInfo[]>(`${APIRoute.OfferID}${id}${APIRoute.Nearby}`),
          await api.get<CommentInfo[]>(`${APIRoute.Comments}${id}`)
        ]);
        dispatch(loadNearPlaces(near.data));
        dispatch(loadComments(comments.data));
      }
    }catch(error){
      if(isAxiosError(error) && error.response?.status === 404){
        dispatch(redirectTo(AppRoute.NotFound));
      }
    }finally{
      dispatch(setLoadingStatus(false));
    }
  },
);

export const postComment = createAsyncThunk<void, Comment, {
  dispatch: AppDispatch;
  state: State;
  extra: { api: AxiosInstance };
}>(
  'ADD_COMMENT',
  async ({offerId, comment, rating}, {dispatch, extra: {api}}) => {
    const {data} = await api.post<CommentInfo>(`${APIRoute.Comments}${offerId}`, {comment, rating});
    dispatch(addComment(data));
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
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectTo(AppRoute.Main));
    dispatch(changeUserData(data));
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
    dispatch(changeUserData(null));
  },
);
