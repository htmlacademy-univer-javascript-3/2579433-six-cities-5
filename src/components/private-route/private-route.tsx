import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import { useAppSelector } from '../../store/store';

type PrivateRouteProps = {
  children: JSX.Element;
  redirectRoute: AppRoute;
}

function PrivateRoute({redirectRoute, children}: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={redirectRoute} />
  );
}

export default PrivateRoute;
