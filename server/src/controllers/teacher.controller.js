import { Teacher } from "../models/teachers.models.js";
import { Course } from "../models/courses.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import mongoose from "mongoose";
import { User } from "../models/users.models.js";
import { destroyImageOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";


export const getProfile = asyncHandler(async (req, res) => {
  let teacher = await Teacher.findOne({ userId: req.user._id })
    .populate("userId", "name email avatar");

  // ✅ AUTO CREATE IF NOT EXISTS
  if (!teacher) {
    teacher = await Teacher.create({
      userId: req.user._id,
      bio: "",
      experience: 0,
      specialization: []
    });

    teacher = await teacher.populate("userId", "name email avatar");
  }

  return res.status(200).json(
    new ApiResponse(200, {
      name: teacher.userId.name,
      email: teacher.userId.email,
      avatar: teacher.userId.avatar,
      bio: teacher.bio,
      experience: teacher.experience,
      specialization: teacher.specialization
    })
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
    if (hasSpecialization) {
        updates.specialization = specialization.map(s => s.trim());
    }

    const updatedTeacher = await Teacher.findOneAndUpdate(
        { userId },
        { $set: updates },
        {
            new: true,
            runValidators: true,
            upsert: true  
        }
    );

    return res.status(200).json(
        new ApiResponse(200, updatedTeacher, "Teacher Updated Successfully")
    );
});


export const getMyCourses = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const courses = await Course.find({
    teachers: userId  
  }).select("title description");

  return res.status(200).json(
    new ApiResponse(200, courses)
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


export const getTeacherProfile = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  // 1️⃣ Get user
  const user = await User.findById(userId).select("name email avatar");
  if (!user) throw new ApiError(404, "Teacher not found");

  // 2️⃣ Get teacher data
  const teacher = await Teacher.findOne({ userId }).select(
    "bio experience specialization"
  );

  // 3️⃣ Get courses (correct)
  const courses = await Course.find({
    teachers: userId
  }).select("title description");

  return res.status(200).json(
    new ApiResponse(200, {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      bio: teacher?.bio || "",
      experience: teacher?.experience || 0,
      specialization: teacher?.specialization || [],

      courses
    })
  );
});