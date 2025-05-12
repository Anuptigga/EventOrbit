import express from "express"
import { getParticipants, register } from "../controllers/participantControllers.js";

const router=express.Router();
router.post('/register/:eventId',register)
router.get('/getparticipants/:eventId', getParticipants)
export default router;