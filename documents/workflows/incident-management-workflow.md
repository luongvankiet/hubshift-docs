# Incident Management Workflow

## Overview

The Incident Management workflow enables users to report, track, investigate, and resolve incidents. The system supports AI-powered incident intake from documents or text descriptions, manual incident creation, investigation tracking, status management, and incident closure with digital signatures.

**Purpose:** Report, track, investigate, and manage incidents (injuries, falls, medication errors, etc.) with compliance reporting capabilities

**Key Users:** Super Admin, Supervisors, Health Carers, Clients, General Managers

## High-Level Flow

```
Incident Intake (AI Processing)
    ↓
Create/Review Incident
    ↓
Investigation
    ↓
Update Status
    ↓
Add Actions/Outcomes
    ↓
Incident Closure
    ↓
Compliance Reporting
```

## Prerequisites

- User must be logged in
- Appropriate role permissions (varies by action)
- Client profile (for client-related incidents)
- Incident intake access (for AI processing)

## Detailed Step-by-Step Process

### 1. Incident Intake (AI-Powered)

**User Role:** Super Admin, Supervisor

**Navigation Path:** `/super-admin/incident/intake`

**Component:** `frontend/src/components/incident-intake/incident-intake.js`  
**Component:** `frontend/src/pages/superAdmin/incident/intake.js`

**Steps:**

#### Method 1: File Upload
1. Navigate to Incident Intake page
2. Select "File Upload" method
3. Click "Choose File" or drag and drop document
4. Supported formats: PDF, Word documents, images
5. Click "Process" button
6. System processes document with AI:
   - Extracts incident details
   - Identifies incident type
   - Extracts dates, times, locations
   - Identifies involved parties
7. Review extracted data:
   - Verify accuracy of extracted information
   - Edit any incorrect fields
   - Add missing information
8. Click "Save to Database"
9. Incident created and redirected to edit page

#### Method 2: Text Description
1. Navigate to Incident Intake page
2. Select "Text Description" method
3. Enter incident description in text area
4. Click "Process" button
5. AI analyzes text and extracts structured data
6. Review and edit extracted information
7. Click "Save to Database"
8. Incident created

**API Endpoints:**
- `POST /api/incident/intake` - Process incident intake with file upload
- `POST /api/incident/analyze-injury-photo` - Analyze injury photos

**AI Processing Features:**
- Automatic field extraction
- Incident type classification
- Severity assessment
- Date/time extraction
- Location identification
- Person name extraction

### 2. Creating Incidents Manually

**User Role:** Super Admin, Supervisor, Health Carer, Client

**Navigation Path:** 
- Super Admin: `/super-admin/incident/create`
- Supervisor: `/supervisor/incident/create`
- Health Carer: `/health-carer/incident/create`
- Client: `/client/incident/create`

**Component:** `frontend/src/pages/superAdmin/incident/edit.js`  
**Component:** `frontend/src/pages/Supervisor/incident/view.js`

**Steps:**
1. Navigate to "Create Incident" page
2. Fill in incident details:

   **Basic Information:**
   - **Incident Type:** Select type (Injury, Fall, Medication Error, etc.)
   - **Severity:** Select severity (Low, Moderate, High, Critical)
   - **Date:** Select incident date
   - **Time:** Enter incident time
   - **Location:** Enter location where incident occurred

   **Client Information:**
   - **Client Name:** Select or enter client name
   - **Client Details:** Auto-populated from client profile

   **Incident Description:**
   - **Description:** Detailed description of what happened
   - **Witnesses:** Add witness names and contact information
   - **Immediate Actions:** Actions taken immediately after incident

   **Documentation:**
   - **Upload Documents:** Upload photos, reports, or other documents
   - **Injury Photos:** Upload photos of injuries (if applicable)
   - **Medical Reports:** Upload medical documentation

3. Set initial status:
   - **Open:** New incident requiring investigation
   - **Under Investigation:** Investigation in progress
4. Click "Save Incident"
5. Incident created and appears in incident list
6. Notifications sent to relevant parties

**API Endpoints:**
- `POST /api/incident/create` - Create new incident
- `GET /api/incident/get-all-incident` - List all incidents

**Required Fields:**
- Incident type
- Severity
- Date and time
- Client (if client-related)
- Description

### 3. Investigating Incidents

**User Role:** Super Admin, Supervisor, General Manager

**Navigation Path:** Click incident from list or `/super-admin/edit-incident/:id`

**Steps:**
1. Open incident details page
2. Review initial incident information
3. Add investigation details:

   **Investigation Information:**
   - **Investigation Date:** When investigation started
   - **Investigator:** Person conducting investigation
   - **Investigation Notes:** Detailed investigation findings
   - **Root Cause:** Identified root cause of incident
   - **Contributing Factors:** Factors that contributed to incident

   **Medical Outcomes:**
   - **Medical Treatment Required:** Yes/No
   - **Treatment Details:** Description of medical treatment
   - **Hospitalization:** Whether hospitalization was required
   - **Recovery Status:** Current recovery status

   **Actions Taken:**
   - **Immediate Actions:** Actions taken at scene
   - **Follow-up Actions:** Planned follow-up actions
   - **Preventive Measures:** Measures to prevent recurrence

4. Update incident status to "Under Investigation"
5. Save investigation details
6. Continue investigation as needed

**API Endpoint:** `PUT /api/incident/update/:id`

**Investigation Components:**
- Timeline of events
- Witness statements
- Evidence collection
- Analysis of contributing factors
- Recommendations

### 4. Updating Incident Status

**User Role:** Super Admin, Supervisor

**Steps:**
1. Open incident details
2. Click "Update Status" or status dropdown
3. Select new status:
   - **Open:** Initial status, awaiting investigation
   - **Under Investigation:** Investigation in progress
   - **Pending Review:** Awaiting review/approval
   - **Resolved:** Incident resolved, no further action needed
   - **Closed:** Incident closed and documented
4. Add status notes explaining the change
5. Save status update
6. Status change logged with timestamp and user
7. Notifications sent if required

**API Endpoint:** `PUT /api/incident/status/:id`

**Status Transitions:**
- Open → Under Investigation
- Under Investigation → Pending Review
- Pending Review → Resolved/Closed
- Can be reopened if new information emerges

### 5. Incident Closure

**User Role:** Super Admin, Supervisor

**Navigation Path:** `/supervisor/incident/closure/:id`

**Component:** `frontend/src/pages/Supervisor/incident/incidentClosure.js`

**Steps:**
1. Navigate to incident closure page
2. Review all incident information:
   - Initial report
   - Investigation findings
   - Actions taken
   - Medical outcomes
   - Follow-up actions
3. Complete closure information:

   **Closure Details:**
   - **Closure Date:** Date incident is being closed
   - **Closed By:** Person closing the incident
   - **Closure Summary:** Summary of resolution
   - **Final Actions:** Final actions taken
   - **Prevention Measures:** Measures implemented

   **Compliance:**
   - **Reportable to NDIS:** Whether incident is reportable
   - **Reported To:** Authorities notified (if applicable)
   - **Reporting Date:** When reported
   - **Compliance Status:** Compliance with reporting requirements

4. Add closure signature:
   - **Digital Signature:** Draw or upload signature
   - **Signed By:** Name of person signing
   - **Signature Date:** Date of signature
   - **Role:** Role of signatory
5. Review all information
6. Click "Close Incident"
7. Incident status changes to "Closed"
8. Closure signature saved
9. Incident locked (can be reopened if needed)

**API Endpoint:** `PUT /api/incident/update/:id` (with closure data)

**Closure Requirements:**
- All required fields completed
- Investigation completed
- Actions taken documented
- Signature required for closure
- Compliance reporting completed (if applicable)

### 6. Viewing and Filtering Incidents

**User Role:** All roles (with appropriate filters)

**Navigation Path:** 
- Super Admin: `/super-admin/list-incident`
- Supervisor: `/supervisor/list-incident`
- Health Carer: `/health-carer/list-incident`
- Client: `/client/list-incident`

**Component:** `frontend/src/pages/superAdmin/incident/list.js`

**Steps:**
1. Navigate to Incident List page
2. View incidents in table format
3. Use filters to narrow results:
   - **Status:** Open, Under Investigation, Resolved, Closed
   - **Severity:** Low, Moderate, High, Critical
   - **Incident Type:** Filter by type
   - **Date Range:** Select start and end dates
   - **Client:** Filter by client
   - **Reported By:** Filter by reporter
   - **Location:** Filter by location
4. Search incidents:
   - Enter search term
   - Search across description, client name, etc.
5. Sort incidents:
   - By date (newest/oldest)
   - By severity
   - By status
6. Click on incident to view details
7. Export incidents (if permitted):
   - Export to PDF
   - Export to CSV
   - Apply filters before export

**API Endpoints:**
- `GET /api/incident/get-all-incident` - Get all incidents
- `GET /api/incident/get-incident-filter` - Get filtered incidents

### 7. Incident Reports and Analytics

**User Role:** Super Admin, General Manager

**Navigation Path:** `/super-admin/incident-report`

**Component:** `frontend/src/components/incident-report/`

**Steps:**
1. Navigate to Incident Reports page
2. Select report type:
   - **Executive Summary:** High-level overview
   - **Severity Distribution:** Breakdown by severity
   - **Trending Incidents:** Trends over time
   - **Top Incident Types:** Most common types
   - **Location Analysis:** Incidents by location
   - **Compliance Metrics:** Compliance reporting status
   - **Performance Metrics:** Resolution times, etc.
3. Apply filters:
   - Date range
   - Location
   - Incident type
   - Severity
4. View report/charts
5. Export report if needed
6. Schedule reports (if available)

**API Endpoints:**
- `GET /api/incident-report/executive-summary` - Executive summary
- `GET /api/incident-report/severity-distribution` - Severity breakdown
- `GET /api/incident-report/trending-incidents` - Trends
- `GET /api/incident-report/compliance-metrics` - Compliance data

## User Roles and Permissions

### Super Admin
- ✅ Create incidents
- ✅ Use incident intake (AI processing)
- ✅ Edit any incident
- ✅ Close incidents
- ✅ View all incidents
- ✅ Access incident reports
- ✅ Export incident data
- ✅ Manage incident types and severity levels

### Supervisor
- ✅ Create incidents
- ✅ Use incident intake
- ✅ Investigate incidents
- ✅ Update incident status
- ✅ Close incidents
- ✅ View assigned incidents
- ✅ Add investigation notes

### General Manager
- ✅ View all incidents
- ✅ Access reports and analytics
- ✅ Review incident trends
- ✅ Monitor compliance
- ✅ Approve incident closures (if configured)

### Health Carer
- ✅ Create incidents
- ✅ View own reported incidents
- ✅ Add notes to incidents
- ❌ Cannot close incidents
- ❌ Limited investigation access

### Client
- ✅ Report incidents
- ✅ View own incidents
- ✅ Add information to incidents
- ❌ Cannot edit or close incidents

## Related API Endpoints

See [API Documentation](../api-documentation.md#3-incident-management-apis) for complete endpoint details:

- **Incidents:** `/api/incident`
- **Incident Reports:** `/api/incident-report`
- **Incident Intake:** `/api/incident/intake`

## Common Issues and Troubleshooting

### Issue: AI intake not extracting data correctly
**Solution:**
- Ensure document is clear and readable
- Check document format is supported
- Review extracted data and manually correct
- Try text description method as alternative
- Contact support if persistent issues

### Issue: Cannot upload incident documents
**Solution:**
- Check file size limits
- Verify file format is supported
- Ensure stable internet connection
- Try uploading smaller files
- Check user permissions

### Issue: Cannot close incident
**Solution:**
- Verify all required fields are completed
- Check investigation is complete
- Ensure you have closure permissions
- Verify incident status allows closure
- Add closure signature if required

### Issue: Incident not appearing in list
**Solution:**
- Check filters are not too restrictive
- Verify date range includes incident date
- Check user permissions
- Ensure incident was saved successfully
- Refresh page

### Issue: Compliance reporting unclear
**Solution:**
- Review compliance metrics report
- Check incident type reporting requirements
- Consult compliance documentation
- Contact compliance officer if needed

## Workflow Variations

### NDIS Reportable Incidents
- Special workflow for NDIS reportable incidents
- Automatic compliance checking
- Reporting timeframe tracking
- Notification to authorities
- Compliance documentation required

### Injury Photo Analysis
- Upload injury photos
- AI analyzes injury severity
- Provides recommendations
- Links to incident record
- Medical professional review option

### Bulk Incident Import
- Import multiple incidents from file
- Batch processing
- Validation before import
- Error reporting for failed imports

### Incident Linking
- Link related incidents
- Track incident patterns
- Identify recurring issues
- Generate pattern reports

---

_Related Files:_
- `frontend/src/components/incident-intake/incident-intake.js`
- `frontend/src/pages/superAdmin/incident/edit.js`
- `frontend/src/pages/superAdmin/incident/list.js`
- `frontend/src/pages/Supervisor/incident/incidentClosure.js`
- `frontend/src/components/incident-report/`

