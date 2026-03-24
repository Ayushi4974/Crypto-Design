const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const walletRoutes = require('./routes/walletRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const withdrawRoutes = require('./routes/withdrawRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const packageRoutes = require('./routes/packageRoutes');

// Load env vars
dotenv.config();

// Connect DB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/withdraw', withdrawRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/packages', packageRoutes);

// Test Route
app.get('/', (req, res) => {
    res.send('MLM Dashboard API is running...');
});

// Export for Vercel
module.exports = app;

// Start Server (only if not running on Vercel)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}