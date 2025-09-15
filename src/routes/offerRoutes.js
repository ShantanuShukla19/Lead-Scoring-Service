import express from 'express';                   // Import Express framework
import { handleOffer } from '../controllers/offerController.js'; // Import offer handler function

const router = express.Router();                 // Create a new router instance

// Route to receive offer details
// POST /offer
// The offer details are expected in the request body (JSON)
router.post('/', handleOffer);

// Export the router to use it in the main server
export default router;
