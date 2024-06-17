// router for the LIDAR sensor update and get data
// Debashish Buragohain

import express from 'express';
const router = express.Router();


// having a sample dataset for testing
let latestScanData = [
    { angle: 0.1, range: 1.2 },
    { angle: 0.2, range: 1.5 },
    { angle: 0.3, range: 1.7 },
];

router.post('/upload', (req, res) => {
    const { data } = req.body;
    if (!data) return res.status(400).json({ error: "No lidar data provided." });
    latestScanData = data;
    res.status(200).json({ status: 'success' })
});

router.get('/scan', (req, res) => {
    res.status(200).json({ data: latestScanData });
});

export default router;;