import CardList from '../../components/card-list/card-list';
import { OfferInfo, PointInfo } from '../../types/offer';
import { Display, CITIES } from '../../const';
import Map from '../../components/map/map';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { changeCity, fillOfferList } from '../../store/action';
import { useEffect } from 'react';
import { offers } from '../../mock/offers';

function Main(): JSX.Element {

  const city = useAppSelector((state) => state.city);
  const offerList = useAppSelector((state) => state.offerList);
  const dispatch = useAppDispatch();
  const handleCityChange = (newCity: string) => {
    dispatch(changeCity(newCity));
  };

  useEffect(() => {
    dispatch(fillOfferList(offers));
  }, [dispatch, city]);

  const filteredOffers: OfferInfo[] = offerList.filter((offer) => offer.city.name === city);
  const points: PointInfo[] = filteredOffers.map((offer) => ({id: offer.id, location: offer.location}));
  const cityNames = CITIES.map((info) => info.name);

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
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {cityNames.map((name) =>(
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
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{filteredOffers.length} places to stay in {city}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <CardList display={Display.REGULAR} offers={filteredOffers}/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={CITIES.find((info) => city === info.name) || CITIES[0]} points={points} selectedPoint={null} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
