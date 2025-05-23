import React, { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../store/store';
import { postComment } from '../../../store/api-actions';

function CommentForm(): JSX.Element {
  const [commentInfo, setCommentInfo] = useState({rating: 0, text: ''});
  const { offerId } = useParams<{ offerId: string }>();
  const {rating, text} = commentInfo;
  const dispatch = useAppDispatch();

  const handleRatingChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInfo({...commentInfo, rating: parseInt(evt.target.value, 10)});
  };

  const handleTextChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    evt.preventDefault();
    setCommentInfo({...commentInfo, text: evt.target.value});
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if(offerId){
      dispatch(postComment({
        offerId: offerId,
        comment: text,
        rating: rating
      }));
      setCommentInfo({rating: 0, text: ''});
    }
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <p className="visually-hidden">{rating}</p>
        <input className="form__rating-input visually-hidden" onChange={handleRatingChange} name="rating" value="5" id="5-stars" type="radio" />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" onChange={handleRatingChange} name="rating" value="4" id="4-stars" type="radio" />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" onChange={handleRatingChange} name="rating" value="3" id="3-stars" type="radio" />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" onChange={handleRatingChange} name="rating" value="2" id="2-stars" type="radio" />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" onChange={handleRatingChange} name="rating" value="1" id="1-star" type="radio" />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea" onChange={handleTextChange} id="review" name="review" value={text} placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                      To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={rating === 0 || text.length < 50}>Submit</button>
      </div>
    </form>
  );
}

export default CommentForm;
