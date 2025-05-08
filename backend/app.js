import express from 'express';
import dbConnect from './config/dbConfig.js';
import authRoute from "./routes/authRoute.js"
import cors from "cors"


const app = express();
app.use(cors());
app.use(express.json())
dbConnect();

app.use('/api/auth', authRoute)
app.get('/', (req, res) => {
    res.send("server working!");
})
export default app;
