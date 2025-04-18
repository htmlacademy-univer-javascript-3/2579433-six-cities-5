import CardContainer from '../../components/city-container/card-container/card-container';
import EmptyContainer from '../../components/city-container/empty-container/empty-container';
import Spinner from '../../components/spinner/spinner';
import Header from '../../components/header/header';
import { OfferInfo } from '../../types/offer';
import { CITIES, AuthorizationStatus} from '../../const';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { changeCity } from '../../store/action';
import { fetchOffersAction, checkAuthAction } from '../../store/api-actions';
import { setLoadingStatus } from '../../store/action';
import { useEffect } from 'react';

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
    dispatch(setLoadingStatus(true));
    dispatch(fetchOffersAction());
    dispatch(checkAuthAction());
  }, [dispatch, city]);

  return (
    <div className="page page--gray page--main">
      <Header isActive/>

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
