const model=require('../models');
const User=model.User;

exports.getparent=async(req,res)=>{
    try {
        const account_type=req.body.account_type;
        const page=req.body.page;
        const limit=req.body.limit;

        const offset = (page - 1) * limit;
        if(account_type){
            const parentsdata=await User.findAll({where:{
                account_type:account_type
            },offset,limit});
            res.status(200).json({data:parentsdata});
        } 
    } catch (error) {
        console.log(error)
    }
}

exports.createnany=async(req,res)=>{
    try {
        const userid=req.userid;
        const user=await User.findOne({where:{id:userid}});
        const account=user.account_type;

        const name=req.body.name;
        const contact=req.body.contact;
        const address=req.body.contact;
        const email=req.body.email;
        const filename=req.file.filename;
 
        const account_type=req.body.account_type;
        if(account===0){
        const userdata=await User.create({
                name:name,
              contact:contact,
              address:address,
              email:email,
              image:filename,
              account_type:account_type
            
            
            });
        res.status(200).json({data:userdata});
        }
    } catch (error) {
        console.log(error);
    }
}