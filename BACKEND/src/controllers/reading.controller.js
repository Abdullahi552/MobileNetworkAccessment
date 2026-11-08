import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';
import SignalReading from '../models/SignalReading.js';

export const createReading = catchAsync(async (req, res, next) => {
    const { 
        provider, locationId, 
        rsrp, rsrq, sinr, 
        downloadMbps, uploadMbps, latencyMs 
    } = req.body;

    // Basic validation
    if (!provider || !locationId || rsrp === undefined) {
        return next(new AppError('Provider, Location ID, and RSRP are required fields.', 400));
    }

    const reading = await SignalReading.create({
        provider, 
        location: locationId, 
        rsrp, 
        rsrq: rsrq || null, 
        sinr: sinr || null, 
        downloadMbps: downloadMbps || null, 
        uploadMbps: uploadMbps || null, 
        latencyMs: latencyMs || null,
        timestamp: new Date()
    });

    res.status(201).json({
        success: true,
        message: 'Signal reading saved successfully',
        data: reading
    });
});

export const getReadings = catchAsync(async (req, res) => {
    // Fetch all readings and populate the location details
    const readings = await SignalReading.find().populate('location');
    
    res.status(200).json({ 
        success: true, 
        count: readings.length, 
        data: readings 
    });
});