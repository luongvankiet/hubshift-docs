---
title: API Documentation Guide
description: Comprehensive guide for creating and understanding Hubshift API documentation
navigation:
  icon: i-lucide-book-open
seo:
  title: Hubshift API Documentation Guide
  description: Complete guide to Hubshift API documentation covering authentication, appointments, timesheet, payroll, and incident management
---

# API Documentation Guide

This document provides a comprehensive guide for creating API documentation for the Hubshift Admin system, covering five main modules: Authentication, Appointments, Timesheet, Payroll, and Incident Management.

## 1. AUTHENTICATION FLOW & APIs

### Flow Overview

The authentication system supports:

- User registration (signup) with email verification
- Login with JWT token generation
- Password reset via email OTP
- Token refresh mechanism
- Mobile app authentication (separate endpoints)
- Role-based access control (RBAC)
- Multi-device token management

### Key Features

- JWT-based authentication
- Email verification via OTP
- Password reset functionality
- Refresh token support
- Mobile-specific authentication endpoints
- Device token management for push notifications

### API Endpoints

#### Web Authentication (`/api/user`)

- `POST /api/user/signup` - User registration
- `POST /api/user/login` - User login
- `POST /api/user/forgotPassword` - Request password reset
- `GET /api/user/newpassword/:key/:token` - Verify reset link
- `PUT /api/user/newpassword` - Set new password
- `POST /api/user/verifymailOTP` - Verify email OTP
- `POST /api/user/otp/resend` - Resend OTP email
- `POST /api/user/getRefreshTokan` - Get refresh token
- `GET /api/user/:id/verify/:token/` - Verify email link
- `POST /api/user/password/reset/:token` - Reset password with token
- `POST /api/user/userSignup` - Alternative signup endpoint
- `GET /api/user/getuserDetail/:id` - Get user details
- `PUT /api/user/update/:id` - Update user profile
- `DELETE /api/user/delete/:id` - Delete user account

#### Mobile Authentication (`/api/frontend/user`)

- `POST /api/frontend/user/login` - Mobile login
- `POST /api/frontend/user/signup` - Mobile signup
- `POST /api/frontend/user/forgotPassword` - Mobile password reset
- `POST /api/frontend/user/password/reset/:token` - Mobile password reset with token
- `POST /api/frontend/user/verifymailOTP` - Mobile email OTP verification
- `POST /api/frontend/user/otp/resend` - Mobile resend OTP
- `GET /api/frontend/user/:id/verify/:token` - Mobile email verification
- `PUT /api/frontend/user/newpassword` - Mobile set new password
- `GET /api/frontend/user/getRefreshToken` - Mobile refresh token
- `POST /api/frontend/user/device/token` - Save device token for push notifications
- `POST /api/frontend/user/tokens/reset` - Reset all tokens
- `GET /api/frontend/user/getuserDetail/:id` - Get user details (mobile)
- `GET /api/frontend/user/get/profile/:id` - Get user profile (mobile)
- `PUT /api/frontend/user/profileUpdate/:id` - Update profile (mobile)
- `PUT /api/frontend/user/update/:id` - Update user (mobile)
- `DELETE /api/frontend/user/Mobile/userDelete/:id` - Delete user account (mobile)
- `POST /api/frontend/user/otp/verifyOtpUserDelete` - Verify OTP for account deletion

#### User Management

- `GET /api/user/getlists` - Get all users list
- `GET /api/user/getusertypelists` - Get all user types
- `GET /api/user/healthCarer/list` - Get health carer list
- `GET /api/user/supportCoordinator/list` - Get support coordinator list
- `GET /api/user/client/list` - Get client list
- `GET /api/user/serviceProvider/list` - Get service provider list
- `PUT /api/user/updateUserStatus/:id/:status` - Update user status
- `PUT /api/user/partialAndFullAccess/:id` - Update access level

## 2. APPOINTMENTS FLOW & APIs

### Flow Overview

The appointments system manages:

- Appointment creation and scheduling
- Appointment status management (scheduled, started, completed, cancelled)
- Routine and task assignment to appointments
- Appointment swapping between health carers
- Shift notes and continuation notes
- Expense tracking per appointment
- Calendar integration
- Appointment approval workflow
- Client-health carer matching

### Key Features

- Multi-status appointment lifecycle
- Routine and task management
- Appointment swapping functionality
- Shift notes and documentation
- Expense tracking
- Calendar view integration
- Approval workflows
- Export capabilities

### API Endpoints

#### Web Appointments (`/api/appointment`)

- `GET /api/appointment/getlists` - Get appointment list
- `POST /api/appointment/create` - Create new appointment
- `GET /api/appointment/:id` - Get appointment details
- `PUT /api/appointment/update/:id` - Update appointment
- `PUT /api/appointment/update/status/:id` - Update appointment status
- `PUT /api/appointment/update/rescheduledAppointment/:id` - Reschedule appointment
- `DELETE /api/appointment/delete/:id` - Delete appointment
- `DELETE /api/appointment/delete/silApp/:date/:silsdaId/:shiftType` - Delete SIL appointment
- `POST /api/appointment/addTask` - Add routine and task
- `PUT /api/appointment/editTask/:id` - Edit routine and task
- `PUT /api/appointment/swapAppointment/:id` - Swap appointment
- `PUT /api/appointment/agreeBeforeAppointmentDetail/:id` - Agree before appointment
- `GET /api/appointment/getAssignTask/:id` - Get assigned tasks
- `PUT /api/appointment/addNote/:id` - Add note to routine/task
- `PUT /api/appointment/appointmentQuestionCheck/:id` - Check appointment questions
- `GET /api/appointment/searchAppointments` - Search appointments
- `GET /api/appointment/get-calendar-appointments` - Get calendar appointments
- `GET /api/appointment/allListAppointments/:id` - Get all appointments for user
- `GET /api/appointment/appointmentListsClient/:id` - Get client appointments
- `GET /api/appointment/appointment-details/:id` - Get individual appointment details
- `GET /api/appointment/detail-list/:id` - Get appointment details list
- `GET /api/appointment/client/detail-list/:id` - Get client appointment details list
- `PUT /api/appointment/add-task/:id` - Add task against routine
- `GET /api/appointment/details/swaped/:id` - Get swapped appointment details
- `PUT /api/appointment/routine/update-task/:id` - Update routine task
- `GET /api/appointment/get/details/:id` - Get task details
- `PUT /api/appointment/add-routine/:id` - Add routine
- `GET /api/appointment/task/details/:id` - Get appointment task details
- `PUT /api/appointment/appointment-swap/:id` - Swap appointment
- `PUT /api/appointment/appointment-add-routinetask/:id` - Add routine and task
- `GET /api/appointment/HcarerListAppointments/:id` - Get health carer appointments
- `PUT /api/appointment/appointmentsendMail/:id` - Send appointment delay mail
- `GET /api/appointment/details-HcarerListAppointments/:id` - Get health carer appointment details
- `GET /api/appointment/appointment-routine-data/:id` - Get appointment routine data
- `GET /api/appointment/healthCarerTimesheet/:id` - Get health carer timesheet
- `GET /api/appointment/exporthealthCarerTimesheet/:id` - Export health carer timesheet
- `GET /api/appointment/details-task/:id` - Get task details
- `GET /api/appointment/get-current-active-appointment-hc/:id` - Get current active appointment
- `GET /api/appointment/edit/appointment-details/:id` - Get appointment details for editing
- `GET /api/appointment/super-admin/getLocation/:id` - Get SIL location
- `GET /api/appointment/getitemid/:itemno` - Get detail item wise
- `GET /api/appointment/export/exportAppointmentData` - Export appointment data
- `GET /api/appointment/super-admin/appointment-list` - Get all appointments (admin)
- `GET /api/appointment/super-admin/appointment-list-export` - Export all appointments
- `GET /api/appointment/appointment-dropdwon/list` - Get appointment dropdown data
- `GET /api/appointment/appointment-dropdwon/Clientlist` - Get client dropdown data
- `GET /api/appointment/health-carer/get-all-health-carer-availability-list` - Get health carer availability
- `GET /api/appointment/health-carer/swap-apt/get-all/swap-appointment-availability-list` - Get swap availability
- `GET /api/appointment/getClientList/healthCarerId/:id` - Get client list by health carer
- `GET /api/appointment/getclientlists/:id` - Get client lists
- `GET /api/appointment/super-admin/shiftNote-list/:id` - Get shift note list
- `GET /api/appointment/getIndivisualAppointmentDetails/:id` - Get individual appointment details
- `GET /api/appointment/getStartedAppointmentDetails/:id` - Get started appointment details
- `PUT /api/appointment/updateContinueShiftNote/:id` - Update continue shift note
- `GET /api/appointment/clientAppointmentLists/:id` - Get client appointment lists
- `GET /api/appointment/get-all/swap-list` - Get all swap lists
- `GET /api/appointment/get-all/swap-list-export` - Export swap lists
- `GET /api/appointment/fetch/getListShiftAppointment` - Get shift appointment list
- `GET /api/appointment/get-all/not-started/appointments` - Get not started appointments
- `GET /api/appointment/ratingsOfClient/getlists` - Get client ratings
- `GET /api/appointment/ratingsOfHealthCarer/getlists` - Get health carer ratings
- `GET /api/appointment/get-all/exportAppointmentByidHealth/:id` - Export appointment by health carer ID
- `GET /api/appointment/super-admin/shift-note-list/:id` - Get shift note list
- `GET /api/appointment/clientTeam/get-all-available-hc` - Get available health carers
- `GET /api/appointment/getclintIdBytasks/:id` - Get client ID by tasks
- `GET /api/appointment/indvidualtaskDetails/:id` - Get individual task details
- `PUT /api/appointment/approveMultipleAppointments` - Approve multiple appointments
- `GET /api/appointment/getExpenseData/:id` - Get expense data
- `PUT /api/appointment/updateNoteStatus/:id/:status` - Update note status
- `PUT /api/appointment/updateContinueShiftNoteCompleted/:id` - Update continue shift note completed
- `GET /api/appointment/getClientDefaultAddressByAppointmentId/:id` - Get client default address
- `GET /api/appointment/getAddressByClientId/:id` - Get address by client ID
- `POST /api/appointment/update-appointment-time` - Update appointment time from timesheet
- `PUT /api/appointment/update-appointment-expense/:id` - Add expenses against appointment
- `GET /api/appointment/listShiftNoteasperclient` - List shift notes as per client
- `GET /api/appointment/export/ShiftNoteasperclient` - Export shift notes as per client
- `GET /api/appointment/getData` - Get appointment status data
- `POST /api/appointment/swap-task` - Swap task self columns
- `GET /api/appointment/silsda/Appointment` - Get SIL/SDA appointment details

#### Mobile Appointments (`/api/frontend/appointment`)

- `GET /api/frontend/appointment/allListAppointments/:id` - Get all appointments (mobile)
- `GET /api/frontend/appointment/getAppointmentDetails/:id` - Get appointment details (mobile)
- `GET /api/frontend/appointment/detail-list/:id` - Get appointment details list (mobile)
- `PUT /api/frontend/appointment/update/:id` - Update appointment (mobile)
- `PUT /api/frontend/appointment/add-routine/:id` - Add routine (mobile)
- `PUT /api/frontend/appointment/appointmentsendMail/:id` - Send appointment delay mail (mobile)
- `PUT /api/frontend/appointment/swapAppointment/:id` - Swap appointment (mobile)
- `GET /api/frontend/appointment/super-admin/shiftNote-list/:id` - Get shift note list (mobile)
- `GET /api/frontend/appointment/edit/appointment-details/:id` - Get appointment details for editing (mobile)
- `GET /api/frontend/appointment/getTodaysAppointment/:id` - Get today's appointments (mobile)
- `GET /api/frontend/appointment/getAppoointmentList/:id` - Get appointment list (mobile)
- `GET /api/frontend/appointment/AllAppointmentMob` - Get all appointments mobile
- `PUT /api/frontend/appointment/UpdateAppointmentStatusMob/:id` - Update appointment status (mobile)
- `GET /api/frontend/appointment/SwapAvalabilityListHealthcarer` - Get swap availability list
- `PUT /api/frontend/appointment/AppointmentSwapped/:id` - Swap appointment
- `GET /api/frontend/appointment/AllAgreementListPopup` - Get agreement list popup
- `PUT /api/frontend/appointment/AppointmentStartFull/:id` - Start full appointment
- `PUT /api/frontend/appointment/UpdateFullAppointment/:id` - Update full appointment
- `GET /api/frontend/appointment/AppointmentFullDetails/:id` - Get full appointment details
- `GET /api/frontend/appointment/IndividualAppointmentDetails/:id` - Get individual appointment details
- `PUT /api/frontend/appointment/AddRotuineAndTaskAppointment/:id` - Add routine and task
- `GET /api/frontend/appointment/shiftNote-list/:id` - Get shift note list
- `GET /api/frontend/appointment/getIndivisualShiftnoteDetails/:id` - Get individual shift note details
- `DELETE /api/frontend/appointment/ContinueShiftNotedelete/:id` - Delete continue shift note
- `PUT /api/frontend/appointment/routine-add/:id` - Add routine
- `PUT /api/frontend/appointment/task-add/:id` - Add task
- `GET /api/frontend/appointment/dashboardcount/:id` - Get dashboard count
- `GET /api/frontend/appointment/startedAppointmentDetails/:id` - Get started appointment details
- `PUT /api/frontend/appointment/appointment-add-routinetask/:id` - Add routine and task
- `PUT /api/frontend/appointment/update-appointment-expense/:id` - Add expenses
- `GET /api/frontend/appointment/shift-note-list/:id` - Get shift note list
- `GET /api/frontend/appointment/indtaskDetails/:id` - Get individual task details
- `PUT /api/frontend/appointment/update-task-routine/:id` - Update task routine
- `GET /api/frontend/appointment/ShiftNoteasperclientId` - Get shift notes as per client
- `GET /api/frontend/appointment/IndivisualAppointmentDetails/:id` - Get individual appointment details
- `GET /api/frontend/appointment/super-admin/FilterAppointmentList` - Filter appointment list
- `GET /api/frontend/appointment/getClientList/healthCarerId/:id` - Get client list by health carer
- `GET /api/frontend/appointment/allRoutineIconlist` - Get all routine icons
- `GET /api/frontend/appointment/AllAppointmentMobCalandar` - Get calendar appointments
- `GET /api/frontend/appointment/getAllRecievedRequestBySendByHC/:id` - Get received requests
- `PUT /api/frontend/appointment/updateSendRequestStatus` - Update send request status
- `GET /api/frontend/appointment/get-client-details-by-userid/:id` - Get client details by user ID
- `GET /api/frontend/appointment/client-details-Data-by-userId/:id` - Get client data details
- `GET /api/frontend/appointment/getDetailsBySendTo/:id1/:id2` - Get details by send to
- `GET /api/frontend/appointment/getsendRequestDetails/:id` - Get send request details
- `GET /api/frontend/appointment/getHCDetails/:id` - Get health carer details
- `GET /api/frontend/appointment/getAllInvoice` - Get all invoices
- `POST /api/frontend/appointment/shareInvoice` - Share invoice
- `POST /api/frontend/appointment/generate-invoice-for-ihc` - Generate invoice for IHC
- `GET /api/frontend/appointment/getAllRecivedContinueShiftNote` - Get all received continue shift notes
- `GET /api/frontend/appointment/client/details/:id` - Get client details
- `GET /api/frontend/appointment/updateContinueShiftNoteCompleted/:id` - Update continue shift note completed
- `GET /api/frontend/appointment/health-carer/swap-apt/get-all/swap-appointment-availability-list` - Get swap availability
- `PUT /api/frontend/appointment/appointment-swap/:id` - Swap appointment
- `GET /api/frontend/appointment/details/swaped/:id` - Get swapped details
- `GET /api/frontend/appointment/getClientDefaultAddressByAppointmentId/:id` - Get client default address
- `GET /api/frontend/appointment/getAddressByClientId/:id` - Get address by client ID

## 3. TIMESHEET FLOW & APIs

### Flow Overview

The timesheet system manages:

- Timesheet creation and filling by health carers
- Time tracking against appointments
- Expense tracking and management
- Timesheet approval workflow
- Service task tracking
- Goal task updates
- Timesheet viewing and filtering

### Key Features

- Appointment-based timesheet entry
- Expense management per appointment
- Approval request workflow
- Service task integration
- Goal task updates
- Timesheet filtering and export
- Multiple expense types support

### API Endpoints

#### Mobile Timesheet (`/api/frontend/timesheet`)

- `GET /api/frontend/timesheet/getListByHcId/:id` - Get timesheet list by health carer ID
- `GET /api/frontend/timesheet/viewTimesheet/:id` - View timesheet details
- `PUT /api/frontend/timesheet/fillTimesheetById/:id` - Fill timesheet by ID
- `PUT /api/frontend/timesheet/:id/addExpense` - Add expense to timesheet
- `PUT /api/frontend/timesheet/:id/updateExpense` - Update expense
- `POST /api/frontend/timesheet/:id/sendApprovalRequest` - Send approval request
- `PUT /api/frontend/timesheet/:id/saveTimesheet` - Save timesheet
- `GET /api/frontend/timesheet/getAllExpenseType` - Get all expense types
- `DELETE /api/frontend/timesheet/deleteExpense` - Delete expense

#### Web Timesheet (via Appointment endpoints)

- `GET /api/appointment/healthCarerTimesheet/:id` - Get health carer timesheet
- `GET /api/appointment/exporthealthCarerTimesheet/:id` - Export health carer timesheet
- `POST /api/appointment/update-appointment-time` - Update appointment time from timesheet

## 4. PAYROLL FLOW & APIs

### Flow Overview

The payroll system manages:

- Pay run creation and management
- Pay slip generation
- Payment status tracking
- Pay run period management
- Employee payment processing
- Pay run status workflow
- Pay slip sharing and export
- Contractor payroll management

### Key Features

- Pay run creation and management
- Automated pay slip generation
- Payment status tracking (paid/unpaid)
- Multiple pay run types (ISC, HC, Parent, Contractor)
- Pay run period management
- Pay slip sharing functionality
- Export capabilities

### API Endpoints

#### Pay Run (`/api/pay-run`)

- `GET /api/pay-run/list` - Get pay run list
- `POST /api/pay-run/create` - Create pay run
- `GET /api/pay-run/details/:id` - Get pay run details
- `PUT /api/pay-run/update/:id` - Update pay run
- `DELETE /api/pay-run/delete/:id` - Delete pay run
- `GET /api/pay-run/export` - Export pay run list
- `POST /api/pay-run/ISC/create` - Create ISC pay run
- `POST /api/pay-run/HC/create` - Create HC pay run
- `POST /api/pay-run/parent/create` - Create parent pay run
- `GET /api/pay-run/PayrunPeriodDD` - Get pay run period dropdown
- `GET /api/pay-run/getPayrunDataByDate` - Get pay run data by date
- `GET /api/pay-run/generated/getGeneratedPayrunDataByDate` - Get generated pay run data by date
- `GET /api/pay-run/generated/getGeneratedPayrunData` - Get generated pay run data
- `GET /api/pay-run/generated/AllPayRun` - Get all generated pay runs
- `DELETE /api/pay-run/deletePayrunData/:id` - Delete pay run data

#### Pay Run V2 (`/api/v2/pay-run`)

- `GET /api/v2/pay-run/` - Get pay run list (v2)
- `POST /api/v2/pay-run/` - Store pay run (v2)
- `DELETE /api/v2/pay-run/:id` - Delete pay run (v2)

#### Pay Run Status (`/api/payrunStatus`)

- `GET /api/payrunStatus/allpayrunStatusList` - Get all pay run status list
- `GET /api/payrunStatus/getIndividual/:id` - Get individual pay run status
- `POST /api/payrunStatus/create` - Create pay run status
- `PUT /api/payrunStatus/update/:id` - Update pay run status
- `DELETE /api/payrunStatus/delete/:id` - Delete pay run status
- `GET /api/payrunStatus/getpayrunStatusList` - Get pay run status list

#### Pay Slip (`/api/paySlip`)

- `POST /api/paySlip/create` - Create pay slip
- `GET /api/paySlip/getlists` - Get all pay slips
- `GET /api/paySlip/:id` - Get pay slip details
- `GET /api/paySlip/user/:id` - Get pay slip by user ID
- `PUT /api/paySlip/update/:id` - Update pay slip
- `DELETE /api/paySlip/delete/:id` - Delete pay slip
- `PUT /api/paySlip/employee/updatePaymentStatus/:id` - Update payment status
- `GET /api/paySlip/employee/unpaidList` - Get unpaid employee list
- `GET /api/paySlip/employee/paidList` - Get paid employee list

#### Generated Pay Slips (`/api/generatePaySlip`)

- `POST /api/generatePaySlip/create` - Create generated pay slip
- `GET /api/generatePaySlip/getlists` - Get all generated pay slips
- `GET /api/generatePaySlip/:id` - Get generated pay slip details
- `GET /api/generatePaySlip/user/:id` - Get generated pay slip by user ID
- `PUT /api/generatePaySlip/update/:id` - Update generated pay slip
- `DELETE /api/generatePaySlip/delete/:id` - Delete generated pay slip
- `PUT /api/generatePaySlip/employee/updatePaymentStatus/:id` - Update payment status
- `GET /api/generatePaySlip/employee/unpaidList` - Get unpaid employee list
- `GET /api/generatePaySlip/employee/paidList` - Get paid employee list
- `GET /api/generatePaySlip/generatePaySlipDetails/:id` - Generate pay slip details
- `GET /api/generatePaySlip/leave/getLeaveObject` - Get leave object
- `PUT /api/generatePaySlip/generatePayslips/all` - Generate all pay slips
- `PUT /api/generatePaySlip/updateEditableboxesRecord/update/:id` - Update editable boxes record
- `POST /api/generatePaySlip/shareGeneratedPayslip` - Share generated pay slip

#### Contractor Pay Slips (`/api/generatePaySlipContractor`)

- Similar endpoints as generated pay slips but for contractors

## 5. INCIDENT MANAGEMENT FLOW & APIs

### Flow Overview

The incident management system handles:

- Incident reporting and creation
- Incident intake (with AI-powered analysis)
- Incident status tracking
- Incident investigation workflow
- Incident reporting and analytics
- Severity management
- Incident mapping and geographic analysis
- Injury photo analysis (AI-powered)
- Incident export and PDF generation

### Key Features

- Multi-step incident intake process
- AI-powered injury photo analysis
- Incident status workflow
- Severity classification
- Geographic incident mapping
- Comprehensive reporting and analytics
- Export capabilities
- PDF generation
- Filter and search functionality

### API Endpoints

#### Web Incident (`/api/incident`)

- `POST /api/incident/create` - Create incident
- `GET /api/incident/get-all-incident` - Get all incidents
- `GET /api/incident/get-incident-filter` - Get incidents with filter
- `GET /api/incident/get-all-incident-user` - Get incidents for user
- `GET /api/incident/get-all-incident-supervisor` - Get incidents for supervisor
- `GET /api/incident/get-all-incident-genManager` - Get incidents for general manager
- `GET /api/incident/:id` - Get incident details
- `GET /api/incident/pdf/:id` - Get incident PDF
- `PUT /api/incident/update/:id` - Update incident
- `DELETE /api/incident/delete/:id` - Delete incident
- `PUT /api/incident/status/:id` - Update incident status
- `GET /api/incident/incident/export` - Export incidents
- `GET /api/incident/incident/allexportIncident` - Export all incidents
- `GET /api/incident/count/getIncidentCount` - Get incident count
- `GET /api/incident/list/getIncidentAppt` - Get incident appointments
- `POST /api/incident/intake` - Incident intake (with file upload)
- `POST /api/incident/store` - Store incident directly
- `POST /api/incident/analyze-injury-photo` - Analyze injury photo (AI-powered)

#### Mobile Incident (`/api/frontend/incident`)

- `POST /api/frontend/incident/create` - Create incident (mobile)
- `GET /api/frontend/incident/get-all-incident-user` - Get incidents for user (mobile)
- `GET /api/frontend/incident/:id` - Get incident details (mobile)
- `PUT /api/frontend/incident/update/:id` - Update incident (mobile)
- `DELETE /api/frontend/incident/delete/:id` - Delete incident (mobile)
- `GET /api/frontend/incident/get-all-severity/list` - Get all severity list (mobile)
- `GET /api/frontend/incident/list/getIncidentAppt` - Get incident appointments (mobile)

#### Incident Reports (`/api/incident-report`)

- `GET /api/incident-report/filters` - Get incident report filters
- `GET /api/incident-report/executive-summary` - Get executive summary
- `GET /api/incident-report/severity-distribution` - Get severity distribution
- `GET /api/incident-report/trending-incidents` - Get trending incidents
- `GET /api/incident-report/top-incident-types` - Get top incident types
- `GET /api/incident-report/location-analysis` - Get location analysis
- `GET /api/incident-report/performance-metrics` - Get performance metrics
- `GET /api/incident-report/medical-outcomes` - Get medical outcomes
- `GET /api/incident-report/carer-performance` - Get carer performance
- `GET /api/incident-report/age-severity-analysis` - Get age severity analysis
- `GET /api/incident-report/compliance-metrics` - Get compliance metrics
- `GET /api/incident-report/compliance-trends` - Get compliance trends
- `GET /api/incident-report/reporting-delays` - Get reporting delays
- `GET /api/incident-report/compliance-by-location` - Get compliance by location
- `GET /api/incident-report/investigation-pipeline` - Get investigation pipeline
- `GET /api/incident-report/contributing-factors` - Get contributing factors
- `GET /api/incident-report/investigation-by-severity` - Get investigation by severity
- `GET /api/incident-report/compliance-breaches` - Get compliance breaches
- `GET /api/incident-report/incident-mapping/incidents` - Get incidents for mapping
- `GET /api/incident-report/incident-mapping/heatmap` - Get incident heatmap
- `GET /api/incident-report/incident-mapping/clusters` - Get incident clusters
- `GET /api/incident-report/incident-mapping/geographic-analysis` - Get geographic analysis
- `GET /api/incident-report/incident-mapping/risk-zones` - Get risk zones
- `GET /api/incident-report/incident-mapping/temporal-spatial` - Get temporal spatial analysis

#### Incident Intake (`/api/incidentIntake`)

- `POST /api/incidentIntake/create` - Create incident intake

## AUTHENTICATION MIDDLEWARE

### Middleware Types

1. **isLoggedIn** - Web authentication middleware

   - Checks JWT token from cookies or Authorization header
   - Validates token and attaches user to request
   - Used for web endpoints

2. **isLoggedInMobile** - Mobile authentication middleware

   - Checks JWT token from Authorization header (Bearer token)
   - Validates token and checks for duplicate login
   - Used for mobile/frontend endpoints

3. **customRole** - Role-based access control
   - Checks if user has required role
   - Used for role-specific endpoints

### Token Format

- **Web**: Token in cookies or `Authorization: Bearer <token>` header
- **Mobile**: Token in `Authorization: Bearer <token>` header only
- **Refresh Token**: Separate endpoint for token refresh

## COMMON PATTERNS

### Request/Response Format

- All endpoints return JSON
- Standard error format: `{ message: string, success: boolean }`
- Success responses typically include data object

### File Upload

- Incident intake supports file uploads (images, PDFs)
- Max file size: 10MB
- Supported types: PDF, JPEG, JPG, PNG, GIF, WEBP, TXT

### Pagination

- Many list endpoints support pagination
- Filter parameters vary by endpoint

### Export Functionality

- Multiple endpoints support export (CSV, Excel)
- Export endpoints typically return file downloads

### Status Management

- Most entities support status updates
- Status values vary by entity type

## DOCUMENTATION PROMPT FOR AI/LLM

Use this prompt to generate comprehensive API documentation:

```
Create comprehensive API documentation for the Hubshift Admin system covering the following modules:

1. **Authentication Module**
   - Document all authentication endpoints (web and mobile)
   - Include request/response examples
   - Explain JWT token flow
   - Document password reset flow
   - Include error codes and messages

2. **Appointments Module**
   - Document appointment lifecycle
   - Include all CRUD operations
   - Document appointment swapping flow
   - Explain routine and task management
   - Document shift notes functionality
   - Include expense tracking endpoints

3. **Timesheet Module**
   - Document timesheet creation and filling
   - Include expense management
   - Document approval workflow
   - Explain service task integration

4. **Payroll Module**
   - Document pay run creation and management
   - Include pay slip generation endpoints
   - Document payment status tracking
   - Explain pay run period management
   - Include contractor payroll endpoints

5. **Incident Management Module**
   - Document incident reporting flow
   - Include AI-powered intake endpoints
   - Document incident status workflow
   - Explain reporting and analytics endpoints
   - Include geographic mapping endpoints

For each endpoint, provide:
- HTTP method and path
- Authentication requirements
- Request parameters (query, body, path)
- Request body schema (if applicable)
- Response schema
- Example requests and responses
- Error responses
- Status codes

Organize the documentation with:
- Clear section headers
- Code examples
- Flow diagrams (text-based)
- Common use cases
- Best practices
- Rate limiting information (if applicable)
```

## NOTES FOR DOCUMENTATION CREATION

1. **Base URL**: All endpoints are prefixed with `/api` or `/api/frontend` for mobile
2. **Authentication**: Most endpoints require authentication middleware
3. **Versioning**: Some endpoints have v2 versions (e.g., pay-run)
4. **File Uploads**: Use multipart/form-data for file upload endpoints
5. **Export Endpoints**: Return downloadable files, not JSON
6. **Mobile vs Web**: Mobile endpoints use `/api/frontend` prefix and `isLoggedInMobile` middleware
7. **Error Handling**: Standard error format across all endpoints
8. **Pagination**: Many list endpoints support pagination (check controller implementation)
9. **Filtering**: Many endpoints support filtering (check controller implementation)
10. **Role-Based Access**: Some endpoints require specific roles (check middleware usage)

## ADDITIONAL RESOURCES

- Check controller files for detailed request/response schemas
- Check model files for data structure definitions
- Review middleware files for authentication and authorization logic
- Check frontend API files for request examples

