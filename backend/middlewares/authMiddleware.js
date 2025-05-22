import jwt from "jsonwebtoken";
import Host from "../models/Host.js";
export const authenticated =async(req,res,next)=>{
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        try {
          token = req.headers.authorization.split(" ")[1];
          const decoded = jwt.verify(token, process.env.JWT_SECRET)
          const host = await Host.findById(decoded.id).select('-password')

          if (!host) {
            throw new Error('User not found')
          }
          req.currentHost = host
          next();
        } catch (err) {
          return res.status(401).json({ message: "Unauthorized: Invalid token" + err.message });
        }
      } else {
        return res.status(401).json({ message: "No token, authorization denied" });
      }
}
