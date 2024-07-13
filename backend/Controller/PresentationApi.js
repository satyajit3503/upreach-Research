
const conferencepaper = require('../models/conferenceModal');
const presentationResult = require('../models/presentationModal');


const PresentationApi=async (req, res) => {

    const { application_no, comments, marks, reviewer_crn, status } = req.body;


    const conferenceData = await conferencepaper.findOne({ application_no })

    if (conferenceData.status < 3) {

        const result = presentationResult.create({ application_no, comments, marks, reviewer_crn, status });

        if (result) {

            console.log("presentation data created");

            if (status === 'Recommend') {
                const r = await conferencepaper.findOneAndUpdate({ application_no, status: 2 }, { status: 3 });
                if (r) {
                    console.log("record updated")
                }
                else {
                    console.log("record updated")
                }
            }
            else if (status === 'Not Recommend') {
                const r = await conferencepaper.findOneAndUpdate({ application_no, status: 2 }, { status: -1 });
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
            console.log("presentation data not created");
        }
    }
    else {
        console.log("Already presentation review completed");
        res.status(409).json('Already')
    }
}


module.exports=PresentationApi;