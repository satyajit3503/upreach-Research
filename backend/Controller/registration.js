const express = require('express');
// const app = express();
const router = express.Router();
const User = require('../models/applicantModal');
const reviewerModal = require('../models/reviewerModal');
const sendMail = require('../mail/sendMail');

const { v4: uuidv4 } = require('uuid');

const subject = "Registration succcessful";
const text = "Your profile has been successfully created.\nYour CRN number is"


const Registration= async (req, res) => {
    const { name, email,phone, category, domain, password } = req.body;
    // console.log(req.body);

    function generateCRN() {
        const uuid = uuidv4().replace(/-/g, '');
        const code = uuid.substring(0, 11).toUpperCase();
        return code;
    }
    const crn = generateCRN();


    if (category === 'Applicant') {
        let flag = true;

        await User.findOne({ email: email })
            .then(existingUser => {
                // console.log(existingUser);
                if (existingUser && existingUser.category === category) {
                    res.status(409).json('already');
                    flag = false;
                }
                else {
                    User.create({ crn, name, email, phone,category, password })
                        .then(result => {
                            //console.log(result)
                            res.json("Success")
                        })
                        .catch(err => res.json(err));
                }

            })
        if (flag) {
            await sendMail(email, crn, subject, text);
        }

    }
    else if (category === 'Reviewer') {

        let flag = true;

        await reviewerModal.findOne({ email: email })
            .then(existingUser => {
                console.log(existingUser);
                if (existingUser) {
                    res.json('already');
                    flag = false;
                }
                else {
                    reviewerModal.create({ crn, name, email,phone, category, domain, password })
                        .then(result => {
                            console.log(result)
                            res.json("Success")
                        })
                        .catch(err => res.json(err));
                }
            })
        if (flag === true) {
            await sendMail(email, crn, subject, text);
        }
    }
};


module.exports=Registration;