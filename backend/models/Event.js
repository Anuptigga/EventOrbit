import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    hostId: { type: mongoose.Schema.Types.ObjectId, ref: 'Host', required: true },
    hostName: { type: String, required: true },
    hostImage:{type:String, required:true},
    eventName: { type: String, required: true },
    eventDescription: { type: String, required: true },
    eventPoster: { type: String },
    eventDate: { type: Date, required: true },
    eventVenue: { type: String, required: true },
    eventCategory: [{ type: String }],
  },
  { timestamps: true }
)

const Event =mongoose.model('event',eventSchema)
export default Event;