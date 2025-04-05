import { createAction } from '@reduxjs/toolkit';
import { OfferInfo } from '../types/offer';

export const changeCity = createAction<string>('CHANGE_CITY');

export const fillOfferList = createAction<OfferInfo[]>('FILL_OFFER_LIST');
