import React from 'react';
import { Post } from '../types';
import { MessageCircle } from 'lucide-react';

interface PostCardProps {
  post: Post;
  user?: { name: string; avatar: string };
}

export const PostCard: React.FC<PostCardProps> = ({ post, user }) => {
  return (
    <div className="bg-white p-4 rounded border">
      {user && (
        <div className="flex items-center gap-3 mb-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="font-medium">{user.name}</span>
        </div>
      )}
      <p className="mb-3">{post.content}</p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{new Date(post.timestamp).toLocaleDateString()}</span>
        <div className="flex items-center gap-1">
          <MessageCircle size={16} />
          <span>{post.commentCount}</span>
        </div>
      </div>
    </div>
  );
};