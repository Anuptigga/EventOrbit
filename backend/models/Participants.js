import mongoose from "mongoose";
const participantSchema= new mongoose.Schema(
    {
        hostId:{type:mongoose.Schema.Types.ObjectId,ref:'Host',required:true},
        eventId:{type:mongoose.Schema.Types.ObjectId, ref:'Event',required:true},
        name:{type:String, required:true},
        branch:{type:String,required:true},
        batch:{type:Number,required:true},
        eventCategory:{type:String},
        email:{type:String, required:true},
        phone:{type:Number, required:true}
    }
)
const Participant=mongoose.model('participant',participantSchema)
export default Participant;
