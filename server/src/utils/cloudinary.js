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

const destroyImageOnCloudinary = async function (url) {
    try {
        if(!url) return ;

        const part = url.split("/") ; 
        const fileNameWithExtension = part[part.length - 1] ; 
        const publicId = fileNameWithExtension.split(".")[0] ; 

        const response = await cloudinary.uploader.destroy(publicId , {
            resource_type: "image" , 
        })

        return response ; 
    } catch (error) {
        console.log("Error deleting from Cloudinary:", error) ; 
        return null ;
    }
}

export {uploadOnCloudinary , destroyImageOnCloudinary}