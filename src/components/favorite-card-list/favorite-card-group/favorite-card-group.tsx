import { OfferInfo } from '../../../types/offer';
import { Display, AppRoute } from '../../../const';
import CardWrapper from '../../card/wrapper/card-wrapper';
import CardLabel from '../../card/label/card-label';
import CardImage from '../../card/image/card-image';
import CardInfo from '../../card/info/card-info';
import { Link } from 'react-router-dom';
import { changeCity } from '../../../store/reducers/main-page-process';
import { useAppDispatch } from '../../../store/store';
import { useEffect } from 'react';
import { usePendingFavorites } from '../../../hooks/use-pending-favorites';

type CardGroupProps = {
  city: string;
  currentFavoriteOffers: OfferInfo[];
}

function FavoriteCardGroup({city, currentFavoriteOffers}: CardGroupProps): JSX.Element{
  const dispatch = useAppDispatch();
  const {toggleFavorite, flushFavorites} = usePendingFavorites();

  useEffect(() => () => {
    flushFavorites();
  }, [flushFavorites]);

  const handleLinkClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    evt.stopPropagation();
    dispatch(changeCity(city));
  };

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={AppRoute.Main} onClick={handleLinkClick}>
            <span>{city}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {currentFavoriteOffers.map((offer) => (
          <CardWrapper key={`${offer.id}-card`} display={Display.FAVORITE} id={offer.id}>
            <CardLabel isPremium={offer.isPremium}/>
            <CardImage display={Display.FAVORITE} offerID={offer.id} previewImage={offer.previewImage}/>
            <CardInfo display={Display.FAVORITE} shortCardInfo={offer} toggleFavorite={toggleFavorite}/>
          </CardWrapper>)
        )}
      </div>
    </li>
  );
}

export default FavoriteCardGroup;
