const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

fs.readFile(path.join(__dirname, "starter.txt"), "utf8", (err, data) => {
  if (err) throw err;
});

fs.writeFile(path.join(__dirname, "Greeting.txt"), "hi there, meow", (err) => {
  if (err) throw err;
  console.log("Done writing!");
});

fs.writeFile(path.join(__dirname, "Appended.txt"), "mjau mjau, meow", (err) => {
  if (err) throw err;
  console.log("Appended");
});

process.on("uncaughtException", (err, origin) => {
  fs.writeSync(
    process.stderr.fd,
    `Caught exception ${err}/n``Exception origin ${origin}`
  );
});
