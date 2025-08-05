'use client';

import { useState } from 'react';
import { Share, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SummaryCards from '@/components/SummaryCards';
import UserAvatars from '@/components/UserAvatars';
import TabNavigation from '@/components/TabNavigation';
import TransactionTable from '@/components/TransactionTable';
import { mockTransactions, mockSummary, mockUsers } from '@/data/mockData';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-4 lg:p-6 max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div className="flex items-center space-x-3 mb-4 sm:mb-0">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                Wallet Ledger
                <ChevronDown className="ml-2 h-5 w-5 text-gray-400" />
              </h1>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Active
              </Badge>
            </div>
            
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Share className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>

          {/* User Avatars */}
          <UserAvatars users={mockUsers} additionalCount={12} />

          {/* Tab Navigation */}
          <TabNavigation onTabChange={setActiveTab} />

          {/* Summary Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Summary</h2>
            <SummaryCards summary={mockSummary} />
          </div>

          {/* Transactions Table */}
          <div>
            <TransactionTable transactions={mockTransactions} />
          </div>
        </main>
      </div>
    </div>
  );
}