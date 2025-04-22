import {NameSpace} from '../../const';
import {State} from '../../types/state';
import { OfferInfo } from '../../types/offer';

export const getLoadingStatus = (state: State): boolean => state[NameSpace.Favorite].isLoading;
export const getFavoriteOfferCount = (state: State): number => state[NameSpace.Favorite].favoriteOfferCount;
export const getFavoriteOfferList = (state: State): OfferInfo[] => state[NameSpace.Favorite].favoriteOfferList;
