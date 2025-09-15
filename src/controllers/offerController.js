// Variable to store the latest offer details in memory
let offerDetails = null;

// Function to handle receiving offer details from the client
const handleOffer = (req, res) => {
  offerDetails = req.body; // Save the offer details from request body
  console.log('📢 Offer received:', offerDetails); // Log for debugging
  res.status(200).json({ message: 'Offer details saved.' }); // Send success response
};

// Function to retrieve the saved offer details
const getOfferDetails = () => offerDetails;

// Export the functions to use them in routes/controllers
export { handleOffer, getOfferDetails };
