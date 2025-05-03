# 🌐 Developer Portfolio

This is a full-stack **developer portfolio** project that includes a personal landing page, project showcase, filtering functionality, animations, and a working **contact form** powered by **Node.js**, **Express**, and **Nodemailer**.

## ✨ Features

### Frontend (HTML/CSS/JavaScript + Tailwind CSS)
- Responsive layout with mobile menu toggle
- Smooth scrolling navigation
- Project filtering with buttons
- Scroll-based animations and transitions
- Skills section with animated progress bars
- Contact form with validation and AJAX submission

### Backend (Node.js + Express)
- Handles contact form submissions via `/api/email/send`
- Validates inputs with custom middleware
- Sends emails securely using Gmail + Nodemailer
- Uses environment variables for security
- Includes rate limiting and Helmet for basic security

---

## 🗂 Project Structure

project-root/
│
├── public/ # Frontend files (HTML, CSS, JS)
│ ├── index.html
│ ├── styles.css
│ └── script.js
│
├── src/
│ ├── controllers/
│ │ └── emailController.js
│ ├── middleware/
│ │ └── validationMiddleware.js
│ ├── routes/
│ │ └── emailRoutes.js
│ └── utils/
│ └── emailService.js
│
├── .env # Environment variables
├── app.js # Main server entry point
├── package.json
└── README.md

yaml
Copy
Edit
