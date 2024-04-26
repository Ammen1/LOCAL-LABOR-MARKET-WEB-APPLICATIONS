import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User, Review } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";

// @desc    Create a review
// @route   POST /api/v1/user/reviews
// @access  Private (Employer)
export const createReview = catchAsyncErrors(async (req, res, next) => {
  const { jobSeekerId, rating, comment } = req.body;

  // Check if the job seeker ID is provided
  if (!jobSeekerId) {
    return next(new ErrorHandler("Job seeker ID is required", 400));
  }

  // Check if the job seeker exists
  const jobSeeker = await User.findById(jobSeekerId);
  if (!jobSeeker || jobSeeker.role !== "Job Seeker") {
    return next(new ErrorHandler("Job seeker not found", 404));
  }

  // Get the employer (reviewer) from the authenticated user
  const employerId = req.user.id;

  // Create the review
  const review = await Review.create({
    reviewer: employerId,
    reviewee: jobSeekerId,
    rating,
    comment,
  });

  res.status(201).json({
    success: true,
    review,
  });
});

// @desc    Get all reviews for a job seeker
// @route   GET /api/v1/user/reviews/:jobSeekerId
// @access  Public
export const getReviewsByJobSeeker = catchAsyncErrors(async (req, res, next) => {
  const jobSeekerId = req.params.jobSeekerId;

  // Check if the job seeker exists
  const jobSeeker = await User.findById(jobSeekerId);
  if (!jobSeeker || jobSeeker.role !== "Job Seeker") {
    return next(new ErrorHandler("Job seeker not found", 404));
  }

  // Get all reviews for the job seeker
  const reviews = await Review.find({ reviewee: jobSeekerId });

  res.status(200).json({
    success: true,
    count: reviews.length,
    reviews,
  });
});

// @desc    Get all reviews by an employer (reviewer)
// @route   GET /api/v1/user/reviews/employer
// @access  Private (Employer)
export const getReviewsByEmployer = catchAsyncErrors(async (req, res, next) => {
  const employerId = req.user.id;

  // Get all reviews by the employer
  const reviews = await Review.find({ reviewer: employerId });

  res.status(200).json({
    success: true,
    count: reviews.length,
    reviews,
  });
});

// @desc    Delete a review
// @route   DELETE /api/v1/user/reviews/:id
// @access  Private (Employer)
export const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const reviewId = req.params.id;
  const employerId = req.user.id;

  // Find the review by ID
  const review = await Review.findById(reviewId);

  // Check if the review exists
  if (!review) {
    return next(new ErrorHandler("Review not found", 404));
  }

  // Check if the authenticated user is the employer who created the review
  if (review.reviewer.toString() !== employerId) {
    return next(new ErrorHandler("Unauthorized to delete this review", 401));
  }

  // Delete the review
  await review.remove();

  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
  });
});
