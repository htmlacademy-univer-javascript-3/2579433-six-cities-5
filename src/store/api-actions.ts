import { AxiosInstance, isAxiosError} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import { OfferInfo } from '../types/offer';
import { loadOffers, redirectTo, setLoadingStatus } from './action';
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
    }catch(error){
      if(isAxiosError(error)){
        if(error.response?.status === 404){
          dispatch(redirectTo(AppRoute.NotFound));
        }
      }
    }finally{
      dispatch(setLoadingStatus(false));
    }
  },
);
