---
title: Goals APIs
description: Client goal management APIs with tasks and routines
navigation:
  icon: i-lucide-target
seo:
  title: Hubshift Goals APIs
  description: Complete guide to goals APIs including creation, tracking, tasks, and routines
---

# Goals APIs

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

