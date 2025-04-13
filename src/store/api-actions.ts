import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import { OfferInfo } from '../types/offer';
import { loadOffers, setLoadingStatus } from './action';
import {APIRoute} from '../const';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'FETCH_OFFERS',
  async (_arg, {dispatch, extra: api}) => {
    try{
      dispatch(setLoadingStatus(true));
      const {data} = await api.get<OfferInfo[]>(APIRoute.Offers);
      dispatch(setLoadingStatus(false));
      dispatch(loadOffers(data));
    }catch{
      dispatch(setLoadingStatus(false));
      throw new Error('Failed to load data');
    }
  },
);
