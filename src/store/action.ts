import { createAction } from '@reduxjs/toolkit';
import { OfferInfo } from '../types/offer';

export const changeCity = createAction<string>('CHANGE_CITY');

export const loadOffers = createAction<OfferInfo[]>('LOAD_OFFERS');

export const setLoadingStatus = createAction<boolean>('SET_LOADING_STATUS');

export const navigateTo = createAction<string>('NAVIGATE_TO');
