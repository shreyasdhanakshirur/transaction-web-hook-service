const express = require("express");
const Transaction = require("../models/Transaction");

const router = express.Router();

router.get("/:transaction_id", async (req, res) => {
  const txn = await Transaction.findOne({
    transaction_id: req.params.transaction_id
  });

  if (!txn) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  res.json(txn);
});

module.exports = router;
