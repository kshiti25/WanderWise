const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const OpenAI = require('openai');
const session = require('express-session');
const passport = require('passport');
const initializePassport = require('./middleware/passport-config');
const requireAuth = require('./middleware/requireAuth'); // ⬅️ Protect routes with this

// 🛑 MUST COME FIRST
dotenv.config();

const app = express();

// ✅ CORS settings with credentials
app.use(cors({
  origin: 'http://localhost:3000', // or your frontend domain
  credentials: true
}));

app.use(express.json());

// ✅ Session + Passport setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // set to true if using HTTPS
    httpOnly: true,
    sameSite: 'lax',
  }
}));

initializePassport(passport); // 🔐 Passport strategies
app.use(passport.initialize());
app.use(passport.session());
// ✅ Session check route for frontend
app.get('/api/check-auth', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.status(401).json({ authenticated: false });
  }
});


// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ OpenAI setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ Auth Routes (signup/signin/reset)
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);


// ✅ Secured itinerary generation route
app.post('/api/generate-itinerary', requireAuth, async (req, res) => {
  const { destination, startDate, endDate, budget, interests, notes, style, tripType } = req.body;

  if (!destination || !startDate || !endDate || !budget || !interests || !style || !tripType) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

  if (isNaN(days) || days <= 0) {
    return res.status(400).json({ error: 'Invalid date range' });
  }

  const interestsList = Array.isArray(interests) ? interests.join(', ') : interests;
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



// ✅ Server listen
app.listen(5050, () => console.log('🚀 Backend running on port 5050'));
