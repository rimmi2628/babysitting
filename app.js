const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const path=require('path');
const userroute=require('./router/userroute')
const parentroute=require('./router/parentroute')
const complaintroute=require('./router/complaintroute')
const port=process.env.Port||2000

app.use( bodyparser.json({ limit: '50mb' }));
app.use( bodyparser.urlencoded({ limit: '50mb', extended: true }));
app.use(userroute);
app.use(parentroute);
app.use(complaintroute);
const static_path=path.join(__dirname,"../","public");
app.use(express.static(static_path));





app.listen(port, () => {

    console.log(`Server listening on port ${port}`);
  });