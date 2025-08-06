'use client';

import React, { useState, useMemo } from 'react';
import { Share, ChevronDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import UserAvatars from '@/components/UserAvatars';
import TabNavigation from '@/components/TabNavigation';
import ErrorBoundary from '@/components/ErrorBoundary';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import LazyDashboard from '@/components/LazyDashboard';
import PerformanceMonitor from '@/components/PerformanceMonitor';
import { useDashboardData } from '@/hooks/useDashboardData';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Overview');
  const { data, isLoading, error, refetch } = useDashboardData();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={refetch}>Try Again</Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <LoadingSkeleton type="full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ErrorBoundary>
        <Header />
        
        <div className="flex">
          <Sidebar />
          
          <main className="flex-1 p-2 sm:p-4 lg:p-6 max-w-full mx-auto w-full">
            <PerformanceMonitor />
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-0">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 flex items-center">
                Wallet Ledger
                <ChevronDown className="ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </h1>
              <Badge variant="secondary" className="bg-primary/10 text-primary flex items-center gap-1 text-xs">
                <div className="w-1 h-1 bg-primary rounded-full"></div>
                Active
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button className="bg-primary hover:bg-primary/90 rounded-full text-xs sm:text-sm px-3 py-2">
                Share
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 sm:h-10 sm:w-10 rounded-full">
                <MoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>

          {/* User Avatars */}
          <div className="mb-4 sm:mb-6">
            <UserAvatars users={data?.users || []} additionalCount={12} />
          </div>

          {/* Tab Navigation */}
          <div className="mb-4 sm:mb-6">
            <TabNavigation onTabChange={setActiveTab} />
          </div>

          {/* Dashboard Content */}
          <LazyDashboard 
            summary={data?.summary || {
              totalBalance: 0,
              totalCredits: 0,
              totalDebits: 0,
              transactionCount: 0,
              balanceChange: 0,
              creditsChange: 0,
              debitsChange: 0,
              transactionChange: 0,
            }}
            transactions={data?.transactions || []}
            isLoading={isLoading}
          />
        </main>
      </div>
    </ErrorBoundary>
    </div>
  );
}