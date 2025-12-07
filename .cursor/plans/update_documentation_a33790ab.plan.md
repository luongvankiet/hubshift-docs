---
name: Update Documentation
overview: Compare and update existing API documentation files with the comprehensive new API documentation, and create new workflow documentation pages based on the workflow documents.
todos:
  - id: read_comparison
    content: Read and compare existing API files with new comprehensive documentation to identify differences and new content
    status: completed
  - id: update_appointments
    content: Update appointments.md with new Calendar/Appointments APIs content (availability, meetings, appointment types)
    status: completed
  - id: update_incidents
    content: Update incidents.md with new Incident Management APIs content (reports, intake, AI analysis)
    status: completed
  - id: create_forms_api
    content: Create forms.md API documentation file from Forms APIs section
    status: completed
  - id: create_shifts_api
    content: Create shifts.md API documentation file from Shift APIs section
    status: completed
  - id: create_goals_api
    content: Create goals.md API documentation file from Goals APIs section
    status: completed
  - id: create_progress_notes_api
    content: Create progress-notes.md API documentation file from Progress Notes APIs section
    status: completed
  - id: update_quick_reference
    content: Update api-quick-reference.md with new endpoints from Forms, Shifts, Goals, and Progress Notes
    status: in_progress
  - id: create_workflow_overview
    content: Create workflow-overview.md page from documents/workflow-overview.md
    status: pending
  - id: create_workflow_pages
    content: Create individual workflow pages in workflows/ directory from documents/workflows/ files
    status: pending
---

# Documentation Update Plan

## Overview

Update existing API documentation files by merging content from the comprehensive `documents/api-documentation.md`, and create new workflow documentation pages from `documents/workflow-overview.md` and the `workflows/` folder.

## Tasks

### 1. API Documentation Updates

#### 1.1 Update Existing API Files

- **`docs/content/en/apis/appointments.md`**: Merge with Calendar/Appointments APIs section from new doc (includes detailed curl examples, more endpoints, availability, meetings, appointment types)
- **`docs/content/en/apis/incidents.md`**: Merge with Incident Management APIs section (includes incident reports, intake, AI analysis)
- **`docs/content/en/apis/authentication.md`**: Review and update if needed (new doc has similar content but may have additional details)

#### 1.2 Create New API Files

- **`docs/content/en/apis/forms.md`**: Create new file from Forms APIs section (Form Templates, Categories, Submissions, Field Groups)
- **`docs/content/en/apis/shifts.md`**: Create new file from Shift APIs section (Create Shift, Shift Allocation, Shift Type, Shift Rate)
- **`docs/content/en/apis/goals.md`**: Create new file from Goals APIs section
- **`docs/content/en/apis/progress-notes.md`**: Create new file from Progress Notes APIs section

#### 1.3 Update Quick Reference

- **`docs/content/en/apis/api-quick-reference.md`**: Add new endpoints from Forms, Shifts, Goals, and Progress Notes sections

### 2. Workflow Documentation Creation

#### 2.1 Create Workflow Overview Page

- **`docs/content/en/workflow-overview.md`**: Create main workflow overview page from `documents/workflow-overview.md`

#### 2.2 Create Individual Workflow Pages

- **`docs/content/en/workflows/forms-workflow.md`**: From `documents/workflows/forms-workflow.md`
- **`docs/content/en/workflows/calendar-workflow.md`**: From `documents/workflows/calendar-workflow.md`
- **`docs/content/en/workflows/incident-management-workflow.md`**: From `documents/workflows/incident-management-workflow.md`
- **`docs/content/en/workflows/shift-workflow.md`**: From `documents/workflows/shift-workflow.md`
- **`docs/content/en/workflows/goals-workflow.md`**: From `documents/workflows/goals-workflow.md`
- **`docs/content/en/workflows/progress-notes-workflow.md`**: From `documents/workflows/progress-notes-workflow.md`

### 3. File Structure

Ensure all new files include proper frontmatter with:

- `title`
- `description`
- `navigation.icon`
- `seo.title` and `seo.description`

## Comparison Strategy

For each API file:

1. Read existing file and corresponding section from new comprehensive doc
2. Identify new endpoints, examples, or details not in existing file
3. Merge content while preserving existing structure and formatting
4. Add missing curl examples and response schemas
5. Update any outdated information

For workflow files:

1. Copy content from `documents/workflows/` files
2. Add appropriate frontmatter
3. Ensure links and references are updated for docs structure
4. Format consistently with existing documentation style

## Files to Modify

**Update:**

- `docs/content/en/apis/appointments.md`
- `docs/content/en/apis/incidents.md`
- `docs/content/en/apis/api-quick-reference.md`
- `docs/content/en/apis/authentication.md` (if needed)

**Create:**

- `docs/content/en/apis/forms.md`
- `docs/content/en/apis/shifts.md`
- `docs/content/en/apis/goals.md`
- `docs/content/en/apis/progress-notes.md`
- `docs/content/en/workflow-overview.md`
- `docs/content/en/workflows/forms-workflow.md`
- `docs/content/en/workflows/calendar-workflow.md`
- `docs/content/en/workflows/incident-management-workflow.md`
- `docs/content/en/workflows/shift-workflow.md`
- `docs/content/en/workflows/goals-workflow.md`
- `docs/content/en/workflows/progress-notes-workflow.md`