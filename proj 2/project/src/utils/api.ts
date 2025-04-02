import { User, Post, Comment } from '../types';
import { mockUsers, mockPosts, mockComments } from './mockData';

export async function fetchUsers(): Promise<User[]> {
  return Object.entries(mockUsers).map(([id, name]) => ({
    id,
    name,
    avatar: `https://source.unsplash.com/random/200x200?face&u=${id}`,
    postCount: 0 // This will be calculated in the data manager
  }));
}

export async function fetchPosts(): Promise<Post[]> {
  return mockPosts.map(post => ({
    ...post,
    commentCount: 0, // This will be calculated in the data manager
    image: `https://source.unsplash.com/random/800x600?nature&p=${post.id}`
  }));
}

export async function fetchComments(): Promise<Comment[]> {
  return mockComments;
}