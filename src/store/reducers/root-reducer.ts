import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import { mainPageData } from './main-page-process';
import { offerPageData } from './offer-page-process';
import { userProcess } from './authentication-process';

export const rootReducer = combineReducers({
  [NameSpace.Offer]: offerPageData.reducer,
  [NameSpace.Main]: mainPageData.reducer,
  [NameSpace.Auth]: userProcess.reducer,
});
