const model=require('../models');
const User=model.User;
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const nodemailer=require('nodemailer');
require('dotenv').config();

const transporter= nodemailer.createTransport({
    service:'gmail',
   auth:{
     user:process.env.User_email,
     pass:process.env.User_password
 },
 tls:{
    rejectUnauthorized:false
 }

});




exports.register=async(req,res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        const name=req.body.name;
        const address=req.body.address;
        const contact=req.body.contact;
        const account_type=req.body.account_type;
        const filename=req.file.filename


        const data = await User.findOne({ where: { email: email } });
        if (data) {
            res.status(500).json({ message: "email already exsit" });
            return;
        }

        const hashpass = await bcrypt.hash(password, 12);
     
        const user=await User.create({
            name:name,
            contact:contact,
            address:address,
            email:email,
            password:hashpass,
            image:filename,
            account_type:account_type
        })
        const payload = {
            id: user.id,
            email: user.email

        }
        const token=jwt.sign(payload,process.env.secretkey,{expiresIn:'12h'});
        res.status(200).json({data:user,token:token})
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
}


exports.login=async(req,res)=>{
    try {
        const {email,password}=req.body;

        const userdata=await User.findOne({where:{email:email}});
        if(userdata){
            const ismatch=await bcrypt.compare(password,userdata.password);

            if(ismatch){
                const payload={
                    id:userdata.id,
                    email:userdata.email
                }

                const token=jwt.sign(payload,process.env.secretkey,{expiresIn:'12h'});
                res.status(200).json({msg:"login successfully.....",token:token});
            }
            else{
                res.status(500).json({success:false,msg:"Email Or Password Does Not Match"});
                return;
            }
            
        }
        else{
            res.status(500).json({success:false,msg:"Email Or Password Does Not Match"});
            return;
        }
    } catch (error) {
        res.status(500).json({error});
        console.log(error);
    }
}

exports.forgotpassword=async(req,res)=>{
    try {
        
        const email=req.body.email;
        const userdata=await User.findOne({where:{email:email}});
        if(!userdata){
            res.status(500).json({msg:"user does not exist"});
        }
        

        const payload={
            id:userdata.id,
            email:userdata.email
        }
      const token=jwt.sign(payload,process.env.secretkey,{expiresIn:'12h'});

    const mailoptions=({
        from:'s12348946@gmail.com',
        to:email,
        subject:'reset password link',
        html:'<p>Click <a href="http://localhost:2000/reset/' + token + '">here</a> to reset your password</p>'
    })

    const link = `http://localhost:2000/reset/${token}`;
    console.log(link);


    transporter.sendMail(mailoptions, (error, info) => {
        if (error) {
            console.log(error);
        }

    })
    res.status(201).json({ success: 'ok', msg: 'we have sent instructions to reset password over your registered email' });
    } catch (error) {
        console.log(error);
    }
}


exports.resetpassword=async(req,res)=>{
    try {
       const password=req.body.password;
       const cpassword=req.body.cpassword;

       const userid=req.userid;
        const userdata=await User.findOne({where:{id:userid}});

        if(!userdata){
            res.send(500).json({msg:"user does not exist"});
            return;
        }

       if(password===cpassword){
        const hashpass= await bcrypt.hash(password,12);
          const userupdate=await User.update({password:hashpass},{where:{id:userid}});

          res.status(200).json({msg:"user updated successfully...."});
       }
    } catch (error) {
        consolr.log(error);
        res.status(500).json({error:error});
    }
}