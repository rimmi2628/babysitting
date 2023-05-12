const express = require('express');
const router = express.Router();


const complaintcontroller=require('../Controller/ComplaintController');

const auth=require('../middelware/auth');

router.post('/complaint',auth,complaintcontroller.createcomplaint);
router.post('/getcomplaint',auth,complaintcontroller.getcomplaint);

router.delete('/deletecomplaint',auth,complaintcontroller.deletecomplaint);

router.post('/getrequest',auth,complaintcontroller.getrequest)

router.post('/getpayment',auth,complaintcontroller.getpayment);

module.exports=router;