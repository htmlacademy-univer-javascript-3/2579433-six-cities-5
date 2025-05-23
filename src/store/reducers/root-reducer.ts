import {combineReducers} from '@reduxjs/toolkit';
import {APIScenarios} from '../../const';
import { mainPageData } from './main-page-process';
import { offerPageData } from './offer-page-process';
import { userProcess } from './authentication-process';
import { favoritePageData } from './favorite-page-process';

export const rootReducer = combineReducers({
  [APIScenarios.Offer]: offerPageData.reducer,
  [APIScenarios.Main]: mainPageData.reducer,
  [APIScenarios.Auth]: userProcess.reducer,
  [APIScenarios.Favorite]: favoritePageData.reducer
});
