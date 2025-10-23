import { Router } from "express";
import authController from "../modules/auth/auth.controller.js";
import { authenticateGoogle } from "../middlewares/auth/passport.middleware.js";
import passport from "passport";
import initializePassport from "../config/passport.js";

const router = Router()

router.get("/", authController.testServer)
router.get("/auth/google", passport.authenticate('google', {scope: ["profile", "email"]}))
router.get("/auth/google/callback", passport.authenticate('google', { failureMessage: true, failureRedirect: `${process.env.FRONTEND_URL}/auth/login` }), (req, res) => {
    console.log("getting");
    
    return res.status(200).send({
        message: "Working"
    })
})


export default router