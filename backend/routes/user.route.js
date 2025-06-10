import express from "express"
import { login, register, updateProfile,logout } from "../controller/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload,register);   // Uses singleUpload middleware to handle single file uploads (like a profile picture).
router.route("/login").post(login);
router.route("/logout").get(logout);

router.route("/profile/update").post(isAuthenticated,singleUpload, updateProfile);

export default router;