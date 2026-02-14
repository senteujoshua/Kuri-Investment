# Kuri Investments - B2B Quarry eCommerce Platform

A full-stack B2B construction materials eCommerce website for Kuri Investments, a quarry/aggregates supplier.

## Tech Stack
- **Frontend**: React (Vite) + React Router
- **Backend**: Node.js + Express.js
- **Database**: SQLite (better-sqlite3)
- **Auth**: JWT for admin dashboard

## Quick Start

### 1. Install dependencies
```bash
cd server && npm install
cd ../client && npm install
```

### 2. Seed the database
```bash
cd server && npm run seed
```

### 3. Start the development servers
```bash
# Terminal 1 - Backend (port 3001)
cd server && npm run dev

# Terminal 2 - Frontend (port 5173)
cd client && npm run dev
```

### 4. Open in browser
- **Website**: http://localhost:5173
- **Admin**: http://localhost:5173/admin/login
  - Username: `admin`
  - Password: `admin123`

## Features
- Product catalog with filtering
- Shopping cart and order placement
- Delivery cost calculator
- Material volume calculator
- Admin dashboard with order management
- Customer list with CSV export
- WhatsApp and email notifications
- Facebook Pixel integration (placeholder)
- Mobile responsive design
