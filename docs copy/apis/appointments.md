# Appointment Management APIs

## Overview

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
```http
GET /api/appointment/getlists
Authorization: Bearer <token>
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
```http
GET /api/appointment/get-calendar-appointments
Authorization: Bearer <token>
```

**Query Parameters:**
- `startDate`: Calendar start date
- `endDate`: Calendar end date
- `healthCarerId`: Filter by health carer
- `clientId`: Filter by client

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
```http
GET /api/appointment/appointmentListsClient/:id
Authorization: Bearer <token>
```

#### Get Health Carer Appointments
```http
GET /api/appointment/HcarerListAppointments/:id
Authorization: Bearer <token>
```

#### Get Today's Appointments (Mobile)
```http
GET /api/frontend/appointment/getTodaysAppointment/:id
Authorization: Bearer <token>
```

### Create Appointment

#### Create New Appointment
```http
POST /api/appointment/create
Authorization: Bearer <token>
Content-Type: application/json

{
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
}
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
```http
PUT /api/appointment/update/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "startTime": "10:00",
  "endTime": "18:00",
  "notes": "Updated notes"
}
```

#### Update Appointment Status
```http
PUT /api/appointment/update/status/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "started"
}
```

#### Reschedule Appointment
```http
PUT /api/appointment/update/rescheduledAppointment/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "date": "2024-01-16",
  "startTime": "09:00",
  "endTime": "17:00",
  "reason": "Client request"
}
```

#### Update Appointment Time from Timesheet
```http
POST /api/appointment/update-appointment-time
Authorization: Bearer <token>
Content-Type: application/json

{
  "appointmentId": "appointment_id",
  "actualStartTime": "09:15",
  "actualEndTime": "17:30"
}
```

### Delete Appointment

#### Delete Appointment
```http
DELETE /api/appointment/delete/:id
Authorization: Bearer <token>
```

#### Delete SIL Appointment
```http
DELETE /api/appointment/delete/silApp/:date/:silsdaId/:shiftType
Authorization: Bearer <token>
```

### Appointment Swapping

#### Get Swap Availability
```http
GET /api/appointment/health-carer/swap-apt/get-all/swap-appointment-availability-list
Authorization: Bearer <token>
```

**Query Parameters:**
- `date`: Date to check
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
      "name": "Jane Worker",
      "available": true,
      "existingAppointments": []
    }
  ]
}
```

#### Swap Appointment
```http
PUT /api/appointment/swapAppointment/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "newHealthCarerId": "new_hc_id",
  "reason": "Original health carer unavailable"
}
```

#### Get Swapped Appointment Details
```http
GET /api/appointment/details/swaped/:id
Authorization: Bearer <token>
```

### Routine and Task Management

#### Add Routine
```http
PUT /api/appointment/add-routine/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "routineName": "Morning Routine",
  "tasks": [
    {
      "name": "Assist with breakfast",
      "description": "Help prepare and serve breakfast"
    }
  ]
}
```

#### Add Task to Routine
```http
PUT /api/appointment/add-task/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "routineId": "routine_id",
  "task": {
    "name": "New task",
    "description": "Task description"
  }
}
```

#### Get Assigned Tasks
```http
GET /api/appointment/getAssignTask/:id
Authorization: Bearer <token>
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
```http
PUT /api/appointment/routine/update-task/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "taskId": "task_id",
  "status": "completed",
  "notes": "Task completed successfully"
}
```

### Shift Notes

#### Get Shift Notes
```http
GET /api/appointment/super-admin/shiftNote-list/:id
Authorization: Bearer <token>
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
```http
GET /api/appointment/shiftNote-list/:id
Authorization: Bearer <token>
```

#### Get Individual Shift Note
```http
GET /api/frontend/appointment/getIndivisualShiftnoteDetails/:id
Authorization: Bearer <token>
```

#### Delete Continue Shift Note
```http
DELETE /api/frontend/appointment/ContinueShiftNotedelete/:id
Authorization: Bearer <token>
```

#### Update Continue Shift Note Status
```http
PUT /api/appointment/updateContinueShiftNoteCompleted/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "completed"
}
```

### Expenses

#### Add Expense to Appointment
```http
PUT /api/appointment/update-appointment-expense/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "expenses": [
    {
      "type": "travel",
      "amount": 25.50,
      "description": "Taxi fare",
      "receipt": "receipt_url"
    }
  ]
}
```

#### Get Expense Data
```http
GET /api/appointment/getExpenseData/:id
Authorization: Bearer <token>
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
        "amount": 25.50,
        "description": "Taxi fare",
        "receipt": "receipt_url",
        "createdAt": "2024-01-15T10:00:00Z"
      }
    ],
    "totalAmount": 25.50
  }
}
```

### Appointment Details

#### Get Appointment Details
```http
GET /api/appointment/:id
Authorization: Bearer <token>
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

#### Get Individual Appointment Details
```http
GET /api/appointment/appointment-details/:id
Authorization: Bearer <token>
```

#### Get Started Appointment Details
```http
GET /api/appointment/getStartedAppointmentDetails/:id
Authorization: Bearer <token>
```

### Appointment Approval

#### Approve Multiple Appointments
```http
PUT /api/appointment/approveMultipleAppointments
Authorization: Bearer <token>
Content-Type: application/json

{
  "appointmentIds": ["appointment_id_1", "appointment_id_2"],
  "approved": true,
  "notes": "Approved by supervisor"
}
```

### Search Appointments

#### Search Appointments
```http
GET /api/appointment/searchAppointments?search=jane
Authorization: Bearer <token>
```

**Query Parameters:**
- `search`: Search term (client name, health carer name)
- `status`: Filter by status
- `startDate`: Start date filter
- `endDate`: End date filter

### Export Appointments

#### Export Appointments
```http
GET /api/appointment/export/exportAppointmentData
Authorization: Bearer <token>
```

**Query Parameters:**
- `startDate`: Start date
- `endDate`: End date
- `healthCarerId`: Filter by health carer
- `clientId`: Filter by client
- `format`: Export format (csv, excel)

**Response:** File download

#### Export Health Carer Timesheet
```http
GET /api/appointment/exporthealthCarerTimesheet/:id
Authorization: Bearer <token>
```

### Mobile-Specific Endpoints

#### Get All Appointments (Mobile)
```http
GET /api/frontend/appointment/AllAppointmentMob
Authorization: Bearer <token>
```

#### Update Appointment Status (Mobile)
```http
PUT /api/frontend/appointment/UpdateAppointmentStatusMob/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "started"
}
```

#### Start Full Appointment (Mobile)
```http
PUT /api/frontend/appointment/AppointmentStartFull/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "actualStartTime": "09:15"
}
```

#### Get Dashboard Count (Mobile)
```http
GET /api/frontend/appointment/dashboardcount/:id
Authorization: Bearer <token>
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

## Implementation Examples

### Create Appointment with Routine
```javascript
// Create appointment and add routine
const createAppointmentWithRoutine = async (appointmentData, routineData) => {
  // Create appointment
  const appointmentResponse = await axios.post(
    '/api/appointment/create',
    appointmentData
  );
  const appointmentId = appointmentResponse.data.data.id;
  
  // Add routine
  await axios.put(
    `/api/appointment/add-routine/${appointmentId}`,
    routineData
  );
  
  return appointmentResponse.data;
};
```

### Swap Appointment
```javascript
// Swap appointment to new health carer
const swapAppointment = async (appointmentId, newHealthCarerId, reason) => {
  const response = await axios.put(
    `/api/appointment/swapAppointment/${appointmentId}`,
    {
      newHealthCarerId,
      reason
    }
  );
  
  return response.data;
};
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

