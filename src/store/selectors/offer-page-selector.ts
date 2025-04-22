import { createSelector } from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {State} from '../../types/state';

const getOfferState = (state: State) => state[NameSpace.Offer];

export const getOfferBundle = createSelector(
  [getOfferState],
  (offerState) => ({
    offer: offerState.currentOffer,
    comments: offerState.comments,
    nearOffersInfo: offerState.nearPlaces
  }));

export const getLoadingStatus = (state: State): boolean => state[NameSpace.Offer].isLoading;
export const getOldOfferId = (state: State): string | null => state[NameSpace.Offer].oldOfferId;
export const getFavoriteStatus = (state: State): boolean => state[NameSpace.Offer].isFavorite;
