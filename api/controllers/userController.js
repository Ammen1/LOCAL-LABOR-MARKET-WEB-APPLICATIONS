import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User, Review } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, password, role } = req.body;
  if (!name || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please fill full form!"));
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered!"));
  }
  const user = await User.create({
    name,
    email,
    phone,
    password,
    role,
  });
  sendToken(user, 201, res, "User Registered!");
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email ,password and role."));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  if (user.role !== role) {
    return next(
      new ErrorHandler(`User with provided email and ${role} not found!`, 404)
    );
  }
  sendToken(user, 201, res, "User Logged In!");
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully.",
    });
});


export const getUser = catchAsyncErrors((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const userId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return next(new ErrorHandler("Invalid user ID", 400));
  }

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to delete user", 500));
  }
});



export const getUsers = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  const totalUsersCount = await User.countDocuments();

  res.status(200).json({
    success: true,
    user,
    totalUsers: totalUsersCount,
  });
});


export const getUserss = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users: users,
  });
});



export const getjobSeeker = catchAsyncErrors(async (req, res, next) => {
  try {
    const jobSeekerUsers = await User.find({ role: "Job Seeker" });
    const jobSeekerUsersCount = await User.countDocuments({ role: "Job Seeker" });

    res.status(200).json({
      success: true,
      jobSeekerUsers,
      totalJobSeekerUsers: jobSeekerUsersCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});


export const getEmployees = catchAsyncErrors(async (req, res, next) => {
  try {
    const Employees = await User.find({ role: "Employer" });
    const totalEmployeesCount = await User.countDocuments({ role: "Employer" });

    res.status(200).json({
      success: true,
      Employees,
      totalEmployees: totalEmployeesCount ,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});




// Controller function to create a new review
export const createReview = catchAsyncErrors(async (req, res) => {
  try {
    const review = new Review({
      applicantID: {
        user: req.body.applicantID.user,
        role: req.body.applicantID.role
      },
      employerID: {
        user: req.body.employerID.user,
        role: req.body.employerID.role
      },
      rating: req.body.rating,
      comment: req.body.comment
    });
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Controller function to get all reviews
export const getAllReviews = catchAsyncErrors(async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Controller function to get a review by ID
export const getReviewById = catchAsyncErrors(async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Controller function to update a review by ID
export const updateReviewById =catchAsyncErrors( async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(updatedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Controller function to delete a review by ID
export const deleteReviewById =  catchAsyncErrors(async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
