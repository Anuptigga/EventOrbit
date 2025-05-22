import mongoose from "mongoose";
import bcrypt from "bcrypt";

const hostSchema = new mongoose.Schema({
  name: { type: String },
  imgURL: {
    type: String,
    required:true,
    default:
      'https://static.vecteezy.com/system/resources/previews/000/576/106/original/vector-sign-of-people-icon.jpg',
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

const saltRounds = Number(process.env.SALT_ROUNDS)
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