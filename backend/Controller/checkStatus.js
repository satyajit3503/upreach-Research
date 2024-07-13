const conferencepaper = require('../models/conferenceModal');


const CheckStatus= async (req, res) => {
    const crn = req.body;
    console.log(crn);
    try {
        const conferenceData = await conferencepaper.find(crn)
        res.status(200).json(conferenceData);
        console.log("conferenceData");

    } catch (err) {
        console.log(err)
    }
}
module.exports=CheckStatus;