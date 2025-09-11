import { Router } from "express";
import authController from "../modules/auth/auth.controller.js";

const router = Router()

router.get("/", authController.testServer)


export default router