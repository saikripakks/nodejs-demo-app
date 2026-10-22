const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Hello from Node.js CI/CD!",
    status: "success",
    task: "DevOps Internship Task 1"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

module.exports = app;

if (require.main === module) {
  const port = process.env.PORT || 3000;

  app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
  });
}
