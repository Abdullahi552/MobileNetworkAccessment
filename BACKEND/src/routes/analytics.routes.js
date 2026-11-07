import express from 'express';
import * as analyticsController from '../controllers/analytics.controller.js';

const router = express.Router();

router.get('/location/:locationId', analyticsController.analyzeLocation);

export default router;