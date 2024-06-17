// the webcam feed route

import express from 'express';
const router = express.Router();

let cam1Feed = null;
let cam2Feed = null;

router.post('/cam1', (req, res) => {
    const { image } = req.body;
    if (!image) return res.status(400).json({ error: "Feed not provided for webcam1" });    
    cam1Feed = image;
    res.json({ message: 'Feed uploaded successfully.' });
});

router.get('/cam1', (req, res) => {
    if (!cam1Feed) return res.status(404).json({ error: 'webcam1 feed empty'});    
    res.status(200).json({image: cam1Feed})
});

router.post('/cam2', (req, res) => {
    const { image } = req.body;
    if (!image) return res.status(400).json({ error: "Feed not provided for webcam2" });    
    cam2Feed = image;
    res.json({ message: 'Feed uploaded successfully.' });
});

router.get('/cam2', (req, res) => {
    if (!cam2Feed) return res.status(404).json({ errro: 'webcam1 feed empty'});    
    res.status(200).json({image: cam2Feed})
})

export default router;