import transporter from '../config/emailConfig.js'; // use the central config

class EmailService {
    async sendContactFormEmail({ name, email, subject, message }) {
        try {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_USER,
                subject: `New Portfolio Message: ${subject}`,
                html: `
                    <h3>New Message from Portfolio Contact Form</h3>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <p><strong>Message:</strong> ${message}</p>
                `,
            };

            const info = await transporter.sendMail(mailOptions); // use imported transporter
            console.log('Email sent:', info.response);
            return true;
        } catch (error) {
            console.error('Email sending error:', error);
            return false;
        }
    }
}

export default new EmailService();
