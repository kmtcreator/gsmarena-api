const express = require('express');
const router = express.Router();
const catalog = require('./src/services/catalog');
const deals = require('./src/services/deals');
const glossary = require('./src/services/glossary');
const search = require('./src/services/search');
const top = require('./src/services/top');

// API endpoint for brands
router.get('/brands', async (req, res) => {
    try {
        const brands = await catalog.getBrands();
        res.json(brands);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch brands' });
    }
});

// API endpoint for top devices
router.get('/top', async (req, res) => {
    try {
        const topDevices = await top.get();
        res.json(topDevices);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch top devices' });
    }
});

// API endpoint for search
router.get('/search', async (req, res) => {
    const query = req.query.query || '';
    const queries = query.split(',').map(term => term.trim());

    try {
        const searchResults = [];
        for (const term of queries) {
            const results = await search.search(term);
            searchResults.push({ query: term, results });
        }
        res.json(searchResults);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch search results' });
    }
});

// API endpoint for device deals
router.get('/deals', async (req, res) => {
    try {
        const deviceDeals = await deals.getDeals();
        res.json(deviceDeals);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch device deals' });
    }
});

module.exports = router;
