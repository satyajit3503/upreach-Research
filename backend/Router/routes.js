const express=require('express');
const router=express.Router();
const Registration=require('../Controller/registration')
const Login=require('../Controller/login');
const applyConference=require('../Controller/applyConference');
const CheckStatus=require('../Controller/checkStatus');

const ReviewerDashboard=require('../Controller/reviewerDashboard');
const ApplicationDetail=require('../Controller/applicationdetail');
const PeerApi=require('../Controller/PeerApi');
const CameraApi=require('../Controller/CameraApi');
const PresentationApi=require('../Controller/PresentationApi');

const publisherdashboard=require('../Controller/PublisherDashboard');
const PublisherConfDetail=require('../Controller/PublisherConfDetail');
const publisherfinalstatus=require('../Controller/PublisherFinalStatus');
const publishpaper=require('../Controller/Publishpaper');



const storage=require('../multerStorage/storage')
const multer = require('multer');
const upload = multer({ storage: storage })

//applicant routes
router.route('/register').post(Registration);
router.route('/login').post(Login);
router.route('/applyconference').post(upload.single("file"),applyConference);
router.route('/user/checkstatus').post(CheckStatus);

//reviewer routes
router.route('/reviewerdashboard').post(ReviewerDashboard);
router.route('/peerapi').post(ApplicationDetail);
router.route('/peerapi/form').post(PeerApi);
router.route('/cameraapi/form').post(CameraApi);
router.route('/presentationapi/form').post(PresentationApi);


//publisher routes
router.route('/publisherdashboard').get(publisherdashboard);
router.route('/publishconferencedetails').post(PublisherConfDetail);
router.route('/publisherfinalstatus').post(publisherfinalstatus);
router.route('/publishpaper').post(publishpaper);



module.exports=router;


