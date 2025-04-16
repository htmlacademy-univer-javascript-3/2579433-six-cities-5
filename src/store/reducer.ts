import { createReducer } from '@reduxjs/toolkit';
import * as Action from './action';
import { OfferInfo, FullOfferInfo } from '../types/offer';
import { AuthorizationStatus } from '../const';
import { CommentInfo } from '../types/comment';

type InitialState = {
  city: string;
  isLoading: boolean;
  offerList: OfferInfo[];
  authorizationStatus: AuthorizationStatus;
  currentOffer: FullOfferInfo;
  nearPlaces: OfferInfo[];
  comments: CommentInfo[];
}

const initialState: InitialState = {
  city: 'Paris',
  isLoading: false,
  offerList: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  currentOffer: {} as FullOfferInfo,
  nearPlaces: [],
  comments: []
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
    })
    .addCase(Action.loadCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(Action.loadNearPlaces, (state, action) => {
      state.nearPlaces = action.payload;
    })
    .addCase(Action.loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(Action.addComment, (state, action) => {
      state.comments.push(action.payload);
    });
});

export default reducer;
