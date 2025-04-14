import {AxiosError, AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import { OfferInfo } from '../types/offer';
import { loadOffers, setLoadingStatus, navigateTo } from './action';
import { APIRoute, AppRoute } from '../const';

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
    }catch(err){
      const error = err as AxiosError; //По-другому не сработает
      if (error.response) {
        const status = error.response.status;

        switch (status) {
          case 401:
            dispatch(navigateTo(AppRoute.Login));
            break;
          case 404:
            dispatch(navigateTo(AppRoute.NotFound));
            break;
          case 500:
            dispatch(navigateTo(AppRoute.ServerError));
            break;
          default:
            throw error;
        }
        throw error;
      }
    }finally{
      dispatch(setLoadingStatus(false));
    }
  },
);
