const express = require('express');
const XLSX = require('xlsx');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Excel Generator Service is running!',
    version: '1.0.0',
    endpoints: {
      'POST /generate-excel': 'Generate multi-sheet Excel file',
      'GET /health': 'Health check'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Main endpoint to generate Excel files
app.post('/generate-excel', (req, res) => {
  try {
    const { sheets, filename } = req.body;

    // Validation
    if (!sheets || typeof sheets !== 'object') {
      return res.status(400).json({ 
        error: 'Invalid request. Expected "sheets" object.' 
      });
    }

    if (Object.keys(sheets).length === 0) {
      return res.status(400).json({ 
        error: 'No sheets provided. At least one sheet is required.' 
      });
    }

    // Create workbook
    const wb = XLSX.utils.book_new();

    // Add each sheet
    Object.keys(sheets).forEach(sheetName => {
      const sheetData = sheets[sheetName];
      
      // Validate sheet data
      if (!Array.isArray(sheetData)) {
        throw new Error(`Sheet "${sheetName}" must be an array of arrays`);
      }

      const ws = XLSX.utils.aoa_to_sheet(sheetData);
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
    });

    // Generate buffer
    const buffer = XLSX.write(wb, { 
      bookType: 'xlsx', 
      type: 'buffer',
      compression: true 
    });

    // Set response headers
    const fileName = filename || 'generated_file.xlsx';
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Length', buffer.length);

    // Send the file
    res.send(buffer);

  } catch (error) {
    console.error('Error generating Excel file:', error);
    res.status(500).json({ 
      error: 'Failed to generate Excel file',
      details: error.message 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found',
    availableEndpoints: ['GET /', 'POST /generate-excel', 'GET /health']
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Excel Generator Service running on port ${PORT}`);
  console.log(`📊 Ready to generate Excel files!`);
});
