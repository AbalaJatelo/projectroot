const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes

// Serve the signup page
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/signup.html'));
});

// Serve the riders page
app.get('/riders', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/riders.html'));
});

// Serve the add rider page (admin only)
app.get('/add-rider', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/add_rider.html'));
});

// Handle signup
app.post('/signup', (req, res) => {
    const { username, password, isAdmin } = req.body;

    let users = JSON.parse(fs.readFileSync('./data/users.json'));
    users.push({ username, password, isAdmin: isAdmin === 'on' });
    fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 2));

    res.redirect('/');
});

// Handle login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = JSON.parse(fs.readFileSync('./data/users.json'));
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.redirect('/riders');
    } else {
        res.send('Invalid username or password');
    }
});

// Handle adding a new rider (admin only)
app.post('/add-rider', (req, res) => {
    const { riderName } = req.body;

    let riders = JSON.parse(fs.readFileSync('./data/riders.json'));
    const newRider = {
        id: Math.random().toString(36).substring(2, 10).toUpperCase(),
        name: riderName,
        qr: `QR-${riders.length + 1}`
    };
    riders.push(newRider);
    fs.writeFileSync('./data/riders.json', JSON.stringify(riders, null, 2));

    res.redirect('/riders');
});

// Handle fetching rider data
app.get('/riders-data', (req, res) => {
    const riders = JSON.parse(fs.readFileSync('./data/riders.json'));
    res.json(riders);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
