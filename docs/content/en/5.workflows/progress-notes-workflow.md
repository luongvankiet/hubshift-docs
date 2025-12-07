---
title: Progress Notes Workflow
description: Complete guide to progress notes workflow including creation, linking to appointments/goals, and objectives
navigation:
  icon: i-lucide-file-edit
seo:
  title: Hubshift Progress Notes Workflow
  description: Step-by-step guide to progress notes workflow including creation, linking to appointments/goals, and objectives
---

# Progress Notes Workflow

## Overview

The Progress Notes workflow enables health carers and administrators to document client progress, link notes to appointments or goals, add progress objectives, view historical notes, and export notes for reporting purposes.

**Purpose:** Document client progress, track outcomes, link to appointments/goals, and maintain progress history

**Key Users:** Super Admin, Health Carers, Support Coordinators, Clients

## High-Level Flow

```
Create Progress Note
    ↓
Link to Appointment/Goal (Optional)
    ↓
Add Objectives (Optional)
    ↓
Save Note
    ↓
View Notes
    ↓
Export Notes (Optional)
```

## Prerequisites

- User must be logged in
- Client profile must exist
- Appropriate role permissions
- Appointment or goal (if linking)

## Detailed Step-by-Step Process

### 1. Creating Progress Notes

**User Role:** Super Admin, Health Carer, Support Coordinator

**Navigation Path:**
- Health Carer: `/health-carer/add-progress-note`
- Super Admin: `/super-admin/add-progressnote`
- Client: `/client/add-progress-note`

**Component:** `frontend/src/pages/client/progress-notes/view.js`  
**Component:** `frontend/src/pages/superAdmin/progressNote/view.js`

**Steps:**
1. Navigate to "Add Progress Note" page
2. Select client:
   - Choose client from dropdown
   - Client details auto-populate
3. Link to appointment (optional):
   - Select "Link to Appointment"
   - Choose appointment from list
   - Appointment details displayed
4. Fill in note details:
   - **Note Text:** Enter detailed progress note
   - **Category:** Select category (General, Medical, Behavioral, etc.)
   - **Date:** Select note date (defaults to today)
   - **Time:** Enter time (optional)
5. Add objectives (optional):
   - Click "Add Objective"
   - Select from existing objectives or create new
   - Link objectives to note
6. Add attachments (optional):
   - Upload files
   - Add photos
   - Attach documents
7. Review note
8. Click "Save Progress Note"
9. Note created and appears in notes list
10. If linked to appointment, note appears in appointment details

**API Endpoints:**
- `POST /api/progress-note/create` - Create progress note
- `GET /api/progress-note/getlists/all/:clientId` - List notes for client
- `GET /api/progress-note/details/:id` - Get note details

**Note Categories:**
- General Progress
- Medical/Health
- Behavioral
- Social
- Daily Living
- Communication
- Other

### 2. Linking Notes to Appointments

**User Role:** Super Admin, Health Carer

**Steps:**

#### During Note Creation
1. When creating progress note
2. Check "Link to Appointment" option
3. Appointment dropdown appears
4. Select appointment from list:
   - Filter by date range
   - Filter by appointment type
   - See appointment details
5. Selected appointment linked to note
6. Note will appear in appointment details

#### After Note Creation
1. Open existing progress note
2. Click "Edit" button
3. Navigate to "Linked Items" section
4. Click "Link Appointment"
5. Select appointment from list
6. Save changes
7. Note linked to appointment

**Benefits of Linking:**
- Notes appear in appointment context
- Better tracking of progress during appointments
- Easier to find related information
- Comprehensive appointment history

### 3. Adding Progress Objectives

**User Role:** Super Admin, Support Coordinator

**Navigation Path:** `/super-admin/progress-objective`

**Component:** `frontend/src/pages/superAdmin/progressObjective/`

**Steps:**

#### Creating Objectives
1. Navigate to Progress Objectives page
2. Click "Add Objective" button
3. Fill in objective details:
   - **Objective Name:** Descriptive name
   - **Description:** Detailed description
   - **Target Date:** When objective should be achieved
   - **Status:** Active, Completed, On Hold
4. Save objective
5. Objective available for linking to notes

#### Linking Objectives to Notes
1. When creating or editing progress note
2. Navigate to "Objectives" section
3. Click "Add Objective"
4. Select objective from list:
   - Filter by status
   - Search objectives
   - See objective details
5. Selected objective linked to note
6. Objective progress can be tracked through notes

**API Endpoints:**
- `GET /api/progress-objective/getAllProgressObjective` - List all objectives
- `POST /api/progress-objective/addProgressObjective` - Create objective
- `GET /api/progress-objective/getIndividual/:id` - Get objective details
- `PUT /api/progress-objective/updateProgressObjective/:id` - Update objective
- `DELETE /api/progress-objective/deleteProgressObjective/:id` - Delete objective

### 4. Viewing Progress Notes

**User Role:** All roles (with appropriate filters)

**Navigation Path:**
- Client: `/client/list-progress-notes`
- Super Admin: `/super-admin/list-progressnote`
- Health Carer: `/health-carer/list-progress-notes`

**Component:** `frontend/src/pages/client/progress-notes/list.js`  
**Component:** `frontend/src/pages/superAdmin/progressNote/list.js`

**Steps:**
1. Navigate to Progress Notes list page
2. View notes in table or card format
3. See note information:
   - Note text (truncated)
   - Client name
   - Created by (health carer name)
   - Date created
   - Category
   - Linked appointment (if applicable)
4. Filter notes by:
   - **Client:** Filter by specific client
   - **Date Range:** Select start and end dates
   - **Category:** Filter by note category
   - **Created By:** Filter by health carer
   - **Linked Appointment:** Show only notes with appointments
5. Search notes:
   - Enter search term
   - Search across note text, client name, etc.
6. Sort notes:
   - By date (newest/oldest)
   - By client name
   - By category
7. Click on note to view full details
8. View note details:
   - Full note text
   - Client information
   - Health carer information
   - Linked appointment details
   - Linked objectives
   - Attachments
   - Creation and update timestamps

**API Endpoints:**
- `GET /api/progress-note/getlists/all/:clientId` - Get notes for client
- `GET /api/progress-note/details/:id` - Get note details

**View Permissions:**
- Clients: Can view own notes only
- Health Carers: Can view notes for assigned clients
- Super Admin: Can view all notes
- Support Coordinators: Can view notes for assigned clients

### 5. Editing Progress Notes

**User Role:** Super Admin, Health Carer (own notes), Support Coordinator

**Steps:**
1. Open progress note details
2. Click "Edit" button
3. Modify note information:
   - Update note text
   - Change category
   - Modify date/time
   - Add or remove linked appointments
   - Add or remove objectives
4. Add or remove attachments
5. Save changes
6. Note updated with timestamp
7. Update history maintained

**API Endpoint:** `PUT /api/progress-note/update/:id`

**Editing Restrictions:**
- Notes may have edit time limits
- Some fields may be locked after certain period
- Changes logged for audit trail
- Original note text may be preserved

### 6. Deleting Progress Notes

**User Role:** Super Admin (typically)

**Steps:**
1. Open progress note details
2. Click "Delete" button
3. Confirm deletion
4. Note deleted (soft delete typically)
5. Note removed from list
6. May be recoverable from deleted items

**API Endpoint:** `DELETE /api/progress-note/delete/:id`

**Deletion Considerations:**
- Usually soft delete (not permanently removed)
- May require approval for deletion
- Linked appointments/goals may prevent deletion
- Deletion logged for audit

### 7. Exporting Progress Notes

**User Role:** Super Admin, Support Coordinator

**Steps:**
1. Navigate to Progress Notes list page
2. Apply filters if needed:
   - Select client
   - Choose date range
   - Filter by category
3. Click "Export" button
4. Choose export format:
   - **PDF:** Formatted document
   - **CSV:** Spreadsheet format
5. Configure export options:
   - Include/exclude fields
   - Date range
   - Formatting options
6. Click "Download" or "Generate Export"
7. Export file generated
8. Download file
9. File contains filtered notes with all details

**Export Contents:**
- Note text
- Client information
- Health carer information
- Date and time
- Category
- Linked appointments
- Linked objectives
- Creation dates

**Use Cases:**
- Client progress reports
- Compliance documentation
- Progress reviews
- Sharing with stakeholders
- Archival purposes

### 8. Progress Notes in Client Dashboard

**User Role:** Client, Health Carer, Support Coordinator

**Navigation Path:** `/client/dashboard`

**Component:** `frontend/src/pages/client/Dashboard/Client-Dashboard.js`

**Steps:**
1. Navigate to Client Dashboard
2. View "Progress Notes" section
3. See recent progress notes:
   - Latest notes displayed
   - Quick summary
   - Date and author
4. Click "View All" to see full list
5. Notes integrated with other client information:
   - Goals progress
   - Appointments
   - Medications
   - Other client data

**Dashboard Integration:**
- Recent notes summary
- Progress trends
- Note frequency
- Key milestones

## User Roles and Permissions

### Super Admin
- ✅ Create notes for any client
- ✅ Edit any note
- ✅ Delete notes
- ✅ View all notes
- ✅ Export notes
- ✅ Manage progress objectives
- ✅ Link notes to any appointment/goal

### Health Carer
- ✅ Create notes for assigned clients
- ✅ Edit own notes (within time limit)
- ✅ View notes for assigned clients
- ✅ Link notes to appointments
- ✅ Add objectives to notes
- ❌ Cannot delete notes (typically)
- ❌ Cannot view notes for unassigned clients

### Support Coordinator
- ✅ Create notes for assigned clients
- ✅ Edit notes for assigned clients
- ✅ View notes for assigned clients
- ✅ Export notes
- ✅ Link notes to appointments/goals
- ✅ Manage objectives

### Client
- ✅ View own progress notes
- ✅ See notes in dashboard
- ✅ Filter and search own notes
- ❌ Cannot create or edit notes
- ❌ Cannot delete notes

## Related API Endpoints

See [API Documentation](../api-documentation.md#6-progress-notes-apis) for complete endpoint details:

- **Progress Notes:** `/api/progress-note`
- **Progress Objectives:** `/api/progress-objective`

## Common Issues and Troubleshooting

### Issue: Cannot create note - client not found
**Solution:**
- Verify client profile exists
- Check client is active
- Ensure you have permission to access client
- Refresh client list

### Issue: Note not linking to appointment
**Solution:**
- Verify appointment exists
- Check appointment is for same client
- Ensure appointment is not deleted
- Verify linking permissions

### Issue: Objectives not appearing
**Solution:**
- Verify objectives are created
- Check objectives are active
- Ensure objectives are linked correctly
- Refresh objectives list

### Issue: Cannot export notes
**Solution:**
- Check export permissions for your role
- Verify filters are applied correctly
- Ensure notes exist for selected filters
- Try smaller date range if export fails

### Issue: Notes not appearing in list
**Solution:**
- Check filters are not too restrictive
- Verify date range includes note date
- Check user permissions
- Ensure note was saved successfully
- Refresh page

## Workflow Variations

### Notes from Appointments
- Create note directly from appointment
- Pre-fills appointment information
- Automatic linking
- Quick note creation

### Bulk Note Creation
- Create multiple notes at once
- Template-based notes
- Batch processing
- Time-saving for routine notes

### Note Templates
- Use pre-defined note templates
- Standardized formats
- Quick note creation
- Consistency across notes

### Note Collaboration
- Multiple health carers adding notes
- Note threads or comments
- Collaborative documentation
- Team coordination

### Automated Notes
- System-generated notes
- Based on appointment completion
- Routine activity notes
- Automated progress tracking

---

_Related Files:_
- `frontend/src/pages/client/progress-notes/view.js`
- `frontend/src/pages/client/progress-notes/list.js`
- `frontend/src/pages/superAdmin/progressNote/view.js`
- `frontend/src/pages/superAdmin/progressNote/list.js`
- `frontend/src/pages/superAdmin/progressObjective/`

