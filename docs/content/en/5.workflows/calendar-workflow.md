---
title: Calendar/Appointments Workflow
description: Complete guide to scheduling and managing appointments
navigation:
  icon: i-lucide-calendar
seo:
  title: Hubshift Calendar/Appointments Workflow
  description: Step-by-step guide to appointments workflow including availability, creation, management, and completion
---

# Calendar/Appointments Workflow

## Overview

The Calendar/Appointments workflow enables health carers to set their availability, administrators to create appointments, and all users to view and manage appointments through a calendar interface. Appointments can include routines, tasks, expenses, and shift notes.

**Purpose:** Schedule and manage appointments between clients and health carers, track availability, and manage appointment-related activities

**Key Users:** Super Admin, Health Carers, Clients, Support Coordinators

## High-Level Flow

```
Set Availability (Health Carer)
    ↓
Create Appointment (Admin/Coordinator)
    ↓
View Calendar
    ↓
Manage Appointment (Update/Swap/Add Tasks)
    ↓
Complete Appointment (Add Timesheet/Notes)
    ↓
Appointment Completed
```

## Prerequisites

- User must be logged in
- Health Carer profile must be created
- Client profile must be created
- Appointment types must be configured (optional)

## Detailed Step-by-Step Process

### 1. Setting Availability

**User Role:** Health Carer

**Navigation Path:** `/health-carer/availability`

**Component:** `frontend/src/pages/healthCarer/availability/Availibility.js`

**Steps:**
1. Navigate to Availability page
2. Select shift types you're available for (Day Shift, Night Shift, Sleepover, etc.)
3. Choose availability period:
   - **Weekly:** Set availability for each day of the week
   - **Monthly:** Set availability for specific dates in a month
4. For each day/date:
   - Click on the calendar cell
   - Select start time and end time
   - Choose shift type
   - Add multiple time slots if needed
5. For Sleepover shifts:
   - Check sleepover days
   - Set sleepover times
6. Review your availability on the calendar view
7. Click "Save Availability"
8. Availability is saved and visible to administrators

**Component:** `frontend/src/components/set-availability/Calendar.js`  
**API Endpoints:**
- `POST /api/setAvailability/create` - Create/update availability
- `GET /api/setAvailability/get-availability-by-userid/:id` - Get user availability
- `POST /api/setAvailability/check-availability-by-userid/:id` - Check availability for specific time

**Availability Types:**
- **Weekly Availability:** Recurring weekly schedule
- **Monthly Availability:** Specific dates in a month
- **One-time Availability:** Single date availability

### 2. Creating Appointments

**User Role:** Super Admin, Support Coordinator

**Navigation Path:** `/super-admin/add-appointment` or `/health-carer/add-appointment`

**Component:** `frontend/src/pages/healthCarer/appointment/Create-Appointment.js`  
**Component:** `frontend/src/pages/superAdmin/appointment/add-appointment.js`

**Steps:**
1. Navigate to "Add Appointment" page
2. Fill in appointment details:
   - **Client:** Select client from dropdown
   - **Health Carer:** Select health carer (or leave unassigned)
   - **Appointment Type:** Choose type (Home Visit, Community Access, etc.)
   - **Date:** Select appointment date
   - **Start Time:** Set start time
   - **End Time:** Set end time
   - **Location:** Enter or select location (client address by default)
3. Add routines and tasks (optional):
   - Click "Add Routine" or "Add Task"
   - Select routine/task from list
   - Configure task details
4. Add expenses (optional):
   - Click "Add Expense"
   - Enter expense type and amount
5. Add notes (optional):
   - Enter appointment notes
6. Set appointment status:
   - **Pending:** Awaiting approval
   - **Accepted:** Accepted by health carer
   - **Scheduled:** Confirmed appointment
7. Click "Create Appointment"
8. Appointment appears on calendar
9. Notifications sent to relevant parties

**API Endpoints:**
- `POST /api/appointment/create` - Create appointment
- `GET /api/appointmentType/list/appointment-type` - Get appointment types
- `GET /api/appointment/get-calendar-appointments` - Get calendar view

**From Availability Calendar:**
- Click on available time slot in calendar
- Pre-fills health carer, date, and time
- Complete remaining details
- Create appointment

### 3. Viewing Calendar

**User Role:** All roles (with appropriate filters)

**Navigation Path:** 
- Health Carer: `/health-carer/calendar`
- Super Admin: `/super-admin/calendar`
- Client: `/client/calendar`

**Component:** `frontend/src/pages/healthCarer/appointment/Calender.js`  
**Component:** `frontend/src/components/calendar-view/Calendar.js`

**Steps:**
1. Navigate to Calendar page
2. Calendar displays appointments as events
3. Use filters to narrow view:
   - **Status:** Pending, Completed, Approved, etc.
   - **Appointment Type:** Filter by type
   - **Date Range:** Select start and end dates
   - **Search:** Search by client name or other criteria
4. View calendar in different modes:
   - **Month View:** See entire month
   - **Week View:** See week at a time
   - **Day View:** See single day
5. Click on appointment event to view details
6. Use navigation arrows to move between months/weeks

**API Endpoints:**
- `GET /api/appointment/get-calendar-appointments?startDate=DATE&endDate=DATE` - Get appointments for date range
- `GET /api/appointment/getlists` - Get appointment list
- `GET /api/appointment/searchAppointments` - Search appointments

**Calendar Event Colors:**
- Different colors indicate different statuses or types
- Hover over events for quick info
- Click events for full details

### 4. Managing Appointments

**User Role:** Super Admin, Health Carer (for own appointments), Support Coordinator

**Navigation Path:** Click appointment from calendar or list

**Steps:**

#### Viewing Appointment Details
1. Click on appointment from calendar or list
2. View full appointment details:
   - Client information
   - Health carer information
   - Date, time, location
   - Status
   - Routines and tasks
   - Expenses
   - Notes
   - Shift notes

**API Endpoint:** `GET /api/appointment/:id`

#### Updating Appointment
1. Open appointment details
2. Click "Edit" button
3. Modify appointment details:
   - Change date/time
   - Update location
   - Modify routines/tasks
   - Update expenses
   - Change notes
4. Click "Save Changes"
5. Appointment updated and notifications sent

**API Endpoint:** `PUT /api/appointment/update/:id`

#### Swapping Appointments
1. Open appointment details
2. Click "Swap Appointment" button
3. Select new health carer
4. Enter swap reason (optional)
5. Confirm swap
6. Original health carer notified
7. New health carer receives notification
8. Appointment reassigned

**API Endpoint:** `PUT /api/appointment/swapAppointment/:id`

#### Adding Routines/Tasks
1. Open appointment details
2. Click "Add Routine" or "Add Task"
3. Select routine/task from list
4. Configure task details:
   - Task name
   - Instructions
   - Due time
   - Status
5. Save task
6. Task appears in appointment

**API Endpoints:**
- `POST /api/appointment/addTask` - Add task
- `PUT /api/appointment/add-routine/:id` - Add routine
- `PUT /api/appointment/editTask/:id` - Edit task

#### Adding Expenses
1. Open appointment details
2. Click "Add Expense"
3. Fill expense details:
   - Expense type
   - Amount
   - Description
   - Receipt (optional upload)
4. Save expense
5. Expense added to appointment

**API Endpoint:** `PUT /api/appointment/update-appointment-expense/:id`

#### Updating Appointment Status
1. Open appointment details
2. Click status dropdown
3. Select new status:
   - **Pending:** Awaiting approval
   - **Accepted:** Accepted by health carer
   - **Started:** Appointment in progress
   - **Completed:** Appointment finished
   - **Cancelled:** Appointment cancelled
4. Add status notes if required
5. Save status change
6. Status updated and notifications sent

**API Endpoint:** `PUT /api/appointment/update/status/:id`

### 5. Completing Appointments

**User Role:** Health Carer

**Steps:**
1. Start appointment:
   - Open appointment details
   - Click "Start Appointment"
   - Status changes to "Started"
2. Complete routines and tasks:
   - Mark tasks as completed
   - Add task notes
   - Upload task-related files if needed
3. Add shift notes:
   - Click "Add Shift Note"
   - Enter note text
   - Link to objectives if applicable
   - Save note
4. Record expenses:
   - Add any expenses incurred
   - Upload receipts
5. Complete appointment:
   - Click "Complete Appointment"
   - Add completion notes
   - Status changes to "Completed"
6. Submit timesheet:
   - Timesheet automatically created
   - Review timesheet details
   - Submit for approval

**API Endpoints:**
- `PUT /api/appointment/update/status/:id` - Update status
- `PUT /api/appointment/addNote/:id` - Add note
- `POST /api/appointment/update-appointment-time` - Update time from timesheet

### 6. Appointment Approval Workflow

**User Role:** Super Admin, Support Coordinator

**Steps:**
1. View pending appointments
2. Review appointment details
3. Approve or reject:
   - **Approve:** Click "Approve" button
   - **Reject:** Click "Reject" and provide reason
4. Bulk approval (if available):
   - Select multiple appointments
   - Click "Approve Multiple"
   - All selected appointments approved

**API Endpoint:** `PUT /api/appointment/approveMultipleAppointments`

## User Roles and Permissions

### Super Admin
- ✅ View all appointments
- ✅ Create appointments for any client/carer
- ✅ Edit any appointment
- ✅ Swap appointments
- ✅ Approve/reject appointments
- ✅ View all availability
- ✅ Export appointment data

### Health Carer
- ✅ Set own availability
- ✅ View own appointments
- ✅ Accept/reject assigned appointments
- ✅ Start and complete appointments
- ✅ Add shift notes
- ✅ Update appointment times
- ✅ Swap own appointments (if permitted)
- ❌ Cannot create appointments for others

### Support Coordinator
- ✅ Create appointments for assigned clients
- ✅ View client appointments
- ✅ Approve appointments
- ✅ Manage appointment details
- ✅ View health carer availability

### Client
- ✅ View own appointments
- ✅ See appointment details
- ✅ Request appointment changes
- ❌ Cannot create or edit appointments directly

## Related API Endpoints

See [API Documentation](../api-documentation.md#2-calendarappointments-apis) for complete endpoint details:

- **Appointments:** `/api/appointment`
- **Appointment Types:** `/api/appointmentType`
- **Availability:** `/api/setAvailability`
- **Meetings:** `/api/meeting`
- **Appointment Checklist:** `/api/appointmentCheckListQuestion`

## Common Issues and Troubleshooting

### Issue: Cannot see availability slots
**Solution:** 
- Verify health carer has set availability
- Check date range filters
- Ensure correct shift type selected
- Check user permissions

### Issue: Appointment creation fails
**Solution:**
- Verify client and health carer are selected
- Check date/time is valid (not in past)
- Ensure required fields are filled
- Verify health carer availability for selected time

### Issue: Cannot swap appointment
**Solution:**
- Check swap permissions for your role
- Verify new health carer has availability
- Ensure appointment is not already completed
- Check appointment status allows swapping

### Issue: Timesheet not created after completion
**Solution:**
- Verify appointment status is "Completed"
- Check timesheet settings
- Ensure appointment has valid time entries
- Contact administrator if issue persists

### Issue: Calendar not loading
**Solution:**
- Check date range is valid
- Verify filters are not too restrictive
- Refresh page
- Check internet connection
- Clear browser cache

## Workflow Variations

### Recurring Appointments
- Create appointment series
- Set recurrence pattern (daily, weekly, monthly)
- All appointments created at once
- Can modify individual appointments in series

### SIL/SDA Appointments
- Special appointment type for Supported Independent Living
- Includes location-specific details
- May have different approval workflow
- Linked to SIL/SDA shift types

### Appointment from Explore Market
- Clients can request support through Explore Market
- Requests converted to appointments
- Health carers can accept requests
- Automatic appointment creation

### Meeting Appointments
- Separate meeting system
- Video conferencing integration
- Meeting links generated automatically
- Separate calendar view for meetings

---

_Related Files:_
- `frontend/src/pages/healthCarer/appointment/Calender.js`
- `frontend/src/pages/healthCarer/appointment/Create-Appointment.js`
- `frontend/src/pages/healthCarer/availability/Availibility.js`
- `frontend/src/components/calendar-view/Calendar.js`
- `frontend/src/components/set-availability/Calendar.js`

