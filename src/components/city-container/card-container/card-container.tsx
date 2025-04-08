import OfferSort from '../../sort/offer-sort';
import CardList from '../../card-list/card-list';
import Map from '../../map/map';
import { Display, SortType } from '../../../const';
import { OfferInfo, PointInfo } from '../../../types/offer';
import { useState, useEffect } from 'react';
import { sortByType } from '../../../utils';

type CardContainerProps = {
  city: string;
  filteredOffers: OfferInfo[];
}

function CardContainer({city, filteredOffers}: CardContainerProps): JSX.Element {
  const [sortType, setSortType] = useState<SortType>(SortType.POPULAR);
  const points: PointInfo[] = filteredOffers.map((offer) => ({id: offer.id, location: offer.location}));
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);

  useEffect(() => {
    setSortType(SortType.POPULAR);
  }, [city]);

  const handleSortChange = (newSortType: SortType) => {
    setSortType(newSortType);
    filteredOffers.sort(sortByType[newSortType]);
  };

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{filteredOffers.length} places to stay in {city}</b>
        <OfferSort type={sortType} onSortClick={handleSortChange}/>
        <CardList display={Display.REGULAR} offers={filteredOffers} onPointChange={setSelectedPoint}/>
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <Map city={filteredOffers[0].city} points={points} selectedPoint={selectedPoint} />
        </section>
      </div>
    </div>
  );
}

export default CardContainer;
