'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { ChevronUp, ChevronDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Transaction, SortField, SortDirection } from '@/types/dashboard';
import { cn } from '@/lib/utils';
import LoadingSkeleton from './LoadingSkeleton';
import { EmptyTransactions } from './EmptyState';

interface TransactionTableProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

const TransactionTable = React.memo(function TransactionTable({ transactions, isLoading = false }: TransactionTableProps) {
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = useCallback((field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  }, [sortField, sortDirection]);

  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === 'date') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      } else if (sortField === 'amount') {
        aValue = Math.abs(aValue);
        bValue = Math.abs(bValue);
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [transactions, sortField, sortDirection]);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  const formatAmount = useCallback((amount: number) => {
    return Math.abs(amount).toLocaleString();
  }, []);

  const SortIcon = useCallback(({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />;
    }
    return sortDirection === 'asc' ? (
      <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
    ) : (
      <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4" />
    );
  }, [sortField, sortDirection]);

  // Show loading skeleton if loading
  if (isLoading) {
    return <LoadingSkeleton type="table" />;
  }

  // Show empty state if no transactions
  if (!transactions || transactions.length === 0) {
    return <EmptyTransactions />;
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className="bg-primary/5">
              <TableHead className="w-[25%] sm:w-[20%] lg:w-[15%] px-2 sm:px-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 font-medium text-gray-700 hover:text-primary text-xs sm:text-sm"
                  onClick={() => handleSort('date')}
                >
                  Date
                  <SortIcon field="date" />
                </Button>
              </TableHead>
              <TableHead className="w-[35%] sm:w-[40%] lg:w-[45%] px-2 sm:px-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 font-medium text-gray-700 hover:text-primary text-xs sm:text-sm"
                  onClick={() => handleSort('remark')}
                >
                  Remark
                  <SortIcon field="remark" />
                </Button>
              </TableHead>
              <TableHead className="w-[20%] sm:w-[15%] lg:w-[15%] px-2 sm:px-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 font-medium text-gray-700 hover:text-primary text-xs sm:text-sm"
                  onClick={() => handleSort('amount')}
                >
                  Amount
                  <SortIcon field="amount" />
                </Button>
              </TableHead>
              <TableHead className="w-[10%] px-2 sm:px-4 hidden sm:table-cell">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 font-medium text-gray-700 hover:text-primary text-xs sm:text-sm"
                  onClick={() => handleSort('currency')}
                >
                  Currency
                  <SortIcon field="currency" />
                </Button>
              </TableHead>
              <TableHead className="w-[10%] px-2 sm:px-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 font-medium text-gray-700 hover:text-primary text-xs sm:text-sm"
                  onClick={() => handleSort('type')}
                >
                  Type
                  <SortIcon field="type" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTransactions.map((transaction) => (
              <TableRow key={transaction.id} className="hover:bg-primary/5">
                <TableCell className="font-medium border-b border-gray-200 px-2 sm:px-4 text-xs sm:text-sm">
                  {formatDate(transaction.date)}
                </TableCell>
                <TableCell className="border-b border-gray-200 px-2 sm:px-4 text-xs sm:text-sm">
                  <div className="truncate max-w-[120px] sm:max-w-none">
                    {transaction.remark}
                  </div>
                </TableCell>
                <TableCell className="font-medium border-b border-gray-200 px-2 sm:px-4 text-xs sm:text-sm">
                  {transaction.amount < 0 ? '-' : ''}${formatAmount(transaction.amount)}
                </TableCell>
                <TableCell className="border-b border-gray-200 px-2 sm:px-4 text-xs sm:text-sm hidden sm:table-cell">
                  {transaction.currency}
                </TableCell>
                <TableCell className="border-b border-gray-200 px-2 sm:px-4">
                  <div className={cn(
                    'inline-flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 rounded-full bg-primary/10 border border-primary/20'
                  )}>
                    <div
                      className={cn(
                        'w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full',
                        transaction.type === 'Credit' ? 'bg-green-500' : 'bg-red-500'
                      )}
                    />
                    <span className={cn(
                      'text-xs font-medium text-primary'
                    )}>
                      {transaction.type}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
});

export default TransactionTable;