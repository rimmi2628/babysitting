const model=require('../models');
const User=model.User;
const Complaint=model.Complaint;

exports.createcomplaint=async(req,res)=>{
    try {
        const{complaint_id,description,complaint_issue,date}=req.body
     const userid=req.body.id;
     const user=await User.findOne({where:{id:userid}});

      const data=await Complaint .create({
        name:user.name,
        complaint_id:complaint_id,
        complaint_issue:complaint_issue,
        description:description,
        date:date


      })  ;
      res.status(200).json({data:data});
    } catch (error) {
        console.log(error);
    }
}


exports.getcomplaint=async(req,res)=>{
    try {
       
       
        const page=req.body.page;
        const limit=req.body.limit;
        const offset=(page-1)*limit;
       
        const id=req.body.id;
        
        
        const data=await Complaint.findAll({where:{user_id:id},
        offset,limit});
        res.status(200).json({data:data});
        
    } catch (error) {
      console.log(error) ; 
      res.status(500).json({error:error});
    }
}