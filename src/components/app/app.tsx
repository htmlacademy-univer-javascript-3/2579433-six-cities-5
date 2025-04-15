import Main from '../../pages/main/main';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import Login from '../../pages/login/login';
import NotFound from '../../pages/notFound/notFound';
import { AppRoute } from '../../const.ts';
import { useAppSelector } from '../../store/store.ts';
import PrivateRoute from '../private-route/private-route.tsx';
import {Route, Routes} from 'react-router-dom';
import HistoryRouter from '../history-route/history-route.tsx';
import browserHistory from '../../service/browser-history.ts';

function App(): JSX.Element {
  const authStatus = useAppSelector((state) => state.authorizationStatus);

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Main}
          element = {<Main/>}
        />
        <Route
          path={AppRoute.Favorites}
          element = {
            <PrivateRoute authorizationStatus={authStatus}>
              <Favorites/>
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.Offer}:id`}
          element = {<Offer/>}
        />
        <Route
          path={AppRoute.Login}
          element = {<Login/>}
        />
        <Route
          path='*'
          element = {<NotFound/>}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
