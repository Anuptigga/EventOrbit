import mongoose from "mongoose";
import bcrypt from "bcrypt";

const hostSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

const saltRounds = 10
//hash password
hostSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, saltRounds)
  next()
})

//compare password
hostSchema.methods.comparePassword= async function(hostPassword) {
   return await bcrypt.compare(hostPassword, this.password)
}

const Host = mongoose.model('host',hostSchema);
export default Host;