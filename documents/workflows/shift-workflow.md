# Shift Workflow

## Overview

The Shift workflow enables administrators to create shift types, health carers to set their availability, administrators to create shifts and allocate them to health carers, and manage shift schedules including swapping and updates.

**Purpose:** Create shift types, manage shift schedules, allocate shifts to health carers, and track shift completion

**Key Users:** Super Admin, Health Carers, Support Coordinators

## High-Level Flow

```
Create Shift Type
    ↓
Set Availability (Health Carer)
    ↓
Create Shift
    ↓
Allocate Shift to Health Carer
    ↓
Manage Shift (Update/Swap)
    ↓
Complete Shift
```

## Prerequisites

- User must be logged in
- Shift types must be created (for creating shifts)
- Health carer profiles must exist
- Client profiles must exist (for client-specific shifts)

## Detailed Step-by-Step Process

### 1. Creating Shift Types

**User Role:** Super Admin

**Navigation Path:** `/super-admin/shift-type/list`

**Component:** `frontend/src/pages/superAdmin/shift-type/`

**Steps:**
1. Navigate to Shift Types page
2. Click "Add Shift Type" button
3. Fill in shift type details:
   - **Name:** Enter shift type name (e.g., "Day Shift", "Night Shift", "Sleepover")
   - **Start Time:** Default start time for this shift type
   - **End Time:** Default end time for this shift type
   - **Description:** Optional description
   - **Icon:** Upload or select icon (optional)
4. Set shift type status:
   - **Active:** Available for use
   - **Inactive:** Not available for new shifts
5. Click "Save"
6. Shift type created and available for use

**API Endpoints:**
- `GET /api/shiftType/get-all-shiftType` - List all shift types
- `POST /api/shiftType/create` - Create shift type
- `PUT /api/shiftType/update/:id` - Update shift type
- `DELETE /api/shiftType/delete/:id` - Delete shift type

**Common Shift Types:**
- Day Shift (e.g., 9:00 AM - 5:00 PM)
- Night Shift (e.g., 10:00 PM - 6:00 AM)
- Sleepover (overnight support)
- Weekend Shift
- On-Call Shift

### 2. Setting Availability

**User Role:** Health Carer

**Note:** Availability setting is covered in detail in the [Calendar Workflow](./calendar-workflow.md#1-setting-availability). This section provides shift-specific context.

**Navigation Path:** `/health-carer/availability`

**Component:** `frontend/src/pages/healthCarer/availability/Availibility.js`

**Steps:**
1. Navigate to Availability page
2. Select shift types you're available for
3. Set availability for each shift type:
   - **Weekly:** Set recurring weekly availability
   - **Monthly:** Set specific dates
   - **One-time:** Set single date availability
4. For each time slot:
   - Select date/day
   - Choose shift type
   - Set start and end times
   - Save slot
5. Availability visible to administrators for shift allocation

**API Endpoints:**
- `POST /api/setAvailability/create` - Set availability
- `GET /api/setAvailability/get-availability-by-userid/:id` - Get user availability
- `GET /api/setAvailability/get-all-calendar-availability` - Get calendar view

### 3. Creating Shifts

**User Role:** Super Admin, Support Coordinator

**Navigation Path:** `/super-admin/create-shift` or `/super-admin/sil-sda/create-shift`

**Component:** `frontend/src/pages/superAdmin/sil-sda/new-sil-sda-appointment.js`

**Steps:**

#### Standard Shift Creation
1. Navigate to "Create Shift" page
2. Fill in shift details:
   - **Client:** Select client from dropdown
   - **Shift Type:** Choose shift type (Day, Night, Sleepover, etc.)
   - **Date:** Select shift date
   - **Start Time:** Set start time
   - **End Time:** Set end time
   - **Location:** Enter or select location
3. Set shift status:
   - **Scheduled:** Shift created but not allocated
   - **Allocated:** Shift assigned to health carer
4. Add notes (optional):
   - Shift-specific instructions
   - Client requirements
   - Special considerations
5. Click "Create Shift"
6. Shift created and appears in shift list

#### SIL/SDA Shift Creation
1. Navigate to SIL/SDA shift creation page
2. Select client (SIL/SDA location)
3. Choose shift type
4. Set date and time
5. Configure recurrence (if needed):
   - **One-time:** Single shift
   - **Weekly:** Recurring weekly
   - **Three-week:** Every three weeks
   - **Four-week:** Every four weeks
6. Set number of occurrences
7. Create shift(s)

**API Endpoints:**
- `POST /api/createShift/create` - Create shift
- `GET /api/createShift/getlists` - List all shifts
- `GET /api/createShift/:id` - Get shift details

### 4. Allocating Shifts

**User Role:** Super Admin, Support Coordinator

**Steps:**
1. View shift list or open shift details
2. Identify unallocated shifts:
   - Shifts with status "Scheduled"
   - Shifts without assigned health carer
3. Open shift details
4. Click "Allocate Shift" or "Assign Health Carer"
5. View available health carers:
   - Filter by availability
   - Filter by location
   - Filter by qualifications
6. Select health carer:
   - Review health carer availability
   - Check qualifications match requirements
   - Verify location compatibility
7. Confirm allocation
8. Shift status changes to "Allocated"
9. Health carer receives notification
10. Shift appears in health carer's schedule

**API Endpoints:**
- `POST /api/shiftAllocation/create` - Create shift allocation
- `GET /api/shiftAllocation/getlists` - List allocations
- `PUT /api/shiftAllocation/update/:id` - Update allocation

**Allocation Considerations:**
- Health carer availability
- Health carer qualifications
- Client preferences
- Location proximity
- Previous shift assignments
- Workload balance

### 5. Managing Shifts

**User Role:** Super Admin, Health Carer (for own shifts)

**Steps:**

#### Viewing Shifts
1. Navigate to shift list page
2. View shifts in table or calendar format
3. Filter shifts by:
   - **Status:** Scheduled, Allocated, Completed, Cancelled
   - **Shift Type:** Filter by type
   - **Date Range:** Select start and end dates
   - **Client:** Filter by client
   - **Health Carer:** Filter by allocated carer
4. Search shifts by client name or other criteria
5. Click on shift to view details

**API Endpoint:** `GET /api/createShift/getlists`

#### Updating Shifts
1. Open shift details
2. Click "Edit" button
3. Modify shift details:
   - Change date/time
   - Update location
   - Modify notes
   - Change shift type
4. Save changes
5. Notifications sent if health carer is affected

**API Endpoint:** `PUT /api/createShift/update/:id`

#### Swapping Shifts
1. Open shift details
2. Click "Swap Shift" button
3. Select reason for swap (optional)
4. Choose new health carer:
   - View available health carers
   - Check their availability
5. Confirm swap
6. Original health carer notified
7. New health carer receives notification
8. Shift reassigned

**API Endpoint:** `PUT /api/createShift/swap/:id`

**Swap Scenarios:**
- Health carer unavailable
- Health carer request
- Administrative reassignment
- Emergency coverage

#### Cancelling Shifts
1. Open shift details
2. Click "Cancel Shift" button
3. Enter cancellation reason
4. Confirm cancellation
5. Shift status changes to "Cancelled"
6. Health carer notified (if allocated)
7. Shift removed from schedules

**API Endpoint:** `DELETE /api/createShift/delete/:id`

### 6. Shift Allocation Management

**User Role:** Super Admin

**Navigation Path:** `/super-admin/shift-allocation`

**Steps:**
1. Navigate to Shift Allocation page
2. View all shift allocations
3. Filter by:
   - Health carer
   - Client
   - Date range
   - Status
4. Manage allocations:
   - **Reallocate:** Change health carer assignment
   - **Update Status:** Change allocation status
   - **View Details:** See allocation history
5. Bulk operations (if available):
   - Bulk allocate shifts
   - Bulk update status
   - Export allocation data

**API Endpoints:**
- `GET /api/shiftAllocation/getlists` - List allocations
- `GET /api/shiftAllocation/:id` - Get allocation details
- `PUT /api/shiftAllocation/update/:id` - Update allocation
- `DELETE /api/shiftAllocation/delete/:id` - Remove allocation

### 7. Shift Rates Management

**User Role:** Super Admin

**Navigation Path:** `/super-admin/shift-rate`

**Steps:**
1. Navigate to Shift Rates page
2. View rates by shift type
3. Create new rate:
   - Select shift type
   - Enter rate amount
   - Set currency
   - Set effective date
4. Update existing rates:
   - Modify rate amount
   - Update effective date
5. Deactivate old rates
6. Rates used for payroll calculations

**API Endpoints:**
- `GET /api/shiftRate/get-all-shiftRate` - List all rates
- `GET /api/shiftRate/:id` - Get rate details
- `POST /api/shiftRate/create` - Create rate
- `PUT /api/shiftRate/update/:id` - Update rate
- `DELETE /api/shiftRate/delete/:id` - Delete rate

### 8. Completing Shifts

**User Role:** Health Carer

**Steps:**
1. View assigned shifts
2. Open shift details
3. Start shift:
   - Click "Start Shift"
   - Record start time
   - Status changes to "In Progress"
4. Complete shift activities:
   - Perform required tasks
   - Document activities
   - Add shift notes
5. End shift:
   - Click "End Shift"
   - Record end time
   - Status changes to "Completed"
6. Add shift completion notes:
   - Summary of activities
   - Any issues or concerns
   - Client status updates
7. Submit shift completion
8. Shift marked as completed
9. Timesheet entry created (if integrated)

**Related to:** Appointment completion workflow (shifts often linked to appointments)

## User Roles and Permissions

### Super Admin
- ✅ Create/edit/delete shift types
- ✅ Create shifts for any client
- ✅ Allocate shifts to any health carer
- ✅ Swap/reassign shifts
- ✅ View all shifts and allocations
- ✅ Manage shift rates
- ✅ Export shift data
- ✅ Cancel shifts

### Support Coordinator
- ✅ Create shifts for assigned clients
- ✅ Allocate shifts to health carers
- ✅ View client shifts
- ✅ Update shift details
- ✅ Swap shifts (with approval)
- ❌ Cannot create shift types
- ❌ Cannot manage shift rates

### Health Carer
- ✅ View own assigned shifts
- ✅ Set own availability
- ✅ Start and complete shifts
- ✅ Add shift notes
- ✅ Request shift swaps
- ❌ Cannot create shifts
- ❌ Cannot allocate shifts

## Related API Endpoints

See [API Documentation](../api-documentation.md#4-shift-apis) for complete endpoint details:

- **Create Shift:** `/api/createShift`
- **Shift Allocation:** `/api/shiftAllocation`
- **Shift Type:** `/api/shiftType`
- **Shift Rate:** `/api/shiftRate`
- **Availability:** `/api/setAvailability`

## Common Issues and Troubleshooting

### Issue: Cannot create shift - no shift types available
**Solution:**
- Verify shift types are created
- Check shift types are set to "Active"
- Contact administrator to create shift types

### Issue: Health carer not showing as available
**Solution:**
- Verify health carer has set availability
- Check date and time match availability slots
- Ensure shift type matches availability
- Check health carer is not already allocated to another shift

### Issue: Cannot swap shift
**Solution:**
- Verify swap permissions for your role
- Check new health carer has availability
- Ensure shift is not already completed
- Verify shift status allows swapping

### Issue: Shift allocation not working
**Solution:**
- Check health carer availability matches shift time
- Verify health carer qualifications
- Ensure health carer is active
- Check for conflicting shifts

### Issue: Shift rates not applying
**Solution:**
- Verify rate is active and effective
- Check effective date is correct
- Ensure shift type matches rate shift type
- Contact administrator if rates need updating

## Workflow Variations

### Recurring Shifts
- Create shift series
- Set recurrence pattern
- All shifts created at once
- Can modify individual shifts in series
- Bulk allocation possible

### SIL/SDA Shifts
- Special shift type for Supported Independent Living
- Location-specific shifts
- May have different allocation rules
- Linked to SIL/SDA locations

### On-Call Shifts
- Different from scheduled shifts
- Health carer on standby
- Activated when needed
- Different payment structure

### Shift Notes
- Add notes during or after shift
- Document activities
- Record client status
- Link to progress notes
- Used for reporting

---

_Related Files:_
- `frontend/src/pages/superAdmin/sil-sda/new-sil-sda-appointment.js`
- `frontend/src/pages/healthCarer/availability/Availibility.js`
- `frontend/src/components/set-availability/Calendar.js`

