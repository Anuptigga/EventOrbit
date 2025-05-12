import Participant from "../models/Participants.js";
import Event from "../models/Event.js"

//register for the event
export const register= async(req, res)=>{
    try {
        const{name,branch,batch,eventCategory,email,phone}=req.body;
        const {eventId}=req.params
        const event = await Event.findById(eventId)
        const hostId=event.hostId
        const participant= new Participant({
            hostId,
            eventId,
            name,
            branch,
            batch,
            eventCategory,
            email,
            phone
        })
        await participant.save()
        res.status(201).json({message:"registration successful",participant})
    } catch (error) {
        res.status(500).json({message:"Try again",error:error.message})
    }
}

//get participants
export const getParticipants =async (req,res) => {
    try {
        const {eventId} =req.params
        const participant = await Participant.find({ eventId: eventId })
        if(!participant || participant.length===0){
            res.status(404).json({message:"no participants"})
        }
        res.status(200).json({participant})
    } catch (error) {
        res.status(500).json({message:"no participants found",error:error.message})
    }
}