import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AppRoute, AuthorizationStatus, Display } from '../../../const';
import { OfferInfo } from '../../../types/offer';
import { useAppSelector, useAppDispatch } from '../../../store/store';
import { getAuthorizationStatus } from '../../../store/selectors/authentication-selector';
import { checkAuthAction } from '../../../store/api-actions';

type CardInfoProps = {
  display: Display;
  shortCardInfo: OfferInfo;
  toggleFavorite: (offer: OfferInfo, newStatus: boolean, nitialStatus: boolean) => void;
}

function CardInfo({display, shortCardInfo, toggleFavorite}: CardInfoProps): JSX.Element {
  const [isFavorite, setIsFavorite] = useState(shortCardInfo.isFavorite);
  const {id, title, type, price, rating} = shortCardInfo;
  const cardClass = display === Display.FAVORITE && `${display}__card-info `;
  const authStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleBookmarkClick = () => {
    dispatch(checkAuthAction());
    if(authStatus !== AuthorizationStatus.Auth){
      navigate(AppRoute.Login);
    }else{
      const newStatus = !isFavorite;
      setIsFavorite(newStatus);
      toggleFavorite(shortCardInfo, newStatus, shortCardInfo.isFavorite);
    }
  };

  return(
    <div className={`${cardClass}place-card__info`}>
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`} onClick={handleBookmarkClick} type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">{isFavorite ? 'In' : 'To'} bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: `${rating * 20}%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <Link to={`${AppRoute.Offer}${id}`}>{title}</Link>
      </h2>
      <p className="place-card__type">{type}</p>
    </div>
  );
}

export default CardInfo;
