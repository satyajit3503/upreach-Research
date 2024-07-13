const conferencepaper = require('../models/conferenceModal');

const ApplicationDetail=async (req, res) => {

    const application_no = req.body;
    // console.log(application_no);

    const result = await conferencepaper.find(application_no)

    if (result) {
        // console.log(result)
        res.status(200).json(result)
    }
    else {
        console.log("data not found");
    }

}


module.exports=ApplicationDetail;