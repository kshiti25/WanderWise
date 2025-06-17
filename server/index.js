const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const OpenAI = require('openai');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

//  MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// OpenAI initialization
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Route
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes); // adds /api/signup, /api/signin, /api/reset-password
const auth = require('./middleware/auth');
app.post('/api/generate-itinerary', auth, async (req, res) => {
  const { destination, startDate, endDate, budget, interests, notes, style, tripType } = req.body;






  // Validation must be inside the route
  if (!destination || !startDate || !endDate || !budget || !interests  || !style || !tripType) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  
 
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  
  if (isNaN(days) || days <= 0) {
    return res.status(400).json({ error: 'Invalid date range' });
  }
  


  
  const interestsList = Array.isArray(interests) ? interests.join(', ') : interests;
  const formattedTripType = tripType.toLowerCase();
const prompt = `You are a smart travel planner. Create a detailed ${days}-day travel itinerary for a trip to ${destination}, from ${startDate} to ${endDate} for Trip type: ${tripType}.


Travel style: ${style.toLowerCase()}.
Budget level: ${budget}/5.
Interests: ${interestsList}.
Special requests or notes: ${notes || 'None'}.

For each day, suggest:
- Morning, afternoon, and evening activities.
- Top local restaurants or cafes to try.
- Unique local tips, cultural etiquette, or seasonal considerations.
- Optional alternatives if weather changes or traveler prefers flexibility.

Keep the tone friendly but professional. Format clearly with day-wise headings (Day 1, Day 2, etc.).`;




  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: "user", content: prompt }],
      max_tokens: 700,
    });
    res.json({ itinerary: response.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(5050, () => console.log('Backend running on port 5050'));
