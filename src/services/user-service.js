const UserRepository=require('../repository/user-repository');
const jwt=require('jsonwebtoken');
const {JWT_KEY}=require('../config/serverConfig');
const bcrypt=require('bcrypt');

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

    async signIn(email,plainPassword){
        try{
            //get the user through email
            const user=await this.userRepository.getByEmail(email);
            //compare password
            const passwordMatch=this.checkPassword(plainPassword,user.password);
            if(!passwordMatch){
                console.log("Password doesn't match");
                throw {error:"Incorrect password"};
            }
            //password match then create token and send
            const newJWT=this.createToken({email:email,id:user.id});
            return newJWT;
        }catch(error){
            console.log("Something went wrong in sign in process");
            throw error;
        }
    }
    async isAuthenticated(token){
        try{
            const response=this.verifyToken(token);
            if(!response){
                throw{error:"invalid token"}
            }
            const user=await this.userRepository.getById(response.id);
            if(!user){
                throw{error:"no user with the corresponding token exist"};
            }
            return user.id;

        }catch(error){
            console.log("Something went wrong in auth process");
            throw error;
        }
    }

    async isAdmin(userId){
        try{
            return await this.userRepository.isAdmin(userId);
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
    checkPassword(userInputPlainPassword,encryptedPassword){
        try{
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        }catch(error){
            console.log("Something went wrong in password comparison");
            throw error;
        }
    }

}
module.exports=UserService;