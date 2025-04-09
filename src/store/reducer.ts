import { createReducer } from '@reduxjs/toolkit';
import * as Action from './action';
import { OfferInfo } from '../types/offer';

type InitialState = {
  city: string;
  isLoading: boolean;
  offerList: OfferInfo[];
}

const initialState: InitialState = {
  city: 'Paris',
  isLoading: false,
  offerList: []
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(Action.changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(Action.setLoadingStatus, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(Action.loadOffers, (state, action) => {
      state.offerList = action.payload;
    });
});

export default reducer;
