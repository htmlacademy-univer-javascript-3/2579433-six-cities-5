import {APIScenarios} from '../../const';
import {State} from '../../types/state';
import { OfferInfo } from '../../types/offer';

export const getLoadingStatus = (state: State): boolean => state[APIScenarios.Main].isLoading;
export const getCity = (state: State): string => state[APIScenarios.Main].city;
export const getOfferList = (state: State): OfferInfo[] => state[APIScenarios.Main].offerList;
