import { ReactNode } from 'react';
import { Display } from '../../../const';

type CardWrapperProps = {
  display: Display;
  id: string;
  children: ReactNode;
  onMouseOver?: (evt: React.MouseEvent<HTMLElement>) => void;
  onMouseOut?: (evt: React.MouseEvent<HTMLElement>) => void;
}

function CardWrapper({display, id, children, onMouseOver, onMouseOut}: CardWrapperProps): JSX.Element {
  return(
    <article className={`${display}__card place-card`} id={id} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
      {children}
    </article>
  );
}

export default CardWrapper;
