# FinDash — Finance Data Processing & Access Control System

A full-stack finance dashboard built with **Next.js**, **MongoDB**, and **JWT-based authentication**. Supports role-based access control, financial record management, and real-time analytics.

---

## Live Demo

> **[Add deployed URL here]**
> Test credentials below ↓

| Role    | Email              | Password  |
|---------|--------------------|-----------|
| Admin   | admin@findash.com  | admin123  |
| Analyst | analyst@findash.com| analyst123|
| Viewer  | viewer@findash.com | viewer123 |

---

## What This Project Does

This system allows a finance team to manage company transactions with strict role-based permissions. Different users see different things and can do different things — enforced on both the frontend and the backend API level.

---

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | Next.js 14, Tailwind CSS, Recharts|
| Backend    | Next.js API Routes                |
| Database   | MongoDB + Mongoose                |
| Auth       | JWT stored in HttpOnly cookies    |
| Charts     | Recharts                          |

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.js       # POST — login, sets JWT cookie
│   │   │   └── logout/route.js      # POST — clears cookie
│   │   ├── me/route.js              # GET  — returns logged in user info
│   │   ├── transactions/route.js    # GET, POST, PUT, DELETE
│   │   └── users/route.js          # GET, PUT (role), DELETE
│   └── dashboard/
│       ├── layout.js                # Sidebar + topbar shell
│       ├── page.js                  # Overview
│       ├── analytics/page.js        # Charts and insights
│       ├── records/page.js          # Transaction CRUD
│       └── users/page.js           # User management (admin only)
├── models/
│   ├── User.js                      # Mongoose user schema
│   └── Transaction.js               # Mongoose transaction schema
├── lib/
│   └── db.js                        # MongoDB connection
└── components/
    ├── layout/Sidebar.js
    ├── addTransaction.jsx
    └── userInfo.jsx
```

---

## Core Features

### 1. Authentication
- Signup with name, email, password, role
- Login returns a **JWT stored in an HttpOnly cookie** — never exposed to JavaScript
- Every protected API route verifies the cookie server-side

### 2. Role-Based Access Control

| Action                  | Viewer | Analyst | Admin |
|-------------------------|--------|---------|-------|
| View dashboard          | ✅     | ✅      | ✅    |
| View transactions       | ✅     | ✅      | ✅    |
| View analytics          | ❌     | ✅      | ✅    |
| Add transaction         | ❌     | ❌      | ✅    |
| Edit transaction        | ❌     | ❌      | ✅    |
| Delete transaction      | ❌     | ❌      | ✅    |
| View users              | ❌     | ❌      | ✅    |
| Change user roles       | ❌     | ❌      | ✅    |
| Delete users            | ❌     | ❌      | ✅    |

> Access control is enforced **at the API level** — not just hidden in the UI.

### 3. Financial Records (Transactions)
Each transaction stores:
- Description, Amount, Date
- Type — `income` or `expense`
- Category — Payroll, Rent, Software, etc.
- Status — `pending`, `completed`, `failed`
- `userId` — links to the user who created it

Supports: **Create, Read, Update, Delete, Filter by type, Search by description, Sort by date**

### 4. Dashboard Summary
The dashboard computes from real DB data:
- Total income, total expenses, net balance
- Category-wise breakdown
- Monthly income vs expense bar chart
- Expense distribution pie chart
- Transaction status overview

### 5. User Management (Admin only)
- View all registered users
- Change any user's role
- Delete users
- Cannot edit or delete yourself (enforced on API + UI)

---

## API Reference

### Auth
```
POST /api/auth/login      { email, password }        → sets cookie
POST /api/auth/logout                                 → clears cookie
GET  /api/me                                          → current user info
```

### Transactions
```
GET    /api/transactions                              → all transactions (auth required)
POST   /api/transactions   { description, amount, date, type, category, status }  → admin only
PUT    /api/transactions   { _id, ...fields }         → admin only
DELETE /api/transactions   { _id }                    → admin only
```

### Users
```
GET    /api/users                                     → all users (admin only)
PUT    /api/users          { _id, role }              → change role (admin only)
DELETE /api/users          { _id }                    → delete user (admin only)
```

---

## Data Models

### User
```js
{
  name:      String,
  email:     String (unique),
  password:  String,
  role:      "viewer" | "analyst" | "admin"  // default: viewer
}
```

### Transaction
```js
{
  description: String,
  amount:      Number,
  date:        Date,
  type:        "income" | "expense",
  category:    String,
  status:      "pending" | "completed" | "failed",
  userId:      ObjectId → User
}
```

---

## Setup & Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/Anikett77/findash.git
cd findash

# 2. Install dependencies
npm install

# 3. Create .env.local
MONGODB_URI=mongodb+srv://your-connection-string
JWT_SECRET=your-secret-key

# 4. Run dev server
npm run dev

# 5. Open in browser
http://localhost:3000
```

---

## Assumptions Made

- **Roles are assigned by admin** after signup — new users default to `viewer`
- **Company-wide data** — all users see the same transactions, role controls what they can do with them, not what they can see
- **Passwords are stored as plain text** for simplicity — in production, bcrypt hashing would be used
- **No pagination** implemented — all transactions are fetched at once; for large datasets, cursor-based pagination would be added
- **Single company** — this is not a multi-tenant system; one database serves one organisation

---

## Design Decisions

**Why Next.js API Routes instead of a separate Express backend?**
Keeps the project in one repo, one deployment, and one language. For a team project, a dedicated backend service would make more sense.

**Why HttpOnly cookies for JWT instead of localStorage?**
HttpOnly cookies are not accessible via JavaScript, which protects against XSS attacks. localStorage is convenient but insecure for auth tokens.

**Why MongoDB?**
Financial records are document-like and schema-flexible. MongoDB with Mongoose gives a clean model layer without the overhead of a relational DB for this scale.

---

## Folder Reasoning

| Folder          | Why                                              |
|-----------------|--------------------------------------------------|
| `app/api/`      | All backend logic lives here as route handlers   |
| `models/`       | Mongoose schemas — one file per collection       |
| `lib/db.js`     | Single DB connection reused across all routes    |
| `components/`   | Shared UI components used across pages           |

---

## What I Would Add With More Time

- [ ] Password hashing with bcrypt
- [ ] Pagination for transaction listing  
- [ ] Date range filtering on transactions
- [ ] Email notifications for pending transactions
- [ ] Audit log — track who changed what and when
- [ ] Unit tests for API routes

---

*Built as part of a backend engineering assessment. Focus was on clean architecture, real access control logic, and connecting a working frontend to a real database.*