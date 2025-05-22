import express from 'express'
import uploadList from '../middlewares/uploadList.js'
import { uploadStudents } from '../controllers/StudentControllers.js'
import { authenticated } from '../middlewares/authMiddleware.js'

const router=express.Router()
router.post("/upload", authenticated, uploadList.single("file"),uploadStudents)
export default router;