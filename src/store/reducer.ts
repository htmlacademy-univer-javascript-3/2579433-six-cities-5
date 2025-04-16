import { createReducer } from '@reduxjs/toolkit';
import * as Action from './action';
import { OfferInfo } from '../types/offer';
import { AuthorizationStatus } from '../const';

type InitialState = {
  city: string;
  isLoading: boolean;
  offerList: OfferInfo[];
  authorizationStatus: AuthorizationStatus;
}

const initialState: InitialState = {
  city: 'Paris',
  isLoading: false,
  offerList: [],
  authorizationStatus: AuthorizationStatus.Unknown
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
    })
    .addCase(Action.requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export default reducer;
