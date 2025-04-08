import CardList from '../../components/card-list/card-list';
import Map from '../../components/map/map';
import Sort from '../../components/sort/sort';
import { OfferInfo, PointInfo } from '../../types/offer';
import { Display, CITIES, SortType } from '../../const';
import { sortByRating, sortHighToLow, sortLowToHigh } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { changeCity, fillOfferList } from '../../store/action';
import { useEffect, useState } from 'react';
import { offers } from '../../mock/offers';

function Main(): JSX.Element {

  const city = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();
  const [sortType, setSortType] = useState<string>(SortType.POPULAR);
  const offerList = useAppSelector((state) => state.offerList);
  const filteredOffers: OfferInfo[] = offerList.filter((offer) => offer.city.name === city);
  const points: PointInfo[] = filteredOffers.map((offer) => ({id: offer.id, location: offer.location}));

  const handleCityChange = (newCity: string) => {
    dispatch(changeCity(newCity));
    setSortType(SortType.POPULAR);
  };

  useEffect(() => {
    dispatch(fillOfferList(offers));
  }, [dispatch, city]);

  const handleSortChange = (newSortType: string) => {
    setSortType(newSortType);
    switch (newSortType){
      case SortType.POPULAR:
        break;
      case SortType.HIGH_TO_LOW:
        filteredOffers.sort(sortHighToLow);
        break;
      case SortType.LOW_TO_HIGH:
        filteredOffers.sort(sortLowToHigh);
        break;
      case SortType.TOP_RATED:
        filteredOffers.sort(sortByRating);
        break;
      default:
        throw new Error('Incorrect sortType');
    }
  };

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
            (
              <div className="cities__places-container cities__places-container--empty container">
                <section className="cities__no-places">
                  <div className="cities__status-wrapper tabs__content">
                    <b className="cities__status">No places to stay available</b>
                    <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
                  </div>
                </section>
                <div className="cities__right-section"></div>
              </div>) :
            (
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{filteredOffers.length} places to stay in {city}</b>
                  <Sort type={sortType} onSortClick={handleSortChange}/>
                  <CardList display={Display.REGULAR} offers={filteredOffers}/>
                </section>
                <div className="cities__right-section">
                  <section className="cities__map map">
                    <Map city={filteredOffers[0].city} points={points} selectedPoint={null} />
                  </section>
                </div>
              </div>)}
        </div>
      </main>
    </div>
  );
}

export default Main;
