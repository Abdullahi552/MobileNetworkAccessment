import express from 'express';
import { upload } from '../middlewares/upload.middleware.js';
import * as uploadController from '../controllers/upload.controller.js';

const router = express.Router();

// The 'file' key must match the form-data key in Postman
router.post('/', upload.single('file'), uploadController.uploadCSV);

export default router;