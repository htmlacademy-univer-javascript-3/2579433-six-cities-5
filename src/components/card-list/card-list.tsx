import { OfferInfo } from '../../types/offer';
import { Display } from '../../const';
import CardWrapper from '../card/wrapper/card-wrapper';
import CardLabel from '../card/label/card-label';
import CardImage from '../card/image/card-image';
import CardInfo from '../card/info/card-info';
import { usePendingFavorites } from '../../hooks/use-pending-favorites';
import { useEffect } from 'react';

type CardListProps = {
  display : Display;
  offers: OfferInfo[];
  onPointChange: (value: string | null) => void;
}

function CardList({display, offers, onPointChange}: CardListProps): JSX.Element {
  const {toggleFavorite, flushFavorites} = usePendingFavorites();

  useEffect(() => () => {
    flushFavorites();
  }, [flushFavorites]);

  const handleMouseOver = (evt: React.MouseEvent<HTMLElement>) => {
    const {id} = evt.currentTarget;
    onPointChange(id);
  };

  const handleMouseOut = () => {
    onPointChange(null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => {
        const shortCardInfo = {id: offer.id, title: offer.title, type: offer.type, price: offer.price, rating: offer.rating, isFavorite: offer.isFavorite};

        return (
          <CardWrapper key={`${offer.id}-card`} display={display} id={offer.id} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <CardLabel isPremium={offer.isPremium}/>
            <CardImage display={display} offerID={offer.id} previewImage={offer.previewImage}/>
            <CardInfo display={display} shortCardInfo={shortCardInfo} toggleFavorite={toggleFavorite}/>
          </CardWrapper>);
      })}
    </div>
  );
}

export default CardList;
