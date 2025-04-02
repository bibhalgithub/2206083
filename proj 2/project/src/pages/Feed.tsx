import React, { useEffect, useState } from 'react';
import { Post } from '../types';
import { PostCard } from '../components/PostCard';
import { dataManager } from '../utils/dataManager';

export const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const updatePosts = () => {
      setPosts(dataManager.getPosts());
    };

    updatePosts();
    const interval = setInterval(updatePosts, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-medium mb-4">Latest Posts</h1>
      <div className="space-y-4">
        {posts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            user={dataManager.getUserById(post.userId)}
          />
        ))}
      </div>
    </div>
  );
};