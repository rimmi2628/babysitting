const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const cors=require('cors');
const path=require('path');
const userroute=require('./router/userroute')
const parentroute=require('./router/parentroute')
const complaintroute=require('./router/complaintroute')
const port=process.env.Port||3000

app.use( bodyparser.json({ limit: '50mb' }));
app.use( bodyparser.urlencoded({ limit: '50mb', extended: true }));

const static_path=path.join(__dirname,"../","public");
app.use(express.static(static_path));

const allowedOrigins = ['http://localhost:4200'];

app.use(function(req,res,next){
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});



app.use(cors());

app.use(userroute);
app.use(parentroute);
app.use(complaintroute);










app.listen(port, () => {

    console.log(`Server listening on port ${port}`);
  });