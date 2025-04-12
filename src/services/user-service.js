const UserRepository=require('../repository/user-repository');
const jwt=require('jsonwebtoken');
const {JWT_KEY}=require('../config/serverConfig');

class UserService{
    constructor(){
        this.userRepository=new UserRepository();
    }

    async create(data){
        try{
            const user=await this.userRepository.create(data);
            return user;
        }catch(error){
            console.log("Something went wrong at the service layer");
            throw error;
        }
    }

    async destroy(userId){
        try{
            const response=await this.userRepository.destroy(userId);
            return response;
        }catch(error){
            console.log("Something went wrong at the service layer");
            throw error;
        }
    }

    createToken(user){
        try{
            const token=jwt.sign(user,JWT_KEY,{expiresIn:'1d'});
            return token;
        }catch(error){
            console.log("Something went wrong in token creation");
            throw error;
        } 
    }

    verifyToken(token){
        try{
            const response=jwt.verify(token,JWT_KEY);
            return response;
        }catch(error){
            console.log("Something went wrong in token validation",error);
            throw error;
        }
    }
}
module.exports=UserService;