const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files (HTML, CSS, JS) from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Import API routes from index.js
const apiRoutes = require('./index'); // This should be your API routes from index.js

// Use the API routes for /api prefix
app.use('/api', apiRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
