import { OfferInfo } from '../../../types/offer';
import { Display } from '../../../const';
import CardWrapper from '../../card/wrapper/card-wrapper';
import CardLabel from '../../card/label/card-label';
import CardImage from '../../card/image/card-image';
import CardInfo from '../../card/info/card-info';


type CardGroupProps = {
  city: string;
  currentFavoriteOffers: OfferInfo[];
}

function FavoriteCardGroup({city, currentFavoriteOffers}: CardGroupProps): JSX.Element{
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {currentFavoriteOffers.map((offer) => {
          const shortCardInfo = {id: offer.id, title: offer.title, type: offer.type, price: offer.price, rating: offer.rating, isFavorite: offer.isFavorite};
          const imageInfo = {id: offer.id, previewImage: offer.previewImage};

          return (
            <CardWrapper key={`${offer.id}-card`} display={Display.FAVORITE} id={offer.id} onMouseOver={() => {}} onMouseOut={() => {}}>
              <CardLabel isPremium={offer.isPremium}/>
              <CardImage display={Display.FAVORITE} imageInfo={imageInfo}/>
              <CardInfo display={Display.FAVORITE} shortCardInfo={shortCardInfo}/>
            </CardWrapper>);
        })}
      </div>
    </li>
  );
}

export default FavoriteCardGroup;
