import express from 'express';
import dbConnect from './config/dbConfig.js';

const app = express();
dbConnect();

app.get('/', (req, res) => {
    res.send("server working!");
})
export default app;
