# 🌍 WanderStay

**WanderStay** is a full-stack accommodation-booking platform inspired by Airbnb and Booking.com — built with **React**, **Node.js**, **Express**, **MongoDB**, and **Stripe**.  
It offers seamless booking, secure payments, role-based dashboards, and a rich interactive UI powered by modern React libraries and animations.

---

## 🚀 Live Demo

🔗 **Client:** [https://wanderstaybnb-auth.web.app](#)  
🔗 **Server:** [https://wanderstay-server.vercel.app](#)

---

## 🧭 Overview

### 🏠 Home Page  
- Responsive **Navbar**, animated **Banner**, and **About** section.  
- “**Popular Places to Stay**” and **Website Review** sections using **TanStack Query** for live data.  
- Includes **Lottie animations**, **GSAP** scroll animations, and **Lenis smooth scrolling** for a premium experience.  
- **Footer**

### 🏡 Rooms Page  
- Displays all available rooms with:
  - Image, title, description, price, rating, and bookmark option.  
  - Detailed room view including **reviews**, **availability calendar**, and **reservation form**.  
- **Stripe integration** for secure payment processing.  
- **Room Review System** using **TanStack Query** and real-time updates.

### 📊 Dashboard System  
#### 👤 Guest Dashboard  
- Personalized **Statistics** (bookings, total spend).  
- “**Become a Host**” functionality.  
- View and manage **My Bookings**.

#### 🏠 Host Dashboard  
- View **Statistics** (earnings, bookings, rooms).  
- **Add New Rooms** with image upload via **ImgBB API**.  
- Manage listings and update room information.  
- Approve, reject, or cancel bookings.  
- Switch roles (Guest ↔ Host) seamlessly.

#### 🛠️ Admin Dashboard  
- Global **Statistics** (total users, rooms, sales).  
- Manage all **Users** and their roles (Guest, Host, Admin).  
- Approve host requests and monitor platform health.

### 🧩 Common Functionalities  
- **User Profile Management** – update profile, photo, and password.  
- **Password Reset** and **Logout** using Firebase Authentication.  
- **Google Sign-In** and email/password authentication.  
- **JWT-based authorization** between client and server.

---

## 🔐 Authentication & Authorization

| Feature | Technology |
|----------|-------------|
| Auth Provider | Firebase Authentication |
| Social Login | Google OAuth |
| Token Management | JWT (with HttpOnly Cookies) |
| Password Reset | Firebase API |
| Role-Based Access | Admin / Host / Guest Middleware |

---

## 💳 Payment Integration

- Implemented **Stripe Payment Gateway**.  
- Each successful booking generates a **unique transaction ID**.  
- Users receive **email notifications** using **NodeMailer (Gmail SMTP)**.  
- Hosts are automatically notified when their rooms are booked or updated.

---

## 🧠 Tech Stack

### Frontend
- **React 18**, **Vite**, **Tailwind CSS**
- **React Router DOM**
- **TanStack React Query**
- **React Helmet Async** (SEO)
- **React-Icons**, **React Simple Captcha**, **React PropTypes**
- **React-Swiper** (sliders)
- **React-Date-Range**, **date-fns**, **moment.js**
- **React Parallax**, **React Marquee**, **React Lottie**
- **GSAP**, **Lenis** (scroll & motion animation)
- **React-Google-Recharts** (analytics & charts)
- **React-Toastify** (notifications)
- **React HeadlessUI Modal** (dialogs)
- **React Typed** (typing animation)
- **Tailwind CSS Buttons**, pagination components

### Backend
- **Node.js** + **Express.js**
- **MongoDB** (with Mongoose driver)
- **Stripe API**
- **NodeMailer**
- **Cron Jobs** (with node-cron)
- **JWT Authentication**
- **CORS + Cookie Parser**
- **Dotenv**

---

## ⚙️ Key Features

✅ Smooth GSAP + Lenis page transitions  
✅ Stripe secure payments  
✅ Role-based dashboards (Guest / Host / Admin)  
✅ Room availability logic + 48-hour booking protection  
✅ Email notifications for bookings, updates, and cancellations  
✅ Integrated reviews (website + per-room)  
✅ Cross-platform bookmark system  
✅ Animated landing sections using Lottie and React Typed  
✅ Rich UI powered by Tailwind CSS and HeadlessUI  
✅ SEO meta management via React Helmet Async  
✅ Fully responsive and mobile-friendly

---

## 🧰 Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/mishu2424/WanderStaybnb.git
cd WanderStaybnb

2️⃣ Install dependencies
# Client
cd client
npm install

# Server
cd ../server
npm install

3️⃣ Set up environment variables
#Client .env.local
VITE_apiKey=firebase_api_key
VITE_authDomain=firebase_auth_domain
VITE_projectId=firebase_projectId
VITE_storageBucket=firebase_storageBucket
VITE_messagingSenderId=firebase_messagingSenderId
VITE_appId=firebase_appId
VITE_IMGBB_API=image_upload_IMGBB_API
VITE_API_URL=https://wanderstay-server.vercel.app
VITE_GOOGLE_MAP_API_KEY=google_map_api_key
VITE_GOOGLE_MAP_ID=google_map_id
VITE_STRIPE_PUBLISHABLE_KEY=stripe_publishable_key

#Server .env
DB_USER=MongoDB_USER
DB_PASS=MongoDB_PASS
ACCESS_TOKEN_SECRET=JWT_ACCESS_TOKEN
STRIPE_SECRET_KEY=Stripe_SECRET_KEY
FRONTEND_URL=https://wanderstaybnb-auth.web.app
TRANSPORT_EMAIL=TRANSPORT_EMAIL
TRANSPORT_PASS=TRANSPORT_PASS

4️⃣ Run locally
# Client
npm run dev

# Server
nodemon index.js

5️⃣ Deployment
Client: Deployed on firebase
Server: Deployed on Vercel.
Ensure CORS is properly configured for environments.

📊 Future Enhancements
🧠 AI-driven personalized recommendations
🏖️ Multi-currency and location-based pricing
🧾 Invoice generation (PDF via Node)
💬 Real-time chat between host and guest
📱 Mobile app version 

🤝 Contributing
Pull requests are welcome!
If you plan to make major changes, please open an issue first to discuss what you’d like to change.


🧑‍💻 Author
Apurbo Dey Mishu
📧 <apurbodeymishu856@gmail.com>
💼 [LinkedIn](https://www.linkedin.com/in/apurbo-dey-mishu-7509812ba)
