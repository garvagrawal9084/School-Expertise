import { User } from "../models/users.models.js";
import { TeacherRequest } from "../models/teacherReaquest.models.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const register = asyncHandler(async(req , res) => {

    // Get the name , email , password from body
    // check if we all three of them or not
    // check no user already exist with same email
    // if role teacher is check add the request into teacher request
    // return 


    const {name , email , password} = req.body ;

    if([name , email , password].some((field) => !field.trim())) {
        throw new ApiError(400 , "Name , email and password all are required") ; 
    }

    const existUser = User.findOne({"email" : email}) ; 

    if(existUser){
        throw new ApiError(400 , "User Alread exist with same credential")
    }
})