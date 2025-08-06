import { Transaction, DashboardSummary, User } from '@/types/dashboard';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2023-10-01',
    remark: 'Salary',
    amount: 3000,
    currency: 'USD',
    type: 'Credit',
  },
  {
    id: '2',
    date: '2023-10-02',
    remark: 'Groceries',
    amount: -150,
    currency: 'USD',
    type: 'Debit',
  },
  {
    id: '3',
    date: '2023-10-03',
    remark: 'Gym Membership',
    amount: -50,
    currency: 'USD',
    type: 'Debit',
  },
  {
    id: '4',
    date: '2023-10-04',
    remark: 'Dinner',
    amount: -40,
    currency: 'USD',
    type: 'Debit',
  },
  {
    id: '5',
    date: '2023-10-05',
    remark: 'Movie Tickets',
    amount: -30,
    currency: 'USD',
    type: 'Debit',
  },
  {
    id: '6',
    date: '2023-10-06',
    remark: 'Rent',
    amount: -1200,
    currency: 'USD',
    type: 'Debit',
  },
  {
    id: '7',
    date: '2023-10-07',
    remark: 'Utilities',
    amount: -100,
    currency: 'USD',
    type: 'Debit',
  },
  {
    id: '8',
    date: '2023-10-08',
    remark: 'Car Payment',
    amount: -400,
    currency: 'USD',
    type: 'Debit',
  },
  {
    id: '9',
    date: '2023-10-09',
    remark: 'Insurance',
    amount: -200,
    currency: 'USD',
    type: 'Debit',
  },
];

export const mockSummary: DashboardSummary = {
  totalBalance: 12345,
  totalCredits: 7890,
  totalDebits: 4455,
  transactionCount: 150,
  balanceChange: 5,
  creditsChange: 3,
  debitsChange: -2,
  transactionChange: 10,
};

export const mockUsers: User[] = [
  { id: '1', name: 'Ava', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
  { id: '2', name: 'Liam', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
  { id: '3', name: 'Noah', avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
  { id: '4', name: '', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
];