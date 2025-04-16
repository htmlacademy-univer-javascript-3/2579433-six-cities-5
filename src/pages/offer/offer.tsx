import { useState, useEffect } from 'react';
import { AppRoute, Display, AuthorizationStatus } from '../../const.ts';
import { Link, useParams } from 'react-router-dom';
import Map from '../../components/map/map.tsx';
import CardList from '../../components/card-list/card-list.tsx';
import CommentForm from '../../components/comment/comment-form/comment-form.tsx';
import CommentList from '../../components/comment/comment-list/comment-list.tsx';
import Spinner from '../../components/spinner/spinner.tsx';
import { PointInfo } from '../../types/offer.ts';
import { useAppSelector, useAppDispatch } from '../../store/store.ts';
import { fetchCurrentOfferAction } from '../../store/api-actions.ts';

function Offer(): JSX.Element {
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  const isLoading = useAppSelector((state) => state.isLoading);
  const authStatus = useAppSelector((state) => state.authorizationStatus);
  const offer = useAppSelector((state) => state.currentOffer);
  const comments = useAppSelector((state) => state.comments);
  const nearOffersInfo = useAppSelector((state) => state.nearPlaces);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(id){
      dispatch(fetchCurrentOfferAction(id));
    }
  }, [dispatch, id]);

  const {title, type, price, isFavorite, isPremium, rating, description, bedrooms, goods, host, images, maxAdults} = offer;
  const points: PointInfo[] = nearOffersInfo.map((point) => ({id: point.id, location: point.location}));

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              {authStatus === AuthorizationStatus.Auth ?
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                      <span className="header__favorite-count">3</span>
                    </a>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="#">
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </ul> :
                <div className="header__nav-item">
                  <ul className="header__nav-list">
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                        </div>
                        <span className="header__signout">Sign in</span>
                      </Link>
                    </li>
                  </ul>
                </div>}
            </nav>
          </div>
        </div>
      </header>

      {(isLoading || authStatus === AuthorizationStatus.Unknown) ? <Spinner/> :
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
                  <button className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`} type="button">
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
              <Map city={offer.city} points={points} selectedPoint={selectedPoint} />
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <CardList display={Display.NEAR} offers={nearOffersInfo} onPointChange={setSelectedPoint}/>
            </section>
          </div>
        </main>}
    </div>
  );
}

export default Offer;
