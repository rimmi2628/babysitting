const model=require('../models');
const User=model.User;
const Complaint=model.Complaint;
const Request=model.Request;
const Payment=model.Payment;
const Invoice=model.Invoice;

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


      });
      res.status(200).json({data:data});
    } catch (error) {
        console.log(error);
    }
}


exports.getcomplaint=async(req,res)=>{
    try {
       
       
        const page=req.body.page||5;
        const limit=req.body.limit||5;
        const offset=(page-1)*limit;
       
        const account_type=req.body.account_type;
        
   
        const {rows,count}=await Complaint.findAndCountAll({where:{account_type:account_type},

        offset,limit});
        res.status(200).json({data:rows,count:count});
        
    } catch (error) {
      console.log(error) ; 
      res.status(500).json({error:error});
    }
}


exports.deletecomplaint=async(req,res)=>{
  try {

    const id=req.body.id;
    const userid=req.userid;

   const user=await User.findOne({where:{id:userid}});
    const account_type = user.account_type;

    const complaint=await Complaint.findOne({where:{id:id}});

         if(account_type===0){
            if(!complaint){
              res.status(500).json({msg:"complaint not found..."});
              return;
            }

            else{
              await Complaint.destroy({where:{id:id}});
              res.status(200).json({msg:"complaint delete successfully...."});
              return;
            }
         }else{
          res.status(500).json({msg:"Unauthorized user"});
          return;
         }
       


  } catch (error) {
    console.log(error);
    res.status(500).json({err:error});
  }
}


exports.getrequest=async(req,res)=>{
  try {

    const page=req.body.page;
    const limit=req.body.limit;
    const offset=(page-1)*limit
    const getrequest=await Request.findAll({
      offset,
      limit
    });
    res.status(200).json({data:getrequest});
  } catch (error) {
    console.log(error);
    res.status(500).json({err:error});
  }
}


exports.getpayment=async(req,res)=>{
  try {
    const page =req.body.page;
    const limit=req.body.limit;
    const offset=(page-1)*limit;

    const payment=await Payment.findAll({
      offset,
      limit
    });
    res.status(200).json({data:payment});
  } catch (error) {
    console.log(error)
    res.status(500).json({err:error});
  }
}

exports.getinvoice=async(req,res)=>{
  try {
    const page =req.body.page;
    const limit=req.body.limit;
    const offset=(page-1)*limit 
    const id=req.body.id;
    if (id ) {
      const invo= await Invoice.findByPk(id);
              if (invo) {
               return res.status(200).json({ data:invo});
               } else {
               return res.status(404).json({ message: "invoice not found" });
              }
             }
             else{
            const invoice=await Invoice.findAll({
            offset,
            limit
          });
          return res.status(200).json({data:invoice});
             }
  } catch (error) {
    console.log(error);
  }
}