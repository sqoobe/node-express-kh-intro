//imports
const path = require("path");
const express = require("express");
const { logger } = require("./middleware/logEvents");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3500;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

app.use("/subdir", require("./routes/subdir.js"));
app.use("/", require("./routes/root.js"));

const whitelist = ["http://127.0.0.1:5500", "http://localhost:3500"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Blocked by CORS!"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(logger);
app.use(cors(corsOptions));

// app.get("*", (req, res) =>
// {
//     res.status(404);
//     if(req.accepts("html"))
//     {
//         res.sendFile(path.join(__dirname, "view", "404.html"));
//     }
//     else if (req.accepts("json"))
//     {
//         res.json({error: "404 JSON not found"});
//     }
//     else (req.accepts("txt"))
//     {
//         res.type({error: "404 text not found"});
//     }
// });

app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send(err.message);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
