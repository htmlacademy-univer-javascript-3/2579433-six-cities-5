import { createSelector } from '@reduxjs/toolkit';
import {APIScenarios} from '../../const';
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
export const getOldOfferId = (state: State): string | null => state[APIScenarios.Offer].oldOfferId;
