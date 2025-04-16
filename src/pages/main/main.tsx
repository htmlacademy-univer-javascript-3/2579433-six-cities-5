import CardContainer from '../../components/city-container/card-container/card-container';
import EmptyContainer from '../../components/city-container/empty-container/empty-container';
import { OfferInfo } from '../../types/offer';
import { CITIES, AuthorizationStatus, AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { changeCity } from '../../store/action';
import { fetchOffersAction } from '../../store/api-actions';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../components/spinner/spinner';

function Main(): JSX.Element {

  const isLoading = useAppSelector((state) => state.isLoading);
  const authStatus = useAppSelector((state) => state.authorizationStatus);
  const city = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();

  const offerList = useAppSelector((state) => state.offerList);
  const filteredOffers: OfferInfo[] = offerList.filter((offer) => offer.city.name === city);

  const handleCityChange = (newCity: string) => {
    dispatch(changeCity(newCity));
  };

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch, city]);

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
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

      <main className="page__main page__main--index">
        {(isLoading || authStatus === AuthorizationStatus.Unknown) && <Spinner/>}
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {CITIES.map((name) =>(
                <li className="locations__item" key={name}>
                  <a
                    className={`locations__item-link tabs__item ${name === city ? 'tabs__item--active' : 'href="#"'}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleCityChange(name);
                    }}
                  >
                    <span>{name}</span>
                  </a>
                </li>))}
            </ul>
          </section>
        </div>
        <div className="cities">
          { filteredOffers.length === 0 ?
            <EmptyContainer/> :
            <CardContainer city={city} filteredOffers={filteredOffers}/>}
        </div>
      </main>
    </div>
  );
}

export default Main;
