import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {APIScenarios} from '../../const';
import { FavoritePageData } from '../../types/state';
import { fetchFavoriteOffersAction, changeOfferStatus } from '../api-actions';
import { OfferInfo } from '../../types/offer';
import { toast } from 'react-toastify';

const initialState: FavoritePageData = {
  isLoading: false,
  favoriteOfferList: [],
  favoriteOfferCount: -1
};

export const favoritePageData = createSlice({
  name: APIScenarios.Favorite,
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<OfferInfo>) => {
      const offer = action.payload;
      const exists = state.favoriteOfferList.find((item) => item.id === offer.id);
      if (!exists) {
        state.favoriteOfferList.push(offer);
        state.favoriteOfferCount++;
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.favoriteOfferList.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.favoriteOfferList.splice(index, 1);
        state.favoriteOfferCount--;
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOfferList = action.payload;
        state.favoriteOfferCount = action.payload.length;
        state.isLoading = false;
      })
      .addCase(fetchFavoriteOffersAction.rejected, (state, action) => {
        state.isLoading = false;
        toast.warn(action.payload);
      })
      .addCase(changeOfferStatus.fulfilled, (state, action) => {
        const index = state.favoriteOfferList.findIndex((offer) => offer.id === action.payload.id);
        if(index === -1 && action.payload.isFavorite === true){
          const offerListFormat =
          {id: action.payload.id, title: action.payload.title,
            type: action.payload.type, price: action.payload.price,
            city: action.payload.city, location: action.payload.location,
            isFavorite: action.payload.isFavorite, isPremium: action.payload.isPremium,
            rating: action.payload.rating, previewImage: action.payload.previewImage};
          state.favoriteOfferList.push(offerListFormat);
        }else if(!action.payload.isFavorite && index !== -1){
          state.favoriteOfferList.splice(index, 1);
        }
      })
      .addCase(changeOfferStatus.rejected, (_, action) => {
        toast.warn(action.payload);
      });
  }
});

export const { addToFavorites, removeFromFavorites } = favoritePageData.actions;
