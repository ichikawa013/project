//googlePlaces.js 
import express from "express";
import axios from "axios";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res, next) => {
    const { query, lat, lng } = req.query;

    if (!lat || !lng || !query) {
        return res.status(400).json({ message: "Latitude, longitude, and query are required." });
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${apiKey}&location=${lat},${lng}&radius=5000&keyword=${query}`;

    try {
        const { data } = await axios.get(url);
        res.json({ places: data.results });
    } catch (err) {
        next(err); // Pass error to error middleware
    }
});

export default router;
