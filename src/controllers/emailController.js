// controllers/emailController.js
import EmailService from '../utils/emailService.js';

export const sendContactEmail = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        const emailSent = await EmailService.sendContactFormEmail({
            name,
            email,
            subject,
            message
        });

        if (emailSent) {
            return res.status(200).json({ 
                message: 'Email sent successfully' 
            });
        } else {
            return res.status(500).json({ 
                error: 'Failed to send email' 
            });
        }
    } catch (error) {
        console.error('Email sending error:', error);
        res.status(500).json({ 
            error: 'Internal server error' 
        });
    }
};
