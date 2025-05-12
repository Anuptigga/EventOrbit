import express from "express"
import { createEvent, getAllEvents, getEvent } from "../controllers/eventControllers.js"
import { authenticated } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/upload.js";

const router=express.Router();
router.post('/createEvent', authenticated,upload.single('img'), createEvent)
router.get('/getAllEvents',getAllEvents)
router.get('/getEvent/:_id',getEvent)

export default router