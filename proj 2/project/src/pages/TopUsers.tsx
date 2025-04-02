import React, { useEffect, useState } from 'react';
import { User } from '../types';
import { UserCard } from '../components/UserCard';
import { dataManager } from '../utils/dataManager';

export const TopUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const updateUsers = () => {
      setUsers(dataManager.getTopUsers());
    };

    updateUsers();
    const interval = setInterval(updateUsers, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-medium mb-4">Top Users</h1>
      <div className="space-y-3">
        {users.map((user, index) => (
          <UserCard key={user.id} user={user} rank={index + 1} />
        ))}
      </div>
    </div>
  );
};