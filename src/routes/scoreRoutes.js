import express from 'express'; // Import Express framework
import { handleScoring, getResults, exportResults } from '../controllers/scoreController.js'; 
// Import functions to handle scoring, get results as JSON, and export CSV

const router = express.Router(); // Create a new router instance

// Route to score uploaded leads based on the current offer
// POST /score
router.post('/', handleScoring);

// Route to get scored results as JSON
// GET /score
router.get('/', getResults);

// Route to export scored results as a CSV file
// GET /score/export
router.get('/export', exportResults);

// Export the router to use it in the main server
export default router;
