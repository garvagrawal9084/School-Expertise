import { Router } from "express";
import { verifyAdmin, verifyJWT } from "../middlewares/auth.middleware.js";

import {
  getTeachers,
  createCourse,
  getCourses,
  deleteCourse,
  assignTeacher,
  getPendingRequests,
  approveTeacher,
  rejectTeacher,
  deleteTeacher,
  getCategory,
  suggestTeacher,
} from "../controllers/admin.controller.js";

const adminRouter = Router();


adminRouter.get("/teachers", verifyJWT, verifyAdmin, getTeachers);
adminRouter.delete("/teachers/:id", verifyJWT, verifyAdmin, deleteTeacher);
adminRouter.get("/courses", verifyJWT, verifyAdmin, getCourses);
adminRouter.delete("/courses/:id", verifyJWT, verifyAdmin, deleteCourse);
adminRouter.post("/assign", verifyJWT, verifyAdmin, assignTeacher);
adminRouter.get("/requests", verifyJWT, verifyAdmin, getPendingRequests);
adminRouter.post("/approve/:id", verifyJWT, verifyAdmin, approveTeacher);
adminRouter.post("/reject/:id", verifyJWT, verifyAdmin, rejectTeacher);
adminRouter.post("/create/", verifyJWT,verifyAdmin,createCourse);
adminRouter.get("/category" , verifyJWT , verifyAdmin , getCategory)
adminRouter.get("/suggestion/:courseId" , verifyJWT , verifyAdmin , suggestTeacher) ; 
export { adminRouter };