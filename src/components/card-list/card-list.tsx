import { OfferInfo } from '../../types/offer';
import { useState } from 'react';
import { Display } from '../../const';
import CardWrapper from '../card/wrapper/card-wrapper';
import CardLabel from '../card/label/card-label';
import CardImage from '../card/image/card-image';
import CardInfo from '../card/info/card-info';

type CardListProps = {
  display : Display;
  offers: OfferInfo[];
}

function CardList({display, offers}: CardListProps): JSX.Element {
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
      {offers.map((offer) => {
        const shortCardInfo = {id: offer.id, title: offer.title, type: offer.type, price: offer.price, rating: offer.rating, isFavorite: offer.isFavorite};
        const imageInfo = {id: offer.id, previewImage: offer.previewImage};

        return (
          <CardWrapper key={`${offer.id}-card`} display={display} id={offer.id} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <CardLabel isPremium={offer.isPremium}/>
            <CardImage display={display} imageInfo={imageInfo}/>
            <CardInfo display={display} shortCardInfo={shortCardInfo}/>
          </CardWrapper>);
      })}
    </div>
  );
}

export default CardList;
