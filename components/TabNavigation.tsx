'use client';

import React, { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TabNavigationProps {
  onTabChange: (tab: string) => void;
}

const TabNavigation = React.memo(function TabNavigation({ onTabChange }: TabNavigationProps) {
  const handleTabClick = useCallback((tab: string) => {
    onTabChange(tab);
  }, [onTabChange]);

  return (
    <div className="flex space-x-1 mb-4 sm:mb-6">
      <Button
        variant="ghost"
        className="px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium border-b-2 border-primary text-primary rounded-none"
        onClick={() => handleTabClick('Overview')}
      >
        Overview
      </Button>
      <Button
        variant="ghost"
        className="px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium border-b-2 border-transparent rounded-none"
        onClick={() => handleTabClick('Transactions')}
      >
        Transactions
      </Button>
    </div>
  );
});

export default TabNavigation;