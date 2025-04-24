import {APIScenarios} from '../../const';
import {State} from '../../types/state';
import { OfferInfo } from '../../types/offer';

export const getLoadingStatus = (state: State): boolean => state[APIScenarios.Favorite].isLoading;
export const getFavoriteOfferCount = (state: State): number => state[APIScenarios.Favorite].favoriteOfferCount;
export const getFavoriteOfferList = (state: State): OfferInfo[] => state[APIScenarios.Favorite].favoriteOfferList;
