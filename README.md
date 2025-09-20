# Smart App 🏡📱 

Smart App is a **neighborhood community application** designed for apartment residents.  
It helps people easily **find their parked vehicles in the basement using pillar numbers** and also shows empty parking slots so that everyone can park without confusion.  

The app also has a **community hub** with features like profile management, posts, and more, making it a one-stop solution for residents.  

A **full-stack MERN application** with a **modern frontend (React)** and a **secure backend (Node.js + Express + MongoDB)**.  
This app includes **user authentication (register/login)**, **profile management**, and a **basement parking slot reservation system with undo functionality**.  

---
**Project Live Link:-** https://smart-neighborhood-app.netlify.app/

**Github Repo Link:-**  https://github.com/Harsha0987/smart_app.git

---

## ⚡ Skills & Tech Stack

<p align="center">
  <img src="https://skillicons.dev/icons?i=react,html,css,js,tailwind,redux,nodejs,express,mongodb,git,github,vscode" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=20&pause=1000&color=36BCF7&center=true&vCenter=true&width=600&lines=⚛️+React+Frontend;🎨+TailwindCSS+Styling;🚀+Express.js+Backend;🗄️+MongoDB+Database;🔑+JWT+Authentication;💻+Full+Stack+MERN+Application" alt="Typing SVG"/>
</p>

---

## 📂 Project Structure

```bash
smart-app/
│
├── client/          # React frontend (UI)
│   ├── public/      # Static assets (favicon, manifest, images)
│   ├── src/         # React components, pages, routes
│   └── package.json
│
├── server/          # Express backend (API)
│   ├── models/      # MongoDB models (User, Posts, etc.)
│   ├── routes/      # API routes (auth, profile, posts)
│   ├── middleware/  # Auth middleware
│   ├── server.js    # Entry point
│   └── package.json
│
├── README.md        # Project documentation
└── .gitignore
````

---

## ⚡ Features

✅ User Registration & Login (with JWT & bcrypt)
✅ Protected Routes & Authentication Middleware
✅ Profile Page (Welcome User + Info Icon)
✅ Basement Parking Slot Map with Reserve & Undo
✅ Clean, Minimal & Professional UI
✅ Fully Responsive Design

---

## 🛠️ Tech Stack

**Frontend (Client)**

* ⚛️ React
* 🎨 TailwindCSS
* 🔗 Axios

**Backend (Server)**

* 🟢 Node.js
* 🚀 Express.js
* 🗄️ MongoDB + Mongoose
* 🔑 JWT Authentication
* 🔒 bcrypt for password hashing

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/smart_app.git
cd smart_app
```

### 2️⃣ Install Dependencies

#### For Backend (server)

```bash
cd server
npm install
```

#### For Frontend (client)

```bash
cd client
npm install
```

### 3️⃣ Setup Environment Variables

Inside `server/.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Run the Application

#### Backend

```bash
cd server
npm run dev
```

#### Frontend

```bash
cd client
npm start
```

---

## 🌍 Deployment

### 🚀 Deploy Backend (Server) on **Render / Railway / Heroku**

1. Push your code to GitHub.
2. Create a new project on [Render](https://render.com) or [Railway](https://railway.app).
3. Connect your repository and choose the **server** folder.
4. Add Environment Variables (`PORT`, `MONGO_URI`, `JWT_SECRET`).
5. Deploy → You will get a backend URL like:

   ```
   https://smartapp-backend.onrender.com
   ```

---

### 🚀 Deploy Frontend (Client) on **Netlify / Vercel**

1. Go to [Netlify](https://netlify.com) or [Vercel](https://vercel.com).

2. Connect your GitHub repo and select the **client** folder.

3. Add environment variable for API base URL:

   ```
   REACT_APP_API=https://smartapp-backend.onrender.com
   ```

4. Deploy → You will get a frontend URL like:

   ```
   https://smartapp.netlify.app
   ```

---

## 🎯 Usage

1. Register a new user 📝
2. Login with your credentials 🔑
3. Navigate to profile → See welcome message + info icon
4. Go to **Basement Map** → Reserve a slot (🅿️ button)
5. Undo reservation anytime 🔄

---

## 📈 Future Improvements

* Add **Admin Dashboard** to monitor parking
* Email/OTP verification system
* Payment gateway for premium slots

---

## 👨‍💻 Author

Developed with ❤️ by **Kolla Harsha Vardhan**

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=22&pause=1000&color=1ED760&center=true&vCenter=true&width=450&lines=Full+Stack+MERN+Developer;Passionate+about+Clean+Code;Always+Learning+%26+Building" alt="Typing SVG"/>
</p>

---

✨ If you like this project, don’t forget to **star ⭐ the repo**!

---

