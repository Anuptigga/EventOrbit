import axios from "./axios";

export const getParticipants = async(eventId)=>{
    try {
        const response= await axios.get(`/participant/getparticipants/${eventId}`)
        return response.data
    } catch (error) {
        console.error("failed to get participants list:",error)
        throw error
    }
}