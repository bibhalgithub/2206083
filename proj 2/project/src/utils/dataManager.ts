import { User, Post, Comment, DataCache } from '../types';
import { fetchUsers, fetchPosts, fetchComments } from './api';

class DataManager {
  private static instance: DataManager;
  private cache: DataCache = {
    users: new Map(),
    posts: [],
    topUsers: [],
    trendingPosts: [],
    lastUpdate: 0
  };

  private constructor() {}

  static getInstance(): DataManager {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager();
    }
    return DataManager.instance;
  }

  async updateCache(): Promise<void> {
    try {
      const [users, posts, comments] = await Promise.all([
        fetchUsers(),
        fetchPosts(),
        fetchComments()
      ]);

      // Update users map and calculate post counts
      const userPostCounts = new Map<string, number>();
      posts.forEach(post => {
        const count = userPostCounts.get(post.userId) || 0;
        userPostCounts.set(post.userId, count + 1);
      });

      users.forEach(user => {
        this.cache.users.set(user.id, {
          ...user,
          postCount: userPostCounts.get(user.id) || 0
        });
      });

      // Calculate top users
      this.cache.topUsers = Array.from(this.cache.users.values())
        .sort((a, b) => b.postCount - a.postCount)
        .slice(0, 5);

      // Update posts with comment counts
      const postCommentCounts = new Map<string, number>();
      comments.forEach(comment => {
        const count = postCommentCounts.get(comment.postId) || 0;
        postCommentCounts.set(comment.postId, count + 1);
      });

      this.cache.posts = posts.map(post => ({
        ...post,
        commentCount: postCommentCounts.get(post.id) || 0
      }));

      // Calculate trending posts
      const maxComments = Math.max(...Array.from(postCommentCounts.values()));
      this.cache.trendingPosts = this.cache.posts
        .filter(post => post.commentCount === maxComments)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

      this.cache.lastUpdate = Date.now();
    } catch (error) {
      console.error('Error updating cache:', error);
    }
  }

  getTopUsers(): User[] {
    return this.cache.topUsers;
  }

  getTrendingPosts(): Post[] {
    return this.cache.trendingPosts;
  }

  getPosts(): Post[] {
    return this.cache.posts.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  getUserById(id: string): User | undefined {
    return this.cache.users.get(id);
  }
}

export const dataManager = DataManager.getInstance();