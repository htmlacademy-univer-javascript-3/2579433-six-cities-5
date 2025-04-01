type CardLabelProps = {
  isPremium: boolean;
}

function CardLabel({isPremium}: CardLabelProps){
  return(
    isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
  );
}

export default CardLabel;
