import express from "express";
import {
    getProfile,
    updateProfile,
    getMyCourses,
    updateTeacherAvatar,
    getTeacherProfile,
    getAllTeachers
} from "../controllers/teacher.controller.js";

import { verifyJWT, verifyTeacher } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const teacherRouter = express.Router();


teacherRouter.get("/me", verifyJWT, verifyTeacher, getProfile);
teacherRouter.put("/me", verifyJWT, verifyTeacher, updateProfile);
teacherRouter.get("/me/courses", verifyJWT, verifyTeacher, getMyCourses);

teacherRouter.patch(
    "/me/avatar",
    verifyJWT,
    verifyTeacher,
    upload.fields([
        {
            name: "avatar",
            maxCount: 1,
        }
    ]),
    updateTeacherAvatar
);


teacherRouter.get("/", getAllTeachers);
teacherRouter.get("/:id", getTeacherProfile);

export { teacherRouter };