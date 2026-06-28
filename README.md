# VIBE Interiors 🏡✨

A modern and responsive interior designer portfolio website built using the **MERN Stack**.  
VIBE Interiors is designed to showcase premium interior design services, completed projects, and provide an easy consultation experience for clients.

The website focuses on a luxury aesthetic with a warm beige, cream, brown, and gold color palette to represent elegance and sophistication.

---

## 📌 Features

### 🖥️ Frontend Features

- Premium interior designer landing page
- Fully responsive design for:
  - Desktop
  - Tablet
  - Mobile devices
- Modern luxury UI/UX
- Smooth animations and hover effects
- Responsive navigation bar
- Multiple website sections:
  - Hero Section
  - About Us
  - What We Design
  - Experience & Achievements
  - Services
  - Featured Projects
  - Why Choose Us
  - Testimonials
  - Contact Section
  - Footer

---

## 🏠 Website Pages

### Home Page

Includes:

- Brand introduction
- Hero section with CTA
- Design categories
- Experience statistics
- Featured projects
- Client reviews
- Consultation call-to-action

---

### About Page

Contains:

- Designer introduction
- Brand story
- Vision and mission
- Design philosophy
- Company values

---

### Services Page

Showcases interior design services:

- Luxury Homes
- Apartments
- Bungalows
- Living Rooms
- Modular Kitchens
- Office Interiors

---

### Portfolio Page

A premium project showcase including:

- Residential Interiors
- Luxury Homes
- Bedrooms
- Kitchens
- Bungalows
- Office Spaces

---

### Process Page

Displays the complete design journey:

1. Consultation
2. Requirement Understanding
3. Concept Development
4. Material Selection
5. Execution
6. Final Handover

---

### Contact Page

Includes:

- Client inquiry form
- Contact information
- Consultation request section

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- React Router DOM
- CSS3
- Responsive Grid & Flexbox

## Backend

- Node.js
- Express.js

## Database

- MongoDB Atlas
- Mongoose

## Development Tools

- Git & GitHub
- VS Code
- Nodemon
- Postman

---

# 📂 Project Structure

```
vibe-interiors
│
├── frontend
│   │
│   ├── src
│   │   │
│   │   ├── components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── ServiceCard.jsx
│   │   │   ├── TestimonialCard.jsx
│   │   │   └── SectionTitle.jsx
│   │   │
│   │   ├── pages
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Portfolio.jsx
│   │   │   ├── Process.jsx
│   │   │   └── Contact.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── index.css
│   │
│   └── package.json
│
├── backend
│   │
│   ├── config
│   │   └── db.js
│   │
│   ├── controllers
│   │
│   ├── models
│   │
│   ├── routes
│   │
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation & Setup

## 1. Clone Repository

Clone the repository using:

```bash
git clone https://github.com/Rishikashah2674/vibe-interiors.git
```

Navigate into the project folder:

```bash
cd vibe-interiors
```

---

# Frontend Setup

Navigate to the frontend folder:

```bash
cd frontend
```

Install all required dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will run on:

```
http://localhost:5173
```

---

# Backend Setup

Open a new terminal window.

Navigate to the backend folder:

```bash
cd backend
```

Install all required dependencies:

```bash
npm install
```

Create a `.env` file inside the backend folder and add your MongoDB connection string:

```env
MONGO_URI=your_mongodb_connection_string
```

Start the backend development server:

```bash
npm run dev
```

The backend will run on:

```
http://localhost:5000
```

---

# Running the Complete Application

To run the complete MERN application:

### Terminal 1 - Start Backend

```bash
cd backend
npm run dev
```

### Terminal 2 - Start Frontend

```bash
cd frontend
npm run dev
```

The website will now be available at:

```
http://localhost:5173
```

and the backend API will run at:

```
http://localhost:5000
```

---

# 🔐 Environment Variables

The backend requires the following environment variable:

```env
MONGO_URI=your_mongodb_connection_string
```

Example:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/vibe-interiors
```

Make sure the `.env` file is not uploaded to GitHub by adding it to `.gitignore`.

---
