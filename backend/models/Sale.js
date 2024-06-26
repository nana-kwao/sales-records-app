const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  item: { type: String, required: true },
  amount: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Sale', saleSchema);
