// ─── DUMMY USERS ─────────────────────────────────────────────────────────────
export const USERS = [
  { id: 1, name: 'Priya Sharma',  email: 'priya@ledger.app',  role: 'admin',   status: 'active',   joined: '2024-06-12' },
  { id: 2, name: 'Rahul Verma',   email: 'rahul@ledger.app',  role: 'analyst', status: 'active',   joined: '2024-08-03' },
  { id: 3, name: 'Ankit Joshi',   email: 'ankit@ledger.app',  role: 'viewer',  status: 'active',   joined: '2024-09-15' },
  { id: 4, name: 'Sneha Patel',   email: 'sneha@ledger.app',  role: 'analyst', status: 'inactive', joined: '2024-07-22' },
  { id: 5, name: 'Dev Kumar',     email: 'dev@ledger.app',    role: 'viewer',  status: 'active',   joined: '2024-11-01' },
]

// ─── DUMMY TRANSACTIONS (company-wide) ───────────────────────────────────────
// These belong to the COMPANY, not individual users.
// Role decides what you can DO with this data, not what data you see.
export const TRANSACTIONS = [
  { id: 1,  name: 'Monthly Payroll',       category: 'Payroll',    type: 'expense', amount: 42000, date: '2025-01-28', status: 'completed', addedBy: 'Priya Sharma' },
  { id: 2,  name: 'AWS Infrastructure',    category: 'Technology', type: 'expense', amount: 1840,  date: '2025-01-27', status: 'completed', addedBy: 'Rahul Verma'  },
  { id: 3,  name: 'Client Invoice #042',   category: 'Revenue',    type: 'income',  amount: 8500,  date: '2025-01-26', status: 'completed', addedBy: 'Priya Sharma' },
  { id: 4,  name: 'Office Supplies',       category: 'Operations', type: 'expense', amount: 320,   date: '2025-01-25', status: 'pending',   addedBy: 'Ankit Joshi'  },
  { id: 5,  name: 'SaaS Subscriptions',    category: 'Technology', type: 'expense', amount: 940,   date: '2025-01-24', status: 'completed', addedBy: 'Rahul Verma'  },
  { id: 6,  name: 'Consulting Retainer',   category: 'Revenue',    type: 'income',  amount: 6000,  date: '2025-01-23', status: 'completed', addedBy: 'Priya Sharma' },
  { id: 7,  name: 'Office Rent',           category: 'Facilities', type: 'expense', amount: 3200,  date: '2025-01-22', status: 'completed', addedBy: 'Priya Sharma' },
  { id: 8,  name: 'Freelancer Payment',    category: 'Payroll',    type: 'expense', amount: 1800,  date: '2025-01-20', status: 'pending',   addedBy: 'Rahul Verma'  },
  { id: 9,  name: 'Product License Sale',  category: 'Revenue',    type: 'income',  amount: 12000, date: '2025-01-18', status: 'completed', addedBy: 'Priya Sharma' },
  { id: 10, name: 'Internet & Utilities',  category: 'Facilities', type: 'expense', amount: 580,   date: '2025-01-17', status: 'completed', addedBy: 'Ankit Joshi'  },
  { id: 11, name: 'Marketing Campaign',    category: 'Marketing',  type: 'expense', amount: 4500,  date: '2025-01-15', status: 'completed', addedBy: 'Rahul Verma'  },
  { id: 12, name: 'Annual Subscription',   category: 'Revenue',    type: 'income',  amount: 9600,  date: '2025-01-12', status: 'completed', addedBy: 'Priya Sharma' },
  { id: 13, name: 'Team Lunch & Events',   category: 'Operations', type: 'expense', amount: 860,   date: '2025-01-10', status: 'completed', addedBy: 'Ankit Joshi'  },
  { id: 14, name: 'Hardware Purchase',     category: 'Technology', type: 'expense', amount: 2200,  date: '2025-01-08', status: 'completed', addedBy: 'Priya Sharma' },
  { id: 15, name: 'Client Invoice #041',   category: 'Revenue',    type: 'income',  amount: 7500,  date: '2025-01-05', status: 'completed', addedBy: 'Priya Sharma' },
]

// ─── MONTHLY CHART DATA ───────────────────────────────────────────────────────
export const MONTHLY_DATA = [
  { month: 'Aug', income: 62000, expense: 34000 },
  { month: 'Sep', income: 58000, expense: 39000 },
  { month: 'Oct', income: 71000, expense: 32000 },
  { month: 'Nov', income: 69000, expense: 41000 },
  { month: 'Dec', income: 85000, expense: 37000 },
  { month: 'Jan', income: 43600, expense: 58240 },
]

// ─── ROLE PERMISSIONS ─────────────────────────────────────────────────────────
// This is the single source of truth for what each role can do
export const PERMISSIONS = {
  admin:   { canCreate: true,  canEdit: true,  canDelete: true,  canManageUsers: true,  canViewAnalytics: true  },
  analyst: { canCreate: false, canEdit: false, canDelete: false, canManageUsers: false, canViewAnalytics: true  },
  viewer:  { canCreate: false, canEdit: false, canDelete: false, canManageUsers: false, canViewAnalytics: false },
}

// ─── LOGGED IN USER (simulate session — swap role to test different views) ────
export const CURRENT_USER = USERS[0] // Change to USERS[1] for analyst, USERS[2] for viewer
