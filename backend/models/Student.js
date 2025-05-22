import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
  hostId: { type: mongoose.Schema.Types.ObjectId, ref: 'Host' },
  name: { type: String },
  email: { type: String, unique: true },
  phoneNumber: { type: String },
})
const Student = mongoose.model('Student', studentSchema)
export default Student