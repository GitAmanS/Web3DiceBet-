const crypto = require('crypto');
const User = require('../models/User');
const e = require('cors');

function getProvablyFairRoll(clientSeed, serverSeed, nonce) {
  const hash = crypto.createHash('sha256').update(clientSeed + serverSeed + nonce).digest('hex');
  return (parseInt(hash.slice(0, 8), 16) % 6) + 1;
}

exports.rollDice = async (req, res) => {
  const { address, bet, clientSeed } = req.body;
  if (!address || bet <= 0) return res.status(400).json({ error: 'Invalid request' });

  let user = await User.findOne({ address });

  if (!user) {
    user = await User.create({ address });
  }

  if (bet > user.ethBalance) {
    return res.status(400).json({ error: 'Insufficient ETH balance' });
  }

  const serverSeed = crypto.randomBytes(16).toString('hex');
  const nonce = Date.now();
  const roll = getProvablyFairRoll(clientSeed, serverSeed, nonce )
  
  const win = roll >= 4;
  user.ethBalance += win ? bet : -bet;
  await user.save();

  res.json({ roll, win, ethBalance: user.ethBalance, serverSeed, nonce, ethAddress: user.ethAddress });
};

// exports.getBalance = async (req, res) => {
//   const user = await User.findOne({ address: req.params.address });
//   res.json({ ethBalance: user ? user.ethBalance : 5, ethAddress: user?.ethAddress });
// };
