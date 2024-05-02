import mongoose from 'mongoose';

const neighborhoodSchema = new mongoose.Schema({
    name: String,
    geometry: Object // GeoJSON format
});

export const Neighborhood = mongoose.model('Neighborhood', neighborhoodSchema);

