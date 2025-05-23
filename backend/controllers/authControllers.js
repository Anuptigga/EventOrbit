import Host from "../models/Host.js"
import generateToken from "../utils/generateToken.js"
import {OAuth2Client} from 'google-auth-library'

//signup
export const signup = async (req, res) => {
  try {
    const {name, email, password } = req.body
    const existingUser = await Host.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }
    const imgURL=req.file?req.file.path:undefined;
    const host = new Host({ name, email, password,imgURL })
    await host.save()

    const token= generateToken(host._id)
    res.status(201).json({ message: 'Signup successful', host,token })
  } catch (err) {
    res.status(500).json({ message: 'Error signing up', error: err })
  }
};


//login
export const login= async(req,res)=>{
  try {
    const {email,password}=req.body;
    const host= await Host.findOne({email});
    if(!host){
      return res.status(400).json({message:"User not found!"})
    }
    const isMatch= await host.comparePassword(password); 
    if(!isMatch){
      return res.status(400).json({message:"Invalid Credentials"})
    }
    const token=generateToken(host._id)
    res.status(200).json({message:"Login successful",token});


  } catch (error) {
    res.status(500).json({message:"Error logging in",error});
  }
}

//Google Login
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
export const googleLogin= async(req,res)=>{
  try {
    const {token}=req.body
    const ticket=await client.verifyIdToken({
      idToken:token,
      audience:process.env.GOOGLE_CLIENT_ID,
    })
    const payload=ticket.getPayload()
    const {email,name,picture}=payload

    let host= await Host.findOne({email})
    if(!host){
      const randomPassword=Math.random().toString(36).slice(-8)
      host =new Host({
        name,
        email,
        password: randomPassword,
        imgURL:picture,
      })
      await host.save()
    }
    const appToken=generateToken(host._id)
    res.status(200).json({message:"Google login successful",token:appToken})
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Google login failed', error: error.message })
  }
}
