# Hubshift Overview

## What is Hubshift?

Hubshift is a comprehensive NDIS (National Disability Insurance Scheme) management platform designed to streamline operations for disability service providers, health carers, support coordinators, and clients. The platform facilitates appointment scheduling, timesheet management, payroll processing, incident reporting, and client care coordination.

## Key Features

### Core Modules

1. **Appointment Management**

   - Schedule and manage appointments between health carers and clients
   - Routine and task assignment
   - Appointment swapping and rescheduling
   - Shift notes and documentation
   - Calendar integration

2. **Timesheet & Attendance**

   - Digital timesheet entry
   - Expense tracking
   - Approval workflows
   - Service task integration
   - Export capabilities

3. **Payroll Management**

   - Pay run creation and processing
   - Automated pay slip generation
   - Payment status tracking
   - Multiple pay run types (ISC, HC, Parent, Contractor)
   - Integration with Xero accounting

4. **Incident Management**

   - AI-powered incident intake
   - Injury photo analysis
   - Incident reporting and tracking
   - Compliance monitoring
   - Geographic incident mapping
   - Comprehensive analytics and reporting

5. **Client & Worker Management**

   - Client profile management
   - Health carer profiles and availability
   - Support coordinator management
   - Team onboarding
   - Document management

6. **Authentication & Security**
   - JWT-based authentication
   - Role-based access control (RBAC)
   - Multi-device support
   - Password reset and email verification
   - Token refresh mechanism

## User Roles

The platform supports multiple user roles:

- **Super Admin**: Full system access and configuration
- **General Manager**: High-level oversight and reporting
- **Supervisor**: Team management and oversight
- **Health Carer**: Appointment management and timesheet entry
- **Support Coordinator**: Client coordination and planning
- **Client**: View appointments and care plans
- **Service Provider**: Service delivery management
- **Accountant**: Financial and payroll management
- **Plan Manager**: NDIS plan management
- **Stakeholder**: Limited access for external parties

## Platform Architecture

Hubshift follows a modern, scalable architecture:

- **Frontend**: React-based single-page application
- **Backend**: RESTful API built with Node.js and Express
- **Database**: MongoDB for flexible data storage
- **Infrastructure**: AWS cloud services
- **Real-time**: WebSocket support for live updates
- **Mobile**: Responsive design with mobile-specific API endpoints

## Integration Capabilities

- **Payment Processing**: Stripe integration
- **Accounting**: Xero integration for financial management
- **Communication**: Twilio for SMS/WhatsApp, AWS SES for email
- **Storage**: AWS S3 for file storage
- **Monitoring**: AWS CloudWatch for logging and metrics
- **AI/ML**: Python-based incident analysis module
- **LMS**: Moodle integration for training

## Compliance & Standards

- NDIS compliance features
- Incident reporting standards
- Data privacy and security
- Audit trails and reporting
- Document management and retention
