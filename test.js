const { dir } = require("console");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

// fs.readFile(path.join(__dirname, "starter.txt"), "utf8", (err, data) => {
//   if (err) throw err;
// });

// fs.writeFile(path.join(__dirname, "Greeting.txt"), "hi there, meow", (err) => {
//   if (err) throw err;
//   console.log("Done writing!");
// });

// fs.writeFile(path.join(__dirname, "Appended.txt"), "mjau mjau, meow", (err) => {
//   if (err) throw err;
//   console.log("Appended");
// });

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "starter.txt"),
      "utf8"
    );
    console.log(data);

    await fsPromises.unlink(path.join(__dirname, "starter.txt"));

    await fsPromises.writeFile(path.join(__dirname, "newFile.txt"), data);

    await fsPromises.appendFile(
      path.join(__dirname, "newFile.txt"),
      "this is some new data"
    );

    await fsPromises.rename(
      path.join(__dirname, "newFile.txt"),
      path.join(__dirname, "secondName.txt")
    );

    const newData = await fsPromises.readFile(
      path.join(__dirname, "secondName.txt"),
      "utf8"
    );
    console.log(newData);
  } catch (err) {
    console.log(err);
  }
};

process.on("uncaughtException", (err, origin) => {
  fs.writeSync(
    process.stderr.fd,
    `Caught exception ${err}/n``Exception origin ${origin}`
  );
});
