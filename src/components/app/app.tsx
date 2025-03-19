import Main from '../../pages/main/main';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import Login from '../../pages/login/login';
import NotFound from '../../pages/notFound/notFound';
import { AppRoute, AuthorizationStatus } from '../../const.ts';
import PrivateRoute from '../private-route/private-route.tsx';
import {Route, BrowserRouter, Routes} from 'react-router-dom';


type AppProps = {
  placesToStay: number;
}

function App({placesToStay}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element = {<Main placesToStay = {placesToStay}/>}
        />
        <Route
          path={AppRoute.Favorites}
          element = {
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
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
    </BrowserRouter>
  );
}

export default App;
