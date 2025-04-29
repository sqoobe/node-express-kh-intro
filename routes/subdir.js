const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/subdir.html"),
  (req, res) => {
    res.sendFile(path.join(__dirname, "..", "view", "subdir", "subdir.html"));
  };

module.exports = router;
