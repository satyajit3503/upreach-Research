const conferencepaper = require('../models/conferenceModal');
const cameraResult = require('../models/cameraModal');


const CameraApi = async (req, res) => {

    const { application_no, comments, marks, reviewer_crn, status } = req.body;
    const conferenceData = await conferencepaper.findOne({ application_no })

    if (conferenceData.status < 2) {

        const result = cameraResult.create({ application_no, comments, marks, reviewer_crn, status });

        if (result) {

            console.log("camera data created");

            if (status === 'Recommend') {
                const r = await conferencepaper.findOneAndUpdate({ application_no, status: 1 }, { status: 2 });
                if (r) {
                    console.log("record updated")
                }
                else {
                    console.log("record updated")
                }
            }
            else if (status === 'Not Recommend') {
                const r = await conferencepaper.findOneAndUpdate({ application_no, status: 1 }, { status: -1 });
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
            console.log("camera data not created");
        }
    }
    else {
        console.log("camera review data already exist");
        res.status(409).json("Already")
    }
}

module.exports = CameraApi;