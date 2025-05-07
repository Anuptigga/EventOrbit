import mongoose from "mongoose";
const dbConnect= async()=>{
    try {
        await mongoose.connect('mongodb+srv://Test2025:Test2025@cluster0.7oeigio.mongodb.net/EventOrbit')
        console.log("DB connected successfully!");
    } catch (error) {
        console.log(error);
    }
}
export default dbConnect;