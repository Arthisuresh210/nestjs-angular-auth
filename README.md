# ⚡ NestJS + Angular Auth App

This is my hands-on project built to learn full-stack web development using NestJS for the backend and Angular for the frontend. The app allows users to register, login with email/password or Google account, and view their profile on a dashboard. All user data is stored in a MySQL database.

---

## 🌐 Live Demo

| | Link |
|---|---|
| 🖥️ Live Website | [Click here to open the app](https://arthisuresh210.github.io/nestjs-angular-auth/) |
| ⚙️ Backend API | [https://nestjs-angular-auth.onrender.com](https://nestjs-angular-auth.onrender.com/auth/google) |
| 📁 GitHub Repo | [https://github.com/Arthisuresh210/nestjs-angular-auth](https://github.com/Arthisuresh210/nestjs-angular-auth) |

---

## 🎯 What I Built

I built a complete authentication system from scratch with the following features:

- A **Register page** where new users can create an account with name, email and password
- A **Login page** where existing users can sign in
- A **Google OAuth login** button that lets users sign in using their Google account
- A **Dashboard page** that shows the logged in user's profile, stats and account info
- **Protected routes** — the dashboard cannot be accessed without logging in
- **JWT tokens** — after login a token is generated and stored, used to verify the user on every request
- **Password hashing** — passwords are never stored as plain text, they are hashed using bcrypt
- **MySQL database** — all user details are saved in a cloud MySQL database

---

## 🛠️ Technologies Used

### Frontend (Angular)
- **Angular 17** with Standalone Components — for building the UI pages
- **TypeScript** — for type-safe code
- **SCSS** — for styling with a dark theme
- **Angular Router** — for navigating between pages
- **AuthGuard** — to protect the dashboard route from unauthenticated users
- **HttpClient** — to make API calls to the backend

### Backend (NestJS)
- **NestJS** — Node.js framework used to build the REST API
- **Passport.js** — handles the authentication strategies
- **passport-local** — for email/password login
- **passport-google-oauth20** — for Google OAuth login
- **passport-jwt** — for verifying JWT tokens on protected routes
- **JWT (JSON Web Token)** — for generating and verifying auth tokens
- **bcrypt** — for hashing user passwords before saving to database

### Database
- **MySQL** — relational database to store user data
- **TypeORM** — connects NestJS to MySQL and manages the users table

### Hosting (All Free)
- **GitHub Pages** — hosts the Angular frontend
- **Render** — hosts the NestJS backend
- **Clever Cloud** — hosts the MySQL database

---

## 🔒 How Authentication Works

### Email & Password Login
```
1. User fills in email and password on login page
2. Angular sends POST request to /auth/login
3. NestJS validates credentials using passport-local
4. Password is compared with bcrypt hashed password in DB
5. If valid → JWT token is generated and returned
6. Angular stores the token in localStorage
7. Every API request sends the token as Authorization header
8. Backend verifies token using passport-jwt strategy
9. User data is returned and dashboard loads
```

### Google OAuth Login
```
1. User clicks "Continue with Google"
2. Angular redirects to /auth/google on backend
3. NestJS redirects to Google consent screen
4. User approves → Google sends profile data to callback
5. NestJS finds existing user or creates new one in MySQL
6. JWT token is generated
7. Backend redirects to Angular with token in URL
8. Angular extracts token and stores in localStorage
9. Dashboard loads with user profile
```

---

## 📡 API Endpoints

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | `/auth/register` | Create new account | ❌ |
| POST | `/auth/login` | Login with email & password | ❌ |
| GET | `/auth/google` | Start Google OAuth flow | ❌ |
| GET | `/auth/google/callback` | Google OAuth callback | ❌ |
| GET | `/users/me` | Get logged in user profile | ✅ JWT required |

---

## 🗄️ Database Table

```sql
CREATE TABLE users (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  google_id   VARCHAR(255) UNIQUE,
  email       VARCHAR(255) UNIQUE NOT NULL,
  name        VARCHAR(255),
  picture     VARCHAR(500),
  password    VARCHAR(255),
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🚀 How to Run Locally

### Step 1 — Clone the repo
```bash
git clone https://github.com/Arthisuresh210/nestjs-angular-auth.git
cd nestjs-angular-auth
```

### Step 2 — Create MySQL database
```sql
CREATE DATABASE auth_app;
```

### Step 3 — Setup backend
```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=yourpassword
DB_NAME=auth_app
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
JWT_SECRET=supersecretjwtkey123
FRONTEND_URL=http://localhost:4200
```

Start the backend:
```bash
npm run start:dev
```
Runs on → **http://localhost:3000**

### Step 4 — Setup frontend
```bash
cd frontend
npm install
ng serve
```
Runs on → **http://localhost:4200**

---

## ☁️ How I Deployed for Free

| What | Where |
|------|-------|
| Angular Frontend | GitHub Pages |
| NestJS Backend | Render |
| MySQL Database | Clever Cloud |

### Deploy frontend
```bash
cd frontend
ng build --configuration production --base-href /nestjs-angular-auth/
npx angular-cli-ghpages --dir=dist/frontend/browser
```

### Deploy backend
- Connected GitHub repo to Render
- Set Root Directory to `backend`
- Set Build Command to `npm install && npm run build`
- Set Start Command to `node dist/main.js`
- Added all `.env` variables in Render dashboard

---

## 👩‍💻 Developer

**Arthi Suresh**
- GitHub: [@Arthisuresh210](https://github.com/Arthisuresh210)

---

## 📄 Note

This project was built as a hands-on learning exercise to understand:
- How NestJS works with modules, controllers, services and guards
- How Angular standalone components and routing work
- How Google OAuth 2.0 flow works end to end
- How JWT tokens are generated and verified
- How to connect a Node.js app to MySQL using TypeORM
- How to deploy a full-stack app for free
