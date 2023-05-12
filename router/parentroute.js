const express = require('express');
const router = express.Router();
const parentcontroller=require('../Controller/ParentController');

const upload=require('../middelware/multer');
const auth=require('../middelware/auth');


router.post('/getparents',auth,parentcontroller.getparent);
router.post('/createnany',auth,upload.single('image'),parentcontroller.createnany);
router.post('/getnany',auth,parentcontroller.getnany);

router.post('/block',auth,parentcontroller.block);
router.delete('/delete',auth,parentcontroller.deleteuser);

module.exports=router;