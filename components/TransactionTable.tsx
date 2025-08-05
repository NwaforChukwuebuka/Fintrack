'use client';

import { useState } from 'react';
import { ChevronUp, ChevronDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Transaction, SortField, SortDirection } from '@/types/dashboard';
import { cn } from '@/lib/utils';

interface TransactionTableProps {
  transactions: Transaction[];
}

export default function TransactionTable({ transactions }: TransactionTableProps) {
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const formatAmount = (amount: number) => {
    return Math.abs(amount).toLocaleString();
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="w-[120px]">
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 font-medium text-gray-700 hover:text-gray-900"
                onClick={() => handleSort('date')}
              >
                Date
                <SortIcon field="date" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 font-medium text-gray-700 hover:text-gray-900"
                onClick={() => handleSort('remark')}
              >
                Remark
                <SortIcon field="remark" />
              </Button>
            </TableHead>
            <TableHead className="text-right">
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 font-medium text-gray-700 hover:text-gray-900"
                onClick={() => handleSort('amount')}
              >
                Amount
                <SortIcon field="amount" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 font-medium text-gray-700 hover:text-gray-900"
                onClick={() => handleSort('currency')}
              >
                Currency
                <SortIcon field="currency" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 font-medium text-gray-700 hover:text-gray-900"
                onClick={() => handleSort('type')}
              >
                Type
                <SortIcon field="type" />
              </Button>
            </TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTransactions.map((transaction) => (
            <TableRow key={transaction.id} className="hover:bg-gray-50">
              <TableCell className="font-medium">
                {formatDate(transaction.date)}
              </TableCell>
              <TableCell>{transaction.remark}</TableCell>
              <TableCell className="text-right font-medium">
                {transaction.amount < 0 ? '-' : ''}${formatAmount(transaction.amount)}
              </TableCell>
              <TableCell>{transaction.currency}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <div
                    className={cn(
                      'w-2 h-2 rounded-full',
                      transaction.type === 'Credit' ? 'bg-green-500' : 'bg-red-500'
                    )}
                  />
                  <span className={cn(
                    'text-sm font-medium',
                    transaction.type === 'Credit' ? 'text-green-700' : 'text-red-700'
                  )}>
                    {transaction.type}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}