---
title: Client Management APIs
description: Client management APIs for NDIS client operations
navigation:
  icon: i-lucide-users
seo:
  title: Hubshift Client Management APIs
  description: Complete guide to client management APIs including CRUD operations, relationships, and client data access
---

# Client Management APIs

Client management APIs handle all operations related to NDIS clients, including profile management, client details, relationships, and client-specific data access.

## Base URLs

- **Web APIs**: `/api/clientDetails`, `/api/user`
- **Mobile APIs**: `/api/frontend/clientDetails`

## Key Concepts

### Client Profile Structure

- Personal information
- NDIS plan details
- Medical history
- Emergency contacts
- Support needs
- Goals and objectives
- Documents and files

## Endpoints

### Get Client List

#### Get All Clients

```bash
curl -X GET "http://54.79.179.57:5000/api/user/client/list?page=1&limit=10&search=jane" \
  -H "Authorization: Bearer $TOKEN"
```

**Query Parameters:**

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `search`: Search term
- `status`: Filter by status
- `ndisNumber`: Filter by NDIS number

**Response:**

```json
{
  "success": true,
  "data": {
    "clients": [
      {
        "id": "client_id",
        "firstName": "Jane",
        "lastName": "Smith",
        "email": "jane@example.com",
        "ndisNumber": "NDIS123456",
        "status": "active",
        "planManager": "plan_manager_id",
        "supportCoordinator": "sc_id"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 10,
      "totalItems": 100,
      "itemsPerPage": 10
    }
  }
}
```

#### Get Client by NDIS

```bash
curl -X POST http://54.79.179.57:5000/api/user/clientByNdis/list \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "ndisNumber": "NDIS123456",
    "filters": {}
  }'
```

### Get Client Details

#### Get Client by ID

```bash
curl -X GET http://54.79.179.57:5000/api/user/clientDetails/CLIENT_ID \
  -H "Authorization: Bearer $TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "client_id",
    "personalInfo": {
      "firstName": "Jane",
      "lastName": "Smith",
      "dateOfBirth": "1990-01-01",
      "gender": "female",
      "phone": "+61400000000",
      "email": "jane@example.com"
    },
    "address": {
      "street": "123 Main St",
      "suburb": "Melbourne",
      "state": "VIC",
      "postcode": "3000"
    },
    "ndisDetails": {
      "ndisNumber": "NDIS123456",
      "planStartDate": "2024-01-01",
      "planEndDate": "2024-12-31",
      "planManager": {
        "id": "pm_id",
        "name": "Plan Manager Name"
      }
    },
    "medicalInfo": {
      "allergies": ["Peanuts"],
      "conditions": ["Autism"],
      "medications": []
    },
    "emergencyContacts": [
      {
        "name": "John Smith",
        "relationship": "Parent",
        "phone": "+61400000001"
      }
    ],
    "goals": [],
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### Get Client Details (Mobile)

```bash
curl -X GET http://54.79.179.57:5000/api/frontend/clientDetails/client/details/CLIENT_ID \
  -H "Authorization: Bearer $TOKEN"
```

### Create Client

#### Add New Client

```bash
curl -X POST http://54.79.179.57:5000/api/clientDetails/create \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "personalInfo": {
      "firstName": "Jane",
      "lastName": "Smith",
      "dateOfBirth": "1990-01-01",
      "gender": "female",
      "phone": "+61400000000",
      "email": "jane@example.com"
    },
    "address": {
      "street": "123 Main St",
      "suburb": "Melbourne",
      "state": "VIC",
      "postcode": "3000"
    },
    "ndisDetails": {
      "ndisNumber": "NDIS123456",
      "planStartDate": "2024-01-01",
      "planEndDate": "2024-12-31"
    }
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Client created successfully",
  "data": {
    "id": "new_client_id",
    "firstName": "Jane",
    "lastName": "Smith"
  }
}
```

### Update Client

#### Update Client Profile

```bash
curl -X PUT http://54.79.179.57:5000/api/user/clientUpdate/CLIENT_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "personalInfo": {
      "phone": "+61400000001"
    },
    "address": {
      "street": "456 New St"
    }
  }'
```

#### Update Client Profile (Mobile)

```bash
curl -X PUT http://54.79.179.57:5000/api/frontend/clientDetails/client/update/CLIENT_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "personalInfo": {
      "phone": "+61400000001"
    }
  }'
```

### Client Relationships

#### Get Clients by Health Carer

```bash
curl -X GET http://54.79.179.57:5000/api/appointment/getClientList/healthCarerId/HEALTH_CARER_ID \
  -H "Authorization: Bearer $TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "client_id",
      "firstName": "Jane",
      "lastName": "Smith",
      "appointmentCount": 5
    }
  ]
}
```

#### Get Clients by Support Coordinator

```bash
curl -X GET http://54.79.179.57:5000/api/user/stakeholder/clientList \
  -H "Authorization: Bearer $TOKEN"
```

### Client Documents

#### Get Client Documents

```bash
curl -X GET http://54.79.179.57:5000/api/document/client/CLIENT_ID \
  -H "Authorization: Bearer $TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "doc_id",
      "name": "NDIS Plan.pdf",
      "type": "pdf",
      "url": "https://s3.amazonaws.com/...",
      "uploadedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### Upload Client Document

```bash
curl -X POST http://54.79.179.57:5000/api/document/upload \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@/path/to/document.pdf" \
  -F "clientId=CLIENT_ID" \
  -F "documentType=ndis_plan"
```

### Client Goals

#### Get Client Goals

```bash
curl -X GET http://54.79.179.57:5000/api/goal/client/CLIENT_ID \
  -H "Authorization: Bearer $TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "goal_id",
      "title": "Improve communication skills",
      "description": "Work on verbal communication",
      "status": "in_progress",
      "targetDate": "2024-12-31",
      "tasks": []
    }
  ]
}
```

#### Create Client Goal

```bash
curl -X POST http://54.79.179.57:5000/api/goal/create \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": "CLIENT_ID",
    "title": "Improve communication skills",
    "description": "Work on verbal communication",
    "targetDate": "2024-12-31"
  }'
```

### Client Medications

#### Get Client Medications

```bash
curl -X GET http://54.79.179.57:5000/api/medication/client/CLIENT_ID \
  -H "Authorization: Bearer $TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "medications": [
      {
        "medicineName": "Medication A",
        "dose": "10mg",
        "frequency": "Daily",
        "startDate": "2024-01-01",
        "reviewDate": "2024-06-01"
      }
    ],
    "allergies": ["Peanuts"],
    "medicalHistory": "Previous conditions..."
  }
}
```

### Client Appointments

#### Get Client Appointments

```bash
curl -X GET "http://54.79.179.57:5000/api/appointment/appointmentListsClient/CLIENT_ID?status=scheduled&startDate=2024-01-01&endDate=2024-12-31" \
  -H "Authorization: Bearer $TOKEN"
```

**Query Parameters:**

- `status`: Filter by status
- `startDate`: Start date filter
- `endDate`: End date filter

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "appointment_id",
      "date": "2024-01-15",
      "startTime": "09:00",
      "endTime": "17:00",
      "healthCarer": {
        "id": "hc_id",
        "name": "John Doe"
      },
      "status": "scheduled",
      "serviceType": "Support Work"
    }
  ]
}
```

### Client Search

#### Search Clients

```bash
curl -X GET "http://54.79.179.57:5000/api/user/client/list?search=jane&status=active&page=1&limit=10" \
  -H "Authorization: Bearer $TOKEN"
```

**Query Parameters:**

- `search`: Search term (name, email, NDIS number)
- `status`: Filter by status
- `page`: Page number
- `limit`: Items per page

### Client Status Management

#### Update Client Status

```bash
curl -X PUT http://54.79.179.57:5000/api/user/updateUserStatus/CLIENT_ID/active \
  -H "Authorization: Bearer $TOKEN"
```

**Path Parameters:**

- `CLIENT_ID`: Client ID
- `status`: New status (active, inactive, terminated)

**Response:**

```json
{
  "success": true,
  "message": "Client status updated successfully"
}
```

### Client Export

#### Export Client List

```bash
curl -X GET http://54.79.179.57:5000/api/user/client/list/export \
  -H "Authorization: Bearer $TOKEN" \
  -o clients_export.csv
```

**Response:** CSV or Excel file download

## Error Responses

### Client Not Found

```json
{
  "success": false,
  "message": "Client not found"
}
```

### Validation Error

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": "Invalid email format",
    "ndisNumber": "NDIS number is required"
  }
}
```

### Unauthorized Access

```json
{
  "success": false,
  "message": "Unauthorized to access this client"
}
```

## Best Practices

1. **Data Privacy**

   - Always verify user has access to client data
   - Use role-based access control
   - Log all client data access

2. **Validation**

   - Validate all input data
   - Check NDIS number format
   - Verify email and phone formats

3. **Performance**

   - Use pagination for client lists
   - Implement caching for frequently accessed clients
   - Optimize database queries with proper indexes

4. **Error Handling**
   - Provide clear error messages
   - Handle missing data gracefully
   - Log errors for debugging
