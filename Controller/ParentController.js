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

exports.getnany=async(req,res)=>{
    try {
        const account_type=req.body.account_type;
        const page=req.body.page;
        const limit=req.body.limit;
        const offset=(page-1)*limit;
        if(account_type){
            const nanydata=await User.findAll({where:{account_type:account_type},
            offset,
            limit
            
            });

            res.status(200).json({data:nanydata});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({err:error});
    }
}

exports.block=async(req,res)=>{
    try {
        const userid=req.body.id;
        const block=parseInt(req.body.block);
        
        const user_id=req.userid;
        const user=await User.findOne({where:{id:user_id}});
        const account_type=user.account_type;
        if(account_type===0){
            if(block===1){
                await User.update({block:block},{where:{id:userid},returning: true});
                res.status(200).json({msg:"user block"});
                return;
            }
            else if(block===0){
                await User.update({block:block},{where:{id:userid},returning: true});
                res.status(200).json({msg:"user unblocked"});
                return;
            }
            else{
                res.status(500).json({msg:"Unauthorized user"});
             
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({err:error});
    }
}



exports.deleteuser=async(req,res)=>{
    try {
        const userid=req.userid;
     
        const user=await User.findOne({where:{id:userid}});
        
       const account_type=user.account_type;

       const id=req.body.id;
       const userdata=await User.findOne({where:{id:id}});
       if(!userdata){
        res.status(500).json({msg:"user doesnot found"});
        return;
       }
       else if(account_type===0){
       await User.destroy({where:{id:id}});
       res.status(200).json("User delete successfully");
       return;
       }
       else{
        res.status(500).json({msg:"Unauthorized user"});
       }
    } catch (error) {
        console.log(error);
        res.status(500).json({err:error});
    }
}