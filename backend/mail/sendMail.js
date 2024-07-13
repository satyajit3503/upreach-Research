const nodemailer = require('nodemailer');

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'upreach.research@gmail.com', // Your Gmail email address
        pass: 'lqhs otqk uuts jntd' // Your Gmail password
    }
});

// Function to send email
const sendMail = async (recipient, unique_id,subject,text) => {
    try {
        // console.log(recipient,unique_id)
        // Send mail with defined transport object
        await transporter.sendMail({
            from: 'upreach.research@gmail.com',
            to: recipient,
            subject: subject,
            text: `${text} : ${unique_id}`
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('email not sent:', error);
    }
};

module.exports = sendMail;