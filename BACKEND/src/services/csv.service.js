import fs from 'fs';
import Papa from 'papaparse';
import SignalReading from '../models/SignalReading.js';

export const processCSVFile = async (filePath, provider, locationId) => {
    const fileContent = fs.readFileSync(filePath, 'utf8');

    return new Promise((resolve, reject) => {
        Papa.parse(fileContent, {
            header: true,
            skipEmptyLines: true,
            complete: async (results) => {
                try {
                    const validReadings = [];

                    // Loop through the CSV rows
                    for (const row of results.data) {
                        // Note: CSV headers vary by app version, we check common names
                        const rsrp = parseFloat(row['RSRP'] || row['rsrp'] || row['RSRP(dBm)']);
                        const rsrq = parseFloat(row['RSRQ'] || row['rsrq'] || row['RSRQ(dB)']);
                        const sinr = parseFloat(row['SINR'] || row['sinr'] || row['RSSNR']);

                        // Only process rows that have a valid RSRP
                        if (!isNaN(rsrp)) {
                            validReadings.push({
                                provider,
                                location: locationId,
                                rsrp,
                                rsrq: isNaN(rsrq) ? null : rsrq,
                                sinr: isNaN(sinr) ? null : sinr,
                                timestamp: new Date() 
                            });
                        }
                    }

                    // Save all valid readings to MongoDB
                    if (validReadings.length > 0) {
                        await SignalReading.insertMany(validReadings);
                        resolve({ count: validReadings.length, message: 'Data ingested successfully' });
                    } else {
                        reject(new Error('No valid RSRP data found in the CSV.'));
                    }
                } catch (error) {
                    reject(error);
                }
            },
            error: (error) => reject(error)
        });
    });
};