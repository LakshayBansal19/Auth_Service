const express=require('express');
const bodyParser=require('body-parser');

const{PORT}=require('./config/serverConfig');
const apiRoutes=require('./routes/index');

const db=require('./models/index');

const {User,Role}=require('./models/index');

const app=express();
const setupAndStartServer=async ()=>{

    const app=express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api',apiRoutes);

    app.listen(PORT,()=>{
        console.log(`server Started at Server ${PORT}`);
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter:true});
        }
    })

    //  const role=await Role.findByPk(1);
    //  console.log(await role.getUsers());

}

setupAndStartServer();