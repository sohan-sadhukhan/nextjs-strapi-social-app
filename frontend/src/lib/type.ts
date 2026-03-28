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
  comments: {
    id: number;
    name: string;
    userName: string;
    avatarUrl: string;
    timeAgo: string;
    comment: string;
    isOwn: boolean;
  }[];
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

export type Notifications = {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  type: "like" | "comment";
  timeAgo: string;
  postThumb: string;
  isRead: boolean;
};
