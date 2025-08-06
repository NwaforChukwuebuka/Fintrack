import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-react';
import { DashboardSummary } from '@/types/dashboard';
import LoadingSkeleton from './LoadingSkeleton';
import { EmptySummary } from './EmptyState';

interface SummaryCardsProps {
  summary: DashboardSummary;
  isLoading?: boolean;
}

const SummaryCards = React.memo(function SummaryCards({ summary, isLoading = false }: SummaryCardsProps) {
  // Show loading skeleton if loading
  if (isLoading) {
    return <LoadingSkeleton type="summary" />;
  }

  // Show empty state if no summary data
  if (!summary || (summary.totalBalance === 0 && summary.totalCredits === 0 && summary.totalDebits === 0)) {
    return <EmptySummary />;
  }

  const cards = [
    {
      title: 'Total Balance',
      value: `$${summary.totalBalance.toLocaleString()}`,
      change: summary.balanceChange,
      icon: summary.balanceChange >= 0 ? TrendingUp : TrendingDown,
    },
    {
      title: 'Total Credits',
      value: `$${summary.totalCredits.toLocaleString()}`,
      change: summary.creditsChange,
      icon: summary.creditsChange >= 0 ? TrendingUp : TrendingDown,
    },
    {
      title: 'Total Debits',
      value: `$${summary.totalDebits.toLocaleString()}`,
      change: summary.debitsChange,
      icon: summary.debitsChange >= 0 ? TrendingUp : TrendingDown,
    },
    {
      title: 'Transactions',
      value: summary.transactionCount.toString(),
      change: summary.transactionChange,
      icon: summary.transactionChange >= 0 ? TrendingUp : TrendingDown,
    },
  ];

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-6">
        {cards.map((card) => {
          const Icon = card.icon;
          const isPositive = card.change >= 0;
          
          return (
            <Card key={card.title} className="bg-secondary border-border hover:shadow-md transition-shadow duration-200 min-w-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 px-2 sm:px-3 lg:px-4 pt-2 sm:pt-3 lg:pt-4">
                <CardTitle className="text-xs sm:text-sm font-medium text-gray-600 leading-tight truncate">
                  {card.title}
                </CardTitle>
                <div className="flex-shrink-0 ml-1 sm:ml-2">
                  <MoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent className="px-2 sm:px-3 lg:px-4 pb-2 sm:pb-3 lg:pb-4">
                <div className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-gray-900 leading-tight break-words">
                  {card.value}
                </div>
                <div className={`text-xs flex items-center mt-1 sm:mt-2 ${
                  isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  <Icon className="h-3 w-3 mr-1 flex-shrink-0" />
                  <span className="truncate">{isPositive ? '+' : ''}{card.change}%</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
});

export default SummaryCards;