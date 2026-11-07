import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';
import * as statsService from '../services/stats.service.js';

export const analyzeLocation = catchAsync(async (req, res, next) => {
    const { locationId } = req.params;

    if (!locationId) {
        return next(new AppError('Please provide a location ID', 400));
    }

    try {
        const result = await statsService.runStatisticalAnalysis(locationId);
        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        return next(new AppError(error.message, 404));
    }
});