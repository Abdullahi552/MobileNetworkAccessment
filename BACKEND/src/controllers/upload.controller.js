import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';
import * as csvService from '../services/csv.service.js';
import fs from 'fs';

export const uploadCSV = catchAsync(async (req, res, next) => {
    if (!req.file) {
        return next(new AppError('Please upload a CSV file', 400));
    }

    const { provider, locationId } = req.body;

    if (!provider || !locationId) {
        // Clean up the uploaded file if validation fails
        fs.unlinkSync(req.file.path);
        return next(new AppError('Please provide the provider (e.g., MTN) and locationId', 400));
    }

    try {
        const result = await csvService.processCSVFile(
            req.file.path, 
            provider, 
            locationId
        );

        // Clean up the file after successful processing (optional, keeps server clean)
        fs.unlinkSync(req.file.path);

        res.status(200).json({
            success: true,
            message: result.message,
            recordsProcessed: result.count
        });
    } catch (error) {
        // Clean up file if processing fails
        if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        return next(new AppError(error.message, 500));
    }
});