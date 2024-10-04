const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 5000;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

const readUsers = () => {
  const data = fs.readFileSync('users.json');
  return JSON.parse(data);
};

const writeUsers = (users) => {
  fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
};

app.get('/api/users', (req, res) => {
  const users = readUsers();
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const users = readUsers();
  const newUser = req.body;
  users.push(newUser);
  writeUsers(users);
  res.status(201).json(newUser);
});

app.patch('/api/users/:index', (req, res) => {
  const users = readUsers();
  const index = parseInt(req.params.index, 10);

  if (isNaN(index) || index < 0 || index >= users.length) {
    return res.status(400).json({ error: 'Invalid user index' });
  }

  if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Missing or invalid user data' });
  }

  const updatedUser = { ...users[index], ...req.body };
  users[index] = updatedUser;

  writeUsers(users);
  res.json(updatedUser);
});

app.delete('/api/users/:index', (req, res) => {
  const users = readUsers();
  const index = parseInt(req.params.index, 10);
  if (index >= 0 && index < users.length) {
    const deletedUser = users.splice(index, 1);
    writeUsers(users);
    res.json(deletedUser);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
