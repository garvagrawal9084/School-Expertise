import Teacher from "../models/teachers.models.js";
import Course from "../models/courses.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";


export const getProfile = AsyncHandler(async (req, res) => {

  const teacher = await Teacher.findOne({
    userId: req.user._id
  }).populate("userId", "name email");

  if (!teacher) {
    throw new ApiError(404, "Teacher not found");
  }

  return res.json(
    new ApiResponse(200, teacher, "Profile fetched")
  );
});


export const updateProfile = AsyncHandler(async (req, res) => {

  const { bio, experience, specialization } = req.body;

  const teacher = await Teacher.findOneAndUpdate(
    { userId: req.user._id },
    { bio, experience, specialization },
    { new: true }
  );

  if (!teacher) {
    throw new ApiError(404, "Teacher not found");
  }

  return res.json(
    new ApiResponse(200, teacher, "Profile updated")
  );
});


export const getMyCourses = AsyncHandler(async (req, res) => {

  const teacher = await Teacher.findOne({
    userId: req.user._id
  });

  if (!teacher) {
    throw new ApiError(404, "Teacher not found");
  }

  const courses = await Course.find({
    teachers: teacher._id
  });

  return res.json(
    new ApiResponse(200, courses, "Courses fetched")
  );
});