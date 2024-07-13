const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const sendMail = require('../mail/sendMail');
const User = require('../models/applicantModal');
const conferencepaper = require('../models/conferenceModal');


const applyConference = async (req, res) => {
    const { crn, title, author, phone,email, domain, abstract } = req.body;
    const file = req.file.filename;
    // console.log(file);

    const subject = "Conference Application Submitted";
    const text = "Your conference application has been successfully submitted. \nYour application number is";

    function generateUniqueCode() {
        const uuid = uuidv4().replace(/-/g, '');
        const code = uuid.substring(0, 16);
        return code;
    }
    const application_no = generateUniqueCode();

    try {

        const status = 0;
        const link='https://meet.google.com/qmw-rvhi-zmg'
        const userData = await User.findOne({ crn: crn })
        // console.log(userData)

        if (userData) {
            await conferencepaper.create({ crn,link, application_no, title, author, phone,email, domain, abstract, status, file });
            await sendMail(email, application_no, subject, text);
            console.log("successfully applied ")
            res.json("success")
        } else {
            res.json("please enter correct CRN")
        }
    } catch (error) {
        res.json({ status: error })
    }

}

module.exports = applyConference;