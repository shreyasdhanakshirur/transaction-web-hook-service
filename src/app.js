const express = require("express");

const webhookRoutes = require("./routes/webhook.routes");
const transactionRoutes = require("./routes/transaction.routes");

const app = express();

app.use(express.json());

// Health Check
app.get("/", (req, res) => {
  res.json({
    status: "HEALTHY",
    current_time: new Date().toISOString()
  });
});

app.use("/v1/webhooks", webhookRoutes);
app.use("/v1/transactions", transactionRoutes);

module.exports = app;
