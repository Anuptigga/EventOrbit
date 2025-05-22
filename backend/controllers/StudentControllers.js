import Student from "../models/Student.js";
import { parseStudentsFromExcel } from "../utils/extractInfo.js";

export const uploadStudents=async(req,res)=>{
    try {
        if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded' })
        }
        const students=parseStudentsFromExcel(req.file.buffer)
        const hostId = req.currentHost._id
        await Promise.all(
            students.map((studentData)=>{
                return Student.create({...studentData,hostId})
            })
        )
        res.status(201).json({message:"Students uploaded successfully"})
    } catch (error) {
        res.status(500).json({message:"file not uploaded",error:error.message})
    }
}
