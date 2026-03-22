const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const path = require('path');
const express = require('express');


// 1. Tell Express to serve all files in the root folder as static
app.use(express.static(path.join(__dirname)));

// 2. Add an explicit rule for images if the first one fails
app.get('/1.jpg', (req, res) => {
    res.sendFile(path.join(__dirname, '1.jpg'));
});

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies from your frontend
// This ensures 'profile.jpg' is served correctly from your root folder
app.use(express.static(__dirname)); 

// Ensure you have a basic root route if not using vercel.json rewrites
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// MongoDB Atlas Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Define Message Schema
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// POST Route for Contact Form
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(201).json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Replace your app.listen with this:
if (process.env.NODE_PORT) {
    app.listen(process.env.NODE_PORT);
}

module.exports = app;
const path = require('path');

// Place these lines BEFORE your API routes
app.use(express.static(path.join(__dirname))); 

// Route to serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});