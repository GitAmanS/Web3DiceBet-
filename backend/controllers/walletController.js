const User = require('../models/User');
const { ethers } = require('ethers');

exports.getSimulatedWalletBalance = async (req, res) => {
  const { address } = req.params;

  // if (!ethers.isAddress(address)) {
  //   return res.status(400).json({ error: 'Invalid Ethereum address' });
  // }

  const user = await User.findOne({ address: address });
  if (!user) {
    return res.status(404).json({ error: 'Wallet not found' });
  }

  res.json({ ethBalance: user.ethBalance, ethAddress: user.ethAddress });
};

exports.addFakeFunds = async (req, res) => {
  const { address, amount } = req.body;

  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  const user = await User.findOne({ address: address });

  if (!user) {
    return res.status(404).json({ error: 'Wallet not found' });
  }

  user.ethBalance += parseFloat(amount);
  await user.save();

  res.json({ ethBalance: user.ethBalance });
};
