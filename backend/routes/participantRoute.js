import express from "express"
import { getParticipants, register } from "../controllers/participantControllers.js";
import { authenticated } from "../middlewares/authMiddleware.js";

const router=express.Router();
router.post('/register/:eventId',register)
router.get('/getparticipants/:eventId',authenticated, getParticipants)
export default router;