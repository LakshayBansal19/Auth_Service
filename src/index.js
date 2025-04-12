const express=require('express');
const bodyParser=require('body-parser');

const{PORT}=require('./config/serverConfig');
const apiRoutes=require('./routes/index');

const app=express();
const setupAndStartServer=async ()=>{

    const app=express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    console.log("api route");

    app.use('/api',apiRoutes);

    app.get('/hello',(req,res)=>{
        res.send("hello to express server");
    })

    app.listen(PORT,()=>{
        console.log(`server Started at Server ${PORT}`);
    })
}

setupAndStartServer();