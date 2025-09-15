import express from 'express';                 // Express framework
import multer from 'multer';                   // Middleware for handling file uploads
import { handleLeadsUpload } from '../controllers/leadController.js'; // Function to handle uploaded CSV

const router = express.Router();               // Create a new router instance

// Configure Multer to save uploaded files in the 'uploads/' folder
const upload = multer({ dest: 'uploads/' });

// Route to upload a single CSV file
// POST /leads/upload
// 'file' is the key name used in the form-data
router.post('/upload', upload.single('file'), handleLeadsUpload);

// Export the router to use it in the main server
export default router;
