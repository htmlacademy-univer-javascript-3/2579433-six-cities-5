import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {APIScenarios} from '../../const';
import { OfferPageData } from '../../types/state';
import { fetchCurrentOfferAction, fetchNearbyAction, fetchCommentsAction, postComment } from '../api-actions';
import { toast } from 'react-toastify';

const initialState: OfferPageData = {
  isLoading: false,
  oldOfferId: null,
  isFavorite: false,
  currentOffer: null,
  nearPlaces: [],
  comments: []
};

export const offerPageData = createSlice({
  name: APIScenarios.Offer,
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
      .addCase(fetchCurrentOfferAction.rejected, (state, action) => {
        state.isLoading = false;
        toast.warn(action.payload);
      })
      .addCase(fetchNearbyAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNearbyAction.fulfilled, (state, action) => {
        state.nearPlaces = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchNearbyAction.rejected, (state, action) => {
        state.isLoading = false;
        toast.warn(action.payload);
      })
      .addCase(fetchCommentsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCommentsAction.rejected, (state, action) => {
        state.isLoading = false;
        toast.warn(action.payload);
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(postComment.rejected, (_, action) => {
        toast.warn(action.payload);
      });
  }
});

export const { setOldOfferId, changeFavoriteStatus } = offerPageData.actions;
