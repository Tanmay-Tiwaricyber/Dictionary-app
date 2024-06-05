const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle dictionary API requests
app.get('/api/define/:word', async (req, res) => {
    const word = req.params.word;
    try {
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the definition.' });
    }
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
