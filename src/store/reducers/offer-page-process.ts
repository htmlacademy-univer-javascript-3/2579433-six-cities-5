import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import { OfferPageData } from '../../types/state';
import { fetchCurrentOfferAction, fetchNearbyAction, fetchCommentsAction, postComment } from '../api-actions';

const initialState: OfferPageData = {
  isLoading: false,
  oldOfferId: null,
  isFavorite: false,
  currentOffer: null,
  nearPlaces: [],
  comments: []
};

export const offerPageData = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    setOldOfferId: (state, action: PayloadAction<string>) => {
      state.oldOfferId = action.payload;
    },
    changeFavoriteStatus: (state, action: PayloadAction<boolean>) => {
      state.isFavorite = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCurrentOfferAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentOfferAction.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.isFavorite = action.payload.isFavorite;
        state.isLoading = false;
      })
      .addCase(fetchCurrentOfferAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchNearbyAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNearbyAction.fulfilled, (state, action) => {
        state.nearPlaces = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchNearbyAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchCommentsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      });
  }
});

export const { setOldOfferId, changeFavoriteStatus } = offerPageData.actions;
