// // routes/emailRoutes.js
// import express from 'express';
// import { sendContactEmail } from '../controllers/emailController.js';
// import { validateContactForm } from '../middleware/validationMiddleware.js';

// const router = express.Router();

// // Email sending route
// router.post('/send', validateContactForm, sendContactEmail);

// export default router;


// routes/contact.js
// import express from 'express';
// import transporter from '../config/emailConfig.js';

// const router = express.Router();

// router.post('/send', async (req, res) => {
//   const { name, email, message } = req.body;

//   const mailOptions = {
//     from: email,
//     to: process.env.EMAIL_USER,
//     subject: 'New Contact Form Submission',
//     text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.send('Email sent successfully!');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error sending email.');
//   }
// });

// routes/emailRoutes.js

import express from 'express';
import { sendContactEmail } from '../controllers/emailController.js';
import { validateContactForm } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/send', validateContactForm, sendContactEmail);

export default router;


