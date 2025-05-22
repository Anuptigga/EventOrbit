import axios from "./axios";

export const sendEmail= async(eventId,recipients)=>{
    try {
        const response= await axios.post(`/email/sendEmail/${eventId}`,recipients)
        return response.data
    } catch (error) {
        console.error("Failed to send emails",error)
        throw error
    }
}