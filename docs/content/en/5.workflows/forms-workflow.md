---
title: Forms Workflow
description: Complete guide to creating, managing, and processing digital forms
navigation:
  icon: i-lucide-file-text
seo:
  title: Hubshift Forms Workflow
  description: Step-by-step guide to forms workflow including template creation, publishing, submission, and approval
---

# Forms Workflow

## Overview

The Forms workflow enables administrators to create digital form templates, organize them into categories, publish them for use, and manage form submissions. Clients and other users can then fill out and submit these forms, which can be reviewed, approved, or rejected by administrators.

**Purpose:** Create, manage, and process digital forms for various purposes (client information, assessments, agreements, etc.)

**Key Users:** Super Admin (creates/manages forms), Clients (submit forms), Support Coordinators (review submissions)

## High-Level Flow

```
Form Template Creation
    ↓
Form Category Setup (Optional)
    ↓
Form Publishing
    ↓
Form Distribution (via link/token)
    ↓
Form Submission
    ↓
Form Review/Approval
    ↓
Form Completion
```

## Prerequisites

- User must be logged in (Super Admin for creation, appropriate role for submission)
- Form Builder access (Super Admin role)
- Form categories should be set up (optional but recommended)

## Detailed Step-by-Step Process

### 1. Creating Form Templates

**User Role:** Super Admin

**Navigation Path:** `/super-admin/FormBuilderHomePage`

**Component:** `frontend/src/pages/FormBuilder/FormBuilderHomePage.js`

**Steps:**
1. Navigate to Form Builder Home Page
2. Click "➕ New Template" button
3. You'll be redirected to `/super-admin/FormBuilderPage`
4. Enter form template name in the dialog
5. Use the form builder interface to:
   - Drag and drop form fields (text, date, file upload, etc.)
   - Configure field properties (label, required, validation)
   - Add field groups for organization
   - Preview the form
6. Click "Save" to save the template
7. Template is saved and you're redirected back to Form Builder Home Page

**Component:** `frontend/src/pages/FormBuilder/FormBuilderPage.js`  
**API Endpoint:** `POST /api/formTemplate` or `PUT /api/formTemplate/:id`

**Field Types Available:**
- Text fields
- Date pickers
- File uploads
- Dropdowns
- Checkboxes
- Radio buttons
- Field groups

### 2. Managing Form Categories

**User Role:** Super Admin

**Navigation Path:** `/super-admin/form-categories`

**Component:** `frontend/src/pages/superAdmin/form-builder/form-categories.js`

**Steps:**
1. Navigate to Form Categories page
2. Click "Add Category" button
3. Fill in category details:
   - Category name
   - Description
   - Object type (client, appointment, incident, goal)
4. Save the category
5. Categories can be edited or deleted (soft delete) as needed

**API Endpoints:**
- `GET /api/formCategory` - List all categories
- `POST /api/formCategory` - Create category
- `PUT /api/formCategory/:id` - Update category
- `DELETE /api/formCategory/:id` - Delete category

### 3. Publishing Forms

**User Role:** Super Admin

**Steps:**
1. From Form Builder Home Page, select a template
2. Click on the template to view/edit
3. Review the form structure
4. Click "Publish" button (if available in UI)
5. Form status changes to "published"
6. Generate shareable link or token for form distribution

**API Endpoint:** `PUT /api/formTemplate/:id/publish`

**Alternative: Email Distribution**
1. Select a published template
2. Click "Send Email" option
3. Enter recipient email address
4. Customize email subject and message
5. System generates unique token and sends email with form link

**API Endpoint:** `POST /api/formTemplate/:id/send-email`

### 4. Form Submission (Client/User Side)

**User Role:** Client or any user with form link

**Navigation Path:** `/client/form-submission/:templateId?token=TOKEN`

**Component:** `frontend/src/pages/client/form-submission/client-form-submission.js`

**Steps:**
1. User receives form link via email or direct access
2. Click on the form link (contains token for authentication)
3. Form loads with all configured fields
4. Fill in form fields:
   - Enter text responses
   - Select dates
   - Upload files/attachments
   - Complete required fields
5. Optionally save as draft (if supported)
6. Review form before submission
7. Click "Submit" button
8. Form is submitted and token is invalidated (one-time use)
9. Success message displayed
10. User redirected or shown confirmation

**API Endpoints:**
- `GET /api/formTemplate/verify-token?token=TOKEN` - Verify token validity
- `POST /api/formTemplate/:id/submissions` - Submit form
- `POST /api/formSubmission` - Alternative submission endpoint

**File Upload Process:**
- Files are uploaded to server before form submission
- File URLs/keys are stored with form answers
- Supports multiple file types (PDF, images, documents)

### 5. Form Review and Approval

**User Role:** Super Admin, Support Coordinator

**Navigation Path:** `/super-admin/form-submissions` or template-specific submissions page

**Component:** `frontend/src/pages/FormBuilder/TemplateSubmissionsPage.js`

**Steps:**
1. Navigate to Form Submissions list
2. Filter submissions by:
   - Template
   - Status (pending, approved, rejected)
   - Client
   - Date range
3. Click on a submission to view details
4. Review form answers and attachments
5. Take action:
   - **Approve:** Click "Approve" button
   - **Reject:** Click "Reject" and provide reason
   - **Assign:** Assign to another user for review
   - **Add Signature:** Add digital signature if required
6. Add comments or notes if needed
7. Save changes

**API Endpoints:**
- `GET /api/formSubmission` - List all submissions
- `GET /api/formSubmission/:id` - Get submission details
- `PUT /api/formSubmission/:id/approve` - Approve submission
- `PUT /api/formSubmission/:id/reject` - Reject submission
- `PUT /api/formSubmission/:id/assign` - Assign submission
- `POST /api/formSubmission/:id/signatures` - Add signature

### 6. Form Submission Management

**Additional Actions:**

**Viewing Submissions by Client:**
- Navigate to client details page
- View "Forms" tab
- See all form submissions for that client

**API Endpoint:** `GET /api/formSubmission/client/:clientId`

**Adding Attachments:**
- Open submission details
- Click "Add Attachment"
- Upload file
- Attachment is linked to submission

**API Endpoint:** `POST /api/formSubmission/:id/attachments`

**Updating Submissions:**
- Open submission for editing
- Modify answers (if allowed)
- Save changes

**API Endpoint:** `PUT /api/formSubmission/:id`

## User Roles and Permissions

### Super Admin
- ✅ Create/edit/delete form templates
- ✅ Manage form categories
- ✅ Publish/unpublish forms
- ✅ View all submissions
- ✅ Approve/reject submissions
- ✅ Assign submissions
- ✅ Add signatures
- ✅ Export submissions

### Support Coordinator
- ✅ View assigned submissions
- ✅ Review submissions
- ✅ Approve/reject submissions (if permitted)
- ✅ Add comments

### Client
- ✅ Access forms via link/token
- ✅ Fill and submit forms
- ✅ View own submissions
- ❌ Cannot create or edit templates

### Health Carer
- ✅ Access forms if shared
- ✅ Submit forms
- ✅ View assigned forms
- ❌ Cannot create templates

## Related API Endpoints

See [API Documentation](../api-documentation.md#1-forms-apis) for complete endpoint details:

- **Form Templates:** `/api/formTemplate`
- **Form Categories:** `/api/formCategory`
- **Form Submissions:** `/api/formSubmission`
- **Field Groups:** `/api/fieldGroup`

## Common Issues and Troubleshooting

### Issue: Form token expired or invalid
**Solution:** Request a new form link from administrator. Tokens are typically single-use and time-limited.

### Issue: Cannot submit form - validation errors
**Solution:** Check that all required fields are filled. Review field validation rules (e.g., email format, date ranges).

### Issue: File upload fails
**Solution:** 
- Check file size limits
- Verify file type is allowed
- Ensure stable internet connection
- Try uploading smaller files

### Issue: Form not appearing in submissions list
**Solution:**
- Verify form was successfully submitted (check for success message)
- Check filters on submissions page
- Ensure you have permission to view submissions

### Issue: Cannot publish form
**Solution:**
- Verify all required fields are configured
- Check form template is saved
- Ensure you have Super Admin permissions

## Workflow Variations

### Public Form Submission (No Login Required)
- Forms can be configured for public access
- Token-based authentication replaces user login
- One-time use tokens prevent duplicate submissions

### Draft Submissions
- Users can save forms as drafts
- Drafts can be resumed later
- Drafts don't count as submissions until finalized

### Form Versions
- Templates can have multiple versions
- Old submissions reference original version
- New submissions use latest published version

---

_Related Files:_
- `frontend/src/pages/FormBuilder/FormBuilderPage.js`
- `frontend/src/pages/client/form-submission/client-form-submission.js`
- `frontend/src/pages/superAdmin/form-builder/form-categories.js`
- `frontend/src/components/form-builder/FormBuilderLayout.js`

