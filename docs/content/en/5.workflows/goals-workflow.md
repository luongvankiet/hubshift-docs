---
title: Goals Workflow
description: Complete guide to creating and managing client goals with tasks and routines
navigation:
  icon: i-lucide-target
seo:
  title: Hubshift Goals Workflow
  description: Step-by-step guide to goals workflow including creation, task management, progress tracking, and completion
---

# Goals Workflow

## Overview

The Goals workflow enables users to create client goals, add associated tasks and routines, track progress, update status, and complete goals. Goals are linked to clients and can be associated with appointments and progress notes.

**Purpose:** Set, track, and manage client goals with associated tasks and routines to measure progress and outcomes

**Key Users:** Super Admin, Health Carers, Support Coordinators, Clients

## High-Level Flow

```
Create Goal
    ↓
Add Tasks/Routines
    ↓
Link to Appointments (Optional)
    ↓
Track Progress
    ↓
Update Task Status
    ↓
Update Goal Status
    ↓
Complete Goal
```

## Prerequisites

- User must be logged in
- Client profile must exist
- Appropriate role permissions

## Detailed Step-by-Step Process

### 1. Creating Goals

**User Role:** Super Admin, Health Carer, Support Coordinator

**Navigation Path:**
- Health Carer: `/health-carer/add-goal`
- Super Admin: `/super-admin/add-goal`
- Support Coordinator: `/support-coordinator/add-goal`

**Component:** `frontend/src/components/goals/edit.js`  
**Component:** `frontend/src/pages/healthCarer/Clients/Addgoals.js`

**Steps:**
1. Navigate to "Add Goal" page
2. Select client:
   - Choose client from dropdown
   - Client details auto-populate
3. Fill in goal details:
   - **Goal Title:** Enter descriptive title
   - **Description:** Detailed description of the goal
   - **Category:** Select category (Health, Social, Independence, etc.)
   - **Target Date:** Set target completion date
   - **Priority:** Set priority level (if applicable)
4. Set initial status:
   - **Not Started:** Goal created but not begun
   - **In Progress:** Goal actively being worked on
5. Add goal notes (optional):
   - Additional context
   - Special considerations
6. Click "Save Goal"
7. Goal created and appears in goals list
8. Redirected to goal details page to add tasks

**API Endpoints:**
- `POST /api/goal/create` - Create new goal
- `GET /api/goal/getlists` - List all goals
- `GET /api/goal/getIndividualGoalDetails/:id` - Get goal details

**Goal Categories:**
- Health and Wellness
- Social Participation
- Independence and Daily Living
- Education and Learning
- Employment
- Community Access

### 2. Adding Tasks and Routines

**User Role:** Super Admin, Health Carer, Support Coordinator

**Navigation Path:** Goal details page (after creation or from list)

**Component:** `frontend/src/components/goals/addRoutineTask/edit.js`

**Steps:**
1. Open goal details page
2. Navigate to "Tasks" or "Routines" tab
3. Click "Add Task" or "Add Routine" button
4. Fill in task/routine details:

   **Task Details:**
   - **Task Title:** Name of the task
   - **Description:** What needs to be done
   - **Due Date:** When task should be completed
   - **Status:** Not Started, In Progress, Completed
   - **Priority:** High, Medium, Low
   - **Assigned To:** Health carer or team member (optional)

   **Routine Details:**
   - **Routine Name:** Name of routine
   - **Frequency:** How often (Daily, Weekly, etc.)
   - **Instructions:** Step-by-step instructions
   - **Link to Appointment:** Associate with appointment type (optional)

5. Add task notes (optional):
   - Additional instructions
   - Resources needed
   - Success criteria
6. Save task/routine
7. Task appears in goal's task list
8. Progress percentage updates automatically

**API Endpoints:**
- Task management endpoints (via goal update)
- Routine linking to appointments

**Task Types:**
- One-time tasks
- Recurring tasks
- Routine tasks (linked to appointments)
- Milestone tasks

### 3. Linking Goals to Appointments

**User Role:** Super Admin, Health Carer

**Steps:**
1. Open goal details
2. Navigate to "Appointments" or "Linked Items" section
3. Click "Link Appointment" button
4. Select appointment from list:
   - Filter by date range
   - Filter by appointment type
   - Select relevant appointment
5. Confirm linking
6. Appointment linked to goal
7. Goal appears in appointment details
8. Tasks/routines can be completed during appointments

**Benefits of Linking:**
- Track goal progress through appointments
- Complete tasks during appointments
- Document progress in appointment notes
- Generate progress reports

### 4. Tracking Progress

**User Role:** All roles (view), Super Admin/Health Carer (update)

**Navigation Path:**
- Goals List: `/client/goals` or `/super-admin/goals`
- Goal Details: Click goal from list

**Component:** `frontend/src/components/goals/list.js`  
**Component:** `frontend/src/pages/client/Dashboard/Client-Dashboard.js`

**Steps:**

#### Viewing Goals List
1. Navigate to Goals page
2. View goals in list or card format
3. See progress indicators:
   - Progress percentage bar
   - Number of completed tasks
   - Total tasks
   - Days remaining
4. Filter goals by:
   - **Status:** Not Started, In Progress, Completed
   - **Client:** Filter by client
   - **Category:** Filter by category
   - **Date Range:** Filter by target date
5. Search goals by title or description
6. Sort by:
   - Target date
   - Progress percentage
   - Creation date
   - Status

#### Viewing Goal Details
1. Click on goal from list
2. View goal information:
   - Goal title and description
   - Client information
   - Target date
   - Current status
   - Progress percentage
3. View tasks list:
   - See all tasks/routines
   - View task status
   - See due dates
   - Check completion status
4. View progress chart (if available):
   - Visual representation of progress
   - Timeline of completions
   - Milestone markers

**API Endpoints:**
- `GET /api/goal/getlists` - List all goals
- `GET /api/goal/getIndividualGoalDetails/:id` - Get detailed goal information

**Progress Calculation:**
- Based on completed tasks vs total tasks
- Percentage = (Completed Tasks / Total Tasks) × 100
- Updates automatically when tasks are completed

### 5. Updating Task Status

**User Role:** Super Admin, Health Carer, Support Coordinator

**Steps:**
1. Open goal details
2. Navigate to tasks list
3. Find task to update
4. Click on task or "Edit" button
5. Update task status:
   - **Not Started:** Task not begun
   - **In Progress:** Task actively being worked on
   - **Completed:** Task finished
6. Add task notes:
   - What was accomplished
   - Any issues encountered
   - Next steps
7. Update due date if needed
8. Save changes
9. Task status updated
10. Goal progress percentage recalculated
11. Progress chart updates

**Task Completion During Appointments:**
1. Open appointment details
2. Navigate to "Tasks" or "Routines" section
3. View linked goal tasks
4. Mark tasks as completed
5. Add completion notes
6. Tasks automatically update in goal

### 6. Updating Goal Status

**User Role:** Super Admin, Health Carer, Support Coordinator

**Steps:**
1. Open goal details
2. Click "Update Status" button or status dropdown
3. Select new status:
   - **Not Started:** Goal created but not begun
   - **In Progress:** Goal actively being worked on
   - **On Hold:** Temporarily paused
   - **Completed:** Goal achieved
   - **Cancelled:** Goal no longer relevant
4. Add status notes:
   - Reason for status change
   - Current progress summary
   - Next steps
5. Save status update
6. Status change logged with timestamp
7. Notifications sent if configured

**API Endpoint:** `PUT /api/goal/updateStatus/:id`

**Status Transitions:**
- Not Started → In Progress
- In Progress → On Hold / Completed
- On Hold → In Progress
- Any status → Cancelled

### 7. Completing Goals

**User Role:** Super Admin, Health Carer, Support Coordinator

**Steps:**
1. Open goal details
2. Review goal progress:
   - Check all tasks are completed
   - Verify goal objectives met
   - Review progress notes
3. Click "Complete Goal" button
4. Fill in completion details:
   - **Completion Date:** When goal was achieved
   - **Completion Summary:** Summary of achievement
   - **Outcomes:** Measurable outcomes
   - **Next Steps:** Related goals or follow-up
5. Add completion notes:
   - What was accomplished
   - How it was achieved
   - Impact on client
6. Save completion
7. Goal status changes to "Completed"
8. Completion date recorded
9. Goal appears in completed goals list
10. Progress reports updated

**API Endpoint:** `PUT /api/goal/updateStatus/:id` (with Completed status)

**Completion Requirements:**
- All critical tasks completed (or marked as not applicable)
- Goal objectives met
- Completion summary provided
- Appropriate approvals (if required)

### 8. Editing Goals

**User Role:** Super Admin, Health Carer, Support Coordinator

**Steps:**
1. Open goal details
2. Click "Edit" button
3. Modify goal information:
   - Update title or description
   - Change target date
   - Modify category
   - Update priority
4. Edit tasks:
   - Add new tasks
   - Edit existing tasks
   - Delete tasks (if not completed)
5. Save changes
6. Goal updated
7. History of changes maintained

**API Endpoint:** `PUT /api/goal/update/:id`

**Editing Restrictions:**
- Completed goals may have limited editing
- Some fields may be locked after certain statuses
- Changes logged for audit trail

## User Roles and Permissions

### Super Admin
- ✅ Create goals for any client
- ✅ Edit any goal
- ✅ Update task status
- ✅ Complete goals
- ✅ Delete goals
- ✅ View all goals
- ✅ Export goal data
- ✅ Generate goal reports

### Health Carer
- ✅ Create goals for assigned clients
- ✅ Edit own created goals
- ✅ Update task status
- ✅ Complete goals (with approval if required)
- ✅ View assigned client goals
- ✅ Add progress notes

### Support Coordinator
- ✅ Create goals for assigned clients
- ✅ Edit goals for assigned clients
- ✅ Update task status
- ✅ Complete goals
- ✅ View client goals
- ✅ Generate progress reports

### Client
- ✅ View own goals
- ✅ See progress updates
- ✅ View task lists
- ✅ Add comments (if permitted)
- ❌ Cannot create or edit goals directly

## Related API Endpoints

See [API Documentation](../api-documentation.md#5-goals-apis) for complete endpoint details:

- **Goals:** `/api/goal`
- Goal creation, updates, status changes, and deletion

## Common Issues and Troubleshooting

### Issue: Cannot create goal - client not found
**Solution:**
- Verify client profile exists
- Check client is active
- Ensure you have permission to access client
- Refresh client list

### Issue: Progress percentage not updating
**Solution:**
- Verify tasks are marked as completed
- Check task status is saved
- Refresh goal details page
- Ensure tasks are linked to goal correctly

### Issue: Cannot complete goal
**Solution:**
- Verify all required tasks are completed
- Check goal status allows completion
- Ensure completion details are filled
- Verify you have completion permissions

### Issue: Tasks not appearing in goal
**Solution:**
- Verify tasks are saved correctly
- Check tasks are linked to correct goal
- Refresh goal details page
- Ensure goal ID matches

### Issue: Goal not linking to appointment
**Solution:**
- Verify appointment exists
- Check appointment is not completed
- Ensure goal and appointment are for same client
- Verify linking permissions

## Workflow Variations

### Goal Templates
- Use pre-defined goal templates
- Quick goal creation
- Standardized goal structures
- Customizable templates

### Goal Agreements
- Create goal agreements with clients
- Digital signatures
- Agreement tracking
- Compliance documentation

### Goal Reviews
- Scheduled goal reviews
- Review progress
- Update goals
- Document outcomes
- Set new goals

### Collaborative Goals
- Multiple health carers working on goal
- Shared task assignments
- Team progress tracking
- Coordinated efforts

---

_Related Files:_
- `frontend/src/components/goals/edit.js`
- `frontend/src/components/goals/list.js`
- `frontend/src/components/goals/addRoutineTask/edit.js`
- `frontend/src/pages/healthCarer/Clients/Addgoals.js`
- `frontend/src/pages/client/Dashboard/Client-Dashboard.js`

