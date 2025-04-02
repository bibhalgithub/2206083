import { User, Post, Comment } from '../types';

// Mock Users Data
export const mockUsers: Record<string, string> = {
  "1": "John Doe",
  "2": "Jane Doe",
  "3": "Alice Smith",
  "4": "Bob Johnson",
  "5": "Charlie Brown",
  "6": "Diana White",
  "7": "Edward Davis",
  "8": "Fiona Miller",
  "9": "George Wilson",
  "10": "Helen Moore"
};

// Mock Posts Data
export const mockPosts: Array<{
  id: string;
  userId: string;
  content: string;
  timestamp: string;
}> = [
  {
    id: "246",
    userId: "1",
    content: "Post about ant",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString()
  },
  {
    id: "161",
    userId: "2",
    content: "Post about elephant",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString()
  },
  {
    id: "150",
    userId: "3",
    content: "Post about ocean",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString()
  },
  {
    id: "370",
    userId: "1",
    content: "Post about monkey",
    timestamp: new Date().toISOString()
  }
];

// Mock Comments Data
export const mockComments: Array<{
  id: string;
  postId: string;
  userId: string;
  content: string;
  timestamp: string;
}> = [
  {
    id: "1",
    postId: "246",
    userId: "2",
    content: "Interesting post about ants!",
    timestamp: new Date().toISOString()
  },
  {
    id: "2",
    postId: "370",
    userId: "3",
    content: "Monkeys are fascinating",
    timestamp: new Date().toISOString()
  },
  {
    id: "3",
    postId: "370",
    userId: "4",
    content: "Great observation!",
    timestamp: new Date().toISOString()
  }
];