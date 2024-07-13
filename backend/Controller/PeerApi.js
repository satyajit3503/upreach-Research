const conferencepaper = require('../models/conferenceModal');
const peerResult = require('../models/peerModal');

const PeerApi= async (req, res) => {

    const { application_no, comments, marks, reviewer_crn, status } = req.body;

    const conferenceData = await conferencepaper.findOne({ application_no })

    if (conferenceData.status < 1) {

        const result = peerResult.create({ application_no, comments, marks, reviewer_crn, status });
        if (result) {

            console.log("peer data created");

            if (status === 'Recommend') {
                const r = await conferencepaper.findOneAndUpdate({ application_no, status: 0 }, { status: 1 });
                if (r) {
                    console.log("record updated")
                }
                else {
                    console.log("record not updated")
                }
            }
            else if (status === 'Not Recommend') {
                const r = await conferencepaper.findOneAndUpdate({ application_no, status: 0 }, { status: -1 });
                // await conferencepaper.deleteOne(application_no);
                if (r) {
                    console.log("record updated")
                }
                else {
                    console.log("record not updated")
                }
            }
            res.json("success");
        }
        else {
            console.log("peer data not created");
        }
    }
    else {
        console.log("Already Reviewed");
        res.status(409).json('already');
    }
}

module.exports=PeerApi;
