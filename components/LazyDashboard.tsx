'use client';

import React, { Suspense, lazy } from 'react';
import LoadingSkeleton from './LoadingSkeleton';

// Lazy load expensive components
const SummaryCards = lazy(() => import('./SummaryCards'));
const TransactionTable = lazy(() => import('./TransactionTable'));

interface LazyDashboardProps {
  summary: any;
  transactions: any[];
  isLoading: boolean;
}

const LazyDashboard = React.memo(function LazyDashboard({ 
  summary, 
  transactions, 
  isLoading 
}: LazyDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Summary Section */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Summary</h2>
        <Suspense fallback={<LoadingSkeleton type="summary" />}>
          <SummaryCards summary={summary} isLoading={isLoading} />
        </Suspense>
      </div>

      {/* Transactions Table */}
      <div>
        <Suspense fallback={<LoadingSkeleton type="table" />}>
          <TransactionTable transactions={transactions} isLoading={isLoading} />
        </Suspense>
      </div>
    </div>
  );
});

export default LazyDashboard; 