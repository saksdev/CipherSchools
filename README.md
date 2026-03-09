# CipherSQLStudio

A browser-based SQL learning platform for students to practice SQL queries against pre-configured assignments with real-time execution and intelligent AI-powered hints.

## 🚀 Key Features
- **Assignment Listing**: View, filter, and select from a variety of pre-configured SQL tasks.
- **Interactive Workspace**: Write SQL queries in a professional Monaco-based editor.
- **Smart Hints**: Get context-aware AI hints (using Gemini 1.5/2.0) that guide you without giving the answer.
- **Sandbox Execution**: Securely execute queries against a PostgreSQL database with automatic transaction rollback.
- **Responsive Design**: Fully mobile-first UI designed with Vanilla SCSS and BEM.

## 🛠️ Technology Stack
- **Frontend**: React.js, Vite, Vanilla SCSS
- **Backend**: Node.js, Express.js
- **Persistence DB**: MongoDB Atlas (Assignments, Metadata)
- **Sandbox DB**: PostgreSQL (Supabase)
- **AI Integration**: Google Gemini API
- **Editor**: Monaco Editor

## ⚙️ Installation & Setup

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Supabase account (or local PostgreSQL)
- Google AI Studio (Gemini) API Key

### 2. Backend Setup
1. `cd server`
2. `npm install`
3. Create a `.env` file (see `.env.example`)
4. Seed the database: `npm run seed`
5. Start server: `npm run dev`

### 3. Frontend Setup
1. `cd client`
2. `npm install`
3. Start frontend: `npm run dev`
4. Access at `http://localhost:5173`

## 🔐 Environment Variables
### Server (`server/.env`)
- `PORT`: 5000
- `MONGODB_URI`: Your MongoDB connection string
- `DATABASE_URL`: Your Supabase/PostgreSQL connection string (URI format)
- `GEMINI_API_KEY`: Your Google Gemini API Key

## 🏗️ Architecture Choices
- **SCSS**: Used Mixins for responsive design and BEM for clear, scalable naming conventions.
- **PostgreSQL Sandbox**: Implemented `SET LOCAL search_path` with specific schemas to isolate assignments.
- **Transaction Rollback**: Every "Execute Query" call is rolled back at the end to ensure the sample data remains unchanged for all students.
- **Prompt Engineering**: Gemini is configured with a system instruction to act as a supportive tutor, specifically blocked from providing full solutions.
