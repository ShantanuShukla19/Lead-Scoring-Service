// Import necessary functions from other modules
import { calculateRuleScore } from '../services/ruleScoring.js'; // Rule-based scoring
import { getAiIntentScore } from '../services/aiScoring.js';     // AI-based scoring
import { getOfferDetails } from './offerController.js';         // Get current offer
import { getUploadedLeads } from './leadController.js';         // Get uploaded leads
import { Parser } from 'json2csv';                              // Convert JSON to CSV

// Array to store the scored results in memory
let scoredResults = [];

// Function to score all uploaded leads
const handleScoring = async (req, res) => {
  const offerDetails = getOfferDetails();      // Get current offer
  const uploadedLeads = getUploadedLeads();   // Get leads uploaded by user

  // If no offer or leads are available, return an error
  if (!offerDetails || uploadedLeads.length === 0)
    return res.status(400).json({ message: 'Offer or Leads are missing.' });

  const results = []; // Temporary array to store scored results

  // Loop through each lead and calculate score
  for (const lead of uploadedLeads) {
    const ruleScore = calculateRuleScore(lead, offerDetails);           // Rule-based score
    const { aiPoints, reasoning, intent } = await getAiIntentScore(lead, offerDetails); // AI score

    // Push combined result for each lead
    results.push({
      name: lead.name,
      role: lead.role,
      company: lead.company,
      intent,
      score: ruleScore + aiPoints, // Total score
      reasoning                     // Explanation
    });
  }

  scoredResults = results; // Save scored results globally
  res.json({ message: 'Scoring completed.', results }); // Send response
};

// Function to get scored results as JSON
const getResults = (req, res) => {
  res.json(scoredResults);
};

// Function to export scored results as CSV
const exportResults = (req, res) => {
  if (scoredResults.length === 0) {
    return res.status(400).json({ message: 'No scored results available to export.' });
  }

  const fields = ['name', 'role', 'company', 'intent', 'score', 'reasoning']; // CSV headers
  const json2csvParser = new Parser({ fields });                              // Initialize parser
  const csv = json2csvParser.parse(scoredResults);                           // Convert JSON to CSV

  // Set headers to indicate CSV file download
  res.setHeader('Content-Type', 'text/csv');                                 // MIME type
  res.setHeader('Content-Disposition', 'attachment; filename="scored_results.csv"'); // Download filename
  res.send(csv);                                                              // Send CSV content
};

// ✅ Export all functions so they can be used in routes
export { handleScoring, getResults, exportResults };
