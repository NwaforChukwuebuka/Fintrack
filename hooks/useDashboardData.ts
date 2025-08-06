'use client';

import { useState, useEffect } from 'react';
import { Transaction, DashboardSummary, User } from '@/types/dashboard';
import { mockTransactions, mockSummary, mockUsers } from '@/data/mockData';

interface DashboardData {
  transactions: Transaction[];
  summary: DashboardSummary;
  users: User[];
}

interface UseDashboardDataReturn {
  data: DashboardData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useDashboardData(): UseDashboardDataReturn {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate random error (10% chance)
      if (Math.random() < 0.1) {
        throw new Error('Failed to fetch dashboard data');
      }
      
      const dashboardData: DashboardData = {
        transactions: mockTransactions,
        summary: mockSummary,
        users: mockUsers,
      };
      
      setData(dashboardData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
} 