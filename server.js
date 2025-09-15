import express from 'express';                   // Import Express framework
import bodyParser from 'body-parser';           // Middleware to parse JSON request bodies

// Import route modules
import offerRoutes from './src/routes/offerRoutes.js';
import leadRoutes from './src/routes/leadRoutes.js';
import scoreRoutes from './src/routes/scoreRoutes.js';

import dotenv from 'dotenv';                     // Load environment variables from .env
dotenv.config();                                 // Initialize dotenv

const app = express();                           // Create an Express application

app.use(bodyParser.json());                      // Use JSON parser for incoming requests

// -------------------------
// Register routes
// -------------------------
app.use('/offer', offerRoutes);                 // Routes for handling offer-related requests
app.use('/leads', leadRoutes);                  // Routes for handling lead uploads
app.use('/score', scoreRoutes);                 // Routes for scoring and CSV export

// ✅ Global alias: redirect /results to /score
app.get('/results', (req, res) => res.redirect('/score'));

// -------------------------
// Start the server
// -------------------------
const PORT = process.env.PORT || 3000;          // Use PORT from environment or default to 3000
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
