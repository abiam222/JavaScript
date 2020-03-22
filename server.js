const express = require("express"),
  path = require("path")

const app = express();
const PORT = process.env.PORT || 3001;

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./home.html"));
});

app.listen(PORT, () => {
  console.log("running on port 3001");
});
