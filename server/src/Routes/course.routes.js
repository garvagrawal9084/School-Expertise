import e, {Router} from "express"
import { getCourse, getCourseById, getTeachersByCategory, getTeachersFromCourse } from "../controllers/course.controller.js";

const courseRouter = Router();

courseRouter.get("/", getCourse);
courseRouter.get("/:id/teachers", getTeachersFromCourse);
courseRouter.get("/:id", getCourseById);

export { courseRouter } 