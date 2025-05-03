// middleware/validationMiddleware.js

export const validateContactForm = (req, res, next) => {
    const { name, email, subject, message } = req.body;
    const errors = [];

    // Name validation
    if (!name || name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('Invalid email address');
    }

    // Subject validation
    if (!subject || subject.trim().length < 3) {
        errors.push('Subject must be at least 3 characters long');
    }

    // Message validation
    if (!message || message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};
