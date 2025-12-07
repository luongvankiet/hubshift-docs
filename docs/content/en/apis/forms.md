---
title: Forms APIs
description: Form template, category, submission, and field group management APIs
navigation:
  icon: i-lucide-file-text
seo:
  title: Hubshift Forms APIs
  description: Complete guide to forms APIs including templates, categories, submissions, and field groups
---

# Forms APIs

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

