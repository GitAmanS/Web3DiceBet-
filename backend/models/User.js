const mongoose = require('mongoose');
const { randomBytes } = require('crypto');

const userSchema = new mongoose.Schema({
  address: { type: String, unique: true, required: true }, 
  ethAddress: { type: String, unique: true, default: () => `0x${randomBytes(20).toString('hex')}` }, // Fake ETH address
  ethBalance: { type: Number, default: 5 }, 
});

module.exports = mongoose.model('User', userSchema);
