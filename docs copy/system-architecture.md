# System Architecture

## Overview

Hubshift follows a modern, scalable three-tier architecture with clear separation between presentation, business logic, and data layers. The system is designed for high availability, scalability, and maintainability.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
├─────────────────────────────────────────────────────────────┤
│  Web Application (React)  │  Mobile App  │  Third-party APIs │
└──────────────┬──────────────────┬──────────────────────────┘
               │                  │
               │ HTTPS/REST       │ HTTPS/REST
               │ WebSocket        │
               ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                      API GATEWAY LAYER                        │
├─────────────────────────────────────────────────────────────┤
│  Express.js Server  │  Authentication Middleware  │  CORS   │
└──────────────┬──────────────────────────────────────────────┘
               │
               │ HTTP/HTTPS
               ▼
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                          │
├─────────────────────────────────────────────────────────────┤
│  Controllers  │  Services  │  Middleware  │  Utils          │
│  Routes       │  Validators │  Loggers     │  Helpers       │
└──────────────┬──────────────────────────────────────────────┘
               │
               │ Mongoose ODM
               ▼
┌─────────────────────────────────────────────────────────────┐
│                       DATA LAYER                              │
├─────────────────────────────────────────────────────────────┤
│  MongoDB Database  │  AWS S3 Storage  │  Redis (if used)    │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Frontend Architecture

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/               # Page-level components
│   ├── context/            # React Context providers
│   ├── redux/              # Redux store and slices
│   ├── routing/            # Route definitions
│   ├── api/                # API client configuration
│   ├── helpers/            # Utility functions
│   ├── hooks/              # Custom React hooks
│   ├── services/           # Business logic services
│   └── utils/              # General utilities
```

**Key Patterns:**
- Component-based architecture
- Container/Presentational component pattern
- Custom hooks for reusable logic
- Context API for global state
- Redux for complex state management

### Backend Architecture

```
backend/
├── src/
│   ├── controllers/        # Request handlers
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Route definitions
│   ├── middlewares/        # Express middlewares
│   ├── utils/              # Utility functions
│   ├── config/             # Configuration files
│   └── views/              # Pug templates (if used)
```

**Key Patterns:**
- MVC (Model-View-Controller) architecture
- RESTful API design
- Middleware-based request processing
- Service layer abstraction
- Repository pattern (via Mongoose models)

## Request Flow

### Web Request Flow

```
1. Client Request
   ↓
2. Express Server (app.js)
   ↓
3. Route Handler (routes/*.js)
   ↓
4. Authentication Middleware (isLoggedIn/isLoggedInMobile)
   ↓
5. Controller (controllers/*.js)
   ↓
6. Service/Helper Functions (utils/*.js)
   ↓
7. Database Query (Mongoose Models)
   ↓
8. Response to Client
```

### Mobile Request Flow

```
1. Mobile App Request
   ↓
2. Express Server
   ↓
3. Frontend Route Handler (routes/frontend/*.js)
   ↓
4. Mobile Auth Middleware (isLoggedInMobile)
   ↓
5. Frontend Controller (controllers/frontend/*.js)
   ↓
6. Service/Helper Functions
   ↓
7. Database Query
   ↓
8. JSON Response
```

## Data Flow

### Authentication Flow

```
1. User Login Request
   ↓
2. Validate Credentials
   ↓
3. Generate JWT Token
   ↓
4. Store Token (Cookie/Header)
   ↓
5. Return User Data + Token
   ↓
6. Subsequent Requests Include Token
   ↓
7. Middleware Validates Token
   ↓
8. Attach User to Request Object
```

### Appointment Creation Flow

```
1. Create Appointment Request
   ↓
2. Validate Request Data
   ↓
3. Check Health Carer Availability
   ↓
4. Create Appointment Record
   ↓
5. Link Routine/Tasks (if any)
   ↓
6. Send Notifications
   ↓
7. Return Created Appointment
```

### Timesheet Flow

```
1. Health Carer Fills Timesheet
   ↓
2. Validate Time Entries
   ↓
3. Calculate Hours/Units
   ↓
4. Add Expenses (if any)
   ↓
5. Save Timesheet
   ↓
6. Send Approval Request
   ↓
7. Supervisor Reviews
   ↓
8. Approve/Reject
   ↓
9. Update Appointment Status
```

### Payroll Flow

```
1. Create Pay Run
   ↓
2. Select Pay Period
   ↓
3. Fetch Approved Timesheets
   ↓
4. Calculate Wages
   ↓
5. Apply Deductions/Taxes
   ↓
6. Generate Pay Slips
   ↓
7. Export to Xero (if configured)
   ↓
8. Mark as Processed
```

### Incident Management Flow

```
1. Incident Reported
   ↓
2. AI Intake Processing (if file uploaded)
   ↓
3. Extract Incident Data
   ↓
4. Create Incident Record
   ↓
5. Assign Severity
   ↓
6. Notify Relevant Parties
   ↓
7. Investigation Workflow
   ↓
8. Update Status
   ↓
9. Generate Reports
```

## Database Architecture

### MongoDB Collections

**Core Collections:**
- `users`: User accounts and profiles
- `appointments`: Appointment records
- `timesheets`: Timesheet entries
- `payRuns`: Pay run records
- `paySlips`: Pay slip records
- `incidents`: Incident reports
- `clientDetails`: Client information
- `healthCarers`: Health carer profiles
- `supportCoordinators`: Support coordinator data

**Supporting Collections:**
- `notifications`: User notifications
- `documents`: Document references
- `goals`: Client goals and objectives
- `medications`: Medication records
- `observations`: Health observations
- `formTemplates`: Form templates
- `formSubmissions`: Form submission data

### Relationships

```
users (1) ──→ (many) appointments
users (1) ──→ (many) timesheets
appointments (1) ──→ (many) timesheets
users (1) ──→ (many) paySlips
payRuns (1) ──→ (many) paySlips
clientDetails (1) ──→ (many) appointments
clientDetails (1) ──→ (many) incidents
```

## Integration Architecture

### External Services Integration

```
Hubshift Backend
    │
    ├──→ AWS S3 (File Storage)
    │
    ├──→ AWS SES (Email)
    │
    ├──→ AWS CloudWatch (Logging)
    │
    ├──→ Twilio (SMS/WhatsApp)
    │
    ├──→ Stripe (Payments)
    │
    ├──→ Xero (Accounting)
    │
    ├──→ Firebase (Push Notifications)
    │
    └──→ Python Service (AI/ML Processing)
```

### Real-time Communication

```
Client ←──WebSocket──→ Express Server
                          │
                          ├──→ Socket.io (if enabled)
                          │
                          └──→ Notification Service
```

## Security Architecture

### Authentication Layers

```
1. Request Authentication
   ├── JWT Token Validation
   ├── Token Expiry Check
   └── User Verification

2. Authorization
   ├── Role-Based Access Control (RBAC)
   ├── Resource-Level Permissions
   └── Route Protection

3. Data Security
   ├── Input Sanitization
   ├── MongoDB Injection Prevention
   ├── Password Hashing (bcrypt)
   └── Secure Token Storage
```

### Security Middleware Stack

```
Request
  ↓
CORS Middleware
  ↓
Body Parser
  ↓
Cookie Parser
  ↓
Authentication Middleware
  ↓
Authorization Middleware (if needed)
  ↓
Route Handler
```

## Scalability Considerations

### Horizontal Scaling

- **Stateless API Design**: No server-side session storage
- **Load Balancing**: Can be deployed behind AWS ELB/ALB
- **Database Sharding**: MongoDB supports horizontal sharding
- **CDN Integration**: Static assets can be served via CDN

### Vertical Scaling

- **PM2 Clustering**: Multi-process Node.js application
- **Database Indexing**: Optimized queries with proper indexes
- **Caching Strategy**: Can implement Redis for caching
- **Connection Pooling**: Mongoose connection pooling

## Deployment Architecture

### Production Environment

```
AWS EC2 Instance
    │
    ├──→ PM2 Process Manager
    │       ├──→ Node.js Process 1
    │       ├──→ Node.js Process 2
    │       └──→ Node.js Process N
    │
    ├──→ MongoDB (or MongoDB Atlas)
    │
    └──→ AWS Services
            ├──→ S3
            ├──→ CloudWatch
            ├──→ SES
            └──→ SSM Parameter Store
```

### Deployment Flow

```
1. Code Push to Repository
   ↓
2. AWS CodeDeploy Triggered
   ↓
3. Deployment Script Execution
   ↓
4. Environment Variables Loaded (SSM)
   ↓
5. Dependencies Installed
   ↓
6. Application Built
   ↓
7. PM2 Restart
   ↓
8. Health Check
   ↓
9. Deployment Complete
```

## Monitoring & Logging

### Logging Architecture

```
Application Logs
    │
    ├──→ Winston Logger
    │       ├──→ Console Output
    │       ├──→ Daily Rotate File
    │       └──→ CloudWatch Logs
    │
    └──→ Morgan (HTTP Request Logging)
```

### Metrics & Monitoring

- **AWS CloudWatch**: Application metrics and logs
- **PM2 Monitoring**: Process health monitoring
- **Custom Metrics**: Business-specific metrics via CloudWatch
- **Error Tracking**: Winston error logging

## Error Handling

### Error Flow

```
Error Occurs
    ↓
Error Handler Middleware
    ↓
Log Error (Winston)
    ↓
Send to CloudWatch (if configured)
    ↓
Return Standardized Error Response
    ↓
Client Receives Error
```

### Error Response Format

```json
{
  "success": false,
  "message": "Error description",
  "error": "Error details (development only)"
}
```

## API Versioning

### Current Structure

- **Web APIs**: `/api/*`
- **Mobile APIs**: `/api/frontend/*`
- **V2 APIs**: `/api/v2/*` (for newer implementations)

### Versioning Strategy

- URL-based versioning for major changes
- Backward compatibility maintained where possible
- Deprecation notices for old endpoints

