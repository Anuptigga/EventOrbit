import Host from "../models/Host.js"
import generateToken from "../utils/generateToken.js";

//signup
export const signup = async (req, res) => {
  try {
    const {name, email, imgURL, password } = req.body
    const existingUser = await Host.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

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
