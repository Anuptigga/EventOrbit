import express from 'express'
import dbConnect from './config/dbConfig.js'
import authRoute from "./routes/authRoute.js"
import eventRoute from "./routes/eventRoute.js"
import participantRoute from "./routes/participantRoute.js"

import cors from "cors"


const app = express();
app.use(cors(
    {
        origin:"*"
    }
));
app.use(express.json())
dbConnect();

app.use('/api/auth', authRoute)
app.use('/api/event',eventRoute)
app.use('/api/participant',participantRoute)
app.get('/', (req, res) => {
    res.send("server working!");
})
export default app;
