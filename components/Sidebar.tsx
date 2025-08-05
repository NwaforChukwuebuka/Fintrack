'use client';

import { useState } from 'react';
import { BarChart3, CreditCard, FileText, Settings, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

const navItems = [
  { icon: Home, label: 'Dashboard', active: true },
  { icon: CreditCard, label: 'Transactions', active: false },
  { icon: FileText, label: 'Reports', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

export default function Sidebar({ className }: SidebarProps) {
  const [activeItem, setActiveItem] = useState('Dashboard');

  return (
    <aside className={cn('bg-white border-r border-gray-200 w-64 hidden lg:block', className)}>
      <div className="p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.label;
          
          return (
            <Button
              key={item.label}
              variant={isActive ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start text-left',
                isActive && 'bg-gray-100 text-gray-900'
              )}
              onClick={() => setActiveItem(item.label)}
            >
              <Icon className="mr-3 h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </div>
    </aside>
  );
}