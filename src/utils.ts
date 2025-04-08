import { OfferInfo } from './types/offer';
import { SortType } from './const';

const sortPopular = () => 0;
const sortLowToHigh = (offerA: OfferInfo, offerB: OfferInfo) => (offerA.price - offerB.price);
const sortHighToLow = (offerA: OfferInfo, offerB: OfferInfo) => (offerB.price - offerA.price);
const sortByRating = (offerA: OfferInfo, offerB: OfferInfo) => (offerB.rating - offerA.rating);

export const sortByType: Record<SortType, (a: OfferInfo, b: OfferInfo) => number> = {
  [SortType.POPULAR]: sortPopular,
  [SortType.LOW_TO_HIGH]: sortLowToHigh,
  [SortType.HIGH_TO_LOW]: sortHighToLow,
  [SortType.TOP_RATED]: sortByRating
};
