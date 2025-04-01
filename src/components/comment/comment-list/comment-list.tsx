import { CommentInfo } from '../../../types/comment';
import Comment from '../comment/comment';

type CommentListProps = {
  comments: CommentInfo[];
}

function CommentList({comments}: CommentListProps): JSX.Element {
  return(
    <ul className="reviews__list">
      {comments.map((comment) => <Comment key={`${comment.id}-comment`} commentInfo={comment}/>)}
    </ul>
  );
}

export default CommentList;
