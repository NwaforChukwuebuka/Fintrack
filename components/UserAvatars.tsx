import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/types/dashboard';

interface UserAvatarsProps {
  users: User[];
  additionalCount?: number;
}

export default function UserAvatars({ users, additionalCount = 12 }: UserAvatarsProps) {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <div className="flex -space-x-2">
        {users.map((user) => (
          <Avatar key={user.id} className="h-8 w-8 border-2 border-white">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        ))}
      </div>
      <div className="text-sm text-gray-600 ml-2">
        {users.map(user => user.name).join(', ')} +{additionalCount} others
      </div>
    </div>
  );
}