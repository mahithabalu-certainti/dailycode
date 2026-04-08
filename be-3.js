const express = require('express');
const app = express();

const logger = (req, res, next) => {
    console.log("Middleware executed");
    next();
};
app.use(logger);
app.get('/', (req, res) => {
    res.send("Home Page");
});

app.get('/about', (req, res) => {
    res.send("About Page");
});
app.listen(3000, () => {
    console.log("Server running on port 3000");
});