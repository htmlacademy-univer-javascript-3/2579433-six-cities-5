type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type CommentInfo = {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
}

export type Comment = {
  offerId: string;
  comment: string;
  rating: number;
}
