import { Link } from 'react-router-dom';
import { AppRoute, Display } from '../../../const';

type CardImageProps = {
  display: Display;
  offerID: string;
  previewImage: string;
}

function CardImage({display, offerID, previewImage}: CardImageProps): JSX.Element {
  const width = display === Display.FAVORITE ? '150' : '260';
  const heigth = display === Display.FAVORITE ? '110' : '200';

  return (
    <div className={`${display}__image-wrapper place-card__image-wrapper`}>
      <Link to={`${AppRoute.Offer}:${offerID}`}>
        <img className="place-card__image" src={previewImage} width={width} height={heigth} alt="Place image" />
      </Link>
    </div>
  );
}

export default CardImage;
