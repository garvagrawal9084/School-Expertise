import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/users.models.js';

const verifyJWT = asyncHandler(async (req, res, next) => {
    const authHeader = req.header("Authorization");

    const token =
        req.cookies?.accessToken ||
        (authHeader && authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : null);

    console.log(token) ; 

    if (!token) {
        throw new ApiError(401, "Unauthorized Request");
    }

    try {
        const decodedToken = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken._id)
            .select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = user;

        next();
    } catch (error) {
        throw new ApiError(401, "Invalid or expired access token");
    }
});


const verifyAdmin = (req, res, next) => {
    if (!req.user) {
        throw new ApiError(401, "Unauthorized Request");
    }

    if (req.user.role !== "ADMIN") {
        throw new ApiError(403, "Forbidden: Admin access required");
    }

    next();
};

const verifyTeacher = (req , res, next) => {
    if(!req.user) {
        throw new ApiError(401, "Unauthorized Request");
    }

    if(req.user.role !== "TEACHER") {
        throw new ApiError(403 , "Forbidden: Teacher access required")
    }
}


export { verifyJWT , verifyAdmin , verifyTeacher };

