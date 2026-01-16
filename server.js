import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import pg from 'pg';
import bcrypt from 'bcryptjs';

dotenv.config();
const app = express();
const PORT = 3001;

// Database Connection
const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Test DB Connection
pool.connect()
    .then(() => console.log('Connected to Neon Database'))
    .catch(err => console.error('Database connection error:', err));

// Initialize Database Schema
const initDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('Users table ready');
    } catch (err) {
        console.error('Error initializing DB:', err);
    }
};
initDB();

app.use(cors());
app.use(express.json());

// --- Mock Market Data (Kept for Dashboard visualization) ---

const STOCKS = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 150.00, change: 1.2 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2800.00, change: -0.5 },
    { symbol: 'AMZN', name: 'Amazon.com', price: 3400.00, change: 0.8 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 720.00, change: 2.1 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 299.00, change: 0.1 },
    { symbol: 'BARC', name: 'Barclays PLC', price: 9.50, change: 0.5 },
];

let portfolio = {
    cash: 100000,
    holdings: {} // symbol: quantity
};

let transactions = [];

// --- Helpers ---

const simulateMarketMovement = () => {
    STOCKS.forEach(stock => {
        const volatility = 0.005; // 0.5% fluctuation
        const change = (Math.random() - 0.5) * volatility * stock.price;
        stock.price = parseFloat((stock.price + change).toFixed(2));
        stock.change = parseFloat((stock.change + (Math.random() - 0.5) * 0.2).toFixed(2));
    });
};

setInterval(simulateMarketMovement, 1000);

// --- Auth Routes ---

// Signup
app.post('/api/auth/signup', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if user exists
        const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userCheck.rows.length > 0) {
            return res.status(409).json({ error: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new user
        const newUser = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
            [name, email, hashedPassword]
        );

        res.status(201).json({ user: newUser.rows[0] });

    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ error: err.message || 'Server error' });
    }
});

// Login
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if user exists
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = result.rows[0];

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Return user info
        res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`
            }
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});


// --- Market Data Routes ---

app.get('/api/market-data', (req, res) => {
    res.json(STOCKS);
});

app.get('/api/portfolio', (req, res) => {
    let holdingsValue = 0;
    const holdingsDetails = Object.keys(portfolio.holdings).map(symbol => {
        const stock = STOCKS.find(s => s.symbol === symbol);
        const qty = portfolio.holdings[symbol];
        const value = stock ? stock.price * qty : 0;
        holdingsValue += value;
        return { symbol, quantity: qty, value: value.toFixed(2), currentPrice: stock?.price };
    });

    res.json({
        cash: portfolio.cash,
        holdingsValue: holdingsValue,
        totalValue: portfolio.cash + holdingsValue,
        holdings: holdingsDetails
    });
});

app.post('/api/trade', (req, res) => {
    // Basic mock trade logic (kept for demo purposes)
    const { symbol, type, quantity } = req.body;
    const qty = parseInt(quantity);
    if (!symbol || !type || isNaN(qty) || qty <= 0) return res.status(400).json({ error: 'Invalid request' });
    const stock = STOCKS.find(s => s.symbol === symbol);
    if (!stock) return res.status(404).json({ error: 'Stock not found' });

    // Simplistic Logic (In reality, this should also be in DB)
    const totalCost = stock.price * qty;
    if (type === 'buy') {
        if (portfolio.cash < totalCost) return res.status(400).json({ error: 'Insufficient funds' });
        portfolio.cash -= totalCost;
        portfolio.holdings[symbol] = (portfolio.holdings[symbol] || 0) + qty;
    } else if (type === 'sell') {
        if (!portfolio.holdings[symbol] || portfolio.holdings[symbol] < qty) return res.status(400).json({ error: 'Insufficient holdings' });
        portfolio.cash += totalCost;
        portfolio.holdings[symbol] -= qty;
        if (portfolio.holdings[symbol] === 0) delete portfolio.holdings[symbol];
    }
    res.json({ message: 'Trade executed', portfolio });
});

// --- Production Static File Serving ---
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
    // Skip API routes
    if (req.url.startsWith('/api')) return res.status(404).json({ error: 'API route not found' });
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
