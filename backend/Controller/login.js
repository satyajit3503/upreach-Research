
const express = require('express');
const router = express.Router();
const User = require('../models/applicantModal');
const reviewerModal = require('../models/reviewerModal');
const adminModal = require('../models/adminModal');
const publisherModal = require('../models/publisherModal');


const Login= async (req, res) => {

    const { email, category, password } = req.body;
    console.log(req.body)
    if (category === 'Applicant') {

        await User.findOne({ email: email })
            .then(user => {
                console.log(user);
                if (user) {
                    if (user.password === password) {
                        res.status(200).json({ status: "Success", data: user });
                    }
                    else if (user.password != password) {
                        res.status(404).json("passworderror");
                    }
                    else {
                        res.json("choose correct category");
                    }
                }
                else {
                    res.json("No record existed");
                    console.log('no record')
                }
            })
            .catch(err => console.log(err))
    }
    else if (category === 'Reviewer') {
        await reviewerModal.findOne({ email: email })
            .then(existingReviewer => {
                console.log(existingReviewer);
                if (existingReviewer) {
                    if (existingReviewer.password === password) {
                        res.status(200).json({ status: "Success", data: existingReviewer });
                    }
                    else if (existingReviewer.password != password) {
                        res.json("The password is incorrect");
                    }
                    else {
                        res.json("choose correct category");
                    }
                }
                else {
                    res.status(404).json("No record existed")
                }
            })
    }
    else if (category === 'Publisher') {
        await publisherModal.findOne({ email: email })
            .then(existingPublisher => {
                console.log(existingPublisher);
                if (existingPublisher) {
                    if (existingPublisher.password === password) {
                        res.status(200).json({ status: "Success", data: existingPublisher });
                    }
                    else if (existingPublisher.password != password) {
                        res.json("The password is incorrect");
                    }
                    else {
                        res.json("choose correct category");
                    }
                }
                else {
                    res.json("No record existed")
                }
            })
    }
    else {
        await adminModal.findOne({ email: email })
            .then(existingAdmin => {
                console.log(existingAdmin);
                if (existingAdmin) {
                    if (existingAdmin.password === password) {
                        res.status(200).json({ status: "Success", data: existingAdmin });
                    }
                    else if (existingAdmin.password != password) {
                        res.json("The password is incorrect");
                    }
                    else {
                        res.json("choose correct category");
                    }
                }
                else {
                    res.json("No record existed")
                }
            })
    }
};

module.exports=Login;