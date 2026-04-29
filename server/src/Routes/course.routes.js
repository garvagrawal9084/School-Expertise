import e, {Router} from "express"
import { getCourse, getTeachersByCategory, getTeachersFromCourse } from "../controllers/course.controller.js";

const courseRouter = Router() ; 

courseRouter.get("/" , getCourse) ;
courseRouter.get("/category/:category" , getTeachersByCategory) ; 
courseRouter.get("/:id" , getTeachersFromCourse) ; 

export { courseRouter }