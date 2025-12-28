const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  transaction_id: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  source_account: String,
  destination_account: String,
  amount: Number,
  currency: String,
  status: {
    type: String,
    enum: ["PROCESSING", "PROCESSED"],
    default: "PROCESSING"
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  processed_at: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model("Transaction", TransactionSchema);
