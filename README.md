# MLM Dashboard - Crypto Design

A comprehensive MLM Dashboard with a premium aesthetic, featuring income tracking, referral systems, and secure wallet management.

## Features
- Interactive Dashboard with real-time statistics
- Secure authentication and user management
- Wallet and Transaction tracking
- Genealogy and Referral system
- Responsive design with animations (Framer Motion)

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Recharts, Framer Motion
- **Backend**: Node.js, Express, MongoDB, JWT Authentication

## Getting Started

### Installation
1. Install dependencies for root, frontend, and backend:
   ```bash
   npm run install-all
   ```

2. Set up your environment variables in `backend/.env`.

3. Run the application in development mode:
   ```bash
   npm run dev
   ```

## Deployment
The backend is configured to serve the frontend production build.
To prepare for deployment:
1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
2. Start the production server:
   ```bash
   cd ../backend
   npm start
   ```
