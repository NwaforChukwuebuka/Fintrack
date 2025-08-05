import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { DashboardSummary } from '@/types/dashboard';

interface SummaryCardsProps {
  summary: DashboardSummary;
}

export default function SummaryCards({ summary }: SummaryCardsProps) {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => {
        const Icon = card.icon;
        const isPositive = card.change >= 0;
        
        return (
          <Card key={card.title} className="bg-gray-50 border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {card.title}
              </CardTitle>
              <div className="w-4 h-4 text-gray-400">
                <Icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {card.value}
              </div>
              <div className={`text-xs flex items-center mt-1 ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                <Icon className="h-3 w-3 mr-1" />
                {isPositive ? '+' : ''}{card.change}%
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}