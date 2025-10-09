# BeyondChats-FSWD

## 🚀 Features Implemented

### Frontend
- 📚 Upload and view course PDFs  
- 🧠 Quiz generator (MCQ, SAQ, LAQ)  
- 💬 Chat-style interface for learning  
- 📈 Progress tracking dashboard  
- 🔐 User login/register (authentication)  

### Backend
- 🔗 REST APIs for frontend data and authentication  
- 🗂️ MongoDB database for storing users, quizzes, and PDFs  
- ⚙️ Handles OpenAI / LLM requests for quiz generation  
- 💡 **Note:** Firebase was considered but not used due to 1 MB file storage limitation. Node.js + MongoDB is used instead.

---

## 🧩 What’s Done
- Frontend fully implemented (React + Vite + Tailwind CSS)  
- Quiz generator and PDF upload working  
- Authentication and user dashboard working  
- Live frontend hosted on Vercel  

## ⚠️ What’s Missing / Pending
- Backend deployment (if not hosted yet)  
- Optional advanced LLM integration for extended quiz features  

---

## 🧰 LLM / AI Tools Used
- OpenAI API (GPT models) for generating quizzes from PDFs  
- **Purpose:** Automatic MCQ, SAQ, LAQ generation for learning content  

---

## 🛠 How I Built It
- **Frontend:** React + Vite + Tailwind CSS for responsive UI and fast development  
- **Backend:** Node.js + Express.js for REST APIs  
- **Database:** MongoDB for storing user data, quizzes, and PDFs  
- **Authentication:** JWT-based login/register system  
- **LLM Integration:** OpenAI API to generate quizzes dynamically from uploaded PDFs  

---

## 📝 Project Setup

### Frontend
```bash
cd frontend/beyondchats_frontend
npm install
npm run dev
