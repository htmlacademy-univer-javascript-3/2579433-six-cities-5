import { AppRoute, AuthorizationStatus } from '../../const';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { getAuthorizationStatus, getUserData } from '../../store/selectors/authentication-selector';
import { logoutAction } from '../../store/api-actions';

type HeaderProps = {
  isActive: boolean;
}

function Header({isActive}: HeaderProps): JSX.Element {
  const authStatus = useAppSelector(getAuthorizationStatus);
  const userData = useAppSelector(getUserData);
  const dispatch = useAppDispatch();

  const linkClass = isActive ? 'header__logo-link header__logo-link--active' : 'header__logo-link';

  const handleLogout = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    evt.stopPropagation();
    if(userData){
      dispatch(logoutAction);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className={linkClass} to={AppRoute.Main}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            {authStatus === AuthorizationStatus.Auth ?
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">{userData && userData.email}</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#" onClick={handleLogout}>
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
  );
}

export default Header;
