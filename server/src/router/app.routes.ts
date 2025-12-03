import { Router } from "express";
import authController from "../modules/auth/auth.controller.js";
import passport from "passport";
import FileUploader from "../helper/fileUploader.js";


const router = Router()
const profilePicUploader = new FileUploader({ destination: "uploads/profile/", maxFileSize: 1024*1024*5, supportedFileTypes: ["jpeg", "jpg", "png", "gif", "ico", "webp"] })

router.get("/", authController.testServer)
router.get("/auth/google", passport.authenticate('google', {scope: ["profile", "email"]}))
router.get("/auth/google/callback", passport.authenticate('google', { failureMessage: true, failureRedirect: `${process.env.FRONTEND_URL}/auth/login` }), authController.googleAuthCallback)
router.post("/auth/register", profilePicUploader.upload.single("profilePicture") , authController.registerUser)
router.post("/auth/checkMail", authController.checkEmailFunctionality)

export default router