const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });

        let info = await transporter.sendMail({
            from: '"UniGooo - Ride Sharing" <' + process.env.MAIL_USER + '>',
            to: email,
            subject: title,
            html: body,
        });
        
        return info;
    }
    catch(error) {
        console.error("Error occurred while sending email:", error);
        throw error;
    }
};

module.exports = mailSender;