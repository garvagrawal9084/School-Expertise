import { asyncHandler } from "../utils/AsyncHandler.js";
import { Course } from "../models/courses.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

const getCourse = asyncHandler(async (req, res) => {
  const courses = await Course.find({})
    .select("_id title description category teachers");

  return res.status(200).json(
    new ApiResponse(200, courses, "Courses Fetch Successfully")
  );
});

const getTeachersFromCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)
    .populate({
      path: "teachers",
      select: "name email avatar"
    });

  if (!course) throw new ApiError(404, "Course not found");

  return res.status(200).json(
    new ApiResponse(200, course.teachers, "Teachers fetched")
  );
});

const getTeachersByCategory = asyncHandler(async (req, res) => {
    const { category } = req.params;

    const allowedCategories = ["AI", "ML", "Deep Learning", "Web Dev", "Data Science", "Security"];

    if (!allowedCategories.includes(category)) {
        throw new ApiError(400, "Invalid category");
    }

    const result = await Course.aggregate([
        {
        $match: {
            category: category
        }
    },

    {
        $unwind: "$teachers"
    },

    {
        $group: {
            _id: "$teachers"
        }
    },

    {
        $lookup: {
            from: "teachers",
            localField: "_id",
            foreignField: "_id",
            as: "teacher"
        }
    },

    { $unwind: "$teacher" },

    {
        $lookup: {
            from: "users",
            localField: "teacher.userId",
            foreignField: "_id",
            as: "user"
        }
    },

    { $unwind: "$user" },

    {
        $project: {
            _id: 0,
            name: "$user.name",
            bio: "$teacher.bio",
            specialization: "$teacher.specialization"
        }
    }
]);

    if (!result.length) {
        throw new ApiError(404, "No teachers found for this category");
    }

    return res.status(200).json(
        new ApiResponse(200, result, "Teachers fetched by category")
    );
});

const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)
    .populate({
      path: "teachers",
      select: "name email avatar"   
    });

  if (!course) throw new ApiError(404, "Course not found");

  const formatted = {
    _id: course._id,
    title: course.title,
    description: course.description,
    category: course.category,
    teachers: course.teachers.map(t => ({
      _id: t._id,
      name: t.name,
      email: t.email,
      avatar: t.avatar
    }))
  };

  return res.status(200).json(
    new ApiResponse(200, formatted, "Course fetched")
  );
});

export {getCourse , getTeachersFromCourse , getTeachersByCategory , getCourseById} ;