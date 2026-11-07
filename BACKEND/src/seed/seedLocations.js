import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Location from '../models/Location.js';

const locations = [
    { name: 'Westend', description: 'Residential/Commercial Area', latitude: 8.7167, longitude: 4.4333 },
    { name: 'Main Campus Gate', description: 'Educational Area', latitude: 8.7200, longitude: 4.4300 },
    { name: 'Malete Market', description: 'Commercial Area', latitude: 8.7100, longitude: 4.4200 },
    { name: 'Hostel Area', description: 'Residential', latitude: 8.7250, longitude: 4.4350 },
    { name: 'Roadside (Highway)', description: 'Roadside', latitude: 8.7000, longitude: 4.4100 },
    { name: 'Staff Quarters', description: 'Indoor/Residential', latitude: 8.7150, longitude: 4.4250 },
];

const seedLocations = async () => {
    try {
        await connectDB();
        await Location.deleteMany(); // Clear existing
        await Location.insertMany(locations);
        console.log('✅ 6 Locations seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seed failed:', error);
        process.exit(1);
    }
};

seedLocations();