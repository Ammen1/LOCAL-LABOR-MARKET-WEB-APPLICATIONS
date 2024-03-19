import express from "express";
import { login, register, logout, getUser, getUsers, getjobSeeker, getEmployees, getUserss, deleteUser} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);
router.get("/getusers", getUsers);
router.get("/getjobseekers", getjobSeeker);
router.get("/getbemployee", getEmployees);
router.get("/getuserss", getUserss)
router.delete('/delete/:id', deleteUser)

export default router;
