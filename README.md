# Excel Generator Service

A lightweight Node.js service that generates multi-sheet Excel files from JSON data.

## Features

- Generate Excel files with multiple sheets
- RESTful API
- Docker support
- Railway deployment ready
- Input validation and error handling

## API Usage

### POST /generate-excel

Generate an Excel file with multiple sheets.

**Request Body:**
```json
{
  "sheets": {
    "Sheet1": [
      ["Header 1", "Header 2", "Header 3"],
      ["Row 1 Col 1", "Row 1 Col 2", "Row 1 Col 3"],
      ["Row 2 Col 1", "Row 2 Col 2", "Row 2 Col 3"]
    ],
    "Sheet2": [
      ["Name", "Age", "City"],
      ["John", 30, "New York"],
      ["Jane", 25, "London"]
    ]
  },
  "filename": "my_report.xlsx"
}
Response: Excel file download
GET /health
Health check endpoint.
Local Development
bashnpm install
npm run dev
Deployment
This service is designed to deploy on Railway with automatic Docker builds.
Environment Variables

PORT: Server port (default: 3000)


## 6. .gitignore (add to existing)
Dependencies
node_modules/
Environment files
.env
.env.local
.env.production
Logs
logs
.log
npm-debug.log
Runtime data
pids
*.pid
*.seed
*.pid.lock
Coverage directory used by tools like istanbul
coverage/
*.lcov
nyc test coverage
.nyc_output
Railway
.railway/
OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
