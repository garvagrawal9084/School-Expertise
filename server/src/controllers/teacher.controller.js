import { Teacher } from "../models/teachers.models.js";
import { Course } from "../models/courses.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import mongoose from "mongoose";
import { User } from "../models/users.models.js";
import { destroyImageOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";


export const getProfile = asyncHandler(async (req, res) => {

    const teacher = await Teacher.findOne({
        userId: req.user._id
    }).populate("userId", "name avatar").lean();

    if (!teacher) {
        throw new ApiError(404, "Teacher not found");
    }

    return res.json(
        new ApiResponse(200, teacher, "Profile fetched")
    );
});


export const updateProfile = asyncHandler(async (req, res) => {

    const userId = req.user._id;

    const { bio, experience, specialization } = req.body;

    const hasBio = typeof bio === "string" && bio.trim().length > 0;
    const hasExperience = experience !== undefined;
    const hasSpecialization = Array.isArray(specialization) && specialization.length > 0;

    if (!hasBio && !hasExperience && !hasSpecialization) {
        throw new ApiError(400, "Nothing to update");
    }

    if (hasExperience && (typeof experience !== "number" || experience < 0)) {
        throw new ApiError(400, "Invalid Experience");
    }

    const updates = {};

    if (hasBio) updates.bio = bio.trim();
    if (hasExperience) updates.experience = experience;
    if (hasSpecialization) updates.specialization = specialization.map(s => s.trim());

    const updatedTeacher = await Teacher.findOneAndUpdate(
        { userId },
        { $set: updates },
        { new: true, runValidators: true }
    );

    if (!updatedTeacher) {
        throw new ApiError(404, "Teacher not found");
    }

    return res.status(200).json(
        new ApiResponse(200, updatedTeacher , "Teacher Updated Successfully")
    );
});


export const getMyCourses = asyncHandler(async (req, res) => {

    const teacher = await Teacher.findOne({
        userId: req.user._id
    });

    if (!teacher) {
        throw new ApiError(404, "Teacher not found");
    }

    const courses = await Course.find({
        teachers: teacher._id
    }).lean();

    return res.json(
        new ApiResponse(200, courses, "Courses fetched")
    );
});

export const updateTeacherAvatar = asyncHandler(async (req, res) => {

    const userId = req.user._id;

    const avatarLocalPath = req.files?.avatar?.[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "New Avatar is needed");
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // delete old avatar if exists
    if (user.avatar) {
        await destroyImageOnCloudinary(user.avatar);
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar?.url) {
        throw new ApiError(400, "Avatar upload failed");
    }

    user.avatar = avatar.url;

    await user.save({ validateBeforeSave: false });

    return res.status(200).json(
        new ApiResponse(200, { avatar: user.avatar }, "Avatar Updated Successfully")
    );
});


export const getTeacherProfile = asyncHandler(async (req , res) => {
    const teacherId = req.params.id ; 

    if(!mongoose.Types.ObjectId.isValid(teacherId)){
        throw new ApiError(400 , "Invalid teacher id") ; 
    }

    const teacher = await Teacher.findById(teacherId)
    .populate("userId" , "name avatar email")
    .lean()

    if(!teacher){
        throw new ApiError(404, "Teacher not found");
    }

    const courses = await Course.find({
        teachers : teacher._id 
    }).lean() ;

    return res.status(200)
    .json( new ApiResponse(200 , 
        {
            name : teacher.userId.name ,
            avatar : teacher.userId.avatar , 
            email : teacher.userId.email,
            bio : teacher.bio,
            experience : teacher.experience ,
            specialization: teacher.specialization,
            courses ,
        } , "Teacher profile fetch"))
})