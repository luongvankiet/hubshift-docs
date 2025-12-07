---
title: Progress Notes APIs
description: Progress note and objective management APIs
navigation:
  icon: i-lucide-file-edit
seo:
  title: Hubshift Progress Notes APIs
  description: Complete guide to progress notes APIs including creation, linking to appointments/goals, and objectives
---

# Progress Notes APIs

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

