# Client Management APIs

## Overview

Client management APIs handle all operations related to NDIS clients, including profile management, client details, relationships, and client-specific data access.

## Base URLs

- **Web APIs**: `/api/clientDetails`
- **User APIs**: `/api/user` (for client-related user operations)

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
```http
GET /api/user/client/list
Authorization: Bearer <token>
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
```http
POST /api/user/clientByNdis/list
Authorization: Bearer <token>
Content-Type: application/json

{
  "ndisNumber": "NDIS123456",
  "filters": {}
}
```

### Get Client Details

#### Get Client by ID
```http
GET /api/user/clientDetails/:id
Authorization: Bearer <token>
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
```http
GET /api/frontend/clientDetails/client/details/:id
Authorization: Bearer <token>
```

### Create Client

#### Add New Client
```http
POST /api/clientDetails/create
Authorization: Bearer <token>
Content-Type: application/json

{
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
}
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
```http
PUT /api/user/clientUpdate/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "personalInfo": {
    "phone": "+61400000001"
  },
  "address": {
    "street": "456 New St"
  }
}
```

#### Update Client Profile (Mobile)
```http
PUT /api/frontend/clientDetails/client/update/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "personalInfo": {
    "phone": "+61400000001"
  }
}
```

### Client Relationships

#### Get Clients by Health Carer
```http
GET /api/appointment/getClientList/healthCarerId/:id
Authorization: Bearer <token>
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
```http
GET /api/user/stakeholder/clientList
Authorization: Bearer <token>
```

#### Get Health Carers for Client
```http
GET /api/appointment/healthCarerAsPerClientAppointment/list
Authorization: Bearer <token>
```

### Client Documents

#### Get Client Documents
```http
GET /api/document/client/:id
Authorization: Bearer <token>
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
```http
POST /api/document/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <file>
clientId: client_id
documentType: ndis_plan
```

### Client Goals

#### Get Client Goals
```http
GET /api/goal/client/:id
Authorization: Bearer <token>
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
```http
POST /api/goal/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "clientId": "client_id",
  "title": "Improve communication skills",
  "description": "Work on verbal communication",
  "targetDate": "2024-12-31"
}
```

### Client Medications

#### Get Client Medications
```http
GET /api/medication/client/:id
Authorization: Bearer <token>
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

### Client Observations

#### Get Client Observations
```http
GET /api/observation/client/:id
Authorization: Bearer <token>
```

**Query Parameters:**
- `type`: Observation type (weight, bloodPressure, etc.)
- `startDate`: Start date filter
- `endDate`: End date filter

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "obs_id",
      "type": "weight",
      "value": "70kg",
      "recordedAt": "2024-01-01T10:00:00Z",
      "recordedBy": "health_carer_id"
    }
  ]
}
```

### Client Appointments

#### Get Client Appointments
```http
GET /api/appointment/appointmentListsClient/:id
Authorization: Bearer <token>
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

### Client Invoices

#### Get Client Invoices
```http
GET /api/invoice/client/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "invoice_id",
      "invoiceNumber": "INV-2024-001",
      "amount": 1500.00,
      "status": "paid",
      "dueDate": "2024-02-01",
      "issuedDate": "2024-01-15"
    }
  ]
}
```

### Client Search

#### Search Clients
```http
GET /api/user/client/list?search=jane
Authorization: Bearer <token>
```

**Query Parameters:**
- `search`: Search term (name, email, NDIS number)
- `status`: Filter by status
- `page`: Page number
- `limit`: Items per page

### Client Status Management

#### Update Client Status
```http
PUT /api/user/updateUserStatus/:id/:status
Authorization: Bearer <token>
```

**Path Parameters:**
- `id`: Client ID
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
```http
GET /api/user/client/list/export
Authorization: Bearer <token>
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

## Implementation Examples

### Get Client with Related Data
```javascript
// Get client details with appointments and goals
const getClientDetails = async (clientId) => {
  const [client, appointments, goals] = await Promise.all([
    axios.get(`/api/user/clientDetails/${clientId}`),
    axios.get(`/api/appointment/appointmentListsClient/${clientId}`),
    axios.get(`/api/goal/client/${clientId}`)
  ]);
  
  return {
    client: client.data.data,
    appointments: appointments.data.data,
    goals: goals.data.data
  };
};
```

### Create Client with Documents
```javascript
// Create client and upload document
const createClientWithDocument = async (clientData, documentFile) => {
  // Create client
  const clientResponse = await axios.post('/api/clientDetails/create', clientData);
  const clientId = clientResponse.data.data.id;
  
  // Upload document
  const formData = new FormData();
  formData.append('file', documentFile);
  formData.append('clientId', clientId);
  formData.append('documentType', 'ndis_plan');
  
  await axios.post('/api/document/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  
  return clientResponse.data;
};
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

