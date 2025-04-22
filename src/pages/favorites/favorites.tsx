import FavoriteCardList from '../../components/favorite-card-list/favorite-card-list';
import Header from '../../components/header/header';
import FavoritesEmptyList from '../../components/favorite-card-list/favorite-empty-list/favorite-empty-list';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../store/store';
import { getFavoriteOfferList } from '../../store/selectors/favorite-page-selector';

function Favorites(): JSX.Element {
  const favoriteOfferList = useAppSelector(getFavoriteOfferList);

  return (
    <div className="page">
      <Header isActive={false}/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favoriteOfferList.length === 0 ? <FavoritesEmptyList/> :
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoriteCardList offers={favoriteOfferList}/>
            </section>}
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export default Favorites;
