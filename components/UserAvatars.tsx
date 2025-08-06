import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/types/dashboard';

interface UserAvatarsProps {
  users: User[];
  additionalCount?: number;
}

const UserAvatars = React.memo(function UserAvatars({ users, additionalCount = 0 }: UserAvatarsProps) {
  return (
    <div className="flex items-center">
      <div className="flex -space-x-1 sm:-space-x-2">
        {users.slice(0, 3).map((user) => (
          <Avatar key={user.id} className="h-6 w-6 sm:h-8 sm:w-8 border-2 border-white">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        ))}
      </div>
      <div className="text-xs sm:text-sm text-gray-600 ml-2">
        <span className="hidden sm:inline">{users.map(user => user.name).join(', ')} +{additionalCount} others</span>
        <span className="sm:hidden">+{users.length + additionalCount} users</span>
      </div>
    </div>
  );
});

export default UserAvatars;