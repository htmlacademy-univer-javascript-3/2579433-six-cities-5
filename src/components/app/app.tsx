import Main from '../../pages/main/main';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import Login from '../../pages/login/login';
import NotFound from '../../pages/notFound/notFound';
import { AppRoute } from '../../const.ts';
import PrivateRoute from '../private-route/private-route.tsx';
import {Route, Routes} from 'react-router-dom';
import HistoryRouter from '../history-route/history-route.tsx';
import browserHistory from '../../service/browser-history.ts';
import { useEffect } from 'react';
import { checkAuthAction } from '../../store/api-actions';
import { store } from '../../store/store.ts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App(): JSX.Element {

  useEffect(() => {
    store.dispatch(checkAuthAction());
  }, []);

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
            <PrivateRoute redirectRoute={AppRoute.Login}>
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
      <ToastContainer/>
    </HistoryRouter>
  );
}

export default App;
