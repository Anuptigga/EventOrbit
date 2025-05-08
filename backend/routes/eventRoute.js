import express from "express"
import { createEvent, getAllEvents, getEvent } from "../controllers/eventControllers.js"

const router=express.Router();
router.post('/createEvent',createEvent)
router.get('/getAllEvents',getAllEvents)
router.get('/getEvent/:_id',getEvent)

export default router