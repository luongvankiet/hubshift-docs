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
curl -X GET "http://54.79.179.57:5000/api/appointment/getlists?page=1" \
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

#### GET /\:id - Get appointment details

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

#### PUT /update/\:id - Update appointment

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

#### GET /\:id - Get appointment type details

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

#### PUT /update/\:id - Update appointment type

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

#### DELETE /delete/\:id - Delete appointment type (soft delete)

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

#### GET /\:id - Get question details

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

#### PUT /update/\:id - Update question

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

#### DELETE /delete/\:id - Delete question (soft delete)

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

#### GET /\:id - Get meeting details

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

#### PUT /update/\:id - Update meeting details

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

#### PUT /updateStatus/\:id - Update meeting status

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

#### PUT /cancelScheduledMeeting/\:id - Cancel scheduled meeting

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

#### DELETE /delete/\:id - Delete meeting

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

#### GET /get-availability-by-userid/\:id - Get availability by user ID

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

#### GET /\:id - Get availability details

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

#### POST /check-availability-by-userid/\:id - Check availability by user ID

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

#### PUT /update/\:id - Update availability

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

#### DELETE /delete/\:id - Delete availability (soft delete)

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
