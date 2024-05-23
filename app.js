const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/express', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Define schema for "equipes" collection
const equipeSchema = new mongoose.Schema({
    id: Number,
    name: String,
    country: String
});

// Create model based on schema
const Equipe = mongoose.model('equipes', equipeSchema);

// Middleware to verify JWT token
// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        console.log(token);
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Verify JWT token using the same secret key used for signing
        const decoded = jwt.verify(token.split(' ')[1], 'your_secret_key');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
}

// Route to generate JWT token (fake login)
app.post('/login', (req, res) => {
    // Mock user data (you can replace this with actual user data)
    const user = {
        id: 1,
        username: 'testuser'
    };

    // Generate JWT token using the same secret key
    jwt.sign({ user: user }, 'your_secret_key', { expiresIn: '1h' }, (err, token) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to generate token' });
        }
        res.json({ token: token });
    });
});

// Protected route to get data from "equipes" collection
app.get('/equipes', async (req, res) => {
    try {
        const equipes = await Equipe.find({});
        res.status(200).json(equipes);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
