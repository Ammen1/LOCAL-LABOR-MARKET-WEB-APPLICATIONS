import express from "express";
import { login, register, logout, getUser, createReview,getReviewById,   getUsers, getjobSeeker, getEmployees, getUserss, deleteUser,getAllReviews } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import {getReviewsByJobSeeker} from "../controllers/reviewController.js"

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);
router.get("/getusers", getUsers);
router.get("/getjobseekers", getjobSeeker);
router.get("/getbemployee", getEmployees);
router.get("/getuserss", getUserss)
router.delete('/delete/:id', deleteUser);
// router.post('/reviews', createReview);
// router.post("/reviews",  createReview);
router.post("/reviews",  createReview); // Create a review
router.get("/reviews", getAllReviews); // Get reviews for a job seeker
// router.get("/reviews/employer", getReviewsByEmployer); // Get reviews by an employer
router.get("/reviews/:jobSeekerId",  getReviewById);
router.get("/jobseeker/:jobSeekerId", getReviewsByJobSeeker);

export default router;
