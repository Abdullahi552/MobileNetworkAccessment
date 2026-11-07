import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true }, // e.g., "Westend", "Main Gate"
        description: { type: String }, // e.g., "Residential area", "Commercial"
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },
    { timestamps: true }
);

const Location = mongoose.model('Location', locationSchema);
export default Location;