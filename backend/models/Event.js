import mongoose, { Schema } from "mongoose";

const eventSchema= new mongoose.Schema({
    title:{type:String,require:true},
    desc:{type:String,require:true},
    img:{type:String,require:true},
    date:{type:Date,require:true},
    venue:{type:String,require:true},
    category:[{type:String}],
},{timestamps:true})

const Event =mongoose.model('event',eventSchema)
export default Event;