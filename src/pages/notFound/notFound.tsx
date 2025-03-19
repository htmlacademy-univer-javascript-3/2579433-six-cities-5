import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function NotFound(): JSX.Element {
  return(
    <>
      <p>404 Not Found</p>
      <Link to={AppRoute.Main}>Back to main page</Link>
    </>
  );
}

export default NotFound;
