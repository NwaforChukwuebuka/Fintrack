'use client';

import React, { useState, useCallback } from 'react';
import { Search, Menu, Bell, Settings, Grid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header = React.memo(function Header({ onMenuClick }: HeaderProps) {
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = useCallback(() => {
    setShowSearch(!showSearch);
  }, [showSearch]);

  return (
    <header className="bg-white border-b border-gray-200 px-3 py-3 sm:px-4 lg:px-6">
      <div className="flex items-center justify-between">
        {/* Left section - Logo and Menu */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Mobile menu button - always visible on mobile, hidden on desktop */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          {/* Desktop menu button - hidden on mobile, visible on desktop */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="hidden lg:flex"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/logo-text.png" 
              alt="FinTrack Logo" 
              className="h-6 w-auto sm:h-8"
            />
          </div>
        </div>

        {/* Center section - Search bar */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search..."
              className="pl-10 bg-gray-50 border-gray-200 w-full"
            />
          </div>
        </div>

        {/* Mobile search overlay */}
        {showSearch && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 p-4 md:hidden z-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search..."
                className="pl-10 bg-gray-50 border-gray-200 w-full"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Right section - Actions and Avatar */}
        <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
          {/* Mobile search button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden"
            onClick={toggleSearch}
          >
            <Search className="h-5 w-5" />
          </Button>
          
          {/* Tablet/Desktop search button */}
          <Button variant="ghost" size="sm" className="hidden md:flex lg:hidden">
            <Search className="h-5 w-5" />
          </Button>
          
          {/* Grid button - visible on mobile (480px+), always visible on tablet+ */}
          <Button variant="ghost" size="sm" className="hidden min-[480px]:flex">
            <Grid className="h-5 w-5" />
          </Button>
          
          {/* Notification button - visible on mobile (480px+), always visible on tablet+ */}
          <Button variant="ghost" size="sm" className="hidden min-[480px]:flex">
            <Bell className="h-5 w-5" />
          </Button>
          
          {/* Settings button - hidden on mobile, visible on desktop */}
          <Button variant="ghost" size="sm" className="hidden lg:flex">
            <Settings className="h-5 w-5" />
          </Button>
          
          {/* Avatar */}
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
});

export default Header;