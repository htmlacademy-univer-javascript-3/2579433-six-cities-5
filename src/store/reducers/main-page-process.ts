import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {APIScenarios} from '../../const';
import { MainPageData } from '../../types/state';
import {changeOfferStatus, fetchOffersAction} from '../api-actions';

const initialState: MainPageData = {
  city: 'Paris',
  isLoading: false,
  offerList: []
};

export const mainPageData = createSlice({
  name: APIScenarios.Main,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offerList = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(changeOfferStatus.fulfilled, (state, action) => {
        const index = state.offerList.findIndex((offer) => offer.id === action.payload.id);
        if(index !== -1){
          state.offerList[index].isFavorite = action.payload.isFavorite;
        }
      });
  }
});

export const {changeCity} = mainPageData.actions;
