const AppErrors=require('./error-handler');
const{StatusCodes}=require('http-status-codes');
class ClientError extends AppErrors{
    constructor(name,message,explaination,StatusCode){
        super(
            name,
            message,
            explaination,
            StatusCode     

        )
    }
}
module.exports=ClientError;