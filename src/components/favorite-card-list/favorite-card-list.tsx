import { OfferInfo } from '../../types/offer';
import FavoriteCard from '../favorite-card/favorite-card';

type FavoriteCardListProps = {
  offers: OfferInfo[];
}

function FavoriteCardList({offers}: FavoriteCardListProps): JSX.Element {
  const cities: string[] = Array.from(new Set<string>(offers.map((offer) => offer.city.name)));
  return (
    <ul className="favorites__list">
      {cities.map((city) => {
        const currentFavoriteOffers: OfferInfo[] = offers.filter((offer) => offer.city.name === city);
        return (
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
        );
      }
      )}
    </ul>
  );
}

export default FavoriteCardList;
