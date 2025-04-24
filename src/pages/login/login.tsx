import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, CITIES } from '../../const';
import { FormEvent, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getAuthorizationStatus } from '../../store/selectors/authentication-selector';
import { checkAuthAction, loginAction } from '../../store/api-actions';
import { toast } from 'react-toastify';
import { changeCity } from '../../store/reducers/main-page-process';
import { useEffect } from 'react';

function Login(): JSX.Element {
  const city = Math.floor(Math.random() * 6);
  const authStatus = useAppSelector(getAuthorizationStatus);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLinkClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    evt.stopPropagation();
    dispatch(changeCity(CITIES[city]));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (emailRef.current !== null && passwordRef.current !== null) {
      const email = emailRef.current.value.trim();
      const password = passwordRef.current.value.trim();
      const isValid = /[a-zA-Z]/.test(password) && /\d/.test(password) && email !== '';
      if(isValid){
        dispatch(loginAction({
          email: email,
          password: password
        }));
      }else{
        toast.warn('Incorrect email or password');
      }
    }
  };

  useEffect(() => {
    dispatch(checkAuthAction());
    if(authStatus === AuthorizationStatus.Auth){
      navigate(AppRoute.Main);
    }
  }, [dispatch, authStatus, navigate]);

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input ref={emailRef} className="login__input form__input" type="email" name="email" placeholder="Email" required />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input ref={passwordRef} className="login__input form__input" type="password" name="password" placeholder="Password" required />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item" to={AppRoute.Main} onClick={handleLinkClick}>
                <span>{CITIES[city]}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
