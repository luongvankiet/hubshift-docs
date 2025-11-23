# Incident Management APIs

## Overview

Incident management APIs handle reporting, tracking, and analysis of incidents. The system includes AI-powered incident intake, injury photo analysis, compliance monitoring, and comprehensive reporting capabilities.

## Base URLs

- **Web APIs**: `/api/incident`, `/api/incident-report`
- **Mobile APIs**: `/api/frontend/incident`
- **Intake API**: `/api/incidentIntake`

## Key Concepts

### Incident Types
- **Injury**: Physical injuries
- **Medical**: Medical incidents
- **Behavioral**: Behavioral incidents
- **Property**: Property damage
- **Other**: Other incident types

### Severity Levels
- **Critical**: Life-threatening or serious
- **High**: Significant impact
- **Medium**: Moderate impact
- **Low**: Minor impact

### Incident Status
- **Draft**: Initial report
- **Submitted**: Submitted for review
- **Under Investigation**: Being investigated
- **Resolved**: Incident resolved
- **Closed**: Incident closed

## Endpoints

### Create Incident

#### Create Incident (Web)
```http
POST /api/incident/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "clientId": "client_id",
  "incidentType": "injury",
  "severity": "high",
  "date": "2024-01-15",
  "time": "14:30",
  "location": "123 Main St, Melbourne VIC 3000",
  "description": "Incident description",
  "witnesses": [
    {
      "name": "John Doe",
      "contact": "+61400000000"
    }
  ],
  "actionsTaken": "First aid provided",
  "reportedBy": "user_id"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Incident created successfully",
  "data": {
    "id": "incident_id",
    "incidentNumber": "INC-2024-001",
    "status": "draft",
    "createdAt": "2024-01-15T14:30:00Z"
  }
}
```

#### Create Incident (Mobile)
```http
POST /api/frontend/incident/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "clientId": "client_id",
  "incidentType": "injury",
  "severity": "high",
  "date": "2024-01-15",
  "time": "14:30",
  "description": "Incident description"
}
```

### AI-Powered Incident Intake

#### Incident Intake with File Upload
```http
POST /api/incident/intake
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <incident_report.pdf>
clientId: client_id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "extractedData": {
      "incidentType": "injury",
      "severity": "high",
      "date": "2024-01-15",
      "description": "Extracted description",
      "location": "Extracted location"
    },
    "confidence": 0.95,
    "suggestions": []
  }
}
```

#### Store Incident from Intake
```http
POST /api/incident/store
Authorization: Bearer <token>
Content-Type: application/json

{
  "clientId": "client_id",
  "extractedData": {
    "incidentType": "injury",
    "severity": "high",
    "date": "2024-01-15",
    "description": "Incident description"
  }
}
```

#### Analyze Injury Photo
```http
POST /api/incident/analyze-injury-photo
Authorization: Bearer <token>
Content-Type: multipart/form-data

image: <injury_photo.jpg>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "analysis": {
      "injuryType": "bruise",
      "severity": "medium",
      "location": "left_arm",
      "description": "Bruising on left forearm",
      "recommendations": ["Apply ice", "Monitor for 24 hours"]
    },
    "confidence": 0.88
  }
}
```

### Get Incidents

#### Get All Incidents
```http
GET /api/incident/get-all-incident
Authorization: Bearer <token>
```

**Query Parameters:**
- `page`: Page number
- `limit`: Items per page
- `status`: Filter by status
- `severity`: Filter by severity
- `incidentType`: Filter by type
- `startDate`: Start date filter
- `endDate`: End date filter
- `clientId`: Filter by client

**Response:**
```json
{
  "success": true,
  "data": {
    "incidents": [
      {
        "id": "incident_id",
        "incidentNumber": "INC-2024-001",
        "client": {
          "id": "client_id",
          "name": "Jane Smith"
        },
        "incidentType": "injury",
        "severity": "high",
        "date": "2024-01-15",
        "time": "14:30",
        "status": "under_investigation",
        "reportedBy": {
          "id": "user_id",
          "name": "John Doe"
        }
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 10,
      "totalItems": 100
    }
  }
}
```

#### Get Incidents with Filter
```http
GET /api/incident/get-incident-filter
Authorization: Bearer <token>
```

**Query Parameters:**
- `filters`: JSON string with filter criteria
- `sortBy`: Sort field
- `sortOrder`: Sort order (asc, desc)

#### Get Incidents for User
```http
GET /api/incident/get-all-incident-user
Authorization: Bearer <token>
```

#### Get Incidents for Supervisor
```http
GET /api/incident/get-all-incident-supervisor
Authorization: Bearer <token>
```

#### Get Incidents for General Manager
```http
GET /api/incident/get-all-incident-genManager
Authorization: Bearer <token>
```

#### Get Incidents (Mobile)
```http
GET /api/frontend/incident/get-all-incident-user
Authorization: Bearer <token>
```

### Get Incident Details

#### Get Incident Details
```http
GET /api/incident/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "incident_id",
    "incidentNumber": "INC-2024-001",
    "client": {
      "id": "client_id",
      "name": "Jane Smith",
      "dateOfBirth": "1990-01-01"
    },
    "incidentType": "injury",
    "severity": "high",
    "date": "2024-01-15",
    "time": "14:30",
    "location": "123 Main St, Melbourne VIC 3000",
    "description": "Detailed incident description",
    "witnesses": [
      {
        "name": "John Doe",
        "contact": "+61400000000",
        "statement": "Witness statement"
      }
    ],
    "actionsTaken": "First aid provided, ambulance called",
    "medicalAttention": {
      "required": true,
      "provided": true,
      "hospital": "Melbourne Hospital"
    },
    "investigation": {
      "status": "in_progress",
      "investigator": "investigator_id",
      "findings": "Preliminary findings",
      "recommendations": []
    },
    "status": "under_investigation",
    "reportedBy": {
      "id": "user_id",
      "name": "John Doe"
    },
    "attachments": [],
    "createdAt": "2024-01-15T14:30:00Z",
    "updatedAt": "2024-01-16T10:00:00Z"
  }
}
```

#### Get Incident PDF
```http
GET /api/incident/pdf/:id
Authorization: Bearer <token>
```

**Response:** PDF file download

### Update Incident

#### Update Incident
```http
PUT /api/incident/update/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "description": "Updated description",
  "actionsTaken": "Updated actions",
  "investigation": {
    "findings": "Investigation findings",
    "recommendations": ["Recommendation 1", "Recommendation 2"]
  }
}
```

#### Update Incident Status
```http
PUT /api/incident/status/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "resolved",
  "resolutionNotes": "Incident resolved with client recovery"
}
```

### Delete Incident

#### Delete Incident
```http
DELETE /api/incident/delete/:id
Authorization: Bearer <token>
```

### Severity Management

#### Get All Severity Levels
```http
GET /api/frontend/incident/get-all-severity/list
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "severity_id",
      "name": "Critical",
      "level": 1,
      "description": "Life-threatening or serious"
    },
    {
      "id": "severity_id",
      "name": "High",
      "level": 2,
      "description": "Significant impact"
    }
  ]
}
```

### Incident Reports & Analytics

#### Get Incident Count
```http
GET /api/incident/count/getIncidentCount
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 150,
    "byStatus": {
      "draft": 5,
      "submitted": 10,
      "under_investigation": 20,
      "resolved": 100,
      "closed": 15
    },
    "bySeverity": {
      "critical": 5,
      "high": 25,
      "medium": 80,
      "low": 40
    }
  }
}
```

#### Executive Summary
```http
GET /api/incident-report/executive-summary
Authorization: Bearer <token>
```

**Query Parameters:**
- `startDate`: Start date
- `endDate`: End date
- `clientId`: Filter by client

**Response:**
```json
{
  "success": true,
  "data": {
    "totalIncidents": 150,
    "criticalIncidents": 5,
    "trend": "decreasing",
    "topIncidentTypes": [
      {
        "type": "injury",
        "count": 60,
        "percentage": 40
      }
    ],
    "averageResolutionTime": "5.2 days"
  }
}
```

#### Severity Distribution
```http
GET /api/incident-report/severity-distribution
Authorization: Bearer <token>
```

#### Trending Incidents
```http
GET /api/incident-report/trending-incidents
Authorization: Bearer <token>
```

**Query Parameters:**
- `period`: Time period (week, month, quarter, year)

#### Top Incident Types
```http
GET /api/incident-report/top-incident-types
Authorization: Bearer <token>
```

#### Location Analysis
```http
GET /api/incident-report/location-analysis
Authorization: Bearer <token>
```

#### Performance Metrics
```http
GET /api/incident-report/performance-metrics
Authorization: Bearer <token>
```

#### Medical Outcomes
```http
GET /api/incident-report/medical-outcomes
Authorization: Bearer <token>
```

#### Carer Performance
```http
GET /api/incident-report/carer-performance
Authorization: Bearer <token>
```

#### Compliance Metrics
```http
GET /api/incident-report/compliance-metrics
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "reportingCompliance": 95.5,
    "averageReportingTime": "2.3 hours",
    "investigationCompliance": 90.0,
    "resolutionCompliance": 85.0
  }
}
```

### Incident Mapping

#### Get Incidents for Mapping
```http
GET /api/incident-report/incident-mapping/incidents
Authorization: Bearer <token>
```

**Query Parameters:**
- `startDate`: Start date
- `endDate`: End date
- `incidentType`: Filter by type

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "incident_id",
      "latitude": -37.8136,
      "longitude": 144.9631,
      "incidentType": "injury",
      "severity": "high",
      "date": "2024-01-15"
    }
  ]
}
```

#### Get Incident Heatmap
```http
GET /api/incident-report/incident-mapping/heatmap
Authorization: Bearer <token>
```

#### Get Incident Clusters
```http
GET /api/incident-report/incident-mapping/clusters
Authorization: Bearer <token>
```

#### Geographic Analysis
```http
GET /api/incident-report/incident-mapping/geographic-analysis
Authorization: Bearer <token>
```

#### Risk Zones
```http
GET /api/incident-report/incident-mapping/risk-zones
Authorization: Bearer <token>
```

### Export Incidents

#### Export Incidents
```http
GET /api/incident/incident/export
Authorization: Bearer <token>
```

**Query Parameters:**
- `startDate`: Start date
- `endDate`: End date
- `format`: Export format (csv, excel, pdf)

**Response:** File download

#### Export All Incidents
```http
GET /api/incident/incident/allexportIncident
Authorization: Bearer <token>
```

### Incident Appointments

#### Get Incident Appointments
```http
GET /api/incident/list/getIncidentAppt
Authorization: Bearer <token>
```

**Query Parameters:**
- `incidentId`: Filter by incident
- `appointmentId`: Filter by appointment

## Error Responses

### Incident Not Found
```json
{
  "success": false,
  "message": "Incident not found"
}
```

### Validation Error
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "date": "Date is required",
    "severity": "Severity is required"
  }
}
```

### Unauthorized Access
```json
{
  "success": false,
  "message": "Unauthorized to access this incident"
}
```

## Implementation Examples

### Create Incident with AI Analysis
```javascript
// Create incident with AI-powered photo analysis
const createIncidentWithAnalysis = async (incidentData, photoFile) => {
  // Analyze photo first
  const formData = new FormData();
  formData.append('image', photoFile);
  
  const analysisResponse = await axios.post(
    '/api/incident/analyze-injury-photo',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );
  
  // Use analysis data in incident creation
  const incidentResponse = await axios.post('/api/incident/create', {
    ...incidentData,
    analysis: analysisResponse.data.data.analysis
  });
  
  return incidentResponse.data;
};
```

### Get Incident with Related Data
```javascript
// Get incident with client and investigation details
const getIncidentDetails = async (incidentId) => {
  const response = await axios.get(`/api/incident/${incidentId}`);
  return response.data.data;
};
```

## Best Practices

1. **Reporting**
   - Report incidents immediately
   - Include all relevant details
   - Attach supporting documents/photos

2. **Investigation**
   - Document all findings
   - Include witness statements
   - Track investigation progress

3. **Compliance**
   - Meet reporting deadlines
   - Complete investigations promptly
   - Maintain proper documentation

4. **Privacy**
   - Protect sensitive information
   - Limit access to authorized personnel
   - Follow data protection regulations

5. **Analysis**
   - Use AI analysis as a tool, not replacement
   - Review AI suggestions carefully
   - Validate extracted data

