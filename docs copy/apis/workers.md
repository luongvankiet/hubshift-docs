# Worker Management APIs

## Overview

Worker management APIs handle operations for health carers, support coordinators, and other staff members. This includes profile management, availability, qualifications, and worker-specific operations.

## Base URLs

- **Web APIs**: `/api/user`, `/api/healthCarer`
- **Mobile APIs**: `/api/frontend/user`

## Worker Types

- **Health Carer**: Direct support workers
- **Support Coordinator**: Client coordination staff
- **Supervisor**: Team supervisors
- **General Manager**: Management staff
- **Service Provider**: Service provider organizations

## Endpoints

### Get Worker Lists

#### Get All Health Carers
```http
GET /api/user/healthCarer/list
Authorization: Bearer <token>
```

**Query Parameters:**
- `page`: Page number
- `limit`: Items per page
- `search`: Search term
- `status`: Filter by status (active, inactive)
- `qualification`: Filter by qualification
- `location`: Filter by location

**Response:**
```json
{
  "success": true,
  "data": {
    "healthCarers": [
      {
        "id": "hc_id",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "phone": "+61400000000",
        "status": "active",
        "qualifications": ["Certificate III"],
        "availability": "available"
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

#### Get Health Carers by Criteria
```http
POST /api/user/healthCarer/getHCListBy_Jid_Jtl_Jl
Authorization: Bearer <token>
Content-Type: application/json

{
  "jobTitle": "job_title_id",
  "jobType": "job_type_id",
  "level": "level_id"
}
```

#### Get Support Coordinators
```http
GET /api/user/supportCoordinator/list
Authorization: Bearer <token>
```

#### Get Support Coordinators by Criteria
```http
POST /api/user/supportCoordinator/supportCoordinatorByEx_Jt_Jt_Jl_List
Authorization: Bearer <token>
Content-Type: application/json

{
  "experience": "years",
  "jobTitle": "job_title_id",
  "jobType": "job_type_id",
  "level": "level_id"
}
```

#### Get All Workers by Type
```http
GET /api/user/getAllUserByType?userType=healthCarer
Authorization: Bearer <token>
```

### Get Worker Details

#### Get Health Carer Details
```http
GET /api/user/healthCarerDetails/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "hc_id",
    "personalInfo": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "+61400000000",
      "dateOfBirth": "1990-01-01"
    },
    "professionalInfo": {
      "employeeId": "EMP001",
      "jobTitle": "Support Worker",
      "qualifications": ["Certificate III in Disability"],
      "experience": "5 years",
      "level": "Level 2"
    },
    "availability": {
      "status": "available",
      "preferredHours": "full-time",
      "preferredLocations": ["Melbourne", "Geelong"]
    },
    "bankDetails": {
      "accountName": "John Doe",
      "bsb": "123456",
      "accountNumber": "12345678"
    },
    "taxDetails": {
      "tfn": "123456789",
      "abn": "12345678901"
    },
    "documents": [],
    "isActive": true
  }
}
```

#### Get Health Carer Details (Mobile)
```http
GET /api/frontend/user/healthCarerDetails/:id
Authorization: Bearer <token>
```

#### Get Support Coordinator Details
```http
GET /api/user/supportCoordinatorDetails/:id
Authorization: Bearer <token>
```

### Create Worker

#### Add Health Carer
```http
POST /api/user/addUserByAdmin
Authorization: Bearer <token>
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe",
  "userType": "healthCarer",
  "phone": "+61400000000",
  "employeeId": "EMP001",
  "jobTitle": "job_title_id",
  "qualifications": ["qualification_id"]
}
```

#### Add Support Coordinator
```http
POST /api/user/addUserByAdmin
Authorization: Bearer <token>
Content-Type: application/json

{
  "email": "sc@example.com",
  "password": "SecurePassword123!",
  "firstName": "Jane",
  "lastName": "Coordinator",
  "userType": "supportCoordinator",
  "phone": "+61400000001"
}
```

### Update Worker

#### Update Health Carer Profile
```http
PUT /api/user/update-health-carer/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "personalInfo": {
    "phone": "+61400000002"
  },
  "professionalInfo": {
    "qualifications": ["qualification_id_1", "qualification_id_2"]
  }
}
```

#### Update Health Carer (Mobile)
```http
PUT /api/frontend/user/update-health-carer/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "personalInfo": {
    "phone": "+61400000002"
  }
}
```

#### Update Support Coordinator
```http
PUT /api/user/scUpdate/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "personalInfo": {
    "phone": "+61400000003"
  }
}
```

#### Update Support Coordinator (Mobile)
```http
PUT /api/frontend/user/update-support-coordinator/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "personalInfo": {
    "phone": "+61400000003"
  }
}
```

### Worker Availability

#### Get Health Carer Availability
```http
GET /api/appointment/health-carer/get-all-health-carer-availability-list
Authorization: Bearer <token>
```

**Query Parameters:**
- `date`: Date to check availability
- `startTime`: Start time
- `endTime`: End time
- `location`: Location filter

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "healthCarerId": "hc_id",
      "name": "John Doe",
      "available": true,
      "existingAppointments": [],
      "availability": {
        "startTime": "09:00",
        "endTime": "17:00"
      }
    }
  ]
}
```

#### Set Worker Availability
```http
POST /api/setAvailability/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "hc_id",
  "dayOfWeek": "monday",
  "startTime": "09:00",
  "endTime": "17:00",
  "isAvailable": true
}
```

#### Get Worker Availability (Mobile)
```http
GET /api/frontend/availability/getListByHcId/:id
Authorization: Bearer <token>
```

### Worker Qualifications

#### Get Worker Qualifications
```http
GET /api/qualification/user/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "qual_id",
      "name": "Certificate III in Disability",
      "issueDate": "2020-01-01",
      "expiryDate": "2025-01-01",
      "documentUrl": "https://s3.amazonaws.com/..."
    }
  ]
}
```

#### Add Qualification
```http
POST /api/qualification/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "hc_id",
  "qualificationId": "qual_type_id",
  "issueDate": "2020-01-01",
  "expiryDate": "2025-01-01",
  "documentId": "document_id"
}
```

### Worker Bank Details

#### Get Bank Details
```http
GET /api/user/userBankDetails/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accountName": "John Doe",
    "bsb": "123456",
    "accountNumber": "12345678",
    "bankName": "Commonwealth Bank"
  }
}
```

#### Add/Update Bank Details
```http
PUT /api/user/addUserBankDetails/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "accountName": "John Doe",
  "bsb": "123456",
  "accountNumber": "12345678",
  "bankName": "Commonwealth Bank"
}
```

#### Delete Bank Details
```http
DELETE /api/user/deleteUserBankDetails/:id
Authorization: Bearer <token>
```

### Worker Tax Details

#### Get Tax Details
```http
GET /api/frontend/user/get/tax-details/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "tfn": "123456789",
    "abn": "12345678901",
    "taxFileNumber": "123456789",
    "hasAbn": true
  }
}
```

#### Update Tax Details
```http
PUT /api/frontend/user/tax-details/update/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "tfn": "123456789",
  "abn": "12345678901"
}
```

### Worker Documents

#### Get Worker Documents
```http
GET /api/user/getListDocumentsOfUser/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "doc_id",
      "name": "Police Check.pdf",
      "type": "police_check",
      "url": "https://s3.amazonaws.com/...",
      "expiryDate": "2025-01-01",
      "uploadedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### Upload Worker Document
```http
POST /api/document/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <file>
userId: hc_id
documentType: police_check
expiryDate: 2025-01-01
```

### Worker Performance

#### Get Worker Appointments
```http
GET /api/appointment/HcarerListAppointments/:id
Authorization: Bearer <token>
```

#### Get Worker Timesheets
```http
GET /api/appointment/healthCarerTimesheet/:id
Authorization: Bearer <token>
```

**Query Parameters:**
- `startDate`: Start date
- `endDate`: End date
- `status`: Filter by status

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "timesheet_id",
      "date": "2024-01-15",
      "appointment": {
        "id": "appointment_id",
        "client": {
          "name": "Jane Smith"
        }
      },
      "hours": 8,
      "status": "approved",
      "expenses": []
    }
  ]
}
```

### Worker Status Management

#### Update Worker Status
```http
PUT /api/user/updateUserStatus/:id/:status
Authorization: Bearer <token>
```

**Path Parameters:**
- `id`: Worker ID
- `status`: New status (active, inactive, terminated)

#### Terminate Worker
```http
PUT /api/user/terminateUserAndInactive/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "terminationDate": "2024-12-31",
  "reason": "Resignation"
}
```

### Worker Search

#### Search Workers
```http
GET /api/user/healthCarer/list?search=john
Authorization: Bearer <token>
```

**Query Parameters:**
- `search`: Search term (name, email, employee ID)
- `qualification`: Filter by qualification
- `location`: Filter by location
- `availability`: Filter by availability status

### Worker Export

#### Export Worker List
```http
GET /api/user/healthCarer/list/export
Authorization: Bearer <token>
```

**Response:** CSV or Excel file download

### Worker Emergency Contacts

#### Get Emergency Contacts
```http
GET /api/user/getEmergencyContact/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "contact_id",
      "name": "Jane Doe",
      "relationship": "Spouse",
      "phone": "+61400000001",
      "email": "jane@example.com"
    }
  ]
}
```

#### Add Emergency Contact
```http
PUT /api/user/addEmergencyContact/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "relationship": "Spouse",
  "phone": "+61400000001",
  "email": "jane@example.com"
}
```

## Error Responses

### Worker Not Found
```json
{
  "success": false,
  "message": "Worker not found"
}
```

### Validation Error
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": "Email already exists",
    "employeeId": "Employee ID is required"
  }
}
```

### Unauthorized Access
```json
{
  "success": false,
  "message": "Unauthorized to access this worker"
}
```

## Implementation Examples

### Get Worker with Related Data
```javascript
// Get worker details with appointments and availability
const getWorkerDetails = async (workerId) => {
  const [worker, appointments, availability] = await Promise.all([
    axios.get(`/api/user/healthCarerDetails/${workerId}`),
    axios.get(`/api/appointment/HcarerListAppointments/${workerId}`),
    axios.get(`/api/frontend/availability/getListByHcId/${workerId}`)
  ]);
  
  return {
    worker: worker.data.data,
    appointments: appointments.data.data,
    availability: availability.data.data
  };
};
```

### Update Worker Profile
```javascript
// Update worker profile with multiple fields
const updateWorkerProfile = async (workerId, updates) => {
  const response = await axios.put(
    `/api/user/update-health-carer/${workerId}`,
    {
      personalInfo: updates.personalInfo,
      professionalInfo: updates.professionalInfo,
      availability: updates.availability
    }
  );
  
  return response.data;
};
```

## Best Practices

1. **Data Privacy**
   - Protect sensitive information (TFN, bank details)
   - Use role-based access control
   - Encrypt sensitive data at rest

2. **Validation**
   - Validate all input data
   - Check qualification expiry dates
   - Verify bank account details

3. **Document Management**
   - Track document expiry dates
   - Send reminders for expiring documents
   - Maintain document version history

4. **Availability Management**
   - Handle timezone conversions
   - Check for conflicts before setting availability
   - Provide availability calendar view

