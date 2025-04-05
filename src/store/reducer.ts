import { createReducer } from '@reduxjs/toolkit';
import * as Action from './action';
import { OfferInfo } from '../types/offer';

type InitialState = {
  city: string;
  offerList: OfferInfo[];
}

const initialState: InitialState = {
  city: 'Paris',
  offerList: []
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(Action.changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(Action.fillOfferList, (state, action) => {
      state.offerList = action.payload;
    });
});

export default reducer;
