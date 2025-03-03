const express = require('express');
const { getSimulatedWalletBalance, addFakeFunds } = require('../controllers/walletController');

const router = express.Router();

router.get('/wallet/:address', getSimulatedWalletBalance);
router.post('/wallet/deposit', addFakeFunds);

module.exports = router;
