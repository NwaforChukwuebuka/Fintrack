'use client';

import { Inbox, TrendingUp, TrendingDown, DollarSign, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface EmptyStateProps {
  type?: 'transactions' | 'summary' | 'general';
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ComponentType<{ className?: string }>;
}

export default function EmptyState({ 
  type = 'general',
  title,
  description,
  actionLabel,
  onAction,
  icon: Icon
}: EmptyStateProps) {
  const getDefaultContent = () => {
    switch (type) {
      case 'transactions':
        return {
          icon: Receipt,
          title: 'No transactions found',
          description: 'There are no transactions to display. Add your first transaction to get started.',
          actionLabel: 'Add Transaction'
        };
      case 'summary':
        return {
          icon: TrendingUp,
          title: 'No summary data',
          description: 'Summary data is not available. Check back later or refresh the page.',
          actionLabel: 'Refresh'
        };
      default:
        return {
          icon: Inbox,
          title: 'No data available',
          description: 'There is no data to display at the moment.',
          actionLabel: 'Refresh'
        };
    }
  };

  const defaultContent = getDefaultContent();
  const IconComponent = Icon || defaultContent.icon;

  return (
    <div className="flex items-center justify-center min-h-[400px] p-6">
      <Card className="max-w-md w-full">
        <CardContent className="flex flex-col items-center text-center p-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <IconComponent className="h-8 w-8 text-gray-400" />
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {title || defaultContent.title}
          </h3>
          
          <p className="text-gray-600 mb-6 max-w-sm">
            {description || defaultContent.description}
          </p>
          
          {actionLabel && (
            <Button 
              onClick={onAction || (() => window.location.reload())}
              className="bg-primary hover:bg-primary/90"
            >
              {actionLabel}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Specialized empty state components
export function EmptyTransactions({ onAddTransaction }: { onAddTransaction?: () => void }) {
  return (
    <EmptyState
      type="transactions"
      actionLabel="Add Transaction"
      onAction={onAddTransaction}
    />
  );
}

export function EmptySummary() {
  return (
    <EmptyState
      type="summary"
      actionLabel="Refresh"
      onAction={() => window.location.reload()}
    />
  );
}

export function EmptyDashboard() {
  return (
    <div className="space-y-6">
      <EmptySummary />
      <EmptyTransactions />
    </div>
  );
} 