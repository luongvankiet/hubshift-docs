---
title: Appointment Management APIs
description: Appointment scheduling and management APIs
navigation:
  icon: i-lucide-calendar
seo:
  title: Hubshift Appointment Management APIs
  description: Complete guide to appointment APIs including scheduling, swapping, routines, tasks, and shift notes
---

# Appointment Management APIs

Appointment management APIs handle scheduling, rescheduling, swapping, and management of appointments between health carers and clients. This includes routine and task assignment, shift notes, and expense tracking.

## Base URLs

- **Web APIs**: `/api/appointment`
- **Mobile APIs**: `/api/frontend/appointment`

## Key Concepts

### Appointment Lifecycle

1. **Scheduled**: Appointment created but not started
2. **Started**: Appointment in progress
3. **Completed**: Appointment finished
4. **Cancelled**: Appointment cancelled
5. **Rescheduled**: Appointment time changed

### Appointment Types

- **Regular Appointment**: Standard support work
- **Routine Appointment**: Recurring appointments
- **SIL/SDA Appointment**: Supported Independent Living appointments
- **Shift Appointment**: Extended shift work

## Endpoints

### Get Appointments

#### Get All Appointments

```bash
curl -X GET "http://54.79.179.57:5000/api/appointment/getlists?page=1&limit=10&status=scheduled&startDate=2024-01-01&endDate=2024-12-31" \
  -H "Authorization: Bearer $TOKEN"
```

**Query Parameters:**

- `page`: Page number
- `limit`: Items per page
- `status`: Filter by status
- `startDate`: Start date filter
- `endDate`: End date filter
- `healthCarerId`: Filter by health carer
- `clientId`: Filter by client

**Response:**

```json
{
  "success": true,
  "data": {
    "appointments": [
      {
        "id": "appointment_id",
        "client": {
          "id": "client_id",
          "name": "Jane Smith"
        },
        "healthCarer": {
          "id": "hc_id",
          "name": "John Doe"
        },
        "date": "2024-01-15",
        "startTime": "09:00",
        "endTime": "17:00",
        "duration": 8,
        "serviceType": "Support Work",
        "status": "scheduled",
        "location": {
          "address": "123 Main St, Melbourne VIC 3000"
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

#### Get Calendar Appointments

```bash
curl -X GET "http://54.79.179.57:5000/api/appointment/get-calendar-appointments?startDate=2024-01-01&endDate=2024-12-31&healthCarerId=hc_id" \
  -H "Authorization: Bearer $TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "appointment_id",
      "title": "Support Work - Jane Smith",
      "start": "2024-01-15T09:00:00Z",
      "end": "2024-01-15T17:00:00Z",
      "status": "scheduled"
    }
  ]
}
```

#### Get Client Appointments

```bash
curl -X GET http://54.79.179.57:5000/api/appointment/appointmentListsClient/CLIENT_ID \
  -H "Authorization: Bearer $TOKEN"
```

#### Get Health Carer Appointments

```bash
curl -X GET http://54.79.179.57:5000/api/appointment/HcarerListAppointments/HEALTH_CARER_ID \
  -H "Authorization: Bearer $TOKEN"
```

#### Get Today's Appointments (Mobile)

```bash
curl -X GET http://54.79.179.57:5000/api/frontend/appointment/getTodaysAppointment/USER_ID \
  -H "Authorization: Bearer $TOKEN"
```

### Create Appointment

#### Create New Appointment

```bash
curl -X POST http://54.79.179.57:5000/api/appointment/create \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": "client_id",
    "healthCarerId": "hc_id",
    "date": "2024-01-15",
    "startTime": "09:00",
    "endTime": "17:00",
    "serviceType": "Support Work",
    "serviceTaskId": "service_task_id",
    "location": {
      "address": "123 Main St, Melbourne VIC 3000",
      "latitude": -37.8136,
      "longitude": 144.9631
    },
    "notes": "Initial appointment notes"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Appointment created successfully",
  "data": {
    "id": "new_appointment_id",
    "client": {
      "name": "Jane Smith"
    },
    "healthCarer": {
      "name": "John Doe"
    },
    "date": "2024-01-15",
    "startTime": "09:00",
    "endTime": "17:00",
    "status": "scheduled"
  }
}
```

### Update Appointment

#### Update Appointment

```bash
curl -X PUT http://54.79.179.57:5000/api/appointment/update/APPOINTMENT_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "startTime": "10:00",
    "endTime": "18:00",
    "notes": "Updated notes"
  }'
```

#### Update Appointment Status

```bash
curl -X PUT http://54.79.179.57:5000/api/appointment/update/status/APPOINTMENT_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "started"
  }'
```

#### Reschedule Appointment

```bash
curl -X PUT http://54.79.179.57:5000/api/appointment/update/rescheduledAppointment/APPOINTMENT_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2024-01-16",
    "startTime": "09:00",
    "endTime": "17:00",
    "reason": "Client request"
  }'
```

### Delete Appointment

#### Delete Appointment

```bash
curl -X DELETE http://54.79.179.57:5000/api/appointment/delete/APPOINTMENT_ID \
  -H "Authorization: Bearer $TOKEN"
```

### Appointment Swapping

#### Get Swap Availability

```bash
curl -X GET "http://54.79.179.57:5000/api/appointment/health-carer/swap-apt/get-all/swap-appointment-availability-list?date=2024-01-15&startTime=09:00&endTime=17:00" \
  -H "Authorization: Bearer $TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "healthCarerId": "hc_id",
      "name": "Jane Worker",
      "available": true,
      "existingAppointments": []
    }
  ]
}
```

#### Swap Appointment

```bash
curl -X PUT http://54.79.179.57:5000/api/appointment/swapAppointment/APPOINTMENT_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "newHealthCarerId": "new_hc_id",
    "reason": "Original health carer unavailable"
  }'
```

### Routine and Task Management

#### Add Routine

```bash
curl -X PUT http://54.79.179.57:5000/api/appointment/add-routine/APPOINTMENT_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "routineName": "Morning Routine",
    "tasks": [
      {
        "name": "Assist with breakfast",
        "description": "Help prepare and serve breakfast"
      }
    ]
  }'
```

#### Add Task to Routine

```bash
curl -X PUT http://54.79.179.57:5000/api/appointment/add-task/APPOINTMENT_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "routineId": "routine_id",
    "task": {
      "name": "New task",
      "description": "Task description"
    }
  }'
```

#### Get Assigned Tasks

```bash
curl -X GET http://54.79.179.57:5000/api/appointment/getAssignTask/APPOINTMENT_ID \
  -H "Authorization: Bearer $TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "routines": [
      {
        "id": "routine_id",
        "name": "Morning Routine",
        "tasks": [
          {
            "id": "task_id",
            "name": "Assist with breakfast",
            "status": "pending",
            "completedAt": null
          }
        ]
      }
    ]
  }
}
```

#### Update Routine Task

```bash
curl -X PUT http://54.79.179.57:5000/api/appointment/routine/update-task/APPOINTMENT_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "taskId": "task_id",
    "status": "completed",
    "notes": "Task completed successfully"
  }'
```

### Shift Notes

#### Get Shift Notes

```bash
curl -X GET http://54.79.179.57:5000/api/appointment/super-admin/shiftNote-list/APPOINTMENT_ID \
  -H "Authorization: Bearer $TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "note_id",
      "appointmentId": "appointment_id",
      "content": "Shift notes content",
      "type": "shift_note",
      "createdAt": "2024-01-15T10:00:00Z",
      "createdBy": {
        "id": "hc_id",
        "name": "John Doe"
      }
    }
  ]
}
```

#### Get Continue Shift Notes

```bash
curl -X GET http://54.79.179.57:5000/api/appointment/shiftNote-list/APPOINTMENT_ID \
  -H "Authorization: Bearer $TOKEN"
```

### Expenses

#### Add Expense to Appointment

```bash
curl -X PUT http://54.79.179.57:5000/api/appointment/update-appointment-expense/APPOINTMENT_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "expenses": [
      {
        "type": "travel",
        "amount": 25.50,
        "description": "Taxi fare",
        "receipt": "receipt_url"
      }
    ]
  }'
```

#### Get Expense Data

```bash
curl -X GET http://54.79.179.57:5000/api/appointment/getExpenseData/APPOINTMENT_ID \
  -H "Authorization: Bearer $TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "expenses": [
      {
        "id": "expense_id",
        "type": "travel",
        "amount": 25.5,
        "description": "Taxi fare",
        "receipt": "receipt_url",
        "createdAt": "2024-01-15T10:00:00Z"
      }
    ],
    "totalAmount": 25.5
  }
}
```

### Appointment Details

#### Get Appointment Details

```bash
curl -X GET http://54.79.179.57:5000/api/appointment/APPOINTMENT_ID \
  -H "Authorization: Bearer $TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "appointment_id",
    "client": {
      "id": "client_id",
      "name": "Jane Smith",
      "address": "123 Main St, Melbourne VIC 3000"
    },
    "healthCarer": {
      "id": "hc_id",
      "name": "John Doe"
    },
    "date": "2024-01-15",
    "startTime": "09:00",
    "endTime": "17:00",
    "duration": 8,
    "serviceType": "Support Work",
    "status": "scheduled",
    "location": {
      "address": "123 Main St, Melbourne VIC 3000",
      "latitude": -37.8136,
      "longitude": 144.9631
    },
    "routines": [],
    "expenses": [],
    "notes": [],
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

### Appointment Approval

#### Approve Multiple Appointments

```bash
curl -X PUT http://54.79.179.57:5000/api/appointment/approveMultipleAppointments \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "appointmentIds": ["appointment_id_1", "appointment_id_2"],
    "approved": true,
    "notes": "Approved by supervisor"
  }'
```

### Search Appointments

#### Search Appointments

```bash
curl -X GET "http://54.79.179.57:5000/api/appointment/searchAppointments?search=jane&status=scheduled&startDate=2024-01-01&endDate=2024-12-31" \
  -H "Authorization: Bearer $TOKEN"
```

**Query Parameters:**

- `search`: Search term (client name, health carer name)
- `status`: Filter by status
- `startDate`: Start date filter
- `endDate`: End date filter

### Export Appointments

#### Export Appointments

```bash
curl -X GET "http://54.79.179.57:5000/api/appointment/export/exportAppointmentData?startDate=2024-01-01&endDate=2024-12-31&format=csv" \
  -H "Authorization: Bearer $TOKEN" \
  -o appointments_export.csv
```

**Query Parameters:**

- `startDate`: Start date
- `endDate`: End date
- `healthCarerId`: Filter by health carer
- `clientId`: Filter by client
- `format`: Export format (csv, excel)

**Response:** File download

### Mobile-Specific Endpoints

#### Get All Appointments (Mobile)

```bash
curl -X GET http://54.79.179.57:5000/api/frontend/appointment/AllAppointmentMob \
  -H "Authorization: Bearer $TOKEN"
```

#### Update Appointment Status (Mobile)

```bash
curl -X PUT http://54.79.179.57:5000/api/frontend/appointment/UpdateAppointmentStatusMob/APPOINTMENT_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "started"
  }'
```

#### Get Dashboard Count (Mobile)

```bash
curl -X GET http://54.79.179.57:5000/api/frontend/appointment/dashboardcount/USER_ID \
  -H "Authorization: Bearer $TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "todayAppointments": 3,
    "upcomingAppointments": 10,
    "completedAppointments": 25,
    "pendingApprovals": 2
  }
}
```

## Error Responses

### Appointment Not Found

```json
{
  "success": false,
  "message": "Appointment not found"
}
```

### Validation Error

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "date": "Date is required",
    "startTime": "Start time must be before end time"
  }
}
```

### Conflict Error

```json
{
  "success": false,
  "message": "Health carer already has an appointment at this time"
}
```

## Best Practices

1. **Scheduling**

   - Check health carer availability before creating
   - Validate time conflicts
   - Send notifications for new appointments

2. **Status Management**

   - Update status in real-time
   - Track status changes with timestamps
   - Maintain status history

3. **Routine and Tasks**

   - Keep tasks specific and measurable
   - Track task completion
   - Allow task notes and updates

4. **Shift Notes**

   - Encourage detailed notes
   - Timestamp all entries
   - Support continuation notes

5. **Expenses**
   - Require receipts for expenses
   - Set expense limits
   - Categorize expenses properly
