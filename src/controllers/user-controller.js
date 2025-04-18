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
        return res.status(error.statusCode).json({
            data:{name:error.name},
            success:false,
            message:error.message,
            err:error.explaination
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
        return res.status(error.statusCode).json({
            data:{name:error.name},
            success:false,
            message:error.message,
            err:error.explaination
        });
    }
}
const isAuthenticated=async(req,res)=>{
    try{
        const token =req.headers['x-access-token'];
        const response =await userService.isAuthenticated(token);
        return res.status(200).json({
            data:response,
            success:true,
            message:"User is authenticated and token is valid",
            err:{}
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"User not found",
            err:error
        });
    }
}
const isAdmin=async(req,res)=>{
    try{
        const response=await userService.isAdmin(req.body.id);
        return res.status(200).json({
            data:response,
            success:true,
            message:"User is an Admin",
            err:{}
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Something went wrong",
            err:error
        });
    }
}

module.exports={
    create,
    signIn,
    isAuthenticated,
    isAdmin
}