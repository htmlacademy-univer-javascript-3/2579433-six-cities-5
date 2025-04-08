import { OfferInfo } from './types/offer';

export function sortLowToHigh(offerA: OfferInfo, offerB: OfferInfo){
  return offerA.price - offerB.price;
}

export function sortHighToLow(offerA: OfferInfo, offerB: OfferInfo){
  return offerB.price - offerA.price;
}

export function sortByRating(offerA: OfferInfo, offerB: OfferInfo){
  return offerB.rating - offerA.rating;
}
