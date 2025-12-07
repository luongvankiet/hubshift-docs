# API Documentation

This document provides a comprehensive list of all API endpoints organized by feature category.

**Base URL:** `http://54.79.179.57:5000`

All curl examples use this base URL. Replace placeholder values (e.g., `:id`, `:clientId`) with actual values when making requests.

**CURL Pattern:**

- **GET requests:** `curl -X GET "http://54.79.179.57:5000/api/{endpoint}"`
- **POST requests:** `curl -X POST "http://54.79.179.57:5000/api/{endpoint}" -H "Content-Type: application/json" -d '{...}'`
- **PUT requests:** `curl -X PUT "http://54.79.179.57:5000/api/{endpoint}" -H "Content-Type: application/json" -d '{...}'`
- **DELETE requests:** `curl -X DELETE "http://54.79.179.57:5000/api/{endpoint}"`
- **File uploads:** Use `-F "file=@/path/to/file"` instead of `-d` for multipart/form-data

**Note:** Most endpoints require authentication. See [Authentication](#authentication) section below.

## Authentication

All protected endpoints require a JWT token obtained through the login flow. The authentication process involves two steps:

### Step 1: Login

**Endpoint:** `POST /api/user/login`

**Request:**

```bash
curl -X POST "http://54.79.179.57:5000/api/user/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@hubshift.au",
    "password": "Hubshift2026!"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "OTP sent to your email and phone",
  "data": {
    "email": "admin@hubshift.au"
  }
}
```

### Step 2: Verify OTP

**Endpoint:** `POST /api/user/verifymailOTP`

**Request:**

```bash
curl -X POST "http://54.79.179.57:5000/api/user/verifymailOTP" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@hubshift.au",
    "emailOTP": "561234",
    "deviceToken": "optional-device-token"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "User Verified",
  "data": {
    "_id": "user_id",
    "firstName": "Admin",
    "lastName": "User",
    "email": "admin@hubshift.au",
    "userType": "superAdmin",
    "token": "jwt_token_here",
    "checkLoginString": "random_string"
  }
}
```

**Note:** The token is automatically set in cookies. For API calls, extract the token from the response and include it in the Authorization header:

```bash
-H "Authorization: Bearer YOUR_JWT_TOKEN"
```

Or use cookies (which curl handles automatically):

```bash
-c cookies.txt -b cookies.txt
```

**Super Admin Credentials:**

- Email: `admin@hubshift.au`
- Password: `Hubshift2026!`
- OTP: `561234`

### Response Pattern

Most API responses follow this structure:

**Success Response:**

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information"
}
```

**List Response:**

```json
{
  "success": true,
  "data": [ ... ],
  "total": 100,
  "page": 1,
  "limit": 10
}
```

**Note:** Replace `YOUR_JWT_TOKEN` in all examples with the actual token obtained from the login flow above.

---

## Table of Contents

1. [Forms APIs](#1-forms-apis)
2. [Calendar/Appointments APIs](#2-calendarappointments-apis)
3. [Incident Management APIs](#3-incident-management-apis)
4. [Shift APIs](#4-shift-apis)
5. [Goals APIs](#5-goals-apis)
6. [Progress Notes APIs](#6-progress-notes-apis)

---

## 1. Forms APIs

### Base Paths

- `/api/formTemplate`
- `/api/formCategory`
- `/api/formSubmission`
- `/api/fieldGroup`

### Form Templates (`/api/formTemplate`)

#### GET / - Get all form templates

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/formTemplate" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "template_id",
      "name": "Template Name",
      "category": "category_id",
      "status": "draft",
      "fields": [],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 10,
  "page": 1,
  "limit": 10
}
```

#### GET /published/list - Get published templates

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/formTemplate/published/list" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "template_id",
      "name": "Published Template",
      "status": "published",
      "publishedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### GET /categories/list - Get form template categories

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/formTemplate/categories/list" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "category_id",
      "name": "Category Name",
      "description": "Category description"
    }
  ]
}
```

#### GET /verify-token - Verify form submission token (public endpoint)

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/formTemplate/verify-token?token=YOUR_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "valid": true,
  "templateId": "template_id",
  "expiresAt": "2024-12-31T23:59:59.000Z"
}
```

#### POST /verify-identity - Verify identity for form submission (public endpoint)

**Request:**

```bash
curl -X POST "http://54.79.179.57:5000/api/formTemplate/verify-identity" \
  -H "Content-Type: application/json" \
  -d '{
    "identity": "identity_data",
    "token": "form_token"
  }'
```

**Response:**

```json
{
  "success": true,
  "verified": true,
  "templateId": "template_id"
}
```

#### GET /:id - Get form template by ID

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/formTemplate/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "123",
    "name": "Template Name",
    "description": "Template description",
    "category": "category_id",
    "status": "draft",
    "fields": [
      {
        "id": "field_1",
        "type": "text",
        "label": "Field Label",
        "required": true
      }
    ],
    "version": 1,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST / - Create a new form template

**Request:**

```bash
curl -X POST "http://54.79.179.57:5000/api/formTemplate" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Template Name",
    "description": "Template description",
    "category": "category_id",
    "fields": [
      {
        "type": "text",
        "label": "Field Label",
        "required": true
      }
    ]
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Form template created successfully",
  "data": {
    "_id": "new_template_id",
    "name": "Template Name",
    "status": "draft",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### PUT /:id - Update a form template

**Request:**

```bash
curl -X PUT "http://54.79.179.57:5000/api/formTemplate/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name",
    "description": "Updated description"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Form template updated successfully",
  "data": {
    "_id": "123",
    "name": "Updated Name",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

#### POST /:id/versions - Create a new version of a template

**Request:**

```bash
curl -X POST "http://54.79.179.57:5000/api/formTemplate/123/versions" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "changes": "Version notes"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "New version created successfully",
  "data": {
    "_id": "new_version_id",
    "templateId": "123",
    "version": 2,
    "createdAt": "2024-01-02T00:00:00.000Z"
  }
}
```

#### DELETE /:id - Delete a form template (soft delete)

**Request:**

```bash
curl -X DELETE "http://54.79.179.57:5000/api/formTemplate/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "message": "Form template deleted successfully"
}
```

#### PUT /:id/publish - Publish a form template

**Request:**

```bash
curl -X PUT "http://54.79.179.57:5000/api/formTemplate/123/publish" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "message": "Form template published successfully",
  "data": {
    "_id": "123",
    "status": "published",
    "publishedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

#### PUT /:id/archive - Archive a form template

**Request:**

```bash
curl -X PUT "http://54.79.179.57:5000/api/formTemplate/123/archive" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "message": "Form template archived successfully",
  "data": {
    "_id": "123",
    "status": "archived",
    "archivedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

#### POST /:id/submissions - Create a form submission for a template

**Request:**

```bash
curl -X POST "http://54.79.179.57:5000/api/formTemplate/123/submissions" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "field_1": "value_1",
      "field_2": "value_2"
    },
    "submittedBy": "user_id"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Form submission created successfully",
  "data": {
    "_id": "submission_id",
    "templateId": "123",
    "data": {
      "field_1": "value_1",
      "field_2": "value_2"
    },
    "status": "pending",
    "submittedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

#### POST /:id/send-email - Send form template link via email

**Request:**

```bash
curl -X POST "http://54.79.179.57:5000/api/formTemplate/123/send-email" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "subject": "Form Template",
    "message": "Please fill out this form"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

### Form Categories (`/api/formCategory`)

#### GET / - Get all form categories

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/formCategory" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "category_id",
      "name": "Category Name",
      "description": "Category description",
      "objectType": "client",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### GET /list - Get category list (simplified)

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/formCategory/list" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "category_id",
      "name": "Category Name"
    }
  ]
}
```

#### GET /object-types/list - Get available object types for field mapping

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/formCategory/object-types/list" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": ["client", "appointment", "incident", "goal"]
}
```

#### GET /object-types/:objectType/fields - Get fields for a specific object type

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/formCategory/object-types/client/fields" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "field": "firstName",
      "type": "string",
      "label": "First Name"
    },
    {
      "field": "lastName",
      "type": "string",
      "label": "Last Name"
    }
  ]
}
```

#### GET /:id - Get form category by ID

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/formCategory/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "123",
    "name": "Category Name",
    "description": "Category description",
    "objectType": "client",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST / - Create a new form category

**Request:**

```bash
curl -X POST "http://54.79.179.57:5000/api/formCategory" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Category Name",
    "description": "Category description",
    "objectType": "client"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Form category created successfully",
  "data": {
    "_id": "new_category_id",
    "name": "Category Name",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### PUT /:id - Update a form category

**Request:**

```bash
curl -X PUT "http://54.79.179.57:5000/api/formCategory/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name",
    "description": "Updated description"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Form category updated successfully",
  "data": {
    "_id": "123",
    "name": "Updated Name",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

#### DELETE /:id - Delete a form category (soft delete)

**Request:**

```bash
curl -X DELETE "http://54.79.179.57:5000/api/formCategory/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "message": "Form category deleted successfully"
}
```

### Form Submissions (`/api/formSubmission`)

#### GET / - Get all form submissions

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/formSubmission" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "submission_id",
      "templateId": "template_id",
      "status": "pending",
      "data": {},
      "submittedBy": "user_id",
      "submittedAt": "2024-01-01T00:00:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 50,
  "page": 1,
  "limit": 10
}
```

#### GET /client/:clientId - Get submissions by client

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/formSubmission/client/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "submission_id",
      "templateId": "template_id",
      "clientId": "123",
      "status": "approved",
      "data": {}
    }
  ]
}
```

#### GET /:id - Get form submission by ID

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/formSubmission/456" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "456",
    "templateId": "template_id",
    "status": "pending",
    "data": {
      "field_1": "value_1",
      "field_2": "value_2"
    },
    "submittedBy": "user_id",
    "assignedTo": "user_id",
    "signatures": [],
    "attachments": [],
    "submittedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST / - Create a new form submission

**Request:**

```bash
curl -X POST "http://54.79.179.57:5000/api/formSubmission" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "templateId": "123",
    "data": {
      "field_1": "value_1",
      "field_2": "value_2"
    },
    "submittedBy": "user_id"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Form submission created successfully",
  "data": {
    "_id": "new_submission_id",
    "templateId": "123",
    "status": "pending",
    "submittedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### PUT /:id - Update a form submission

**Request:**

```bash
curl -X PUT "http://54.79.179.57:5000/api/formSubmission/456" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "field_1": "updated_value_1"
    }
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Form submission updated successfully",
  "data": {
    "_id": "456",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

#### DELETE /:id - Delete a form submission (soft delete)

**Request:**

```bash
curl -X DELETE "http://54.79.179.57:5000/api/formSubmission/456" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "message": "Form submission deleted successfully"
}
```

#### PUT /:id/approve - Approve a form submission

**Request:**

```bash
curl -X PUT "http://54.79.179.57:5000/api/formSubmission/456/approve" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "message": "Form submission approved successfully",
  "data": {
    "_id": "456",
    "status": "approved",
    "approvedAt": "2024-01-02T00:00:00.000Z",
    "approvedBy": "user_id"
  }
}
```

#### PUT /:id/reject - Reject a form submission

**Request:**

```bash
curl -X PUT "http://54.79.179.57:5000/api/formSubmission/456/reject" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "reason": "Rejection reason"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Form submission rejected successfully",
  "data": {
    "_id": "456",
    "status": "rejected",
    "rejectedAt": "2024-01-02T00:00:00.000Z",
    "rejectedBy": "user_id",
    "rejectionReason": "Rejection reason"
  }
}
```

#### PUT /:id/assign - Assign a form submission to a user

**Request:**

```bash
curl -X PUT "http://54.79.179.57:5000/api/formSubmission/456/assign" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "789"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Form submission assigned successfully",
  "data": {
    "_id": "456",
    "assignedTo": "789",
    "assignedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

#### POST /:id/signatures - Add a signature to a form submission

**Request:**

```bash
curl -X POST "http://54.79.179.57:5000/api/formSubmission/456/signatures" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "signature": "base64_encoded_signature_data",
    "signedBy": "user_id",
    "signatureType": "electronic"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Signature added successfully",
  "data": {
    "_id": "456",
    "signatures": [
      {
        "signature": "base64_encoded_signature_data",
        "signedBy": "user_id",
        "signedAt": "2024-01-02T00:00:00.000Z"
      }
    ]
  }
}
```

#### POST /:id/attachments - Add attachment to a form submission

**Request:**

```bash
curl -X POST "http://54.79.179.57:5000/api/formSubmission/456/attachments" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@/path/to/file.pdf" \
  -F "description=Attachment description"
```

**Response:**

```json
{
  "success": true,
  "message": "Attachment added successfully",
  "data": {
    "_id": "456",
    "attachments": [
      {
        "filename": "file.pdf",
        "url": "/uploads/attachments/file.pdf",
        "uploadedAt": "2024-01-02T00:00:00.000Z"
      }
    ]
  }
}
```

### Field Groups (`/api/fieldGroup`)

#### GET / - Get all field groups

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/fieldGroup" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "group_id",
      "name": "Group Name",
      "fields": [
        {
          "id": "field_1",
          "type": "text",
          "label": "Field Label"
        }
      ],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### GET /:id - Get field group by ID

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/fieldGroup/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "123",
    "name": "Group Name",
    "description": "Group description",
    "fields": [
      {
        "id": "field_1",
        "type": "text",
        "label": "Field Label",
        "required": true
      }
    ],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST / - Create a new field group

**Request:**

```bash
curl -X POST "http://54.79.179.57:5000/api/fieldGroup" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Group Name",
    "description": "Group description",
    "fields": [
      {
        "type": "text",
        "label": "Field Label",
        "required": true
      }
    ]
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Field group created successfully",
  "data": {
    "_id": "new_group_id",
    "name": "Group Name",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### PUT /:id - Update a field group

**Request:**

```bash
curl -X PUT "http://54.79.179.57:5000/api/fieldGroup/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name",
    "description": "Updated description"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Field group updated successfully",
  "data": {
    "_id": "123",
    "name": "Updated Name",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

#### DELETE /:id - Delete a field group (soft delete)

**Request:**

```bash
curl -X DELETE "http://54.79.179.57:5000/api/fieldGroup/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "message": "Field group deleted successfully"
}
```

---

## 2. Calendar/Appointments APIs

### Base Paths

- `/api/appointment`
- `/api/appointmentType`
- `/api/appointmentCheckListQuestion`
- `/api/meeting`
- `/api/setAvailability`

### Appointments (`/api/appointment`)

**Note:** All appointment endpoints require authentication. Replace `YOUR_JWT_TOKEN` with the actual token from the login flow. Most endpoints follow similar response patterns - success responses include `success: true`, `data`, and optionally `message` fields.

#### GET /getlists - Get appointment list

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/appointment/getlists" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "appointment_id",
      "clientId": "client_id",
      "healthCarerId": "carer_id",
      "appointmentType": "appointment_type_id",
      "date": "2024-01-01",
      "startTime": "09:00",
      "endTime": "10:00",
      "status": "scheduled",
      "location": "Client Address",
      "notes": "Appointment notes",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 10
}
```

#### GET /get-calendar-appointments - Get calendar appointments

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/appointment/get-calendar-appointments?startDate=2024-01-01&endDate=2024-01-31" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "appointment_id",
      "title": "Appointment with Client Name",
      "start": "2024-01-01T09:00:00.000Z",
      "end": "2024-01-01T10:00:00.000Z",
      "clientName": "Client Name",
      "carerName": "Health Carer Name",
      "status": "scheduled"
    }
  ]
}
```

#### GET /searchAppointments - Search appointments

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/appointment/searchAppointments?query=searchterm&status=scheduled" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "appointment_id",
      "clientName": "Client Name",
      "date": "2024-01-01",
      "status": "scheduled"
    }
  ],
  "total": 5
}
```

#### GET /:id - Get appointment details

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/appointment/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "123",
    "clientId": {
      "_id": "client_id",
      "firstName": "Client",
      "lastName": "Name"
    },
    "healthCarerId": {
      "_id": "carer_id",
      "firstName": "Health",
      "lastName": "Carer"
    },
    "appointmentType": "appointment_type_id",
    "date": "2024-01-01",
    "startTime": "09:00",
    "endTime": "10:00",
    "status": "scheduled",
    "location": "Client Address",
    "notes": "Appointment notes",
    "tasks": [],
    "routines": [],
    "expenses": [],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST /create - Create appointment

**Request:**

```bash
curl -X POST "http://54.79.179.57:5000/api/appointment/create" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": "123",
    "healthCarerId": "456",
    "appointmentType": "appointment_type_id",
    "date": "2024-01-01",
    "startTime": "09:00",
    "endTime": "10:00",
    "location": "Client Address",
    "notes": "Appointment notes"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Appointment created successfully",
  "data": {
    "_id": "new_appointment_id",
    "clientId": "123",
    "healthCarerId": "456",
    "status": "scheduled",
    "date": "2024-01-01",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### PUT /update/:id - Update appointment

**Request:**

```bash
curl -X PUT "http://54.79.179.57:5000/api/appointment/update/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "startTime": "10:00",
    "endTime": "11:00",
    "notes": "Updated notes"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Appointment updated successfully",
  "data": {
    "_id": "123",
    "startTime": "10:00",
    "endTime": "11:00",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

**Note:** Other appointment endpoints follow similar patterns. All GET endpoints return data in the `data` field, POST/PUT endpoints return success messages and updated data, and DELETE endpoints return success messages.

#### Detail Endpoints

| Method | Endpoint                                      | Description                                  |
| ------ | --------------------------------------------- | -------------------------------------------- |
| GET    | `/:id`                                        | Get appointment details                      |
| GET    | `/appointment-details/:id`                    | Get individual appointment details           |
| GET    | `/getIndivisualAppointmentDetails/:id`        | Get individual appointment details           |
| GET    | `/getStartedAppointmentDetails/:id`           | Get started appointment details              |
| GET    | `/details-HcarerListAppointments/:id`         | Get health carer appointment details         |
| GET    | `/edit/appointment-details/:id`               | Get appointment details by ID                |
| GET    | `/detail-list/:id`                            | Get appointment details list                 |
| GET    | `/client/detail-list/:id`                     | Get client appointment details list          |
| GET    | `/getAppointmentDetailsclientId/:id`          | Get appointment details by client ID         |
| GET    | `/silsda/Appointment`                         | Get SILSDA appointment details               |
| GET    | `/getitemid/:itemno`                          | Get detail item wise                         |
| GET    | `/getLocationSil/:id`                         | Get SIL location                             |
| GET    | `/getClientDefaultAddressByAppointmentId/:id` | Get client default address by appointment ID |
| GET    | `/getAddressByClientId/:id`                   | Get address by client ID                     |
| GET    | `/getData`                                    | Get appointment status data                  |
| GET    | `/getclintIdBytasks/:id`                      | Get client ID by tasks                       |
| GET    | `/indvidualtaskDetails/:id`                   | Get individual task details                  |
| GET    | `/getExpenseData/:id`                         | Get expense data                             |
| GET    | `/appointment-routine-data/:id`               | Get appointment routine data                 |
| GET    | `/details/swaped/:id`                         | Get swapped appointment details              |
| GET    | `/get/details/:id`                            | Get task details                             |
| GET    | `/task/details/:id`                           | Get appointment task details                 |
| GET    | `/details-task/:id`                           | Get task details (alternate)                 |

#### Timesheet & Export Endpoints

| Method | Endpoint                                   | Description                           |
| ------ | ------------------------------------------ | ------------------------------------- |
| GET    | `/healthCarerTimesheet/:id`                | Get health carer timesheet            |
| GET    | `/exporthealthCarerTimesheet/:id`          | Export health carer timesheet         |
| GET    | `/get-all/exportAppointmentByidHealth/:id` | Export appointment by health carer ID |
| GET    | `/export/exportAppointmentData`            | Export appointment data               |
| GET    | `/export/ShiftNoteasperclient`             | Export shift notes as per client      |

#### Shift Notes Endpoints

| Method | Endpoint                           | Description                        |
| ------ | ---------------------------------- | ---------------------------------- |
| GET    | `/super-admin/shiftNote-list/:id`  | Get all continue shift note lists  |
| GET    | `/super-admin/shift-note-list/:id` | Get all shift note lists           |
| GET    | `/listShiftNoteasperclient`        | Get list shift notes as per client |

#### Availability Endpoints

| Method | Endpoint                                                            | Description                                       |
| ------ | ------------------------------------------------------------------- | ------------------------------------------------- |
| GET    | `/health-carer/get-all-health-carer-availability-list`              | Get health carer availability list                |
| GET    | `/health-carer/swap-apt/get-all/swap-appointment-availability-list` | Get swap appointment availability list            |
| GET    | `/clientTeam/get-all-available-hc`                                  | Get health carer availability API for client team |
| GET    | `/get-current-active-appointment-hc/:id`                            | Get current active appointment for health carer   |
| GET    | `/getClientList/healthCarerId/:id`                                  | Get client list as per health carer ID            |

#### Create & Update Endpoints

| Method | Endpoint                                | Description                            | CURL Example                                                                                                                                                       |
| ------ | --------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| POST   | `/create`                               | Create appointment                     | `curl -X POST "http://54.79.179.57:5000/api/appointment/create" -H "Content-Type: application/json" -d '{"clientId": 123, "date": "2024-01-01"}'`                  |
| POST   | `/addTask`                              | Add routine and task                   | `curl -X POST "http://54.79.179.57:5000/api/appointment/addTask" -H "Content-Type: application/json" -d '{"task": "data"}'`                                        |
| POST   | `/swap-task`                            | Swap task self columns                 | `curl -X POST "http://54.79.179.57:5000/api/appointment/swap-task" -H "Content-Type: application/json" -d '{"taskId": 123}'`                                       |
| POST   | `/update-appointment-time`              | Update appointment time from timesheet | `curl -X POST "http://54.79.179.57:5000/api/appointment/update-appointment-time" -H "Content-Type: application/json" -d '{"appointmentId": 123, "time": "10:00"}'` |
| PUT    | `/update/:id`                           | Update appointment                     | `curl -X PUT "http://54.79.179.57:5000/api/appointment/update/123" -H "Content-Type: application/json" -d '{"status": "updated"}'`                                 |
| PUT    | `/update-appointment-expense/:id`       | Update appointment expense             | `curl -X PUT "http://54.79.179.57:5000/api/appointment/update-appointment-expense/123" -H "Content-Type: application/json" -d '{"expense": 50.00}'`                |
| PUT    | `/update/status/:id`                    | Update appointment status              | `curl -X PUT "http://54.79.179.57:5000/api/appointment/update/status/123" -H "Content-Type: application/json" -d '{"status": "completed"}'`                        |
| PUT    | `/update/rescheduledAppointment/:id`    | Reschedule appointment                 | `curl -X PUT "http://54.79.179.57:5000/api/appointment/update/rescheduledAppointment/123" -H "Content-Type: application/json" -d '{"newDate": "2024-01-02"}'`      |
| PUT    | `/updateNoteStatus/:id/:status`         | Update note status                     | `curl -X PUT "http://54.79.179.57:5000/api/appointment/updateNoteStatus/123/completed"`                                                                            |
| PUT    | `/updateContinueShiftNoteCompleted/:id` | Update continue shift note completed   | `curl -X PUT "http://54.79.179.57:5000/api/appointment/updateContinueShiftNoteCompleted/123"`                                                                      |
| PUT    | `/editTask/:id`                         | Edit routine and task                  | `curl -X PUT "http://54.79.179.57:5000/api/appointment/editTask/123" -H "Content-Type: application/json" -d '{"task": "updated"}'`                                 |
| PUT    | `/swapAppointment/:id`                  | Swap appointment                       | `curl -X PUT "http://54.79.179.57:5000/api/appointment/swapAppointment/123" -H "Content-Type: application/json" -d '{"newCarerId": 456}'`                          |
| PUT    | `/agreeBeforeAppointmentDetail/:id`     | Agree before appointment detail        | `curl -X PUT "http://54.79.179.57:5000/api/appointment/agreeBeforeAppointmentDetail/123"`                                                                          |
| PUT    | `/addNote/:id`                          | Add note to routine task               | `curl -X PUT "http://54.79.179.57:5000/api/appointment/addNote/123" -H "Content-Type: application/json" -d '{"note": "Note text"}'`                                |
| PUT    | `/appointmentQuestionCheck/:id`         | Appointment question check             | `curl -X PUT "http://54.79.179.57:5000/api/appointment/appointmentQuestionCheck/123"`                                                                              |
| PUT    | `/add-task/:id`                         | Add task against routine               | `curl -X PUT "http://54.79.179.57:5000/api/appointment/add-task/123" -H "Content-Type: application/json" -d '{"task": "data"}'`                                    |
| PUT    | `/routine/update-task/:id`              | Update routine task                    | `curl -X PUT "http://54.79.179.57:5000/api/appointment/routine/update-task/123" -H "Content-Type: application/json" -d '{"task": "updated"}'`                      |
| PUT    | `/add-routine/:id`                      | Add routine                            | `curl -X PUT "http://54.79.179.57:5000/api/appointment/add-routine/123" -H "Content-Type: application/json" -d '{"routine": "data"}'`                              |
| PUT    | `/appointment-swap/:id`                 | Swap appointment                       | `curl -X PUT "http://54.79.179.57:5000/api/appointment/appointment-swap/123" -H "Content-Type: application/json" -d '{"swapData": {}}'`                            |
| PUT    | `/appointment-add-routinetask/:id`      | Add routine and task                   | `curl -X PUT "http://54.79.179.57:5000/api/appointment/appointment-add-routinetask/123" -H "Content-Type: application/json" -d '{"data": {}}'`                     |
| PUT    | `/appointmentsendMail/:id`              | Send mail for appointment delay        | `curl -X PUT "http://54.79.179.57:5000/api/appointment/appointmentsendMail/123"`                                                                                   |
| PUT    | `/updateContinueShiftNote/:id`          | Delete continue shift note             | `curl -X PUT "http://54.79.179.57:5000/api/appointment/updateContinueShiftNote/123"`                                                                               |
| PUT    | `/approveMultipleAppointments`          | Approve multiple appointments          | `curl -X PUT "http://54.79.179.57:5000/api/appointment/approveMultipleAppointments" -H "Content-Type: application/json" -d '{"appointmentIds": [123, 456]}'`       |

#### Delete Endpoints

| Method | Endpoint                                    | Description            |
| ------ | ------------------------------------------- | ---------------------- |
| PUT    | `/delete/:id`                               | Delete appointment     |
| PUT    | `/delete/silApp/:date/:silsdaId/:shiftType` | Delete SIL appointment |

### Appointment Types (`/api/appointmentType`)

**Note:** All appointment type endpoints require authentication. Replace `YOUR_JWT_TOKEN` with the actual token from the login flow.

#### GET /list/appointment-type - Get all appointment types

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/appointmentType/list/appointment-type?createdBy=user_id&page=1&items_per_page=10&searchTerm=" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "docs": [
      {
        "_id": "appointment_type_id",
        "appoitmenttype": "Home Visit",
        "image": {
          "key": "image_key",
          "location": "image_url"
        },
        "isActive": true,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "totalDocs": 10,
    "limit": 10,
    "page": 1
  }
}
```

#### GET /get-list/all - Get appointment type list

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/appointmentType/get-list/all?createdBy=user_id" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "AppoitmentType": "Home Visit",
      "icon": {
        "key": "image_key",
        "location": "image_url"
      }
    }
  ]
}
```

#### GET /appointment-type/list - Get appointment type list (public)

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/appointmentType/appointment-type/list"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "appointment_type_id",
      "appoitmenttype": "Home Visit",
      "isActive": true
    }
  ]
}
```

#### GET /:id - Get appointment type details

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/appointmentType/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "message": " appoitment Type Details",
  "data": {
    "_id": "123",
    "appoitmenttype": "Home Visit",
    "image": {
      "key": "image_key",
      "location": "image_url"
    },
    "isActive": true,
    "createdBy": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST /create - Create appointment type

**Request:**

```bash
curl -X POST "http://54.79.179.57:5000/api/appointmentType/create" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "appoitmenttype": "Home Visit",
    "createdBy": "user_id",
    "image": {
      "key": "image_key",
      "location": "image_url"
    }
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Appointment Type Added Successfully",
  "data": {
    "_id": "new_appointment_type_id",
    "appoitmenttype": "Home Visit",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Response (if duplicate):**

```json
{
  "success": false,
  "error": "This Appointment Type Already Exist"
}
```

#### PUT /update/:id - Update appointment type

**Request:**

```bash
curl -X PUT "http://54.79.179.57:5000/api/appointmentType/update/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "appoitmenttype": "Updated Home Visit",
    "updatedBy": "user_id"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Appointment Type Updated Successfully",
  "data": {
    "_id": "123",
    "appoitmenttype": "Updated Home Visit",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

#### DELETE /delete/:id - Delete appointment type (soft delete)

**Request:**

```bash
curl -X DELETE "http://54.79.179.57:5000/api/appointmentType/delete/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "message": "Delete succesfully"
}
```

### Appointment Checklist Questions (`/api/appointmentCheckListQuestion`)

**Note:** All appointment checklist question endpoints require authentication. Replace `YOUR_JWT_TOKEN` with the actual token from the login flow.

#### GET /getQuestionList - Get all question list

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/appointmentCheckListQuestion/getQuestionList?page=1&items_per_page=10&searchTerm=" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "docs": [
      {
        "_id": "question_id",
        "name": "Question text here",
        "isActive": true,
        "createdBy": "user_id",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "totalDocs": 20
  }
}
```

#### GET /:id - Get question details

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/appointmentCheckListQuestion/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "message": " details",
  "data": {
    "_id": "123",
    "name": "Question text here",
    "isActive": true,
    "createdBy": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Response:**

```json
{
  "success": false,
  "error": "No Data found with this id"
}
```

#### POST /create - Create question

**Request:**

```bash
curl -X POST "http://54.79.179.57:5000/api/appointmentCheckListQuestion/create" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Question text here",
    "createdBy": "user_id"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Data Added",
  "data": {
    "_id": "new_question_id",
    "name": "Question text here",
    "isActive": true,
    "createdBy": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Response (if duplicate):**

```json
{
  "success": true,
  "message": "Data Already Exist"
}
```

#### PUT /update/:id - Update question

**Request:**

```bash
curl -X PUT "http://54.79.179.57:5000/api/appointmentCheckListQuestion/update/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated question text",
    "createdBy": "user_id"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Country Updated",
  "data": {
    "_id": "123",
    "name": "Updated question text",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

#### DELETE /delete/:id - Delete question (soft delete)

**Request:**

```bash
curl -X DELETE "http://54.79.179.57:5000/api/appointmentCheckListQuestion/delete/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "message": "Deleted succesfully"
}
```

### Meetings (`/api/meeting`)

**Note:** All meeting endpoints require authentication. Replace `YOUR_JWT_TOKEN` with the actual token from the login flow.

#### GET /getlists - Get meeting list

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/meeting/getlists" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "meeting_id",
      "title": "Meeting Title",
      "clientId": "client_id",
      "date": "2024-01-01T00:00:00.000Z",
      "time": "10:00",
      "duration": "60",
      "status": "Pending",
      "meetingTypeId": "Video Conferencing",
      "meetingUrl": "meeting_url",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### GET /:id - Get meeting details

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/meeting/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "123",
    "title": "Meeting Title",
    "clientId": {
      "_id": "client_id",
      "firstName": "Client",
      "lastName": "Name"
    },
    "date": "2024-01-01T00:00:00.000Z",
    "endDate": "2024-01-01T00:00:00.000Z",
    "time": "10:00",
    "duration": "60",
    "status": "Pending",
    "meetingTypeId": "Video Conferencing",
    "meetingUrl": "meeting_url",
    "agenda": "Meeting agenda",
    "stakeHoldersId": ["user_id_1", "user_id_2"],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST /create - Create meeting

**Request:**

```bash
curl -X POST "http://54.79.179.57:5000/api/meeting/create" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Meeting Title",
    "clientId": "client_id",
    "date": "2024-01-01",
    "endDate": "2024-01-01",
    "time": "10:00",
    "duration": "60",
    "meetingTypeId": "Video Conferencing",
    "agenda": "Meeting agenda",
    "stakeHoldersId": ["user_id_1", "user_id_2"],
    "firstName": "Client",
    "lastName": "Name",
    "stakeHoldersName": ["Stakeholder 1", "Stakeholder 2"],
    "createdBy": "user_id"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Meeting Created Successfully",
  "data": {
    "_id": "new_meeting_id",
    "title": "Meeting Title",
    "status": "Pending",
    "meetingUrl": "meeting_url",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Response (if duplicate):**

```json
{
  "success": false,
  "error": "Meeting Already Scheduled"
}
```

#### PUT /update/:id - Update meeting details

**Request:**

```bash
curl -X PUT "http://54.79.179.57:5000/api/meeting/update/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Meeting Title",
    "time": "11:00",
    "duration": "90",
    "agenda": "Updated agenda"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Meeting Updated Successfully",
  "data": {
    "_id": "123",
    "title": "Updated Meeting Title",
    "time": "11:00",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

#### PUT /updateStatus/:id - Update meeting status

**Request:**

```bash
curl -X PUT "http://54.79.179.57:5000/api/meeting/updateStatus/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Approved"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Meeting Status Updated Successfully",
  "data": {
    "_id": "123",
    "status": "Approved",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

#### PUT /cancelScheduledMeeting/:id - Cancel scheduled meeting

**Request:**

```bash
curl -X PUT "http://54.79.179.57:5000/api/meeting/cancelScheduledMeeting/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "cancelReason": "Reason for cancellation",
    "cancelBy": {
      "cId": "user_id",
      "cName": "User Name"
    }
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Meeting Cancelled Successfully",
  "data": {
    "_id": "123",
    "status": "Canceled",
    "isCancelled": true,
    "cancelReason": "Reason for cancellation",
    "canceledAt": "2024-01-02T00:00:00.000Z"
  }
}
```

#### DELETE /delete/:id - Delete meeting

**Request:**

```bash
curl -X DELETE "http://54.79.179.57:5000/api/meeting/delete/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "message": "Meeting Deleted Successfully"
}
```

**Note:** Other meeting endpoints follow similar patterns. GET endpoints return meeting data, POST endpoints create meetings, PUT endpoints update meetings, and DELETE endpoints remove meetings.

### Availability (`/api/setAvailability`)

**Note:** All availability endpoints require authentication. Replace `YOUR_JWT_TOKEN` with the actual token from the login flow.

#### GET /get-all-setAvailability - Get all availability

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/setAvailability/get-all-setAvailability?page=1&items_per_page=10&searchTerm=" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "docs": [
      {
        "_id": "availability_id",
        "userId": "user_id",
        "rosterTypeId": "roster_type_id",
        "shiftNameId": "shift_type_id",
        "isDefaultAvailable": true,
        "Weekly": [],
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "totalDocs": 50
  }
}
```

#### GET /get-all-calendar-availability - Get all calendar availability

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/setAvailability/get-all-calendar-availability?start=2024-01-01&end=2024-01-31" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "availability_id",
      "title": "Available",
      "start": "2024-01-01T09:00:00.000Z",
      "end": "2024-01-01T17:00:00.000Z",
      "userId": "user_id",
      "userName": "User Name"
    }
  ]
}
```

#### GET /get-availability-by-userid/:id - Get availability by user ID

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/setAvailability/get-availability-by-userid/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "availability_id",
    "userId": "123",
    "rosterTypeId": "roster_type_id",
    "shiftNameId": "shift_type_id",
    "Weekly": [
      {
        "shiftTypeId": "shift_type_id",
        "defaultCheck": false,
        "week": {
          "Mon": [
            {
              "startTime": "09:00",
              "endTime": "17:00",
              "date": "2024-01-01T00:00:00.000Z"
            }
          ]
        }
      }
    ],
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### GET /:id - Get availability details

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/setAvailability/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "123",
    "userId": {
      "_id": "user_id",
      "firstName": "User",
      "lastName": "Name"
    },
    "rosterTypeId": "roster_type_id",
    "shiftNameId": "shift_type_id",
    "Weekly": [],
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST /create - Create availability

**Request:**

```bash
curl -X POST "http://54.79.179.57:5000/api/setAvailability/create" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_id",
    "rosterTypeId": "roster_type_id",
    "shiftNameId": "shift_type_id",
    "isDefaultAvailable": true,
    "Weekly": [
      {
        "shiftTypeId": "shift_type_id",
        "defaultCheck": false,
        "week": {
          "Mon": [
            {
              "startTime": "09:00",
              "endTime": "17:00",
              "date": "2024-01-01"
            }
          ]
        }
      }
    ]
  }'
```

**Response:**

```json
{
  "success": true,
  "msg": "SetAvailability Details Added",
  "data": {
    "_id": "new_availability_id",
    "userId": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST /check-availability-by-userid/:id - Check availability by user ID

**Request:**

```bash
curl -X POST "http://54.79.179.57:5000/api/setAvailability/check-availability-by-userid/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2024-01-01",
    "startTime": "09:00",
    "endTime": "17:00"
  }'
```

**Response:**

```json
{
  "success": true,
  "data": {
    "available": true,
    "message": "User is available at the requested time"
  }
}
```

**Error Response:**

```json
{
  "success": false,
  "error": "No availability found in the database."
}
```

#### PUT /update/:id - Update availability

**Request:**

```bash
curl -X PUT "http://54.79.179.57:5000/api/setAvailability/update/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "isDefaultAvailable": false,
    "Weekly": [
      {
        "shiftTypeId": "shift_type_id",
        "week": {
          "Mon": [
            {
              "startTime": "10:00",
              "endTime": "18:00",
              "date": "2024-01-01"
            }
          ]
        }
      }
    ]
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Availability Updated Successfully",
  "data": {
    "_id": "123",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

#### DELETE /delete/:id - Delete availability (soft delete)

**Request:**

```bash
curl -X DELETE "http://54.79.179.57:5000/api/setAvailability/delete/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "message": "Availability Deleted Successfully"
}
```

---

## 3. Incident Management APIs

### Base Paths

- `/api/incident`
- `/api/incident-report`
- `/api/incident/intake` (handled within `/api/incident`)

### Incidents (`/api/incident`)

**Note:** All incident endpoints require authentication. Replace `YOUR_JWT_TOKEN` with the actual token from the login flow.

#### GET /get-all-incident - Get all incidents

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/incident/get-all-incident" \
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

#### GET /:id - Get incident details

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

#### PUT /update/:id - Update incident

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

#### PUT /status/:id - Update incident status

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

#### DELETE /delete/:id - Delete incident

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

## 4. Shift APIs

### Base Paths

- `/api/createShift`
- `/api/shiftAllocation`
- `/api/shiftType`
- `/api/shiftRate`

### Create Shift (`/api/createShift`)

#### GET /getlists - Get create shift list

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/createShift/getlists" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "shift_id",
      "clientId": "client_id",
      "shiftType": "shift_type_id",
      "date": "2024-01-01",
      "startTime": "09:00",
      "endTime": "17:00",
      "status": "scheduled",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 50,
  "page": 1,
  "limit": 10
}
```

#### GET /:id - Get create shift details

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/createShift/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "123",
    "clientId": "client_id",
    "shiftType": "shift_type_id",
    "date": "2024-01-01",
    "startTime": "09:00",
    "endTime": "17:00",
    "status": "scheduled",
    "allocatedTo": "carer_id",
    "notes": "Shift notes",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST /create - Create shift

**Request:**

```bash
curl -X POST "http://54.79.179.57:5000/api/createShift/create" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": "client_id",
    "shiftType": "shift_type_id",
    "date": "2024-01-01",
    "startTime": "09:00",
    "endTime": "17:00",
    "notes": "Shift notes"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Shift created successfully",
  "data": {
    "_id": "new_shift_id",
    "clientId": "client_id",
    "status": "scheduled",
    "date": "2024-01-01",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### PUT /update/:id - Update create shift

**Request:**

```bash
curl -X PUT "http://54.79.179.57:5000/api/createShift/update/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "startTime": "10:00",
    "endTime": "18:00",
    "status": "updated"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Shift updated successfully",
  "data": {
    "_id": "123",
    "startTime": "10:00",
    "endTime": "18:00",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

#### PUT /swap/:id - Swap shift

**Request:**

```bash
curl -X PUT "http://54.79.179.57:5000/api/createShift/swap/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "newCarerId": "456",
    "reason": "Swap reason"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Shift swapped successfully",
  "data": {
    "_id": "123",
    "allocatedTo": "456",
    "swappedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

#### DELETE /delete/:id - Delete create shift

**Request:**

```bash
curl -X DELETE "http://54.79.179.57:5000/api/createShift/delete/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "message": "Shift deleted successfully"
}
```

### Shift Allocation (`/api/shiftAllocation`)

#### GET /getlists - Get shift allocation list

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/shiftAllocation/getlists" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "allocation_id",
      "shiftId": "shift_id",
      "carerId": "carer_id",
      "status": "allocated",
      "allocatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### GET /:id - Get shift allocation details

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/shiftAllocation/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "123",
    "shiftId": {
      "_id": "shift_id",
      "date": "2024-01-01",
      "startTime": "09:00"
    },
    "carerId": {
      "_id": "carer_id",
      "firstName": "Health",
      "lastName": "Carer"
    },
    "status": "allocated",
    "allocatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST /create - Create shift allocation

**Request:**

```bash
curl -X POST "http://54.79.179.57:5000/api/shiftAllocation/create" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "shiftId": "123",
    "carerId": "456"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Shift allocation created successfully",
  "data": {
    "_id": "new_allocation_id",
    "shiftId": "123",
    "carerId": "456",
    "status": "allocated",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### PUT /update/:id - Update shift allocation

**Request:**

```bash
curl -X PUT "http://54.79.179.57:5000/api/shiftAllocation/update/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "carerId": "789",
    "status": "reallocated"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Shift allocation updated successfully",
  "data": {
    "_id": "123",
    "carerId": "789",
    "status": "reallocated",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

#### DELETE /delete/:id - Delete shift allocation

**Request:**

```bash
curl -X DELETE "http://54.79.179.57:5000/api/shiftAllocation/delete/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "message": "Shift allocation deleted successfully"
}
```

### Shift Type (`/api/shiftType`)

#### GET /get-all-shiftType - Get all shift types (paginated)

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/shiftType/get-all-shiftType?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "shift_type_id",
      "name": "Day Shift",
      "startTime": "09:00",
      "endTime": "17:00",
      "description": "Day shift description",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 20,
  "page": 1,
  "limit": 10
}
```

#### POST /create - Create shift type

**Request:**

```bash
curl -X POST "http://54.79.179.57:5000/api/shiftType/create" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Day Shift",
    "startTime": "09:00",
    "endTime": "17:00",
    "description": "Day shift description"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Shift type created successfully",
  "data": {
    "_id": "new_shift_type_id",
    "name": "Day Shift",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### PUT /update/:id - Update shift type

**Request:**

```bash
curl -X PUT "http://54.79.179.57:5000/api/shiftType/update/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Shift",
    "startTime": "08:00",
    "endTime": "16:00"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Shift type updated successfully",
  "data": {
    "_id": "123",
    "name": "Updated Shift",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

#### DELETE /delete/:id - Delete shift type

**Request:**

```bash
curl -X DELETE "http://54.79.179.57:5000/api/shiftType/delete/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "message": "Shift type deleted successfully"
}
```

**Note:** Most endpoints require authentication (`isLoggedIn` middleware).

### Shift Rate (`/api/shiftRate`)

#### GET /get-all-shiftRate - Get all shift rates

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/shiftRate/get-all-shiftRate" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "rate_id",
      "shiftTypeId": "shift_type_id",
      "rate": 25.5,
      "currency": "AUD",
      "effectiveDate": "2024-01-01",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### GET /:id - Get shift rate details

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/shiftRate/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "123",
    "shiftTypeId": {
      "_id": "shift_type_id",
      "name": "Day Shift"
    },
    "rate": 25.5,
    "currency": "AUD",
    "effectiveDate": "2024-01-01",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST /create - Create shift rate

**Request:**

```bash
curl -X POST "http://54.79.179.57:5000/api/shiftRate/create" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "shiftTypeId": "123",
    "rate": 25.50,
    "currency": "AUD",
    "effectiveDate": "2024-01-01"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Shift rate created successfully",
  "data": {
    "_id": "new_rate_id",
    "shiftTypeId": "123",
    "rate": 25.5,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### PUT /update/:id - Update shift rate

**Request:**

```bash
curl -X PUT "http://54.79.179.57:5000/api/shiftRate/update/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "rate": 30.00
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Shift rate updated successfully",
  "data": {
    "_id": "123",
    "rate": 30.0,
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

#### DELETE /delete/:id - Delete shift rate

**Request:**

```bash
curl -X DELETE "http://54.79.179.57:5000/api/shiftRate/delete/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "message": "Shift rate deleted successfully"
}
```

---

## 5. Goals APIs

### Base Path

- `/api/goal`

### Goals (`/api/goal`)

**Note:** All goal endpoints require authentication. Replace `YOUR_JWT_TOKEN` with the actual token from the login flow.

#### GET /getlists - Get all goal details

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/goal/getlists" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "goal_id",
      "clientId": "client_id",
      "title": "Goal Title",
      "description": "Goal description",
      "status": "in_progress",
      "targetDate": "2024-12-31",
      "progress": 50,
      "tasks": [],
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 30,
  "page": 1,
  "limit": 10
}
```

#### GET /getIndividualGoalDetails/:id - Get individual goal details

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/goal/getIndividualGoalDetails/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "123",
    "clientId": {
      "_id": "client_id",
      "firstName": "Client",
      "lastName": "Name"
    },
    "title": "Goal Title",
    "description": "Goal description",
    "status": "in_progress",
    "targetDate": "2024-12-31",
    "progress": 50,
    "tasks": [
      {
        "_id": "task_id",
        "title": "Task Title",
        "status": "completed",
        "dueDate": "2024-01-15"
      }
    ],
    "routines": [],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST /create - Create goal details

**Request:**

```bash
curl -X POST "http://54.79.179.57:5000/api/goal/create" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": "123",
    "title": "Goal Title",
    "description": "Goal description",
    "targetDate": "2024-12-31",
    "category": "health"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Goal created successfully",
  "data": {
    "_id": "new_goal_id",
    "clientId": "123",
    "title": "Goal Title",
    "status": "not_started",
    "progress": 0,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### PUT /update/:id - Update goal details

**Request:**

```bash
curl -X PUT "http://54.79.179.57:5000/api/goal/update/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "description": "Updated description",
    "progress": 75
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Goal updated successfully",
  "data": {
    "_id": "123",
    "title": "Updated Title",
    "progress": 75,
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

#### PUT /updateStatus/:id - Update goal status

**Request:**

```bash
curl -X PUT "http://54.79.179.57:5000/api/goal/updateStatus/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Goal status updated successfully",
  "data": {
    "_id": "123",
    "status": "completed",
    "completedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

#### DELETE /delete/:id - Delete goal details

**Request:**

```bash
curl -X DELETE "http://54.79.179.57:5000/api/goal/delete/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "message": "Goal deleted successfully"
}
```

**Note:** Other goal endpoints follow similar patterns. GET endpoints return goal data, POST endpoints create goals/tasks, PUT endpoints update goals/tasks, and DELETE endpoints remove goals/tasks.

---

## 6. Progress Notes APIs

### Base Paths

- `/api/progress-note`
- `/api/progress-objective`

### Progress Notes (`/api/progress-note`)

**Note:** All progress note endpoints require authentication. Replace `YOUR_JWT_TOKEN` with the actual token from the login flow.

#### GET /getlists/all/:id - Get progress note list

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/progress-note/getlists/all/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "note_id",
      "clientId": "123",
      "appointmentId": "appointment_id",
      "note": "Progress note text",
      "category": "general",
      "createdBy": "user_id",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 20
}
```

#### GET /details/:id - Get progress note details

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/progress-note/details/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "123",
    "clientId": {
      "_id": "client_id",
      "firstName": "Client",
      "lastName": "Name"
    },
    "appointmentId": {
      "_id": "appointment_id",
      "date": "2024-01-01"
    },
    "note": "Detailed progress note text",
    "category": "general",
    "createdBy": {
      "_id": "user_id",
      "firstName": "User",
      "lastName": "Name"
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST /create - Create progress note

**Request:**

```bash
curl -X POST "http://54.79.179.57:5000/api/progress-note/create" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": "123",
    "appointmentId": "appointment_id",
    "note": "Progress note text",
    "category": "general"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Progress note created successfully",
  "data": {
    "_id": "new_note_id",
    "clientId": "123",
    "note": "Progress note text",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### PUT /update/:id - Update progress note

**Request:**

```bash
curl -X PUT "http://54.79.179.57:5000/api/progress-note/update/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "note": "Updated progress note text",
    "category": "medical"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Progress note updated successfully",
  "data": {
    "_id": "123",
    "note": "Updated progress note text",
    "category": "medical",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

#### DELETE /delete/:id - Delete progress note

**Request:**

```bash
curl -X DELETE "http://54.79.179.57:5000/api/progress-note/delete/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "message": "Progress note deleted successfully"
}
```

### Progress Objectives (`/api/progress-objective`)

**Note:** All progress objective endpoints require authentication (`isLoggedIn` middleware).

#### GET /getAllProgressObjective - Get all progress objective list

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/progress-objective/getAllProgressObjective" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "objective_id",
      "name": "Objective Name",
      "description": "Objective description",
      "status": "active",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### GET /getIndividual/:id - Get progress objective details

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/progress-objective/getIndividual/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "123",
    "name": "Objective Name",
    "description": "Objective description",
    "status": "active",
    "targetDate": "2024-12-31",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST /addProgressObjective - Add progress objective

**Request:**

```bash
curl -X POST "http://54.79.179.57:5000/api/progress-objective/addProgressObjective" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Objective Name",
    "description": "Objective description",
    "targetDate": "2024-12-31"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Progress objective created successfully",
  "data": {
    "_id": "new_objective_id",
    "name": "Objective Name",
    "status": "active",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### PUT /updateProgressObjective/:id - Update progress objective

**Request:**

```bash
curl -X PUT "http://54.79.179.57:5000/api/progress-objective/updateProgressObjective/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Objective Name",
    "description": "Updated description",
    "status": "completed"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Progress objective updated successfully",
  "data": {
    "_id": "123",
    "name": "Updated Objective Name",
    "status": "completed",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

#### DELETE /deleteProgressObjective/:id - Delete progress objective

**Request:**

```bash
curl -X DELETE "http://54.79.179.57:5000/api/progress-objective/deleteProgressObjective/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "message": "Progress objective deleted successfully"
}
```

---

## Authentication Notes

- Many endpoints require authentication via the `isLoggedIn` middleware
- Public endpoints are explicitly noted (e.g., form token verification)
- File upload endpoints have specific size and type restrictions (noted in incident intake endpoints)

## Additional Notes

- Soft delete operations are used for most delete endpoints (data is marked as deleted but not permanently removed)
- Export endpoints typically return data in CSV or PDF format
- Some endpoints support pagination (noted where applicable)
- File upload endpoints support specific file types and size limits

---

_Last Updated: Generated from route files in `backend/src/routes/`_
