// control panel backend for NITS yantranav
// Debashish Buragohain

import express from "express"
import cors from "cors";
import bodyParser from 'body-parser';
import webcam from './routes/webcam.js';
import lidar from './routes/lidar.js';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.port;

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', false);
    next();
});

// getting and receiving feeds from cam1 and cam2
app.use('/webcam', webcam);
// get and lidar latest data
app.use('/lidar', lidar);

app.listen(port, () => console.log("Control panel backend listening to port: " + port));