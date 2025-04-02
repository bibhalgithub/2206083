export interface User {
  id: string;
  name: string;
  avatar: string;
  postCount: number;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  timestamp: string;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  commentCount: number;
  image: string;
}

// Cache structure for efficient data management
export interface DataCache {
  users: Map<string, User>;
  posts: Post[];
  topUsers: User[];
  trendingPosts: Post[];
  lastUpdate: number;
}