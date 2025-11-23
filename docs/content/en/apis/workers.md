---
title: Worker Management APIs
description: Worker management APIs for health carers and support coordinators
navigation:
  icon: i-lucide-user-cog
seo:
  title: Hubshift Worker Management APIs
  description: Complete guide to worker management APIs including profiles, availability, qualifications, and worker operations
---

# Worker Management APIs

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

```bash
curl -X GET "http://54.79.179.57:5000/api/user/healthCarer/list?page=1&limit=10&search=john&status=active" \
  -H "Authorization: Bearer $TOKEN"
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

```bash
curl -X POST http://54.79.179.57:5000/api/user/healthCarer/getHCListBy_Jid_Jtl_Jl \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "jobTitle": "job_title_id",
    "jobType": "job_type_id",
    "level": "level_id"
  }'
```

#### Get Support Coordinators

```bash
curl -X GET http://54.79.179.57:5000/api/user/supportCoordinator/list \
  -H "Authorization: Bearer $TOKEN"
```

### Get Worker Details

#### Get Health Carer Details

```bash
curl -X GET http://54.79.179.57:5000/api/user/healthCarerDetails/WORKER_ID \
  -H "Authorization: Bearer $TOKEN"
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

```bash
curl -X GET http://54.79.179.57:5000/api/frontend/user/healthCarerDetails/WORKER_ID \
  -H "Authorization: Bearer $TOKEN"
```

### Create Worker

#### Add Health Carer

```bash
curl -X POST http://54.79.179.57:5000/api/user/addUserByAdmin \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePassword123!",
    "firstName": "John",
    "lastName": "Doe",
    "userType": "healthCarer",
    "phone": "+61400000000",
    "employeeId": "EMP001",
    "jobTitle": "job_title_id",
    "qualifications": ["qualification_id"]
  }'
```

### Update Worker

#### Update Health Carer Profile

```bash
curl -X PUT http://54.79.179.57:5000/api/user/update-health-carer/WORKER_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "personalInfo": {
      "phone": "+61400000002"
    },
    "professionalInfo": {
      "qualifications": ["qualification_id_1", "qualification_id_2"]
    }
  }'
```

#### Update Health Carer (Mobile)

```bash
curl -X PUT http://54.79.179.57:5000/api/frontend/user/update-health-carer/WORKER_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "personalInfo": {
      "phone": "+61400000002"
    }
  }'
```

### Worker Availability

#### Get Health Carer Availability

```bash
curl -X GET "http://54.79.179.57:5000/api/appointment/health-carer/get-all-health-carer-availability-list?date=2024-01-15&startTime=09:00&endTime=17:00" \
  -H "Authorization: Bearer $TOKEN"
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

```bash
curl -X POST http://54.79.179.57:5000/api/setAvailability/create \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "hc_id",
    "dayOfWeek": "monday",
    "startTime": "09:00",
    "endTime": "17:00",
    "isAvailable": true
  }'
```

#### Get Worker Availability (Mobile)

```bash
curl -X GET http://54.79.179.57:5000/api/frontend/availability/getListByHcId/WORKER_ID \
  -H "Authorization: Bearer $TOKEN"
```

### Worker Qualifications

#### Get Worker Qualifications

```bash
curl -X GET http://54.79.179.57:5000/api/qualification/user/WORKER_ID \
  -H "Authorization: Bearer $TOKEN"
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

```bash
curl -X POST http://54.79.179.57:5000/api/qualification/create \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "hc_id",
    "qualificationId": "qual_type_id",
    "issueDate": "2020-01-01",
    "expiryDate": "2025-01-01",
    "documentId": "document_id"
  }'
```

### Worker Bank Details

#### Get Bank Details

```bash
curl -X GET http://54.79.179.57:5000/api/user/userBankDetails/WORKER_ID \
  -H "Authorization: Bearer $TOKEN"
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

```bash
curl -X PUT http://54.79.179.57:5000/api/user/addUserBankDetails/WORKER_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "accountName": "John Doe",
    "bsb": "123456",
    "accountNumber": "12345678",
    "bankName": "Commonwealth Bank"
  }'
```

### Worker Tax Details

#### Get Tax Details

```bash
curl -X GET http://54.79.179.57:5000/api/frontend/user/get/tax-details/WORKER_ID \
  -H "Authorization: Bearer $TOKEN"
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

```bash
curl -X PUT http://54.79.179.57:5000/api/frontend/user/tax-details/update/WORKER_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "tfn": "123456789",
    "abn": "12345678901"
  }'
```

### Worker Documents

#### Get Worker Documents

```bash
curl -X GET http://54.79.179.57:5000/api/user/getListDocumentsOfUser/WORKER_ID \
  -H "Authorization: Bearer $TOKEN"
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

```bash
curl -X POST http://54.79.179.57:5000/api/document/upload \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@/path/to/police_check.pdf" \
  -F "userId=WORKER_ID" \
  -F "documentType=police_check" \
  -F "expiryDate=2025-01-01"
```

### Worker Performance

#### Get Worker Appointments

```bash
curl -X GET http://54.79.179.57:5000/api/appointment/HcarerListAppointments/WORKER_ID \
  -H "Authorization: Bearer $TOKEN"
```

#### Get Worker Timesheets

```bash
curl -X GET "http://54.79.179.57:5000/api/appointment/healthCarerTimesheet/WORKER_ID?startDate=2024-01-01&endDate=2024-12-31&status=approved" \
  -H "Authorization: Bearer $TOKEN"
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

```bash
curl -X PUT http://54.79.179.57:5000/api/user/updateUserStatus/WORKER_ID/active \
  -H "Authorization: Bearer $TOKEN"
```

**Path Parameters:**

- `WORKER_ID`: Worker ID
- `status`: New status (active, inactive, terminated)

#### Terminate Worker

```bash
curl -X PUT http://54.79.179.57:5000/api/user/terminateUserAndInactive/WORKER_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "terminationDate": "2024-12-31",
    "reason": "Resignation"
  }'
```

### Worker Search

#### Search Workers

```bash
curl -X GET "http://54.79.179.57:5000/api/user/healthCarer/list?search=john&qualification=certificate&location=melbourne" \
  -H "Authorization: Bearer $TOKEN"
```

**Query Parameters:**

- `search`: Search term (name, email, employee ID)
- `qualification`: Filter by qualification
- `location`: Filter by location
- `availability`: Filter by availability status

### Worker Export

#### Export Worker List

```bash
curl -X GET http://54.79.179.57:5000/api/user/healthCarer/list/export \
  -H "Authorization: Bearer $TOKEN" \
  -o workers_export.csv
```

**Response:** CSV or Excel file download

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
