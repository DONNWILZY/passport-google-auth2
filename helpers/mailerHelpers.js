// utilities/mailerHelpers.js

const transporter = require('../utitilties/transporter');
const AppError = require('../utitilties/appError');

const signupSuccessfulEmail = async (email, name) => {
    try {
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Registration Successful",
            html: `
                <h1>Welcome to SoTrip</h1>
                <p>Dear ${name},</p>
                <p>Your registration was successful. You can create create passoword for your account.</p>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log("Confirmation email sent successfully.");
    } catch (error) {
        console.error("Error sending confirmation email:", error);
        throw new AppError("Failed to send confirmation email.", 500, "EMAIL_SEND_ERROR");
    }
};




module.exports = { signupSuccessfulEmail };

