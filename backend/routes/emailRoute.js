import express from "express"
import { sendMail } from "../controllers/emailControllers.js"
import { authenticated } from "../middlewares/authMiddleware.js"
const router =express.Router()
router.post('/sendEmail/:eventId', authenticated, sendMail)
export default router