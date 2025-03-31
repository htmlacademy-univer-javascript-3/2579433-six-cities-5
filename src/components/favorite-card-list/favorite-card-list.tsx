import { OfferInfo } from '../../types/offer';
import FavoriteCardGroup from './favorite-card-group/favorite-card-group';

type FavoriteCardListProps = {
  offers: OfferInfo[];
}

function FavoriteCardList({offers}: FavoriteCardListProps): JSX.Element {
  const cityOfferMap = new Map<string, OfferInfo[]>();

  offers.forEach((offer) => {
    if(!cityOfferMap.has(offer.city.name)){
      cityOfferMap.set(offer.city.name, []);
    }
    cityOfferMap.get(offer.city.name)?.push(offer);
  });

  return (
    <ul className="favorites__list">
      {[...cityOfferMap.entries()].map(([city, currentFavoriteOffers]) => (
        <FavoriteCardGroup key={city} city={city} currentFavoriteOffers={currentFavoriteOffers}/>
      ))}
    </ul>
  );
}

export default FavoriteCardList;
