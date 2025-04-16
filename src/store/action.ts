import { createAction } from '@reduxjs/toolkit';
import { OfferInfo, FullOfferInfo } from '../types/offer';
import { AppRoute, AuthorizationStatus } from '../const';
import { CommentInfo } from '../types/comment';

export const changeCity = createAction<string>('CHANGE_CITY');

export const loadOffers = createAction<OfferInfo[]>('LOAD_OFFERS');

export const loadCurrentOffer = createAction<FullOfferInfo>('LOAD_CURRENT_OFFER');

export const loadNearPlaces = createAction<OfferInfo[]>('LOAD_NEAR_PLACES');

export const loadComments = createAction<CommentInfo[]>('LOAD_COMMENTS');

export const addComment = createAction<CommentInfo>('ADD_COMMENT');

export const setLoadingStatus = createAction<boolean>('SET_LOADING_STATUS');

export const navigateTo = createAction<string>('NAVIGATE_TO');

export const redirectTo = createAction<AppRoute>('REDIRECT_TO');

export const requireAuthorization = createAction<AuthorizationStatus>('REQUIRE_AUTH');
