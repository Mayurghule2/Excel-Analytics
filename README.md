<div align="center">

<img src="https://img.shields.io/badge/Excel%20Analytics-Platform-2563eb?style=for-the-badge&logo=microsoftexcel&logoColor=white" alt="Excel Analytics Platform" />

# 📊 Excel Analytics Platform

### Upload any Excel file → Get instant charts + AI-powered insights

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-Visit%20Now-2563eb?style=for-the-badge)](https://excel-analytics-platform-zidio.netlify.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Made with React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)

<br/>

> A full-stack MERN application that lets users upload Excel/CSV files, visualize data as interactive charts, and receive AI-generated summaries — all secured with JWT authentication and role-based access control.

<br/>

![Excel Analytics Platform Banner](https://excel-analytics-platform-zidio.netlify.app/)

</div>

---

## 🎯 What This Project Does

Most teams spend hours manually reading Excel reports and building charts. **Excel Analytics Platform** eliminates that entirely:

1. **Upload** any `.xlsx` or `.csv` file
2. **Visualize** data instantly as bar, line, pie, or area charts
3. **Download** charts as images
4. **Read** an AI-written plain-English summary of your data
5. **Manage** your full upload history from a personal dashboard

No data science expertise needed. No Excel formulas. Just upload and go.

---

## ✨ Features

### 👤 User Features
| Feature | Description |
|---|---|
| 📁 **File Upload** | Upload any `.xlsx` or `.csv` file — any size, any structure |
| 📊 **4 Chart Types** | Switch between Bar, Line, Pie, and Area charts in one click |
| 🤖 **AI Summary** | LLM-generated plain-English summary of your data via OpenRouter API |
| ⬇️ **Export** | Download charts as images and AI summaries as downloadable files |
| 🕓 **Upload History** | Browse and re-analyze every file you've ever uploaded |
| 👤 **Profile Management** | Update your name, email, and avatar |
| 🔐 **Forgot Password** | Secure password reset flow via email |

### 🛡️ Admin Features
| Feature | Description |
|---|---|
| 📈 **Upload Analytics** | Daily, weekly, and monthly upload charts across all users |
| 📋 **Stats Dashboard** | Total files, total users, total rows analyzed, file status (pending / processed / failed) |
| 👥 **User Management** | View all registered users — name, email, role, uploads, join date |
| 💬 **Contact Messages** | Read all messages submitted through the landing page contact form |

### 🔒 Security
- JWT-based authentication with protected routes
- Passwords hashed with **bcrypt**
- Role-based access control (Admin / User)
- Token expiry and refresh handling

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black&style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square)
![Recharts](https://img.shields.io/badge/Recharts-Chart%20Library-8884d8?style=flat-square)
![Lucide](https://img.shields.io/badge/Lucide-Icons-f97316?style=flat-square)
![Axios](https://img.shields.io/badge/Axios-HTTP%20Client-5A29E4?style=flat-square)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-Runtime-339933?logo=nodedotjs&logoColor=white&style=flat-square)
![Express.js](https://img.shields.io/badge/Express.js-Framework-000000?logo=express&style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white&style=flat-square)
![Mongoose](https://img.shields.io/badge/Mongoose-ODM-880000?style=flat-square)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?logo=jsonwebtokens&style=flat-square)
![bcrypt](https://img.shields.io/badge/bcrypt-Hashing-orange?style=flat-square)

### AI & Integrations
![OpenRouter](https://img.shields.io/badge/OpenRouter-LLM%20API-7c3aed?style=flat-square)
![Multer](https://img.shields.io/badge/Multer-File%20Upload-ff6b35?style=flat-square)
![SheetJS](https://img.shields.io/badge/SheetJS-Excel%20Parsing-217346?style=flat-square)

### DevOps & Deployment
![Netlify](https://img.shields.io/badge/Frontend-Netlify-00C7B7?logo=netlify&logoColor=white&style=flat-square)
![Render](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render&logoColor=white&style=flat-square)
![MongoDB Atlas](https://img.shields.io/badge/DB-MongoDB%20Atlas-47A248?logo=mongodb&logoColor=white&style=flat-square)

---

## 📁 Project Structure

```
excel-analytics-platform/
│
├── client/                          # React frontend
│   ├── public/
│   └── src/
│       ├── assets/                  # Images & static files
│       ├── components/              # Reusable UI components
│       │   ├── charts/              # Bar, Line, Pie, Area chart components
│       │   ├── admin/               # Admin-only components
│       │   └── shared/              # Navbar, Footer, ProtectedRoute
│       ├── pages/
│       │   ├── LandingPage.jsx      # Public landing page
│       │   ├── Dashboard.jsx        # User dashboard
│       │   ├── UploadHistory.jsx    # File history
│       │   ├── Profile.jsx          # User profile settings
│       │   └── admin/
│       │       ├── AdminDashboard.jsx
│       │       ├── UserDetails.jsx
│       │       └── Messages.jsx
│       ├── context/                 # Auth context (JWT state)
│       ├── hooks/                   # Custom React hooks
│       └── utils/                   # Axios instance, helpers
│
└── server/                          # Express backend
    ├── config/                      # DB connection, env config
    ├── controllers/                 # Route logic
    │   ├── authController.js        # Register, login, forgot password
    │   ├── fileController.js        # Upload, parse, process Excel
    │   ├── chartController.js       # Chart data generation
    │   ├── aiController.js          # OpenRouter LLM integration
    │   └── adminController.js       # Admin-only routes
    ├── middleware/
    │   ├── authMiddleware.js        # JWT verification
    │   └── roleMiddleware.js        # Admin/User role guard
    ├── models/
    │   ├── User.js                  # User schema
    │   ├── File.js                  # Uploaded file schema
    │   └── Message.js               # Contact form schema
    ├── routes/                      # Express routers
    └── server.js                    # Entry point
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- OpenRouter API key → [Get one free](https://openrouter.ai/)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/excel-analytics-platform.git
cd excel-analytics-platform
```

### 2. Set Up the Backend

```bash
cd server
npm install
```

Create a `.env` file inside `/server`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
OPENROUTER_API_KEY=your_openrouter_api_key
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
CLIENT_URL=http://localhost:5173
```

```bash
npm run dev       # Starts backend on http://localhost:5000
```

### 3. Set Up the Frontend

```bash
cd ../client
npm install
```

Create a `.env` file inside `/client`:

```env
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev       # Starts frontend on http://localhost:5173
```

### 4. Open in Browser

```
http://localhost:5173
```

---

## 🔑 Demo Credentials

Try the live app instantly — no signup needed:

| Role | Email | Password |
|------|-------|----------|
| 👤 User | `demo@excelanalytics.com` | `demo1234` |
| 🛡️ Admin | `admin@excelanalytics.com` | `admin1234` |

> 🔗 **Live URL:** [https://excel-analytics-platform-zidio.netlify.app/](https://excel-analytics-platform-zidio.netlify.app/)

---

## 📸 Screenshots

> *(Add screenshots of your dashboard, chart view, AI summary panel, and admin dashboard here)*

| Landing Page | User Dashboard |
|---|---|
| ![Landing](./screenshots/landing.png) | ![Dashboard](./screenshots/dashboard.png) |

| Chart View | Admin Dashboard |
|---|---|
| ![Charts](./screenshots/charts.png) | ![Admin](./screenshots/admin.png) |

---

## 🔌 API Overview

### Auth Routes
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login & get JWT | ❌ |
| POST | `/api/auth/forgot-password` | Send reset email | ❌ |
| POST | `/api/auth/reset-password` | Reset with token | ❌ |

### File Routes
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/files/upload` | Upload Excel/CSV | ✅ User |
| GET | `/api/files/history` | Get upload history | ✅ User |
| GET | `/api/files/:id/chart` | Get chart data | ✅ User |
| GET | `/api/files/:id/summary` | Get AI summary | ✅ User |

### Admin Routes
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/dashboard` | Upload analytics | ✅ Admin |
| GET | `/api/admin/users` | All registered users | ✅ Admin |
| GET | `/api/admin/messages` | Contact form messages | ✅ Admin |

---

## 🤖 AI Integration

This project uses the **OpenRouter API** to generate plain-English summaries of uploaded Excel data.

**How it works:**
1. After a file is parsed, key statistics (row count, column names, min/max/avg values) are extracted
2. A structured prompt is sent to the LLM via OpenRouter
3. The model returns a human-readable summary of trends, outliers, and insights
4. The summary is stored in MongoDB and can be downloaded by the user

```js
// Example prompt sent to LLM
const prompt = `
  You are a data analyst. Analyze this Excel data summary and provide 
  clear insights in plain English (3-5 sentences):
  
  Columns: ${columns.join(', ')}
  Total Rows: ${rowCount}
  Key Stats: ${JSON.stringify(stats)}
  
  Highlight trends, notable values, and any actionable insights.
`;
```

---

## 🧩 Key Implementation Highlights

**JWT Authentication Flow**
- Access token stored in `localStorage`, attached to every API request via Axios interceptor
- Protected routes use a `ProtectedRoute` wrapper component
- Forgot password sends a signed reset token via email (expires in 15 minutes)

**Excel Parsing Pipeline**
- File uploaded via `multer` → saved to server
- Parsed with `SheetJS (xlsx)` → converted to JSON
- Rows stored in MongoDB with status: `pending → processing → processed`

**Role-Based Access Control**
- Two middleware layers: `verifyToken` (checks JWT) + `requireAdmin` (checks role)
- Admin routes are completely inaccessible to regular users at both frontend and backend level

**Chart Data Generation**
- Raw JSON rows are aggregated server-side by column
- Sent to frontend where `Recharts` renders bar, line, pie, or area charts
- Chart export uses `html2canvas` to capture the chart DOM node as a downloadable PNG

---

## 🌱 Future Improvements

- [ ] Google OAuth login
- [ ] Real-time collaboration on shared dashboards
- [ ] Email scheduled reports (weekly/monthly)
- [ ] Support for multi-sheet Excel files
- [ ] Dark mode UI

---

## 👨‍💻 Author

<div align="center">

**Your Name**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?logo=linkedin&style=for-the-badge)](https://linkedin.com/in/yourprofile)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?logo=github&style=for-the-badge)](https://github.com/yourusername)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-2563eb?style=for-the-badge)](https://yourportfolio.com)

*Open to full-stack / SDE opportunities. Feel free to reach out!*

</div>

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

⭐ **If this project helped you or impressed you, please give it a star!** ⭐

*Built with ❤️ using MERN Stack + OpenRouter AI*

</div>
