import express from "express";
import {
  employerGetAllApplications,
  jobseekerDeleteApplication,
  jobseekerGetAllApplications,
  postApplication,
  getAllApplications,
  acceptApplication,
  rejectApplication,
  paymentApproval,
} from "../controllers/applicationController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isAuthenticated, postApplication);
router.get("/employer/getall", isAuthenticated, employerGetAllApplications);
router.get("/jobseeker/getall", jobseekerGetAllApplications);
router.delete("/delete/:id", isAuthenticated, jobseekerDeleteApplication);
router.get("/applications", getAllApplications);
router.put("/applications/:id/accept", acceptApplication);
router.put("/applications/:id/reject", rejectApplication);
router.put("/applications/:id/paymentApproval", paymentApproval )

export default router;
