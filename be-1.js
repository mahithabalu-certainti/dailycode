const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let users = [];

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ message: "Username and password required" });
  }

  const userExists = users.find(u => u.username === username);

  if (userExists) {
    return res.json({ message: "User already exists" });
  }

  users.push({ username, password });

  res.json({ message: "User registered successfully" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.json({ message: "Invalid credentials" });
  }

  res.json({ message: "Login successful" });
});

app.get("/users", (req, res) => {
  res.json(users);
});