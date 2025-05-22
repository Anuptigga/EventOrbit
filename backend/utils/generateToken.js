import jwt from "jsonwebtoken"

const generateToken = (hostId) => {
  return jwt.sign({ id: hostId }, process.env.JWT_SECRET, {
    expiresIn: '10d',
  })
}
export default generateToken;