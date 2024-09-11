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

// Route to handle Word of the Day
app.get('/api/word-of-the-day', async (req, res) => {
    const wordList = ['serendipity', 'eloquent', 'lucid', 'quixotic', 'ineffable']; // Example words list
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    try {
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the Word of the Day.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
