import express from 'express';
import dbConnect from './config/dbConfig.js';
import authRoute from "./routes/authRoute.js"

const app = express();
app.use(express.json())
dbConnect();

app.use('/api/auth', authRoute)
app.get('/', (req, res) => {
    res.send("server working!");
})
export default app;
