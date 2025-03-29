type CityLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type OfferCity = {
  name: string;
  location: CityLocation;
};

type OfferLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
};

type HostInfo = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type OfferInfo = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: OfferCity;
  location: OfferLocation;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

export type FullOfferInfo = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: OfferCity;
  location: OfferLocation;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: HostInfo;
  images: string[];
  maxAdults: number;
};

export type PointInfo = {
  id: string;
  location: OfferLocation;
}
