import {NameSpace} from '../../const';
import {State} from '../../types/state';
import { OfferInfo } from '../../types/offer';

export const getLoadingStatus = (state: State): boolean => state[NameSpace.Main].isLoading;
export const getCity = (state: State): string => state[NameSpace.Main].city;
export const getOfferList = (state: State): OfferInfo[] => state[NameSpace.Main].offerList;
