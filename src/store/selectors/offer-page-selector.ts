import { createSelector } from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import { CommentInfo } from '../../types/comment';
import { FullOfferInfo, OfferInfo } from '../../types/offer';
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
export const getCurrentOfferInfo = (state: State): FullOfferInfo | null => state[NameSpace.Offer].currentOffer;
export const getOldOfferId = (state: State): string | null => state[NameSpace.Offer].oldOfferId;
export const getNearPlaces = (state: State): OfferInfo[] => state[NameSpace.Offer].nearPlaces;
export const getComments = (state: State): CommentInfo[] => state[NameSpace.Offer].comments;
