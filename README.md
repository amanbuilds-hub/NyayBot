# NyayBot ⚖️

**NyayBot** is a web-based legal aid platform designed specifically to assist undertrial prisoners in India and their families. It provides AI-driven legal assistance, bail eligibility calculation based on the latest Indian legal framework (BNSS 2023), and a directory to easily find NALSA panel, Pro Bono, and Tele-Law lawyers across India.

## Features

- 💬 **LegalBot**: An AI-powered legal assistant utilizing OpenRouter (Gemma/Llama models) to provide compassionate, easy-to-understand legal information regarding bail procedures, fundamental rights, and court processes.
- 🧮 **Bail Eligibility Checker**: A built-in calculator based on **Section 479 of the Bharatiya Nagarik Suraksha Sanhita (BNSS) 2023**. It checks bail eligibility depending on the arrest date, maximum sentence, and offense history.
- 👥 **Lawyer Directory**: A searchable database of lawyers, filtered by state, language, and service type (NALSA, Pro Bono, Tele-Law).
- 🌐 **Multi-language Support**: Interface available in multiple regional languages to cater to diverse users.

## Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS, React Router
- **Backend**: Node.js, Express.js, Mongoose (MongoDB)
- **AI Integration**: OpenRouter API
- **Styling**: Vanilla CSS Variables + Tailwind Utility Classes

## Project Structure

```text
nyaybot/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components (Sidebar, etc.)
│   │   ├── pages/          # Application views (ChatBot, BailChecker, LawyerDirectory)
│   │   ├── index.css       # Global styles and CSS variables
│   │   └── App.jsx         # Main application routing
│   ├── index.html          # HTML entry point
│   └── tailwind.config.js  # Tailwind configuration
└── server/                 # Express backend
    ├── models/             # Mongoose database schemas
    ├── prompts/            # AI system prompts and instructions
    ├── routes/             # API endpoints (/api/chat, /api/bail-check, /api/lawyers)
    ├── utils/              # Helper functions and business logic (bail calculator)
    ├── .env                # Environment variables
    └── index.js            # Express server entry point
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas)
- [OpenRouter](https://openrouter.ai/) Account and API Key

### Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository_url>
   cd nyaybot
   ```

2. **Backend Setup**:
   ```bash
   cd server
   npm install
   ```
   - Make sure your `.env` file in the `server` directory has the correct API keys:
     ```env
     OPENROUTER_API_KEY=your_actual_key_here
     MONGO_URI=your_actual_mongodb_uri_here
     JWT_SECRET=nyaybot_jwt_secret_2024
     PORT=5000
     CLIENT_URL=http://localhost:5173
     ```
   - Start the backend development server:
     ```bash
     npm run dev
     ```

3. **Frontend Setup**:
   ```bash
   cd ../client
   npm install
   ```
   - Start the frontend development server:
     ```bash
     npm run dev
     ```

4. **Open the Application**:
   Navigate to `http://localhost:5173` in your browser.

## Disclaimer
NyayBot provides AI-generated information and preliminary eligibility checks. It does not constitute formal legal advice. For definitive legal strategy and representation, users are strongly encouraged to contact the **NALSA Helpline at 15100**.
