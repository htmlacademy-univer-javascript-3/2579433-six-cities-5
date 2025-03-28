import { OfferInfo } from '../../types/offer';
import FavoriteCard from '../favorite-card/favorite-card';

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
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{city}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {currentFavoriteOffers.map((offer) => <FavoriteCard key={`${offer.id}-card`} offerInfo={offer}/>)}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default FavoriteCardList;
