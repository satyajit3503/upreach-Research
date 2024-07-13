const reviewerModal = require('../models/reviewerModal');
const conferencepaper = require('../models/conferenceModal');

const ReviewerDashboard= async (req, res) => {

    const crn = req.body;
    console.log(crn)

    try {

        const reviewerData = await reviewerModal.find(crn)

        if (reviewerData) {
            const domain = reviewerData[0].domain;
            const applicantData = await conferencepaper.find({ domain: domain, status: { $lt: 3, $gt: -1 } });
            if (applicantData) {
                res.json({ status: "success", applicantData: applicantData });
                // console.log(applicantData);
            } else {
                console.log('No matching reviewer found from applicant table');
            }
        } else {
            console.log('No matching reviewer found from reviewer table');
        }

    } catch (err) {
        console.log(err)
    }
}

module.exports=ReviewerDashboard;
