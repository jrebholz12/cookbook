const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const router = express.Router();

router.post('/extract-ingredients', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        // Fetch the HTML content
        const { data } = await axios.get(url);

        // Load into Cheerio
        const $ = cheerio.load(data);

        // Extract ingredients (adjust selector for the site)
        const ingredients = [];
        $('li.ingredient').each((i, el) => {
            ingredients.push($(el).text().trim());
        });

        res.json({ ingredients });
    } catch (error) {
        console.error('Error extracting ingredients:', error);
        res.status(500).json({ error: 'Failed to extract ingredients' });
    }
});

module.exports = router;
