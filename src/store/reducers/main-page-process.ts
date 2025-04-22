import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {APIScenarios} from '../../const';
import { MainPageData } from '../../types/state';
import {fetchOffersAction} from '../api-actions';

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
      });
  }
});

export const {changeCity} = mainPageData.actions;
