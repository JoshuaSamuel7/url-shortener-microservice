# 🔗 **Secure URL Shortener Microservice** 🔗

This repository hosts a secure and efficient **URL Shortener** application built with the **MERN stack** (MongoDB, Express.js, React.js, and Node.js). It allows users to register/login, generate short URLs, set custom expiration, and view click statistics in a modular and scalable architecture following a microservices-inspired backend.

---


## 🚀 **Features**

- 🔐 **JWT-Based Authentication** – Secure user login and route protection using JSON Web Tokens.
- ✨ **Custom Short Links** – Generate short URLs with optional custom slugs.
- ⏱️ **Expiration Handling** – Set default or custom expiry durations for links.
- 📊 **Analytics** – Track total clicks, last access time, and user-based stats.
- 🧩 **Modular Backend** – Clean separation of concerns with independent services for auth, logging, and URL management.
- 🧼 **Middleware Logger** – Detailed request/response logging middleware.
- 📱 **Responsive UI** – Modern, clean user interface built with plain CSS and React.
- 🔍 **Error Handling** – Robust error reporting with meaningful HTTP status codes.

---

## 📦 **Tech Stack**

| **Technology**     | **Purpose**                             |
|--------------------|-----------------------------------------|
| **Frontend**        | React.js, Axios                        |
| **Backend**         | Node.js, Express.js                    |
| **Database**        | MongoDB + Mongoose                     |
| **Authentication**  | JSON Web Token (JWT)                   |
| **Logging**         | Custom Express Middleware              |
| **Styling**         | CSS (No frameworks)                    |

---

## 🔑 **Authentication & Security**

### 🔐 **JWT Authentication Flow**

1. **User Login**: On successful login, a signed JWT token is generated and stored on the client side.
2. **Protected Routes**: Only valid tokens can access endpoints like `/shorten`, `/mystats`, and more.
3. **Stateless API**: All authentication is stateless with token validation on each request.
4. **Secure Password Storage**: Passwords are hashed using `bcrypt` before storage.

### 📋 **Logger Middleware**

This microservice includes a fully modular, reusable Express middleware that logs:
- Request path, method, and timestamp
- User IP and agent
- Response status and duration

All logs are printed to console and optionally written to a persistent store for debugging/auditing.

---

## 🌍 **Core Microservices**

### ✅ **Auth Service**
Handles user registration, login, token generation, and token verification.

### 🔗 **URL Service**
Handles URL creation, validation, storage, redirection, and deletion with expiry logic.

### 📈 **Stats Service**
Calculates analytics such as total clicks, last visited timestamp, and per-user URL history.

Each service is modular and can be independently scaled or containerized.

---

## 🧪 **Frontend Components**

### 🔗 `Shortener.jsx`
- Takes a long URL input.
- Optional custom shortcode.
- Submits to `/shorten` and displays the generated short URL.

### 📊 `Statistics.jsx`
- Fetches and displays all URLs created by the user.
- Shows total clicks, original URL, and last clicked time.

### 📁 `Login.jsx` / `Register.jsx`
- Handles secure registration and login using JWT.
- Saves token in localStorage for persistent sessions.

---

## 📦 **How to Install and Run**

### 🛠️ **Environment Requirements**
- Node.js & npm
- MongoDB (Local or Atlas)
- Postman or browser to test API
- Vercel (for frontend deployment)

---

### 📥 **Clone & Install**

```bash
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener
```
Backend Setup
```
cd backend
npm install
```
Create a .env file:
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```
Run backend server:

```
npm start
```
Frontend Setup
```
cd frontend
npm install
npm start

Runs at:
Frontend – http://localhost:3000
Backend – http://localhost:5000
```
## 🌐 API Endpoints
### 🔐 Auth Routes
Endpoint	Method	Description
/api/auth/register	POST	Register a new user
/api/auth/login	POST	Login and get JWT token

### 🔗 URL Management
Endpoint	Method	Description
/api/url/shorten	POST	Shorten a URL (custom code optional)
/api/url/:code	GET	Redirect to long URL
/api/url/stats	GET	Get stats for all user-created links

## 📁 Project Structure

/backend
│
├── config/          # MongoDB and JWT config
├── controllers/     # Auth, URL, Stats logic
├── middlewares/     # Logger & JWT validator
├── models/          # Mongoose schemas (User, URL)
├── routes/          # API routes for all services
└── server.js        # Entry point

/frontend
│
├── components/      # Shortener, Stats, Login, Register
├── pages/           # Route-level components
├── App.js           # Route management
└── index.css        # Global styles

.env                 # Environment config
README.md            # You're here!

## 🧠 Design Choices
🔄 Hybrid Monolith + Microservice: While deployed as a monolith, the architecture is modular enough to be split into microservices in future.

⚡ Stateless APIs: JWT ensures scalable, sessionless communication.

📦 Scalability Ready: Clear folder separation allows Dockerization, testing, and deployment flexibility.

📊 Sample Analytics Output
Short URL	Long URL	Clicks	Last Accessed
js.ly/abc	www.google.com	22	2025-07-15
js.ly/xyz	www.affordmed.in	5	2025-07-16

## ✨ Future Enhancements
🔐 Role-based admin dashboard

📊 Advanced analytics dashboard with charts

⏰ Expiry reminders for short URLs

📱 QR Code generation for each short URL
