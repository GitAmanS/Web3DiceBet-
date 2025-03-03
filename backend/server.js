require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const diceRoutes = require('./routes/diceRoutes');
const walletRoutes = require('./routes/walletRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.json());
app.use(cors());

app.use('/api', diceRoutes);
app.use('/api', walletRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
