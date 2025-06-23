# 🌍 WanderWise – AI-Powered Travel Itinerary Planner

WanderWise is a full-stack web application that generates personalized, multi-day travel itineraries using OpenAI's GPT-3.5 API. Users can sign up, securely log in, and create travel plans based on destination, budget, travel style, preferences, and duration — all with the click of a button.

## 🚀 Features

- 🔐 **User Authentication**: Sign up, sign in, reset password (no email), protected routes using JWT
- 🧠 **AI-Generated Itineraries**: Uses OpenAI to generate smart, detailed travel plans
- 📅 **Multi-Step Form**: Users enter destination, preferences, and dates through an intuitive form
- 🔒 **Route Protection**: Users cannot access itinerary flow without valid login
- 🧭 **Travel Styles and Interests**: Choose from various styles (luxury, adventure) and interests (culture, food, etc.)
- 🧹 **Secure Session Handling**: Auto logout and back-button navigation protection
- 🐳 **Dockerized Setup**: Seamless multi-container development using Docker Compose

## 🛠️ Tech Stack

| Layer        | Tech                     |
|--------------|--------------------------|
| Frontend     | React, SCSS              |
| Backend      | Node.js, Express         |
| Authentication | JWT, bcrypt           |
| AI API       | OpenAI GPT-3.5           |
| Database     | MongoDB (via Mongoose)   |
| Deployment   | Docker, Docker Compose   |

---

📁 Folder Structure
wanderwise/
├── client/             # React frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       └── styles/
├── server/             # Express backend
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── .env
├── docker-compose.yaml


## ⚙️ Environment Variables

In the `server` folder, create a `.env` file:

OPENAI_API_KEY=your_openai_api_key

JWT_SECRET=your_jwt_secret

MONGO_URI=your_mongodb_uri

PORT=5050


---

## 🐳 Run with Docker

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/wanderwise.git
cd wanderwise

### 2.  Build & Run Containers

docker-compose up --build

Frontend runs at: http://localhost:3000

Backend API runs at: http://localhost:5050

## 🧪 How to Test
Start the app via Docker.

Go to http://localhost:3000.

Sign up or log in.

Enter travel preferences step-by-step.

Generate an itinerary.

Try to go back after logout → user should be redirected to login screen again.


👨‍💻 Author
Kshiti Dangore
