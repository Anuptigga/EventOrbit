import jwt from "jsonwebtoken"

const JWT_SECRET="secret-key"
const generateToken = (hostId) => {
  return jwt.sign({ id: hostId }, JWT_SECRET, {
    expiresIn: '10d',
  })
}
export default generateToken;