import express from "express";
import {
  getProfile,
  updateProfile,
  getMyCourses
} from "../controllers/teacher.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// protect all routes
router.use(authMiddleware);

// routes
router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.get("/courses", getMyCourses);

export default router;