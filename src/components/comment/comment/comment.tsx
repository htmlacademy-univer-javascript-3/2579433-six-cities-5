import { CommentInfo } from '../../../types/comment';

type CommentProps = {
  commentInfo: CommentInfo;
}

function Comment({commentInfo}: CommentProps): JSX.Element {
  const {id, date, user, comment, rating} = commentInfo;
  const dateFormat = new Date(date);

  return (
    <li className="reviews__item" id={id}>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">{user.name}</span>
        <span className="reviews__user-status">{user.isPro && 'Pro'}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${20 * rating}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={date.substring(0, 9)}>{dateFormat.toLocaleDateString('en-GB', {day: 'numeric', month: 'long'})}</time>
      </div>
    </li>
  );
}

export default Comment;
