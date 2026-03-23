const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// 1. Middleware
app.use(cors());
app.use(express.json()); 
app.use(express.static(path.join(__dirname))); // Serves your 1.jpg, style.css, etc.

// 2. MongoDB Atlas Connection
// Ensure MONGODB_URI is set in Vercel Environment Variables
const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Connection error:', err));

// 3. Define Message Schema
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// 4. POST Route for Contact Form (Matches your vercel.json)
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(201).json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
        console.error("Route Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// 5. Route to serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 6. Export for Vercel (This replaces app.listen)
module.exports = app;

// Only listen if running locally
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}