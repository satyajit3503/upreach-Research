
const conferencepaper = require('../models/conferenceModal');

const PublisherConfDetail= async (req, res) => {

    const application_no = req.body;

    console.log(application_no);
    console.log("application no");

    const result = await conferencepaper.find(application_no)

    if (result) {
        res.status(200).json(result)
        console.log(result);
    }
    else {
        console.log("data not found");
    }

}


module.exports=PublisherConfDetail;
