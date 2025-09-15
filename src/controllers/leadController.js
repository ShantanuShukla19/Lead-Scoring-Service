import fs from 'fs';               // Node.js module to work with file system
import csvParser from 'csv-parser'; // Library to parse CSV files

// Array to store uploaded leads in memory
let uploadedLeads = [];

// Function to handle CSV file upload
const handleLeadsUpload = (req, res) => {
  // If no file is uploaded, return 400 error
  if (!req.file) return res.status(400).json({ message: 'No file uploaded.' });

  const leads = []; // Temporary array to store leads from CSV

  // Read the uploaded file as a stream
  fs.createReadStream(req.file.path)
    .pipe(csvParser()) // Pipe the file stream into csv-parser
    .on('data', (row) => leads.push(row)) // For each row, push it to leads array
    .on('end', () => { // When parsing finishes
      uploadedLeads = leads; // Save parsed leads in the global variable
      console.log('📢 Uploaded leads:', uploadedLeads);
      res.json({ message: 'Leads uploaded successfully.', leadsCount: leads.length }); // Send success response
    })
    .on('error', (err) => res.status(500).json({ message: 'Error parsing CSV.' })); // Handle errors while reading/parsing
};

// Function to get the uploaded leads
const getUploadedLeads = () => uploadedLeads;

// Export the functions so they can be used in routes/controllers
export { handleLeadsUpload, getUploadedLeads };
