import './notFound.css';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function NotFound(): JSX.Element {
  return(
    <div className="overlay">
      <h1>404 Not Found</h1>
      <Link to={AppRoute.Main}>Back to main page</Link>
    </div>
  );
}

export default NotFound;
