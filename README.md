# Collaborative Trip Planning Platform

This is a complete, production-ready system for collaborative itinerary planning. Users can organize trips, add daily activities, define roles and access permissions, and collaborate seamlessly.

## 🚀 Features Implemented

**Trip Planning**

- **Trip Dashboard**: Create a new trip with start and end dates.
- **Auto Day Builder**: The platform auto-generates sequential itineraries based on dates.
- **Activity Cards**: Add Flights, Hotels, Sightseeing, Food, and other activities.
- **Organized Views**: Easy-to-read chronological list of daily events.

**Collaboration & Authentication**

- **Robust Authentication**: JWT based, HttpOnly secured cookie token exchange.
- **RBAC**: Implemented Owner, Editor, Viewer access models using Express Middlewares.

**Core Technical Decisions (Production Thinking)**

- **Separation of Concerns**: Middlewares, Controllers, Utilities, Models, Routes cleanly decoupled.
- **Error Handling**: Custom `ApiError` class with Global Error Handling Middleware preventing node failure.
- **Normalized DB Schema**: PostgreSQL using Sequelize, modeling deep nested relationships (Trips, Days, Activities, Users).
- **ES6 Standard**: Modern module approach in Backend (`import/export`) instead of CommonJS.

## 📁 Code Structure

The application is built as a monorepo separated into `frontend` and `backend`:

- `frontend/`: React + Vite + Tailwind CSS V4 + React Router.
- `backend/`: Node.js + Express.js + Sequelize ORM (PostgreSQL).

## 🛠️ Setup Instructions (Local)

1. **Database Setup**
   Ensure PostgreSQL is installed and running on `localhost:5432`.
   Create a database named `trip_planner` (or change `.env` accordingly).
2. **Backend Setup**

   ```bash
   cd backend
   npm install
   # Database auto-syncs using Sequelize. No strict migrations to run.
   npm run dev
   ```

3. **Frontend Setup**
   Open a new terminal.
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The application will be running on `http://localhost:5173`.

## 🌐 Deployment Details

For production deployment:

1. **Database:** Create a managed PostgreSQL instance (e.g., Supabase, Neon).
2. **Backend (Render / Railway / Heroku):**
   - Add environment variables (`DB_HOST`, `JWT_SECRET`, etc.).
   - Set Build Command: `npm install`
   - Set Run Command: `npm start`
3. **Frontend (Vercel / Netlify):**
   - Connect GitHub repo.
   - Set Build Command: `npm run build`
   - Set Env Var `VITE_API_URL` to backend URL (ensure Axios Config reads it).

> Note: To fulfill the Hackathon requirement of "Live Hosted Link", please push this codebase to your own GitHub repository, deploy via Vercel (frontend) and Render (backend), and substitute this line with the URL.
