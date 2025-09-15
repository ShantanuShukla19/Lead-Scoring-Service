// Function to calculate rule-based score for a lead
function calculateRuleScore(lead, offer) {
  let score = 0; // Initialize score

  // -------------------------
  // Role relevance scoring
  // -------------------------
  const role = lead.role.toLowerCase(); // Normalize role text
  if (role.includes('head') || role.includes('chief') || role.includes('director')) score += 20; // High-level roles
  else if (role.includes('manager') || role.includes('lead')) score += 10; // Mid-level roles

  // -------------------------
  // Industry match scoring
  // -------------------------
  const industry = lead.industry.toLowerCase(); // Normalize industry text
  const targetICP = offer.ideal_use_cases.map(i => i.toLowerCase()); // Convert offer ideal use cases to lowercase

  // Exact industry match
  if (targetICP.some(i => i === industry)) score += 20;
  // Partial match (e.g., "B2B SaaS" vs "B2B")
  else if (targetICP.some(i => industry.includes(i.split(' ')[0]))) score += 10;

  // -------------------------
  // Data completeness scoring
  // -------------------------
  // Check if all important fields exist
  if (lead.name && lead.role && lead.company && lead.industry && lead.location && lead.linkedin_bio) score += 10;

  return score; // Return the total rule-based score
}

// Export the function using CommonJS
module.exports = { calculateRuleScore };
