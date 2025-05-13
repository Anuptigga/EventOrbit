import express from "express";
import { signup,login } from "../controllers/authControllers.js";
import upload from "../middlewares/upload.js";

const router=express.Router();

router.post('/signup',upload.single("img"),signup)
router.post('/login',login)

export default router;
