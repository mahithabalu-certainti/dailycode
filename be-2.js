const express = require("express");
const app = express();
app.use(express.json());
let students = [];
app.get("/", (req, res) => {
  res.send("Student App Backend Running");
});
app.post("/students", (req, res) => {
  const student = {
    name: req.body.name,
    age: req.body.age
  };

  students.push(student);

  res.send("Student added");
});

app.get("/students", (req, res) => {
  res.json(students);
});
app.get("/students/:name", (req, res) => {
  const name = req.params.name;

  const student = students.find(s => s.name === name);

  if (student) {
    res.json(student);
  } else {
    res.send("Student not found");
  }
});
app.listen(3000, () => {
  console.log("Server running on port 3000");
});