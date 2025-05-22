import multer from "multer";
const storage=multer.memoryStorage();
const uploadList=multer({storage});
export default uploadList;