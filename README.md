# HypeJournal 🚀

**HypeJournal** is a simple web app designed to motivate you to stay productive each day — no matter how small the task. Log an activity, get a hype-man style AI response, and track your progress on a calendar heatmap. It’s like having a tiny cheerleader in your pocket who celebrates your every win.

## ✨ Features

- 🔐 **Google Sign-In** for secure user authentication  
- 🤖 **AI-generated responses** powered by Mistral — get hyped for your efforts!
- 📅 **Calendar heatmap** to visualize your daily activity
- ☁️ **MongoDB Atlas** stores your logs and powers the activity tracking

## 🧠 Who It’s For

Whether you’re struggling with executive dysfunction, procrastination, or just want a fun way to stay on track — HypeJournal is for anyone looking to build momentum with small wins.

## 🛠️ Tech Stack

- **Frontend:** React (Vite), TailwindCSS  
- **Backend:** Node.js, Express.js  
- **APIs/Services:** Google OAuth, Mistral AI, MongoDB Atlas  
- **Deployment:** Render

## 🚀 Live Demo

👉 Try it out here: [https://hypejournal.onrender.com](https://hypejournal.onrender.com)  
_Note: using free-tier services, so expect occasional delays or cold starts._

## 🧪 Running Locally

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/hypejournal.git
   cd hypejournal
   ```

2. Install dependencies in each folder:
   ```bash
   npm install           # at root
   cd client && npm install
   cd ../server && npm install
   ```

3. Set up environment variables:  
   You’ll need the following environment variables configured:
   - Google OAuth credentials
   - Mistral AI API key
   - MongoDB connection URI  
   _(These are not provided in this repo for security reasons.)_

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🧭 Roadmap

- 📖 View logged activities by clicking a specific date on the calendar
- 📱 Optimize and fix layout issues on smaller/mobile screens

## 📄 License

MIT  
