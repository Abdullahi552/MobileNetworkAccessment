import express from 'express';
import * as readingController from '../controllers/reading.controller.js';

const router = express.Router();

router.route('/')
    .get(readingController.getReadings)     // GET /api/readings
    .post(readingController.createReading); // POST /api/readings

export default router;