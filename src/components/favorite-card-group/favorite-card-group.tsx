import FavoriteCard from '../favorite-card/favorite-card';
import { OfferInfo } from '../../types/offer';

type CardGroupProps = {
  city: string;
  currentFavoriteOffers: OfferInfo[];
}

function FavoriteCardGroup({city, currentFavoriteOffers}: CardGroupProps): JSX.Element{
  return (
    <li className="favorites__locations-items">
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

export default FavoriteCardGroup;
