const express = require("express");
const Transaction = require("../models/Transaction");
const transactionQueue = require("../queues/transaction.queue");

const router = express.Router();

router.post("/transactions", async (req, res) => {
  const payload = req.body;

  try {
    const txn = await Transaction.create(payload);

    await transactionQueue.add(
      "process-transaction",
      { transaction_id: payload.transaction_id },
      { delay: 30000 } // 30 seconds
    );

  } catch (err) {
    // Duplicate transaction_id
    if (err.code !== 11000) {
      console.error("Webhook error:", err);
    }
  }

  // Immediate ACK
  return res.status(202).send();
});

module.exports = router;
