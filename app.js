const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const path=require('path');
const userroute=require('./router/userroute')
const port=process.env.Port||2000

app.use( bodyparser.json({ limit: '50mb' }));
app.use( bodyparser.urlencoded({ limit: '50mb', extended: true }));
app.use(userroute);
const static_path=path.join(__dirname,"../","public");
app.use(express.static(static_path));





app.listen(port, () => {

    console.log(`Server listening on port ${port}`);
  });