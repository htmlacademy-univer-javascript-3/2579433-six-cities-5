import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function NotFound(): JSX.Element {
  return(
    <>
      <h1>404 Not Found</h1>
      <Link to={AppRoute.Main}>Back to main page</Link>
    </>
  );
}

export default NotFound;
