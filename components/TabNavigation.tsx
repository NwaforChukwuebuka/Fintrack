'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TabNavigationProps {
  onTabChange?: (tab: string) => void;
}

export default function TabNavigation({ onTabChange }: TabNavigationProps) {
  const [activeTab, setActiveTab] = useState('Overview');
  
  const tabs = ['Overview', 'Transactions'];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  return (
    <div className="flex space-x-1 mb-6">
      {tabs.map((tab) => (
        <Button
          key={tab}
          variant="ghost"
          className={cn(
            'px-4 py-2 text-sm font-medium border-b-2 border-transparent rounded-none',
            activeTab === tab
              ? 'text-blue-600 border-blue-600 bg-blue-50'
              : 'text-gray-600 hover:text-gray-900 hover:border-gray-300'
          )}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
        </Button>
      ))}
    </div>
  );
}