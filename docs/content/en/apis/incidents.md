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

### Base Paths

- `/api/incident`
- `/api/incident-report`
- `/api/incident/intake` (handled within `/api/incident`)

### Incidents (`/api/incident`)

**Note:** All incident endpoints require authentication. Replace `YOUR_JWT_TOKEN` with the actual token from the login flow.

#### GET /get-all-incident - Get all incidents

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/incident/get-all-incident?page=1&createdBy=641062840423e7c1cfec8117" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "incident_id",
      "incidentType": "injury",
      "severity": "moderate",
      "status": "open",
      "reportedBy": "user_id",
      "clientId": "client_id",
      "date": "2024-01-01",
      "time": "14:30",
      "location": "Client Location",
      "description": "Incident description",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 50,
  "page": 1,
  "limit": 10
}
```

#### GET /get-incident-filter - Get incidents with filters

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/incident/get-incident-filter?status=open&severity=high&startDate=2024-01-01&endDate=2024-01-31" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "incident_id",
      "status": "open",
      "severity": "high",
      "incidentType": "injury"
    }
  ],
  "total": 10
}
```

#### GET /\:id - Get incident details

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/incident/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "123",
    "incidentType": "injury",
    "severity": "moderate",
    "status": "open",
    "reportedBy": {
      "_id": "user_id",
      "firstName": "Reporter",
      "lastName": "Name"
    },
    "clientId": {
      "_id": "client_id",
      "firstName": "Client",
      "lastName": "Name"
    },
    "date": "2024-01-01",
    "time": "14:30",
    "location": "Client Location",
    "description": "Detailed incident description",
    "witnesses": [],
    "actionsTaken": [],
    "investigation": {},
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST /create - Create incident

**Request:**

```bash
curl -X POST "http://54.79.179.57:5000/api/incident/create" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "incidentType": "injury",
    "severity": "moderate",
    "clientId": "client_id",
    "date": "2024-01-01",
    "time": "14:30",
    "location": "Client Location",
    "description": "Incident description",
    "reportedBy": "user_id"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Incident created successfully",
  "data": {
    "_id": "new_incident_id",
    "incidentType": "injury",
    "status": "open",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST /intake - Intake incident (with file upload)

**Request:**

```bash
curl -X POST "http://54.79.179.57:5000/api/incident/intake" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@/path/to/file.pdf" \
  -F "data={\"incidentType\":\"injury\",\"description\":\"Incident description\"}"
```

**Response:**

```json
{
  "success": true,
  "message": "Incident intake processed successfully",
  "data": {
    "_id": "new_incident_id",
    "fileUrl": "/uploads/incidents/file.pdf",
    "status": "pending_review"
  }
}
```

#### POST /analyze-injury-photo - Analyze injury photo (with image upload)

**Request:**

```bash
curl -X POST "http://54.79.179.57:5000/api/incident/analyze-injury-photo" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "image=@/path/to/image.jpg"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "analysis": {
      "severity": "moderate",
      "injuryType": "bruise",
      "confidence": 0.85,
      "recommendations": ["Apply ice", "Monitor for 24 hours"]
    },
    "imageUrl": "/uploads/incidents/image.jpg"
  }
}
```

#### PUT /update/\:id - Update incident

**Request:**

```bash
curl -X PUT "http://54.79.179.57:5000/api/incident/update/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Updated description",
    "severity": "high",
    "status": "under_investigation"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Incident updated successfully",
  "data": {
    "_id": "123",
    "severity": "high",
    "status": "under_investigation",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

#### PUT /status/\:id - Update incident status

**Request:**

```bash
curl -X PUT "http://54.79.179.57:5000/api/incident/status/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "resolved",
    "resolutionNotes": "Incident resolved"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Incident status updated successfully",
  "data": {
    "_id": "123",
    "status": "resolved",
    "resolvedAt": "2024-01-02T00:00:00.000Z",
    "resolvedBy": "user_id"
  }
}
```

#### DELETE /delete/\:id - Delete incident

**Request:**

```bash
curl -X DELETE "http://54.79.179.57:5000/api/incident/delete/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "message": "Incident deleted successfully"
}
```

**Note:** Other incident endpoints follow similar patterns. GET endpoints return data arrays or objects, POST endpoints return created resources, PUT endpoints return updated resources, and DELETE endpoints return success messages.

### Incident Reports (`/api/incident-report`)

**Note:** All incident report endpoints require authentication. Replace `YOUR_JWT_TOKEN` with the actual token from the login flow. These endpoints support query parameters for filtering (e.g., `dateStart`, `dateEnd`, `location`, `incident_type`, `severity`, `reported_by`).

#### GET /filters - Get incident report filters

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/incident-report/filters" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "location": ["Location 1", "Location 2"],
    "incident_type": ["injury", "fall", "medication"],
    "reported_by": ["Reporter 1", "Reporter 2"],
    "severity": ["Low", "Moderate", "High"]
  }
}
```

#### GET /executive-summary - Get executive summary

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/incident-report/executive-summary?dateStart=2024-01-01&dateEnd=2024-01-31" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "summary": {
      "topIncidentType": "injury",
      "latestMonth": {
        "month": "January 2024",
        "count": 25,
        "trend": "up",
        "trendPercent": 15
      },
      "previousMonth": {
        "month": "December 2023",
        "count": 20,
        "trend": "neutral",
        "trendPercent": 0
      },
      "highSeverityCount": 5,
      "reportableCount": 10,
      "totalIncidents": 50,
      "data": {
        "range": {
          "start": "2024-01-01",
          "end": "2024-01-31"
        },
        "count": 50,
        "data": [
          {
            "date": "2024-01-01",
            "count": 2
          }
        ],
        "trend": "up",
        "trendPercent": 10
      }
    },
    "totalRecords": 50
  }
}
```

#### GET /severity-distribution - Get severity distribution

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/incident-report/severity-distribution?dateStart=2024-01-01&dateEnd=2024-01-31" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "severity": "High",
      "count": 10,
      "percentage": 20
    },
    {
      "severity": "Moderate",
      "count": 25,
      "percentage": 50
    },
    {
      "severity": "Low",
      "count": 15,
      "percentage": 30
    }
  ]
}
```

#### GET /trending-incidents - Get trending incidents

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/incident-report/trending-incidents?dateStart=2024-01-01&dateEnd=2024-01-31" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "range": {
      "start": "2024-01-01",
      "end": "2024-01-31"
    },
    "count": 50,
    "data": [
      {
        "date": "2024-01-01",
        "count": 2
      },
      {
        "date": "2024-01-02",
        "count": 3
      }
    ],
    "trend": "up",
    "trendPercent": 15
  }
}
```

#### GET /top-incident-types - Get top incident types

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/incident-report/top-incident-types?dateStart=2024-01-01&dateEnd=2024-01-31&limit=5" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "incident_type": "injury",
      "count": 20,
      "percentage": 40
    },
    {
      "incident_type": "fall",
      "count": 15,
      "percentage": 30
    },
    {
      "incident_type": "medication",
      "count": 10,
      "percentage": 20
    }
  ]
}
```

#### GET /location-analysis - Get location analysis

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/incident-report/location-analysis?dateStart=2024-01-01&dateEnd=2024-01-31" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "location": "Location 1",
      "count": 25,
      "percentage": 50
    },
    {
      "location": "Location 2",
      "count": 15,
      "percentage": 30
    },
    {
      "location": "Location 3",
      "count": 10,
      "percentage": 20
    }
  ]
}
```

#### GET /performance-metrics - Get performance metrics

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/incident-report/performance-metrics?dateStart=2024-01-01&dateEnd=2024-01-31" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "averageResolutionTime": 5.2,
    "averageReportingTime": 2.1,
    "totalIncidents": 50,
    "resolvedIncidents": 45,
    "resolutionRate": 90
  }
}
```

#### GET /medical-outcomes - Get medical outcomes

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/incident-report/medical-outcomes?dateStart=2024-01-01&dateEnd=2024-01-31" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "outcome": "Full Recovery",
      "count": 30,
      "percentage": 60
    },
    {
      "outcome": "Ongoing Treatment",
      "count": 15,
      "percentage": 30
    },
    {
      "outcome": "Hospitalization",
      "count": 5,
      "percentage": 10
    }
  ]
}
```

#### GET /compliance-metrics - Get compliance metrics

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/incident-report/compliance-metrics?dateStart=2024-01-01&dateEnd=2024-01-31" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "totalReportable": 10,
    "reportedOnTime": 8,
    "reportedLate": 2,
    "complianceRate": 80,
    "averageReportingDelay": 1.5
  }
}
```

#### GET /compliance-trends - Get compliance trends

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/incident-report/compliance-trends?dateStart=2024-01-01&dateEnd=2024-01-31" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "range": {
      "start": "2024-01-01",
      "end": "2024-01-31"
    },
    "data": [
      {
        "date": "2024-01-01",
        "complianceRate": 85
      },
      {
        "date": "2024-01-02",
        "complianceRate": 90
      }
    ],
    "trend": "up",
    "trendPercent": 5
  }
}
```

**Note:** Other incident report endpoints follow similar patterns. All endpoints support filtering via query parameters (`dateStart`, `dateEnd`, `location`, `incident_type`, `severity`, `reported_by`). Responses typically include aggregated data, counts, percentages, and trend information.

---
