const express = require('express');
const router = express.Router();
const usercontroller=require('../Controller/UserController');

const upload=require('../middelware/multer');
const auth=require('../middelware/auth');


router.post('/register',upload.single('image'),usercontroller.register);
router.post('/login',usercontroller.login);
router.post('/forgotpassword',usercontroller.forgotpassword);
router.post('/reset',auth,usercontroller.resetpassword);


module.exports=router;