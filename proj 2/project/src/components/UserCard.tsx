import React from 'react';
import { User } from '../types';
import { User as UserIcon } from 'lucide-react';

interface UserCardProps {
  user: User;
  rank: number;
}

export const UserCard: React.FC<UserCardProps> = ({ user, rank }) => {
  return (
    <div className="bg-white p-4 rounded border">
      <div className="flex items-center gap-4">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full"
          />
        ) : (
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <UserIcon className="w-6 h-6 text-gray-400" />
          </div>
        )}
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{user.name}</h3>
            <span className="text-sm text-gray-500">#{rank}</span>
          </div>
          <p className="text-sm text-gray-600">{user.postCount} posts</p>
        </div>
      </div>
    </div>
  );
};