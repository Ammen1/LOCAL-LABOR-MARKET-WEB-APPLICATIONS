import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Job } from "../models/jobSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { v4 as uuidv4 } from 'uuid';

export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find({ expired: false }).populate('postedBy', 'name');
  const totalJobsCount = await Job.countDocuments({ expired: false });
  res.status(200).json({
    success: true,
    jobs,
    totalJobs: totalJobsCount,
  });
});

export const postJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  const {
    title,
    description,
    country,
    city,
    category,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
  } = req.body;

  if (!title || !description || !category || !location || !country || !city) {
    return next(new ErrorHandler("Please provide full job details.", 400));
  }

  if ((!salaryFrom || !salaryTo) && !fixedSalary) {
    return next(
      new ErrorHandler(
        "Please either provide fixed salary or ranged salary.",
        400
      )
    );
  }

  if (salaryFrom && salaryTo && fixedSalary) {
    return next(
      new ErrorHandler("Cannot Enter Fixed and Ranged Salary together.", 400)
    );
  }
  const postedBy = req.user._id;
  
  // Generate a unique transaction reference (tx_ref) based on job title and UUID
  const tx_ref = `${title.replace(/\s+/g, '-').toLowerCase()}-${uuidv4()}`;

  // Create the job with the generated tx_ref
  const job = await Job.create({
    title,
    description,
    country,
    city,
    category,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    tx_ref, // Assign the generated tx_ref
    postedBy,
  });
  
  res.status(200).json({
    success: true,
    message: "Job Posted Successfully!",
    job,
  });
});



export const getMyJobs = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  
  const myJobs = await Job.find({ postedBy: req.user._id })
    .populate('postedBy', 'name');
  
  res.status(200).json({
    success: true,
    myJobs,
  });
});


export const updateJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("OOPS! Job not found.", 404));
  }
  job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Job Updated!",
  });
});

export const deleteJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("OOPS! Job not found.", 404));
  }
  await job.deleteOne();
  res.status(200).json({
    success: true,
    message: "Job Deleted!",
  });
});

export const getSingleJob = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id).populate('postedBy', 'name');
    if (!job) {
      return next(new ErrorHandler("Job not found.", 404));
    }
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    return next(new ErrorHandler(`Invalid ID / CastError`, 404));
  }
});


export const getTotalJobs = catchAsyncErrors(async (req, res, next) => {
  try {
    const totalJobsCount = await Job.countDocuments();
    res.status(200).json({
      success: true,
      totalJobs: totalJobsCount,
    });
  } catch (error) {
    return next(new ErrorHandler("Internal Server Error", 500));
  }
});

export const resetJobs = catchAsyncErrors(async (req, res, next) => {
  try {
    await Job.deleteMany({});
    res.status(200).json({
      success: true,
      message: "All jobs deleted successfully.",
    });
  } catch (error) {
    return next(new ErrorHandler("Internal Server Error", 500));
  }
});