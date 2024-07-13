const conferencepaper = require('../models/conferenceModal');


const PublisherDashboard= async (req, res) => {

    const applicantData = await conferencepaper.find({ status: 3 });
    if (applicantData) {
        res.status(200).json(applicantData);
    } else {
        console.log('No matching reviewer found from applicant table');
    }
}

module.exports=PublisherDashboard;