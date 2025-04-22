import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import { useAppSelector } from '../../store/store';
import { getAuthorizationStatus } from '../../store/selectors/authentication-selector';

type PrivateRouteProps = {
  children: JSX.Element;
  redirectRoute: AppRoute;
}

function PrivateRoute({redirectRoute, children}: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={redirectRoute} />
  );
}

export default PrivateRoute;
