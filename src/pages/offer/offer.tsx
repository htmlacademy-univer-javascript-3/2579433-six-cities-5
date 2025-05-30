import { useEffect, useState } from 'react';
import { Display, AuthorizationStatus, AppRoute } from '../../const.ts';
import { useParams, useNavigate } from 'react-router-dom';
import Map from '../../components/map/map.tsx';
import CardList from '../../components/card-list/card-list.tsx';
import CommentForm from '../../components/comment/comment-form/comment-form.tsx';
import CommentList from '../../components/comment/comment-list/comment-list.tsx';
import Spinner from '../../components/spinner/spinner.tsx';
import Header from '../../components/header/header.tsx';
import { PointInfo } from '../../types/offer.ts';
import { useAppSelector, useAppDispatch } from '../../store/store.ts';
import { getAuthorizationStatus } from '../../store/selectors/authentication-selector.ts';
import { getLoadingStatus, getOldOfferId, getOfferBundle } from '../../store/selectors/offer-page-selector.ts';
import { setOldOfferId } from '../../store/reducers/offer-page-process.ts';
import { fetchCurrentOfferAction, fetchCommentsAction, fetchNearbyAction, changeOfferStatus, checkAuthAction } from '../../store/api-actions.ts';
import { addToFavorites, removeFromFavorites } from '../../store/reducers/favorite-page-process.ts';

function Offer(): JSX.Element {
  const { offerId } = useParams<{ offerId: string }>();
  const [isFavorite, setIsFavorite] = useState(false);

  const isLoading = useAppSelector(getLoadingStatus);
  const authStatus = useAppSelector(getAuthorizationStatus);
  const {offer, comments, nearOffersInfo} = useAppSelector(getOfferBundle);
  const oldOfferId = useAppSelector(getOldOfferId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(offerId && oldOfferId !== offerId){
      dispatch(fetchCurrentOfferAction(offerId));
      dispatch(fetchNearbyAction(offerId));
      dispatch(fetchCommentsAction(offerId));
      dispatch(setOldOfferId(offerId));
    }
    if(offer){
      setIsFavorite(offer.isFavorite);
    }
    return () => {
      if(offer && offer.isFavorite !== isFavorite){
        dispatch(changeOfferStatus({offerId: offer.id, status: Number(isFavorite)}));
      }
    };
  }, [dispatch, offerId, oldOfferId, isFavorite, offer]);

  if(!offer || isLoading){
    return(
      <div className="page">
        <Header isActive={false}/>
        <Spinner/>
      </div>
    );
  }

  const handleBookmarkClick = () => {
    dispatch(checkAuthAction());
    if(offerId){
      if(authStatus !== AuthorizationStatus.Auth){
        navigate(AppRoute.Login);
      }else{
        if(isFavorite){
          dispatch(removeFromFavorites(offerId));
        }else{
          dispatch(addToFavorites({id: offer.id, title: offer.title, type: offer.type, price: offer.price, city: offer.city, location: offer.location, isFavorite: isFavorite, isPremium: offer.isPremium, rating: offer.rating, previewImage: offer.images[0]}));
        }
        setIsFavorite((state) => !state);
      }
    }
  };

  const {id, title, type, price, location, isPremium, rating, description, bedrooms, goods, host, images, maxAdults} = offer;
  const firstThreePoints = nearOffersInfo.slice(0, 3);
  const points: PointInfo[] = firstThreePoints.map((point) => ({id: point.id, location: point.location}));
  points.push({id: id, location: location});

  return (
    <div className="page">
      <Header isActive={false}/>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img className="offer__image" src={image} alt="Photo studio" />
                </div>
              )
              )}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              { isPremium &&
                <div className="offer__mark">
                  <span>Premium</span>
                </div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {title}
                </h1>
                <button className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`} type="button" onClick={handleBookmarkClick}>
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{isFavorite ? 'In' : 'To'} bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${rating * 20}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((good) => (
                    <li className="offer__inside-item" key={good}>
                      {good}
                    </li>
                  )
                  )}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {host.name}
                  </span>
                  <span className="offer__user-status">
                    {host.isPro && 'Pro'}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
                <CommentList comments={comments}/>
                {authStatus === AuthorizationStatus.Auth && <CommentForm/>}
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map city={offer.city} points={points} selectedPoint={id} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <CardList display={Display.NEAR} offers={firstThreePoints} onPointChange={() => {}}/>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Offer;
