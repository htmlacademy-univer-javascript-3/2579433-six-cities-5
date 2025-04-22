import {store} from '../store/store';
import { AuthorizationStatus } from '../const';
import { UserData } from './userdata';
import { OfferInfo, FullOfferInfo } from './offer';
import { CommentInfo } from './comment';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AuthProcess = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
};

export type MainPageData = {
  city: string;
  isLoading: boolean;
  offerList: OfferInfo[];
}

export type OfferPageData = {
  isLoading: boolean;
  oldOfferId: string | null;
  currentOffer: FullOfferInfo | null;
  nearPlaces: OfferInfo[];
  comments: CommentInfo[];
}
