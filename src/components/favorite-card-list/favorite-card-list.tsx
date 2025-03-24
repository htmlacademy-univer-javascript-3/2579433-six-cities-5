import { OfferInfo } from '../../types/offer';
import FavoriteCard from '../favorite-card/favorite-card';
import { useState } from 'react';

type FavoriteCardListProps = {
  offers: OfferInfo[];
}

function FavoriteCardList({offers}: FavoriteCardListProps): JSX.Element {
  const [activeCard, setActiveCard] = useState('');
  const cities: string[] = Array.from(new Set<string>(offers.map((offer) => offer.city.name)));

  const handleMouseOver = (evt: React.MouseEvent<HTMLElement>) => {
    const {id} = evt.currentTarget;
    setActiveCard(id);
  };

  const handleMouseOut = () => {
    setActiveCard('');
  };

  return (
    <ul className="favorites__list">
      <li className="visually-hidden">{activeCard}</li>
      {cities.map((city) => {
        const currentFavoriteOffers: OfferInfo[] = offers.filter((offer) => offer.city.name === city);
        offers.forEach((offer, index) => {
          if(offer.city.name === city){
            offers.splice(index, 1);
          }
        });
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
              {currentFavoriteOffers.map((offer) => <FavoriteCard key={`${offer.id}-card`} offerInfo={offer} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}/>)}
            </div>
          </li>
        );
      }
      )}
    </ul>
  );
}

export default FavoriteCardList;
