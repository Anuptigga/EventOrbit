import express from "express"
import { createEvent, getAllEvents, getEvent } from "../controllers/eventControllers.js"
import { authenticated } from "../middlewares/authMiddleware.js";

const router=express.Router();
router.post('/createEvent', authenticated, createEvent)
router.get('/getAllEvents',getAllEvents)
router.get('/getEvent/:_id',getEvent)

export default router