import { OfferInfo } from '../../types/offer';
import Card from '../card/card';
import { useState } from 'react';

type CardListProps = {
  offers: OfferInfo[];
}

function CardList({offers}: CardListProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const handleMouseOver = (evt: React.MouseEvent<HTMLElement>) => {
    const {id} = evt.currentTarget;
    setActiveCard(id);
  };

  const handleMouseOut = () => {
    setActiveCard(null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      <p className="visually-hidden">{activeCard}</p>
      {offers.map((offer) => <Card key={`${offer.id}-card`} offerInfo={offer} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}/>)}
    </div>
  );
}

export default CardList;
