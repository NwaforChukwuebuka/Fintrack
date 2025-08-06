'use client';

import { useState } from 'react';
import { BarChart3, CreditCard, FileText, Settings, Home, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems = [
  { icon: Home, label: 'Dashboard', active: true },
  { icon: CreditCard, label: 'Transactions', active: false },
  { icon: FileText, label: 'Reports', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

export default function Sidebar({ className, isOpen = false, onClose }: SidebarProps) {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const handleItemClick = (label: string) => {
    setActiveItem(label);
    // Close mobile sidebar when item is clicked
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        'bg-white border-r border-gray-200 w-64 fixed lg:static inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        className
      )}>
        <div className="p-4 space-y-2 h-full flex flex-col">
          {/* Mobile close button */}
          <div className="flex justify-between items-center mb-4 lg:hidden">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 space-y-2">
            {navItems.map((item) => {
              const isActive = activeItem === item.label;
              
              return (
                <Button
                  key={item.label}
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start text-left',
                    isActive && 'bg-gray-100 text-gray-900'
                  )}
                  onClick={() => handleItemClick(item.label)}
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}