import { Icon } from 'leaflet';
import { OfferCity } from './types/offer';

export enum AppRoute {
  Favorites = '/favorites',
  Login = '/login',
  Main = '/',
  Offer = '/offer/'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum Display {
  FAVORITE = 'favorites',
  NEAR = 'near-places',
  REGULAR = 'cities'
}

export const CITIES: OfferCity[] = [
  {name: 'Paris', location: {latitude: 48.864716, longitude: 2.349014, zoom: 8}},
  {name: 'Cologne', location: {latitude: 50.933594, longitude: 6.961899, zoom: 8}},
  {name: 'Brussels', location: {latitude: 50.872986, longitude: 4.309333, zoom: 8}},
  {name: 'Amsterdam', location: {latitude: 52.377956, longitude: 	4.897070, zoom: 8}},
  {name: 'Hamburg', location: {latitude: 53.551086, longitude: 9.993682, zoom: 8}},
  {name: 'Dusseldorf', location: {latitude: 51.233334, longitude: 6.783333, zoom: 8}}];

export const defaultCustomIcon = new Icon({
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

export const currentCustomIcon = new Icon({
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});
