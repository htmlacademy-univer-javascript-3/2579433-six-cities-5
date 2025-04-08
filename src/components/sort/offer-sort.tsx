import { useState } from 'react';
import { SortType } from '../../const';

type OfferSortProps = {
  type: SortType;
  onSortClick: (sortType: SortType) => void;
}

function OfferSort({type, onSortClick}: OfferSortProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const sortTypes = Object.values(SortType);

  return (
    <form className="places__sorting" action="#" method="get" onClick={(evt) => {
      evt.preventDefault();
      setIsOpen((state) => !state);
    }}
    >
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0}>
        {type}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {sortTypes.map((sortType) => (
          <li className={`places__option ${type === sortType ? 'places__option--active' : ''}`} key={sortType} tabIndex={0} onClick={() => onSortClick(sortType)}>{sortType} </li>
        ))}
      </ul>
    </form>
  );
}

export default OfferSort;
