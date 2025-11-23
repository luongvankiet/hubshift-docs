---
title: Incident Management APIs
description: Incident reporting and management APIs with AI-powered analysis
navigation:
  icon: i-lucide-alert-triangle
seo:
  title: Hubshift Incident Management APIs
  description: Complete guide to incident management APIs including reporting, AI-powered intake, investigation, and analytics
---

# Incident Management APIs

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

```bash
curl -X POST http://54.79.179.57:5000/api/incident/create \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
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
  }'
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

```bash
curl -X POST http://54.79.179.57:5000/api/frontend/incident/create \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": "client_id",
    "incidentType": "injury",
    "severity": "high",
    "date": "2024-01-15",
    "time": "14:30",
    "description": "Incident description"
  }'
```

### AI-Powered Incident Intake

#### Incident Intake with File Upload

```bash
curl -X POST http://54.79.179.57:5000/api/incident/intake \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@/path/to/incident_report.pdf" \
  -F "clientId=client_id"
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

```bash
curl -X POST http://54.79.179.57:5000/api/incident/store \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": "client_id",
    "extractedData": {
      "incidentType": "injury",
      "severity": "high",
      "date": "2024-01-15",
      "description": "Incident description"
    }
  }'
```

#### Analyze Injury Photo

```bash
curl -X POST http://54.79.179.57:5000/api/incident/analyze-injury-photo \
  -H "Authorization: Bearer $TOKEN" \
  -F "image=@/path/to/injury_photo.jpg"
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

```bash
curl -X GET "http://54.79.179.57:5000/api/incident/get-all-incident?page=1&limit=10&status=under_investigation&severity=high&startDate=2024-01-01&endDate=2024-12-31" \
  -H "Authorization: Bearer $TOKEN"
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

#### Get Incidents for User

```bash
curl -X GET http://54.79.179.57:5000/api/incident/get-all-incident-user \
  -H "Authorization: Bearer $TOKEN"
```

#### Get Incidents for Supervisor

```bash
curl -X GET http://54.79.179.57:5000/api/incident/get-all-incident-supervisor \
  -H "Authorization: Bearer $TOKEN"
```

#### Get Incidents (Mobile)

```bash
curl -X GET http://54.79.179.57:5000/api/frontend/incident/get-all-incident-user \
  -H "Authorization: Bearer $TOKEN"
```

### Get Incident Details

#### Get Incident Details

```bash
curl -X GET http://54.79.179.57:5000/api/incident/INCIDENT_ID \
  -H "Authorization: Bearer $TOKEN"
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

```bash
curl -X GET http://54.79.179.57:5000/api/incident/pdf/INCIDENT_ID \
  -H "Authorization: Bearer $TOKEN" \
  -o incident_report.pdf
```

**Response:** PDF file download

### Update Incident

#### Update Incident

```bash
curl -X PUT http://54.79.179.57:5000/api/incident/update/INCIDENT_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Updated description",
    "actionsTaken": "Updated actions",
    "investigation": {
      "findings": "Investigation findings",
      "recommendations": ["Recommendation 1", "Recommendation 2"]
    }
  }'
```

#### Update Incident Status

```bash
curl -X PUT http://54.79.179.57:5000/api/incident/status/INCIDENT_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "resolved",
    "resolutionNotes": "Incident resolved with client recovery"
  }'
```

### Delete Incident

#### Delete Incident

```bash
curl -X DELETE http://54.79.179.57:5000/api/incident/delete/INCIDENT_ID \
  -H "Authorization: Bearer $TOKEN"
```

### Severity Management

#### Get All Severity Levels

```bash
curl -X GET http://54.79.179.57:5000/api/frontend/incident/get-all-severity/list \
  -H "Authorization: Bearer $TOKEN"
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

```bash
curl -X GET http://54.79.179.57:5000/api/incident/count/getIncidentCount \
  -H "Authorization: Bearer $TOKEN"
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

```bash
curl -X GET "http://54.79.179.57:5000/api/incident-report/executive-summary?startDate=2024-01-01&endDate=2024-12-31&clientId=client_id" \
  -H "Authorization: Bearer $TOKEN"
```

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

```bash
curl -X GET http://54.79.179.57:5000/api/incident-report/severity-distribution \
  -H "Authorization: Bearer $TOKEN"
```

#### Trending Incidents

```bash
curl -X GET "http://54.79.179.57:5000/api/incident-report/trending-incidents?period=month" \
  -H "Authorization: Bearer $TOKEN"
```

**Query Parameters:**

- `period`: Time period (week, month, quarter, year)

#### Top Incident Types

```bash
curl -X GET http://54.79.179.57:5000/api/incident-report/top-incident-types \
  -H "Authorization: Bearer $TOKEN"
```

#### Location Analysis

```bash
curl -X GET http://54.79.179.57:5000/api/incident-report/location-analysis \
  -H "Authorization: Bearer $TOKEN"
```

#### Compliance Metrics

```bash
curl -X GET http://54.79.179.57:5000/api/incident-report/compliance-metrics \
  -H "Authorization: Bearer $TOKEN"
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

```bash
curl -X GET "http://54.79.179.57:5000/api/incident-report/incident-mapping/incidents?startDate=2024-01-01&endDate=2024-12-31&incidentType=injury" \
  -H "Authorization: Bearer $TOKEN"
```

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

```bash
curl -X GET http://54.79.179.57:5000/api/incident-report/incident-mapping/heatmap \
  -H "Authorization: Bearer $TOKEN"
```

### Export Incidents

#### Export Incidents

```bash
curl -X GET "http://54.79.179.57:5000/api/incident/incident/export?startDate=2024-01-01&endDate=2024-12-31&format=csv" \
  -H "Authorization: Bearer $TOKEN" \
  -o incidents_export.csv
```

**Query Parameters:**

- `startDate`: Start date
- `endDate`: End date
- `format`: Export format (csv, excel, pdf)

**Response:** File download

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
