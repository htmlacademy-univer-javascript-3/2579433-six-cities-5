import { OfferInfo } from '../../types/offer';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type CardProps = {
  offerInfo: OfferInfo;
  onMouseOver: (evt: React.MouseEvent<HTMLElement>) => void;
  onMouseOut: (evt: React.MouseEvent<HTMLElement>) => void;
}

function Card({offerInfo, onMouseOver, onMouseOut}: CardProps): JSX.Element {
  const [isFavorite, setIsFavorite] = useState(offerInfo.isFavorite);
  const {id, title, type, price, isPremium, rating, previewImage} = offerInfo;

  const handleBookmarkClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setIsFavorite((currentState) => !currentState);
  };

  return (
    <article className="cities__card place-card" id={id} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
      { isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div> }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Offer}:${id}`}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
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
          <Link to={`${AppRoute.Offer}:${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default Card;
