const express = require('express');
const router = express.Router();
const usercontroller=require('../Controller/UserController');
const parentcontroller=require('../Controller/ParentController');
const complaintcontroller=require('../Controller/ComplaintController');
const upload=require('../middelware/multer');
const auth=require('../middelware/auth');


router.post('/register',upload.single('image'),usercontroller.register);
router.post('/login',usercontroller.login);
router.post('/forgotpassword',usercontroller.forgotpassword);
router.post('/reset',auth,usercontroller.resetpassword);

router.post('/getparents',auth,parentcontroller.getparent);
router.post('/createnany',auth,upload.single('image'),parentcontroller.createnany);
router.post('/getnany',auth,parentcontroller.getnany);

router.post('/block',auth,parentcontroller.block);
router.delete('/delete',auth,parentcontroller.deleteuser);
router.post('/complaint',auth,complaintcontroller.createcomplaint);
router.post('/getcomplaint',auth,complaintcontroller.getcomplaint);
module.exports=router;