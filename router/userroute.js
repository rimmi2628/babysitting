const express = require('express');
const router = express.Router();
const usercontroller=require('../Controller/UserController');
const parentcontroller=require('../Controller/ParentController');
const upload=require('../middelware/multer');
const auth=require('../middelware/auth');
router.post('/register',upload.single('image'),usercontroller.register);
router.post('/login',usercontroller.login);
router.post('/forgotpassword',usercontroller.forgotpassword);
router.post('/reset',auth,usercontroller.resetpassword);

router.post('/getparents',auth,parentcontroller.getparent);
router.post('/createnany',auth,upload.single('image'),parentcontroller.createnany);
module.exports=router;