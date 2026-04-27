import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"

cloudinary.config(
    {
        api_key:`${process.env.CLOUDINARY_API_KEY}`,
        api_secret:`${process.env.CLOUDINARY_API_SECRET}`,
        cloud_name: `${process.env.CLOUDINARY_NAME}`
    }
)

const uploadOnCloudinary = async function(localFilePath){
    console.log("INSIDE UPLOAD CLOUDINARY")

    try {
        if(!localFilePath){
            return;
        }


        const response = await cloudinary.uploader.upload(localFilePath , {
            resource_type: "auto" ,
        }) ;

        console.log("File uploaded of cloudinary " , response.url) ; 
        return response ; 
    }catch(error){
        return null ;
    }finally {
        fs.unlinkSync(localFilePath) ; 
    }
}

export {uploadOnCloudinary}