import { OfferInfo } from '../../types/offer';
import React from 'react';
import Card from '../card/card';

type CardListProps = {
  offers: OfferInfo[];
}

function CardList({offers}: CardListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer, id) => {
        const key = `${id}-card`;
        return (
          <React.Fragment key={key}>
            <Card offerInfo={offer}/>
          </React.Fragment>);
      }
      )}
    </div>
  );
}

export default CardList;
