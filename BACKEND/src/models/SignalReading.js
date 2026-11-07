import mongoose from 'mongoose';

const signalReadingSchema = new mongoose.Schema(
    {
        provider: { 
            type: String, 
            required: true, 
            enum: ['MTN', 'Airtel', 'Glo', '9mobile'] 
        },
        location: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Location', 
            required: true 
        },
        // Core RF Metrics
        rsrp: { type: Number, required: true }, // Signal Strength (dBm)
        rsrq: { type: Number },                 // Signal Quality (dB)
        sinr: { type: Number },                 // Signal Clarity (dB)
        
        // Supplementary Speed Metrics
        downloadMbps: { type: Number },
        uploadMbps: { type: Number },
        latencyMs: { type: Number },

        // Metadata
        timestamp: { type: Date, default: Date.now },
        deviceModel: { type: String } // e.g., "Infinix Hot 10"
    },
    { timestamps: true }
);

const SignalReading = mongoose.model('SignalReading', signalReadingSchema);
export default SignalReading;