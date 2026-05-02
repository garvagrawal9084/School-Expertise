import { Teacher } from "../models/teachers.models.js";
import { Course } from "../models/courses.models.js";
import { User } from "../models/users.models.js";
import { TeacherRequest } from "../models/teacherRequest.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { isValidId } from "../utils/validate.js";
import mongoose from "mongoose";



export const getTeachers = asyncHandler(async (req, res) => {

  const teachers = await Teacher.find()
    .populate("userId", "name email avatar")
    .select("userId bio role specialization experience")
    .lean();

  const data = teachers
    .filter(t => t.userId) 
    .map(t => ({
      _id: t.userId._id,
      teacherDocId: t._id,
      name: t.userId.name,
      email: t.userId.email,
      avatar: t.userId.avatar,
      bio: t.bio || "",
      role: t.role || "Lecturer",
      specialization: t.specialization || [],
      experience: t.experience || 0,
    }));

  return res.status(200).json(
    new ApiResponse(200, data, "Fetched teacher successfully")
  );
});


export const deleteTeacher = asyncHandler(async (req, res) => {

  const { id } = req.params;

  if (!id) throw new ApiError(400, "Teacher ID is required");
  if (!isValidId(id)) throw new ApiError(400, "Invalid teacher ID format");

  
  let teacher = await Teacher.findById(id);
  if (!teacher) {
    teacher = await Teacher.findOne({ userId: id });
  }
  if (!teacher) throw new ApiError(404, "Teacher not found");

  await Promise.all([
    Course.updateMany(
      { teachers: teacher.userId },
      { $pull: { teachers: teacher.userId } }
    ),
    Teacher.findByIdAndDelete(teacher._id),
    User.findByIdAndUpdate(teacher.userId, { role: "STUDENT" })
  ]);

  return res.status(200).json(
    new ApiResponse(200, null, "Teacher deleted successfully")
  );
});



export const createCourse = asyncHandler(async (req, res) => {

  let { title, description ,category } = req.body;

  if ([title, description].some(field => !field || field.trim() === "")) {
    throw new ApiError(400, "Need both title and description");
  }

  title = title.trim();
  description = description.trim();

  const existing = await Course.findOne({ title });

  if (existing) {
    throw new ApiError(400, "Course already exists");
  }

  const course = await Course.create({
    title,
    description,
    category
  });

  return res.status(201).json(
    new ApiResponse(201, course, "Course created successfully")
  );
});


export const getCourses = asyncHandler(async (req, res) => {

  const courses = await Course.find()
  .populate("teachers", "name email") 
  .lean();

  return res.status(200).json(
    new ApiResponse(200, courses, "Courses fetched successfully")
  );
});


export const deleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) throw new ApiError(400, "Course ID is required");
  if (!isValidId(id)) throw new ApiError(400, "Invalid course ID format");

  const course = await Course.findById(id);
  if (!course) throw new ApiError(404, "Course not found");

  await Course.findByIdAndDelete(id);

  return res.status(200).json(
    new ApiResponse(200, null, "Course deleted successfully")
  );
});

export const updateCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, category } = req.body;

  if (!id) throw new ApiError(400, "Course ID is required");
  if (!isValidId(id)) throw new ApiError(400, "Invalid course ID format");

  const course = await Course.findById(id);
  if (!course) throw new ApiError(404, "Course not found");

  if (title) course.title = title;
  if (description) course.description = description;
  if (category) course.category = category;

  await course.save();

  return res.status(200).json(
    new ApiResponse(200, course, "Course updated successfully")
  );
});



export const assignTeacher = asyncHandler(async (req, res) => {
  const { teacherIds, courseId } = req.body;

  if (!teacherIds || !courseId) {
    throw new ApiError(400, "Teacher IDs and Course ID are required");
  }

  const course = await Course.findById(courseId);
  if (!course) throw new ApiError(404, "Course not found");

  for (const teacherId of teacherIds) {
    if (!course.teachers.includes(teacherId)) {
      course.teachers.push(teacherId);
    }
  }

  await course.save();

  return res.status(200).json(
    new ApiResponse(200, null, "Teachers assigned successfully")
  );
});

export const unassignTeacher = asyncHandler(async (req, res) => {
  const { teacherId, courseId } = req.body;

  if (!teacherId || !courseId) {
    throw new ApiError(400, "Teacher ID and Course ID are required");
  }

  const course = await Course.findById(courseId);
  if (!course) throw new ApiError(404, "Course not found");

  course.teachers = course.teachers.filter(id => id.toString() !== teacherId.toString());
  await course.save();

  return res.status(200).json(
    new ApiResponse(200, null, "Teacher unassigned successfully")
  );
});


export const getPendingRequests = asyncHandler(async (req, res) => {

  const requests = await TeacherRequest.find({ status: "PENDING" })
    .populate("userId", "name email")
    .lean(); 

  return res.status(200).json(
    new ApiResponse(200, requests, "Pending requests fetched")
  );
});



export const approveTeacher = asyncHandler(async (req, res) => {
  const requestId = req.params.id;

  if (!requestId) throw new ApiError(400, "Request ID is required");
  if (!isValidId(requestId)) throw new ApiError(400, "Invalid request ID");

  const request = await TeacherRequest.findById(requestId);

  if (!request || request.status !== "PENDING") {
    throw new ApiError(400, "Invalid request");
  }

  const user = await User.findById(request.userId);

  if (!user) throw new ApiError(404, "User not found");

  if (user.role === "TEACHER") {
    throw new ApiError(400, "User already a teacher");
  }

  user.role = "TEACHER";
  await user.save();

  
  const existingTeacher = await Teacher.findOne({ userId: user._id });
  if (!existingTeacher) {
    await Teacher.create({
      userId: user._id,
      specialization: ["Not Set"],
    });
  }

  request.status = "APPROVED";
  request.reviewedBy = req.user?._id;
  request.reviewedAt = new Date();

  await request.save();

  return res.status(200).json(
    new ApiResponse(200, null, "Teacher approved successfully")
  );
});



export const rejectTeacher = asyncHandler(async (req, res) => {
  const requestId = req.params.id;

  if (!requestId) throw new ApiError(400, "Request ID is required");
  if (!isValidId(requestId)) throw new ApiError(400, "Invalid request ID");

  const request = await TeacherRequest.findById(requestId);

  if (!request) throw new ApiError(404, "Request not found");

  if (request.status !== "PENDING") {
    throw new ApiError(400, "Request already processed");
  }

  request.status = "REJECTED";
  request.reviewedBy = req.user?._id;
  request.reviewedAt = new Date();

  await request.save();

  return res.status(200).json(
    new ApiResponse(200, null, "Teacher rejected successfully")
  );
});


export const getCategory = (req , res) => {
  const category = [
    "AI","ML","Deep Learning","NLP",
    "Web Dev","Frontend","Backend","Full Stack","Mobile App Development",
    "Data Science","Data Analytics","Big Data","Data Engineering",
    "Cloud Computing","DevOps","Cyber Security","Ethical Hacking","Network Security",
    "Blockchain","Web3",
    "Software Engineering","System Design","Microservices",
    "Database Management","SQL","NoSQL",
    "Internet of Things","Embedded Systems",
  ];

  return res.status(200).json(new ApiResponse(200 , category , "Categories"));
};

export const suggestTeacher = asyncHandler(async (req , res) => {
  const {courseId} = req.params; 

  if(!mongoose.Types.ObjectId.isValid(courseId)){
    throw new ApiError(400 , "Invalid course id") ; 
  }

  const course = await Course.findById(courseId) ; 

  if(!course){
    throw new ApiError(404 , "Course Not found") ; 
  }

  const suggestedTeacher = await Teacher.find({
    specialization: { $in: course.category },
    userId: { $nin: course.teachers }
  })
  .populate({
    path: "userId",
    select: "name email"
  })
  .sort({ experience: -1 });

  return res.status(200).json(new ApiResponse(200 , suggestedTeacher , "Suggested Teacher fetched")) ; 
})