# 🏡 VIBE Interiors

A premium full-stack Interior Design Website built using the MERN Stack. The platform showcases luxury interior design services, portfolio projects, testimonials, and provides a complete Admin Dashboard for managing website content.

---

# ✨ Features

## Client Website

- Modern luxury UI
- Responsive design
- Home Page
- About Page
- Services Page
- Portfolio Page
- Design Process Page
- Contact Page
- Consultation Request Form
- Dynamic Portfolio
- Dynamic Testimonials
- Website Settings
- Premium animations and transitions

---

## Admin Dashboard

Secure JWT Authentication

Admin can:

- Login securely
- Manage Projects
- Upload Project Images
- Manage Testimonials
- Manage Contact Requests
- Update Contact Status
- Delete Contact Requests
- Manage Website Settings
- Manage Admin Users
- Change Admin Password
- Add New Admin
- Edit Existing Admin
- Delete Admin (with safety checks)

---

## Backend Features

- REST API
- MongoDB Database
- Mongoose Models
- JWT Authentication
- Password Encryption using bcrypt
- Multer Image Upload
- Protected Admin Routes
- Environment Variable Support
- Production Ready Structure

---

# 🛠 Tech Stack

### Frontend

- React.js
- React Router DOM
- Axios
- CSS3
- Lucide React Icons

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer
- dotenv
- CORS

---

# 📂 Project Structure

```
vibe-interiors
│
├── frontend
│   ├── public
│   ├── src
│   │
│   ├── assets
│   │   └── images
│   │
│   ├── components
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── SectionTitle.jsx
│   │   ├── ServiceCard.jsx
│   │   └── TestimonialCard.jsx
│   │
│   ├── pages
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Portfolio.jsx
│   │   ├── Process.jsx
│   │   ├── Contact.jsx
│   │   └── admin
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── uploads
│   ├── server.js
│   └── package.json
│
├── README.md
└── .gitignore
```

---

# ⚙ Installation & Setup

## Clone Repository

```bash
git clone https://github.com/Rishikashah2674/vibe-interiors.git
```

## Go to Project Folder

```bash
cd vibe-interiors
```

---

## Install Frontend

```bash
cd frontend
npm install
```

---

## Install Backend

```bash
cd ../backend
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file inside the backend folder.

```
PORT=5000

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY
```

---

# ▶ Running the Project

## Start Backend

```bash
cd backend
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

## Start Frontend

```bash
cd frontend
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 📷 Image Uploads

Uploaded project images are stored in:

```
backend/uploads/
```

Images are served statically through:

```
/uploads
```

---

# 🔒 Authentication

The Admin Dashboard uses:

- JWT Authentication
- bcrypt Password Hashing
- Protected Routes
- Authorization Middleware

---

# 📋 Admin Dashboard Modules

- Dashboard Overview
- Project Management
- Testimonial Management
- Contact Management
- Website Settings
- Admin User Management

---

# 📞 Contact Form

The contact form stores consultation requests in MongoDB.

Admin can:

- View Requests
- Change Status
- Delete Requests

---

# 🎯 Future Improvements

- Blog Management
- Email Notifications
- Appointment Scheduling
- Analytics Dashboard
- Multiple Admin Roles
- Image Optimization
- Dark Mode
- Project Categories & Filters

---

# 👩‍💻 Developed By

**Rishika Shah**

GitHub:
https://github.com/Rishikashah2674

---

# 📄 License

This project is developed for educational and portfolio purposes.
