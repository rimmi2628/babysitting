const express = require('express');
const router = express.Router();


const complaintcontroller=require('../Controller/ComplaintController');

const auth=require('../middelware/auth');

router.post('/complaint',auth,complaintcontroller.createcomplaint);
router.post('/getcomplaint',auth,complaintcontroller.getcomplaint);

router.post('/deletecomplaint',auth,complaintcontroller.deletecomplaint);

router.post('/getrequest',auth,complaintcontroller.getrequest)

router.post('/getpayment',auth,complaintcontroller.getpayment); 

router.post('/getinvoice',auth,complaintcontroller.getinvoice);

module.exports=router;