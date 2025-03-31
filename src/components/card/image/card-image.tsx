import { Link } from 'react-router-dom';
import { AppRoute, Display } from '../../../const';

type ImageInfo = {
  id: string;
  previewImage: string;
}

type CardImageProps = {
  display: Display;
  imageInfo: ImageInfo;
}

function CardImage({display, imageInfo}: CardImageProps): JSX.Element {
  const {id, previewImage} = imageInfo;

  return (
    <div className={`${display}__image-wrapper place-card__image-wrapper`}>
      <Link to={`${AppRoute.Offer}:${id}`}>
        <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
      </Link>
    </div>
  );
}

export default CardImage;
