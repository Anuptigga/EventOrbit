import mongoose, { Schema } from "mongoose";

const eventSchema= new mongoose.Schema({
    eventName:{type:String,require:true},
    eventDescription:{type:String,require:true},
    eventPoster:{type:String,require:true},
    eventDate:{type:Date,require:true},
    eventVenue:{type:String,require:true},
    eventCategory:[{type:String}],
},{timestamps:true})

const Event =mongoose.model('event',eventSchema)
export default Event;