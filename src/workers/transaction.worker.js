require("dotenv").config();
const mongoose = require("mongoose");
const { Worker } = require("bullmq");
const redis = require("../config/redis");
const Transaction = require("../models/Transaction");

// 🔴 IMPORTANT: Connect MongoDB inside worker
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Worker MongoDB connected"))
  .catch(err => {
    console.error("❌ Worker MongoDB connection failed", err);
    process.exit(1);
  });

const worker = new Worker(
  "transaction-queue",
  async job => {
    const { transaction_id } = job.data;

    console.log("🔄 Processing:", transaction_id);

    const txn = await Transaction.findOne({ transaction_id });

    if (!txn) {
      console.log("❌ Transaction not found:", transaction_id);
      return;
    }

    if (txn.status === "PROCESSED") {
      console.log("⚠️ Already processed:", transaction_id);
      return;
    }

    // Simulate external API delay
    await new Promise(resolve => setTimeout(resolve, 30000));

    txn.status = "PROCESSED";
    txn.processed_at = new Date();
    await txn.save();

    console.log("✅ Transaction processed:", transaction_id);
  },
  { connection: redis }
);
