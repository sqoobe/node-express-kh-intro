const path = require("path");
const express = require("express");

const app = express();

app.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html");
});

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "view", "404.html"));
});

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
