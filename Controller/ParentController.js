const model=require('../models');
const User=model.User;
const Nany=model.Nany;

exports.getparent=async(req,res)=>{
    try {
        const account_type=req.body.account_type;
        const page=req.body.page;
        const limit=req.body.limit ||5;

        const offset = (page - 1) * limit;
        if(account_type){
            const {rows,count}=await User.findAndCountAll({where:{
                account_type:account_type
            },offset,limit});
            res.status(200).json({data:rows,count:count});
        } 
    } catch (error) {
        console.log(error)
    }
}

exports.createnany=async(req,res)=>{
    try {
        const userid=req.userid;
        const user=await User.findOne({where:{id:userid}});
        console.log("sdbhbf",user)
        const account=user.account_type;
      
        const name=req.body.name;
        const phone_number=req.body.phone_number;
        const address=req.body.address;
        const email=req.body.email;
        const account_type=req.body.account_type;
        const filename = req.file.filename.replace('avatar-', '');
        const price=req.body.price;
        const average_rating=req.body.average_rating;
        
        if(account===0){
           const userdata=await User.create({
             name:name,
             phone_number:phone_number,
              address:address,
              email:email,
              avatar:filename,
              account_type:account_type
            
            
            });
           
            await Nany.create({
             user_id:userdata.id,
             price:price,
             average_rating:average_rating
            })
        
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
            const  {rows,count}=await User.findAndCountAll({where:{account_type:account_type},
            offset,
            limit
            
            });

            res.status(200).json({data:rows,count:count});
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
       if(account_type===0){
       if(!userdata){
        res.status(500).json({msg:"user doesnot found"});
        return;
       }
       else {
       await User.destroy({where:{id:id}});
       res.status(200).json("User delete successfully");
       return;
       }
     
    }  else{
        res.status(500).json({msg:"Unauthorized user"});
       }
    } catch (error) {
        console.log(error);
        res.status(500).json({err:error});
    }
}