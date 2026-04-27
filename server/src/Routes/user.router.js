import { Router } from "express";
import { register } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRouter = Router() ; 

userRouter.post("/register" , 
    upload.fields(
    [
        {
            name: "avatar" ,
            maxCount: 1
        }
    ]) , register)

export {userRouter} 