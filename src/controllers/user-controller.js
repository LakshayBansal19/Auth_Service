const UserService=require('../services/user-service');

const userService=new UserService();
const create=async (req,res)=>{
    try{
        const user=await userService.create({
            email:req.body.email,
            password:req.body.password
        });
        return res.status(201).json({
            data:user,
            success:true,
            message:"Successfully created the user",
            err:{}
        });
    }catch(error){
        return res.status(500).json({
            data:{},
            success:false,
            message:"Not able to create the user",
            err:error
        })
    }
}
const signIn=async(req,res)=>{
    try{
        const token=await userService.signIn(req.body.email,req.body.password);
        return res.status(200).json({
            data:token,
            success:true,
            message:"Successfully signed in",
            err:{}
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Not able to sign in the user",
            err:error
        });
    }
}

module.exports={
    create,
    signIn
}