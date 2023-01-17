const path = require('path');
const express = require('express');
const app = express();

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Servidor ON. http://localhost:${port}/`);
});

const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './views/home.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, './views/login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, './views/register.html'));
});
