import mongoose, { Schema } from "mongoose";

const eventSchema= new mongoose.Schema({
    eventName:{type:String,required:true},
    eventDescription:{type:String,required:true},
    eventPoster:{type:String,required:true},
    eventDate:{type:Date,required:true},
    eventVenue:{type:String,required:true},
    eventCategory:[{type:String}],
},{timestamps:true})

const Event =mongoose.model('event',eventSchema)
export default Event;