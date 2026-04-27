import { Router } from "express";
import { login, logout, register } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const userRouter = Router() ; 

userRouter.post("/register" , 
    upload.fields(
    [
        {
            name: "avatar" ,
            maxCount: 1
        }
    ]) 
    , register
);

userRouter.post("/login" , login)

userRouter.post("/logout" , verifyJWT , logout) ; 

export {userRouter} 