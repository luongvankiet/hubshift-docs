---
title: API Quick Reference
description: Quick reference guide for all Hubshift API endpoints
navigation:
  icon: i-lucide-zap
seo:
  title: Hubshift API Quick Reference
  description: Quick reference guide for all Hubshift API endpoints - authentication, appointments, timesheet, payroll, and incidents
---

# API Quick Reference

## 1. AUTHENTICATION APIs

### Web Authentication (`/api/user`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/user/signup` | User registration |
| POST | `/api/user/login` | User login |
| POST | `/api/user/forgotPassword` | Request password reset |
| GET | `/api/user/newpassword/:key/:token` | Verify reset link |
| PUT | `/api/user/newpassword` | Set new password |
| POST | `/api/user/verifymailOTP` | Verify email OTP |
| POST | `/api/user/otp/resend` | Resend OTP email |
| POST | `/api/user/getRefreshTokan` | Get refresh token |
| GET | `/api/user/:id/verify/:token/` | Verify email link |
| POST | `/api/user/password/reset/:token` | Reset password with token |
| GET | `/api/user/getuserDetail/:id` | Get user details |
| PUT | `/api/user/update/:id` | Update user profile |
| DELETE | `/api/user/delete/:id` | Delete user account |

### Mobile Authentication (`/api/frontend/user`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/frontend/user/login` | Mobile login |
| POST | `/api/frontend/user/signup` | Mobile signup |
| POST | `/api/frontend/user/forgotPassword` | Mobile password reset |
| POST | `/api/frontend/user/password/reset/:token` | Mobile password reset with token |
| POST | `/api/frontend/user/verifymailOTP` | Mobile email OTP verification |
| POST | `/api/frontend/user/otp/resend` | Mobile resend OTP |
| GET | `/api/frontend/user/:id/verify/:token` | Mobile email verification |
| PUT | `/api/frontend/user/newpassword` | Mobile set new password |
| GET | `/api/frontend/user/getRefreshToken` | Mobile refresh token |
| POST | `/api/frontend/user/device/token` | Save device token |
| POST | `/api/frontend/user/tokens/reset` | Reset all tokens |
| GET | `/api/frontend/user/getuserDetail/:id` | Get user details (mobile) |
| GET | `/api/frontend/user/get/profile/:id` | Get user profile (mobile) |
| PUT | `/api/frontend/user/profileUpdate/:id` | Update profile (mobile) |
| DELETE | `/api/frontend/user/Mobile/userDelete/:id` | Delete user account (mobile) |

## 2. APPOINTMENTS APIs

### Web Appointments (`/api/appointment`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/appointment/getlists` | Get appointment list |
| POST | `/api/appointment/create` | Create new appointment |
| GET | `/api/appointment/:id` | Get appointment details |
| PUT | `/api/appointment/update/:id` | Update appointment |
| PUT | `/api/appointment/update/status/:id` | Update appointment status |
| PUT | `/api/appointment/update/rescheduledAppointment/:id` | Reschedule appointment |
| DELETE | `/api/appointment/delete/:id` | Delete appointment |
| POST | `/api/appointment/addTask` | Add routine and task |
| PUT | `/api/appointment/editTask/:id` | Edit routine and task |
| PUT | `/api/appointment/swapAppointment/:id` | Swap appointment |
| GET | `/api/appointment/getAssignTask/:id` | Get assigned tasks |
| PUT | `/api/appointment/addNote/:id` | Add note to routine/task |
| GET | `/api/appointment/searchAppointments` | Search appointments |
| GET | `/api/appointment/get-calendar-appointments` | Get calendar appointments |
| GET | `/api/appointment/allListAppointments/:id` | Get all appointments for user |
| GET | `/api/appointment/healthCarerTimesheet/:id` | Get health carer timesheet |
| GET | `/api/appointment/exporthealthCarerTimesheet/:id` | Export health carer timesheet |
| GET | `/api/appointment/super-admin/appointment-list` | Get all appointments (admin) |
| GET | `/api/appointment/super-admin/appointment-list-export` | Export all appointments |
| GET | `/api/appointment/health-carer/get-all-health-carer-availability-list` | Get health carer availability |
| GET | `/api/appointment/get-all/swap-list` | Get all swap lists |
| PUT | `/api/appointment/approveMultipleAppointments` | Approve multiple appointments |
| GET | `/api/appointment/getExpenseData/:id` | Get expense data |
| PUT | `/api/appointment/update-appointment-expense/:id` | Add expenses against appointment |
| POST | `/api/appointment/update-appointment-time` | Update appointment time from timesheet |

### Mobile Appointments (`/api/frontend/appointment`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/frontend/appointment/allListAppointments/:id` | Get all appointments (mobile) |
| GET | `/api/frontend/appointment/getAppointmentDetails/:id` | Get appointment details (mobile) |
| PUT | `/api/frontend/appointment/update/:id` | Update appointment (mobile) |
| PUT | `/api/frontend/appointment/swapAppointment/:id` | Swap appointment (mobile) |
| GET | `/api/frontend/appointment/getTodaysAppointment/:id` | Get today's appointments |
| GET | `/api/frontend/appointment/AllAppointmentMob` | Get all appointments mobile |
| PUT | `/api/frontend/appointment/UpdateAppointmentStatusMob/:id` | Update appointment status |
| PUT | `/api/frontend/appointment/AppointmentStartFull/:id` | Start full appointment |
| PUT | `/api/frontend/appointment/UpdateFullAppointment/:id` | Update full appointment |
| GET | `/api/frontend/appointment/AppointmentFullDetails/:id` | Get full appointment details |
| PUT | `/api/frontend/appointment/AddRotuineAndTaskAppointment/:id` | Add routine and task |
| GET | `/api/frontend/appointment/shiftNote-list/:id` | Get shift note list |
| PUT | `/api/frontend/appointment/update-appointment-expense/:id` | Add expenses |
| GET | `/api/frontend/appointment/dashboardcount/:id` | Get dashboard count |
| GET | `/api/frontend/appointment/AllAppointmentMobCalandar` | Get calendar appointments |

## 3. TIMESHEET APIs

### Mobile Timesheet (`/api/frontend/timesheet`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/frontend/timesheet/getListByHcId/:id` | Get timesheet list by health carer ID |
| GET | `/api/frontend/timesheet/viewTimesheet/:id` | View timesheet details |
| PUT | `/api/frontend/timesheet/fillTimesheetById/:id` | Fill timesheet by ID |
| PUT | `/api/frontend/timesheet/:id/addExpense` | Add expense to timesheet |
| PUT | `/api/frontend/timesheet/:id/updateExpense` | Update expense |
| POST | `/api/frontend/timesheet/:id/sendApprovalRequest` | Send approval request |
| PUT | `/api/frontend/timesheet/:id/saveTimesheet` | Save timesheet |
| GET | `/api/frontend/timesheet/getAllExpenseType` | Get all expense types |
| DELETE | `/api/frontend/timesheet/deleteExpense` | Delete expense |

## 4. PAYROLL APIs

### Pay Run (`/api/pay-run`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/pay-run/list` | Get pay run list |
| POST | `/api/pay-run/create` | Create pay run |
| GET | `/api/pay-run/details/:id` | Get pay run details |
| PUT | `/api/pay-run/update/:id` | Update pay run |
| DELETE | `/api/pay-run/delete/:id` | Delete pay run |
| GET | `/api/pay-run/export` | Export pay run list |
| POST | `/api/pay-run/ISC/create` | Create ISC pay run |
| POST | `/api/pay-run/HC/create` | Create HC pay run |
| POST | `/api/pay-run/parent/create` | Create parent pay run |
| GET | `/api/pay-run/PayrunPeriodDD` | Get pay run period dropdown |
| GET | `/api/pay-run/getPayrunDataByDate` | Get pay run data by date |
| GET | `/api/pay-run/generated/getGeneratedPayrunDataByDate` | Get generated pay run data by date |
| GET | `/api/pay-run/generated/getGeneratedPayrunData` | Get generated pay run data |
| GET | `/api/pay-run/generated/AllPayRun` | Get all generated pay runs |
| DELETE | `/api/pay-run/deletePayrunData/:id` | Delete pay run data |

### Pay Run V2 (`/api/v2/pay-run`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v2/pay-run/` | Get pay run list (v2) |
| POST | `/api/v2/pay-run/` | Store pay run (v2) |
| DELETE | `/api/v2/pay-run/:id` | Delete pay run (v2) |

### Pay Run Status (`/api/payrunStatus`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/payrunStatus/allpayrunStatusList` | Get all pay run status list |
| GET | `/api/payrunStatus/getIndividual/:id` | Get individual pay run status |
| POST | `/api/payrunStatus/create` | Create pay run status |
| PUT | `/api/payrunStatus/update/:id` | Update pay run status |
| DELETE | `/api/payrunStatus/delete/:id` | Delete pay run status |
| GET | `/api/payrunStatus/getpayrunStatusList` | Get pay run status list |

### Pay Slip (`/api/paySlip`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/paySlip/create` | Create pay slip |
| GET | `/api/paySlip/getlists` | Get all pay slips |
| GET | `/api/paySlip/:id` | Get pay slip details |
| GET | `/api/paySlip/user/:id` | Get pay slip by user ID |
| PUT | `/api/paySlip/update/:id` | Update pay slip |
| DELETE | `/api/paySlip/delete/:id` | Delete pay slip |
| PUT | `/api/paySlip/employee/updatePaymentStatus/:id` | Update payment status |
| GET | `/api/paySlip/employee/unpaidList` | Get unpaid employee list |
| GET | `/api/paySlip/employee/paidList` | Get paid employee list |

### Generated Pay Slips (`/api/generatePaySlip`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/generatePaySlip/create` | Create generated pay slip |
| GET | `/api/generatePaySlip/getlists` | Get all generated pay slips |
| GET | `/api/generatePaySlip/:id` | Get generated pay slip details |
| GET | `/api/generatePaySlip/user/:id` | Get generated pay slip by user ID |
| PUT | `/api/generatePaySlip/update/:id` | Update generated pay slip |
| DELETE | `/api/generatePaySlip/delete/:id` | Delete generated pay slip |
| GET | `/api/generatePaySlip/generatePaySlipDetails/:id` | Generate pay slip details |
| GET | `/api/generatePaySlip/leave/getLeaveObject` | Get leave object |
| PUT | `/api/generatePaySlip/generatePayslips/all` | Generate all pay slips |
| PUT | `/api/generatePaySlip/updateEditableboxesRecord/update/:id` | Update editable boxes record |
| POST | `/api/generatePaySlip/shareGeneratedPayslip` | Share generated pay slip |

## 5. INCIDENT MANAGEMENT APIs

### Web Incident (`/api/incident`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/incident/create` | Create incident |
| GET | `/api/incident/get-all-incident` | Get all incidents |
| GET | `/api/incident/get-incident-filter` | Get incidents with filter |
| GET | `/api/incident/get-all-incident-user` | Get incidents for user |
| GET | `/api/incident/get-all-incident-supervisor` | Get incidents for supervisor |
| GET | `/api/incident/get-all-incident-genManager` | Get incidents for general manager |
| GET | `/api/incident/:id` | Get incident details |
| GET | `/api/incident/pdf/:id` | Get incident PDF |
| PUT | `/api/incident/update/:id` | Update incident |
| DELETE | `/api/incident/delete/:id` | Delete incident |
| PUT | `/api/incident/status/:id` | Update incident status |
| GET | `/api/incident/incident/export` | Export incidents |
| GET | `/api/incident/incident/allexportIncident` | Export all incidents |
| GET | `/api/incident/count/getIncidentCount` | Get incident count |
| GET | `/api/incident/list/getIncidentAppt` | Get incident appointments |
| POST | `/api/incident/intake` | Incident intake (with file upload) |
| POST | `/api/incident/store` | Store incident directly |
| POST | `/api/incident/analyze-injury-photo` | Analyze injury photo (AI-powered) |

### Mobile Incident (`/api/frontend/incident`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/frontend/incident/create` | Create incident (mobile) |
| GET | `/api/frontend/incident/get-all-incident-user` | Get incidents for user (mobile) |
| GET | `/api/frontend/incident/:id` | Get incident details (mobile) |
| PUT | `/api/frontend/incident/update/:id` | Update incident (mobile) |
| DELETE | `/api/frontend/incident/delete/:id` | Delete incident (mobile) |
| GET | `/api/frontend/incident/get-all-severity/list` | Get all severity list (mobile) |
| GET | `/api/frontend/incident/list/getIncidentAppt` | Get incident appointments (mobile) |

### Incident Reports (`/api/incident-report`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/incident-report/filters` | Get incident report filters |
| GET | `/api/incident-report/executive-summary` | Get executive summary |
| GET | `/api/incident-report/severity-distribution` | Get severity distribution |
| GET | `/api/incident-report/trending-incidents` | Get trending incidents |
| GET | `/api/incident-report/top-incident-types` | Get top incident types |
| GET | `/api/incident-report/location-analysis` | Get location analysis |
| GET | `/api/incident-report/performance-metrics` | Get performance metrics |
| GET | `/api/incident-report/medical-outcomes` | Get medical outcomes |
| GET | `/api/incident-report/carer-performance` | Get carer performance |
| GET | `/api/incident-report/age-severity-analysis` | Get age severity analysis |
| GET | `/api/incident-report/compliance-metrics` | Get compliance metrics |
| GET | `/api/incident-report/compliance-trends` | Get compliance trends |
| GET | `/api/incident-report/reporting-delays` | Get reporting delays |
| GET | `/api/incident-report/compliance-by-location` | Get compliance by location |
| GET | `/api/incident-report/investigation-pipeline` | Get investigation pipeline |
| GET | `/api/incident-report/contributing-factors` | Get contributing factors |
| GET | `/api/incident-report/investigation-by-severity` | Get investigation by severity |
| GET | `/api/incident-report/compliance-breaches` | Get compliance breaches |
| GET | `/api/incident-report/incident-mapping/incidents` | Get incidents for mapping |
| GET | `/api/incident-report/incident-mapping/heatmap` | Get incident heatmap |
| GET | `/api/incident-report/incident-mapping/clusters` | Get incident clusters |
| GET | `/api/incident-report/incident-mapping/geographic-analysis` | Get geographic analysis |
| GET | `/api/incident-report/incident-mapping/risk-zones` | Get risk zones |
| GET | `/api/incident-report/incident-mapping/temporal-spatial` | Get temporal spatial analysis |

## AUTHENTICATION MIDDLEWARE

- **isLoggedIn**: Web authentication (checks cookies or Authorization header)
- **isLoggedInMobile**: Mobile authentication (checks Authorization Bearer token)
- **customRole**: Role-based access control

## COMMON PATTERNS

- **Base URL**: `/api` for web, `/api/frontend` for mobile
- **File Upload**: Multipart/form-data, max 10MB
- **Export**: Returns downloadable files
- **Pagination**: Supported on many list endpoints
- **Filtering**: Supported on many endpoints
- **Error Format**: `{ message: string, success: boolean }`

