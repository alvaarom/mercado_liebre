const path = require("path");
const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Servidor ON. http://localhost:3000/");
});

const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/home.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/register.html"));
});
