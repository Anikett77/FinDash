import { User, Transaction, FinancialRecord } from './types';

export const MOCK_USERS: Record<string, User & { password: string }> = {
  viewer: {
    id: '1',
    email: 'viewer@example.com',
    name: 'John Viewer',
    role: 'viewer',
    password: 'password123',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=viewer',
  },
  analyst: {
    id: '2',
    email: 'analyst@example.com',
    name: 'Sarah Analyst',
    role: 'analyst',
    password: 'password123',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=analyst',
  },
  admin: {
    id: '3',
    email: 'admin@example.com',
    name: 'Alex Admin',
    role: 'admin',
    password: 'password123',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
  },
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    date: '2024-03-20',
    description: 'Office Supplies',
    amount: 245.50,
    category: 'Supplies',
    type: 'expense',
    status: 'completed',
  },
  {
    id: '2',
    date: '2024-03-19',
    description: 'Client Invoice Payment',
    amount: 5000.00,
    category: 'Income',
    type: 'income',
    status: 'completed',
  },
  {
    id: '3',
    date: '2024-03-18',
    description: 'Software License',
    amount: 299.99,
    category: 'Software',
    type: 'expense',
    status: 'completed',
  },
  {
    id: '4',
    date: '2024-03-17',
    description: 'Rent Payment',
    amount: 2500.00,
    category: 'Rent',
    type: 'expense',
    status: 'completed',
  },
  {
    id: '5',
    date: '2024-03-16',
    description: 'Consulting Revenue',
    amount: 8000.00,
    category: 'Income',
    type: 'income',
    status: 'completed',
  },
  {
    id: '6',
    date: '2024-03-15',
    description: 'Utilities',
    amount: 450.00,
    category: 'Utilities',
    type: 'expense',
    status: 'completed',
  },
  {
    id: '7',
    date: '2024-03-14',
    description: 'Internet Service',
    amount: 89.99,
    category: 'Utilities',
    type: 'expense',
    status: 'pending',
  },
  {
    id: '8',
    date: '2024-03-13',
    description: 'Project Payment',
    amount: 12000.00,
    category: 'Income',
    type: 'income',
    status: 'completed',
  },
];

export const MOCK_FINANCIAL_RECORD: FinancialRecord = {
  id: 'record-1',
  userId: '1',
  transactions: MOCK_TRANSACTIONS,
  totalIncome: 25000.00,
  totalExpenses: 3584.48,
  balance: 21415.52,
};

export const MOCK_ALL_USERS: User[] = [
  MOCK_USERS.viewer,
  MOCK_USERS.analyst,
  MOCK_USERS.admin,
  {
    id: '4',
    email: 'robert@example.com',
    name: 'Robert Finance Manager',
    role: 'analyst',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=robert',
  },
  {
    id: '5',
    email: 'emma@example.com',
    name: 'Emma Data Analyst',
    role: 'viewer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
  },
];
