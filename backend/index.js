const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const multer = require('multer');

const db = require('./db/conn');
const User = require('./models/applicantModal');
const reviewerModal = require('./models/reviewerModal');
const adminModal = require('./models/adminModal');
const publisherModal = require('./models/publisherModal');
const conferencepaper = require('./models/conferenceModal');
const peerResult = require('./models/peerModal');
const cameraResult = require('./models/cameraModal');
const presentationResult = require('./models/presentationModal');
const publishPaperStatus = require('./models/publishStatusModal');

const router=require('./Router/routes')

app.use("/conferenceData", express.static("conferenceData"));
app.use("/reviewerData", express.static("reviewerData"));
app.use("/publisherData", express.static("publisherData"));
const xlsx = require("xlsx");

const sendMail = require('./mail/sendMail');

const cors = require('cors');
app.use(cors());

//middleware
app.use(express.json());

// files accessable from anywhere
app.use("/uploads", express.static("uploads"));

// app.get('/', async (req, res) => {
//     res.status(200).send("success...")
// })

app.use('/',router);

app.post("/publisherreviewerpeerreport", async (req, res) => {
    const application_no = req.body;
    console.log(application_no);
    try {
        const result = await peerResult.find(application_no);
        if (result) {
            console.log(result);
            res.status(200).json(result);
        }
        else {
            console.log("record not found");
        }
    }
    catch (err) {
        console.log("error occured...");
    }
})


app.post("/publisherreviewercamerareport", async (req, res) => {

    const application_no = req.body;
    console.log(application_no);

    try {
        const result = await cameraResult.find(application_no);
        if (result) {
            console.log(result);
            res.json(result);
        }
        else {
            console.log("record not found");
        }
    }
    catch (err) {
        console.log("error occured...");
    }
})


app.post("/publisherreviewerpresentationreport", async (req, res) => {

    const application_no = req.body;
    console.log(application_no);

    try {
        const result = await presentationResult.find(application_no);
        if (result) {
            console.log(result);
            res.json(result);
        }
        else {
            console.log("record not found");
        }
    }
    catch (err) {
        console.log("error occured...");
    }
})

// admin work

app.post("/admin/applicantinfo", async (req, res) => {
    try {
        const { cat, inp, sts } = req.body;
        console.log(sts)
        var confData;
        if (cat === "none") {
            if (sts == 5) {
                confData = await conferencepaper.find({});
            } else if (sts == 0) {
                confData = await conferencepaper.find({
                    status: { $gte: 0, $lte: 3 },
                });
            } else {
                confData = await conferencepaper.find({ status: sts });
            }
        } else {
            if (sts == 5) {
                confData = await conferencepaper.find({ [cat]: inp });
            } else if (sts == 0) {
                confData = await conferencepaper.find({
                    [cat]: inp,
                    status: { $gte: 0, $lte: 3 },
                });
            } else {
                confData = await conferencepaper.find({ [cat]: inp, status: sts });
            }
        }
        res.status(200).json(confData);
    } catch (err) {
        console.log(err);
    }
});
app.post("/admin/reviewerinfo", async (req, res) => {
    try {
        const { cat, inp, sts } = req.body;
        // console.log(cat,inp,sts)
        var reviewerData = await reviewerModal.find({ [cat]: inp });
        res.json(reviewerData);
    } catch (err) {
        console.log(err);
    }
});
app.post("/admin/publisherinfo", async (req, res) => {
    try {
        const { cat, inp, sts } = req.body;
        // console.log(cat,inp,sts)
        var publisherData = await publisherModal.find({ [cat]: inp });
        res.json(publisherData);
    } catch (err) {
        console.log(err);
    }
});

// MIS and All data
app.get("/admin/applicantinfo", async (req, res) => {
    await conferencepaper
        .find({})
        .select({
            _id: 0,
            crn: 1,
            application_no: 1,
            title: 1,
            author: 1,
            email: 1,
            domain: 1,
            abstract: 1,
            status: 1,
            date: 1,
        })
        .then((confData) => {
            if (confData.length > 0) {
                let data = JSON.parse(JSON.stringify(confData));
                let workbook = xlsx.utils.book_new();
                let worksheet = xlsx.utils.json_to_sheet(data);
                xlsx.utils.book_append_sheet(workbook, worksheet, "Conference_Data");
                xlsx.writeFile(workbook, "./conferenceData/Conference_Data.xlsx");
                res.json({ sts: "success", all: confData });
            }
        })
        .catch((err) => {
            res.json("Error while fetching Data from database !");
        });
});

app.get("/admin/reviewerinfo", async (req, res) => {
    await reviewerModal
        .find({})
        .select({
            _id: 0,
            crn: 1,
            name: 1,
            email: 1,
            domain: 1,
            date: 1,
        })
        .then((revData) => {
            if (revData.length > 0) {
                let data = JSON.parse(JSON.stringify(revData));
                let workbook = xlsx.utils.book_new();
                let worksheet = xlsx.utils.json_to_sheet(data);
                xlsx.utils.book_append_sheet(workbook, worksheet, "Reviewer_Data");
                xlsx.writeFile(workbook, "./reviewerData/Reviewer_Data.xlsx");
                res.json({ sts: "success", all: revData });
            }
        })
        .catch((err) => {
            res.json("Error while fetching Data from database !");
        });
});
app.get("/admin/publisherinfo", async (req, res) => {
    await publisherModal
        .find({})
        .select({
            _id: 0,
            crn: 1,
            name: 1,
            email: 1,
            date: 1,
        })
        .then((pubData) => {
            if (pubData.length > 0) {
                let data = JSON.parse(JSON.stringify(pubData));
                let workbook = xlsx.utils.book_new();
                let worksheet = xlsx.utils.json_to_sheet(data);
                xlsx.utils.book_append_sheet(workbook, worksheet, "Publisher_Data");
                xlsx.writeFile(workbook, "./publisherData/Publisher_Data.xlsx");
                res.json({ sts: "success", all: pubData });
            }
        })
        .catch((err) => {
            res.json("Error while fetching Data from database !");
        });
});
//   Admin Name
app.post("/admin/nothing", async (req, res) => {
    try {
        res.json("");
    } catch (err) { }
});


app.listen(port, () => {

    console.log(`Server is running on port ${port}`);

});

module.exports = app;