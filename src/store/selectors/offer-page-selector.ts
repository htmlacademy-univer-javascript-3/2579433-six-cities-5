import { createSelector } from '@reduxjs/toolkit';
import {APIScenarios} from '../../const';
import { CommentInfo } from '../../types/comment';
import { FullOfferInfo, OfferInfo } from '../../types/offer';
import {State} from '../../types/state';

const getOfferState = (state: State) => state[APIScenarios.Offer];

export const getOfferBundle = createSelector(
  [getOfferState],
  (offerState) => ({
    offer: offerState.currentOffer,
    comments: offerState.comments,
    nearOffersInfo: offerState.nearPlaces
  }));

export const getLoadingStatus = (state: State): boolean => state[APIScenarios.Offer].isLoading;
export const getCurrentOfferInfo = (state: State): FullOfferInfo | null => state[APIScenarios.Offer].currentOffer;
export const getOldOfferId = (state: State): string | null => state[APIScenarios.Offer].oldOfferId;
export const getNearPlaces = (state: State): OfferInfo[] => state[APIScenarios.Offer].nearPlaces;
export const getComments = (state: State): CommentInfo[] => state[APIScenarios.Offer].comments;
