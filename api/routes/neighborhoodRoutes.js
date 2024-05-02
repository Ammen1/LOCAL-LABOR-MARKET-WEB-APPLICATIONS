import express from 'express';
import { Neighborhood } from '../models/neighborhoodModel.js';

const router = express.Router();

// API endpoint to find neighborhoods based on user coordinates
router.get('/neighborhoods', async (req, res) => {
    const { longitude, latitude } = req.query; // User coordinates

    // Validate longitude and latitude
    if (!isValidCoordinate(longitude) || !isValidCoordinate(latitude)) {
        return res.status(400).json({ error: 'Invalid coordinates' });
    }

    try {
        const neighborhoods = await Neighborhood.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[parseFloat(longitude), parseFloat(latitude)], 15 / 3963.2] // 15 miles radius
                }
            }
        });
        res.json(neighborhoods);
    } catch (error) {
        console.error('Error finding neighborhoods:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Helper function to validate coordinate
function isValidCoordinate(coord) {
    return !isNaN(parseFloat(coord)) && Math.abs(parseFloat(coord)) <= 90;
}

export default router;
