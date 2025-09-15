import axios from 'axios'; // Import axios to make HTTP requests

// Function to get AI-based buying intent score for a lead
async function getAiIntentScore(lead, offer) {
  try {
    // Debug: check if API key is loaded
    console.log('OPENAI_API_KEY in aiScoring:', process.env.OPENAI_API_KEY);

    // If API key is missing, throw an error
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key not found in .env');
    }

    // Construct the prompt for OpenAI API
    const prompt = `
Offer: ${JSON.stringify(offer)}
Lead: ${JSON.stringify(lead)}
Classify buying intent as High, Medium, or Low, and explain in 1-2 sentences.
    `;

    // Call OpenAI Chat Completions API
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 100
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Use API key from environment
          'Content-Type': 'application/json'
        }
      }
    );

    // Get the AI response text
    const aiText = response.data.choices[0].message.content.trim();

    // Default intent is Low
    let intent = 'Low';
    if (aiText.toLowerCase().includes('high')) intent = 'High';
    else if (aiText.toLowerCase().includes('medium')) intent = 'Medium';

    // Map intent to points
    const aiPointsMap = { High: 50, Medium: 30, Low: 10 };

    // Return the AI points, reasoning, and intent
    return { aiPoints: aiPointsMap[intent], reasoning: aiText, intent };

  } catch (err) {
    // On error, log it and return default Medium values
    console.error('❌ AI scoring error:', err.response ? err.response.data : err.message);
    return {
      aiPoints: 30,                        // Default points
      reasoning: 'AI scoring failed, defaulted to Medium.', // Default reasoning
      intent: 'Medium'                     // Default intent
    };
  }
}

// Export the function so it can be used in scoreController
export { getAiIntentScore };
