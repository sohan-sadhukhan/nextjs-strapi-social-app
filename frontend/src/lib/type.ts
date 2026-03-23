export type UserInfoType = {
  name: string;
  username: string;
  bio: string;
  joinedDate: string;
  posts: number;
  followers: number;
  following: number;
  avatarUrl: string;
  coverUrl: string;
};

export type PostType = {
  authorName: string;
  authorUsername: string;
  authorAvatar: string;
  timeAgo: string;
  description: string;
  postImage: string;
  reactionCount: number;
  isFollowing: boolean;
  isOwnPost: boolean;
};

export type SuggestedUserType = {
  id: number;
  name: string;
  handle: string;
  mutual: string;
  initials: string;
  bg: string;
  text: string;
};
