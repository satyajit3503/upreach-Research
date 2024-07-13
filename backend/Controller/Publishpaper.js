const publishPaperStatus = require('../models/publishStatusModal');
const conferencepaper = require('../models/conferenceModal');

const publishpaper= async (req, res) => {

    const { application_no } = req.body;

    try {
        const conferenceResult = await conferencepaper.find({ status: 4 });
        if (conferenceResult) {

            const publisherResult = await publishPaperStatus.find(application_no)
            console.log({ conferenceResult, publisherResult });
            res.json({ conferenceResult: conferenceResult, publisherResult: publisherResult });
        }
        else {
            res.json("no record found")
            console.log("record not updated")
        }
    } catch (err) {
        console.log(err);
    }

}
module.exports = publishpaper;