const publisherModal = require('../models/publisherModal');
const publishPaperStatus = require('../models/publishStatusModal');
const conferencepaper = require('../models/conferenceModal');
const sendMail=require('../mail/sendMail');

const publisherfinalstatus=async (req, res) => {

    const { application_no, publisher_crn, comments, status } = req.body;

    const result = await publishPaperStatus.create(req.body)

    const confData = await conferencepaper.findOne({ application_no });

    const email = confData.email;
    console.log(email);

    const subject = `Conference ${status}`;
    const text = `${comments}. \nYour application number is`;


    if (result) {

        console.log(req.body);
        console.log("publish paper collection created");

        if (status === 'Accepted') {
            const r = await conferencepaper.findOneAndUpdate({ application_no, status: 3 }, { status: 4 });
            if (r) {
                await sendMail(email, application_no, subject, text);
                console.log("record updated")
            }
            else {
                console.log("record not updated")
            }
        }
        else if (status === 'Rejected') {
            const r = await conferencepaper.findOneAndUpdate({ application_no, status: 3 }, { status: -1 });
            if (r) {
                await sendMail(email, application_no, subject, text);
                console.log("record updated")
            }
            else {
                console.log("record not updated")
            }
        }
        res.status(200).json("success");
    }
    else {
        console.log("publish paper collection not created");
    }

}


module.exports=publisherfinalstatus;