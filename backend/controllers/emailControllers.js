import sgMail from "@sendgrid/mail"
import Event from '../models/Event.js'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export const sendMail=async(req,res)=>{
    try {
      const { eventId } = req.params
      const event = await Event.findById(eventId)
      if (event.hostId.toString() !== req.currentHost._id.toString()) {
        return res
          .status(403)
          .json({ message: 'You are not the host of the event' })
      }
      // const {to,from,subject,text,html}=req.body
      // const msg={
      //     to,
      //     from,
      //     subject,
      //     text,
      //     html
      // }
      // await sgMail.send(msg)
      //  res.status(201).json({message:"emails sent succussfully"})

      const {recipients } = req.body
      const from =process.env.SENDGRID_EMAIL
      if (!Array.isArray(recipients) || recipients.length === 0) {
        return res.status(400).json({ message: 'Recipients array is required' })
      }
      await Promise.all(
        recipients.map((recipient) => {
          const msg = {
            to: recipient.to,
            from,
            subject: recipient.subject,
            text: recipient.text,
            html: recipient.html,
          }
          return sgMail.send(msg)
        })
      )
      res.status(201).json({ message: 'Emails sent successfully' })
    } catch (error) {
        res.status(500).json({message:"Email not sent",error:error.message})
    }
}