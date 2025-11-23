# Tech Stack

## Overview

Hubshift is built using a modern, full-stack JavaScript ecosystem with cloud-native infrastructure. The platform leverages industry-standard technologies for scalability, maintainability, and performance.

## Frontend

### Core Framework
- **React 18.2.0**: Modern UI library for building interactive user interfaces
- **React Router DOM 6.8.1**: Client-side routing and navigation
- **React Scripts 5.0.1**: Build tooling and development server

### UI Libraries & Components
- **Material-UI (MUI) 5.16.7**: Comprehensive component library
  - `@mui/material`: Core components
  - `@mui/icons-material`: Icon set
  - `@mui/lab`: Advanced components
  - `@mui/x-charts`: Data visualization
  - `@mui/x-date-pickers`: Date/time pickers
- **Chakra UI 2.8.1**: Additional component library
- **Ant Design 5.21.4**: Enterprise UI components
- **React Bootstrap 2.7.2**: Bootstrap components for React

### State Management
- **Redux Toolkit 2.2.8**: Predictable state container
- **React Redux 9.1.2**: React bindings for Redux
- **Zustand 4.3.6**: Lightweight state management alternative

### Forms & Validation
- **Formik 2.2.9**: Form state management
- **React Hook Form 7.43.1**: Performant form library
- **Yup 1.4.0**: Schema validation

### Data Visualization
- **ApexCharts 4.7.0**: Modern charting library
- **Chart.js 4.4.1**: Flexible charting
- **React Chart.js 2 5.2.0**: React wrapper for Chart.js
- **Plotly.js 3.1.1**: Advanced scientific charts

### Date & Time
- **Moment.js 2.29.4**: Date manipulation
- **Moment Timezone 0.5.46**: Timezone support
- **Date-fns 2.29.3**: Modern date utility library
- **Day.js 1.11.7**: Lightweight date library

### File Handling
- **React Dropzone 14.3.8**: File upload component
- **XLSX 0.18.5**: Excel file processing
- **PapaParse 5.4.1**: CSV parsing
- **JSZip 3.10.1**: ZIP file creation
- **File Saver 2.0.5**: File download utility

### PDF Generation
- **jsPDF 2.5.1**: PDF generation
- **html2pdf.js 0.10.1**: HTML to PDF conversion
- **html2canvas 1.4.1**: HTML to image conversion

### Communication & Real-time
- **Socket.io Client 4.7.5**: Real-time bidirectional communication
- **Axios 1.3.3**: HTTP client for API requests

### Maps & Location
- **React Google Maps API 2.18.1**: Google Maps integration
- **@vis.gl/react-google-maps 1.5.5**: Advanced Google Maps components

### Payment Processing
- **Stripe 13.10.0**: Payment gateway integration
- **@stripe/react-stripe-js 2.4.0**: React Stripe components
- **@stripe/stripe-js 2.2.0**: Stripe.js library

### Other Libraries
- **React Beautiful DnD 13.1.1**: Drag and drop functionality
- **React Toastify 9.1.1**: Toast notifications
- **SweetAlert2 11.7.3**: Beautiful alert dialogs
- **React Signature Canvas 1.0.6**: Digital signature capture
- **JWT Decode 3.1.2**: JWT token decoding
- **JS Cookie 3.0.5**: Cookie management

## Backend

### Core Framework
- **Node.js**: JavaScript runtime environment
- **Express.js 4.18.2**: Web application framework
- **Babel**: JavaScript compiler for ES6+ support

### Database
- **MongoDB**: NoSQL document database
- **Mongoose 6.6.5**: MongoDB object modeling
- **mongoose-aggregate-paginate-v2 1.0.6**: Pagination plugin

### Authentication & Security
- **JSON Web Token (JWT) 9.0.0**: Token-based authentication
- **bcryptjs 2.4.3**: Password hashing
- **mongo-sanitize 1.1.0**: MongoDB injection prevention
- **Validator 13.9.0**: Input validation
- **Cookie Parser 1.4.6**: Cookie handling

### File Upload & Storage
- **Multer 1.4.5-lts.1**: File upload middleware
- **multer-s3 2.10.0**: S3 file upload
- **AWS SDK 2.1471.0**: AWS service integration

### PDF Generation
- **PDFKit 0.13.0**: PDF document generation
- **PDFMake 0.2.10**: PDF generation from JSON
- **html-pdf 3.0.1**: HTML to PDF conversion
- **Puppeteer 21.7.0**: Headless browser for PDF generation
- **pdf-parse 1.1.1**: PDF parsing

### Communication Services
- **Nodemailer 6.8.0**: Email sending
- **Twilio 4.19.3**: SMS and WhatsApp messaging
- **node-ses 3.0.0**: AWS SES integration

### Payment & Accounting
- **Stripe 13.11.0**: Payment processing
- **Xero Node 5.0.1**: Xero accounting integration

### Real-time & WebSockets
- **Socket.io Client 4.7.5**: Real-time communication
- **WebSocket**: Native WebSocket support

### Task Scheduling
- **Cron 2.3.1**: Job scheduling
- **PM2 5.4.2**: Process manager for Node.js

### Logging & Monitoring
- **Winston 3.8.2**: Logging library
- **winston-cloudwatch 6.3.0**: AWS CloudWatch integration
- **winston-daily-rotate-file 5.0.0**: Log rotation
- **Morgan 1.10.0**: HTTP request logger
- **@aws-sdk/client-cloudwatch 3.614.0**: CloudWatch metrics
- **@aws-sdk/client-cloudwatch-logs 3.614.0**: CloudWatch logs

### Data Processing
- **CSV Parser 3.2.0**: CSV file parsing
- **Moment.js 2.29.4**: Date manipulation
- **Moment Timezone 0.5.43**: Timezone handling
- **Date-fns 2.30.0**: Date utilities

### Utilities
- **Axios 1.3.4**: HTTP client
- **Request 2.88.2**: HTTP request library
- **CORS 2.8.5**: Cross-origin resource sharing
- **Request IP 3.3.0**: IP address extraction
- **Nanoid 4.0.1**: Unique ID generation
- **Archiver 6.0.1**: File archiving

### AI/ML Integration
- **Python Shell 5.0.0**: Python script execution
- Custom Python module for NDIS incident analysis (LangGraph-based)

### Other Services
- **Firebase Admin 12.2.0**: Firebase services integration
- **Google APIs 140.0.0**: Google services integration
- **Moodle API 0.1.0**: Learning management system integration

## Infrastructure & DevOps

### Cloud Services (AWS)
- **EC2**: Application hosting
- **S3**: File storage and static assets
- **CloudWatch**: Logging and monitoring
- **SES (Simple Email Service)**: Email delivery
- **SSM Parameter Store**: Configuration management
- **IAM**: Access control and security

### Process Management
- **PM2**: Process manager for Node.js applications
  - Process monitoring
  - Auto-restart on failure
  - Load balancing
  - Zero-downtime deployments

### Deployment
- **AWS CodeDeploy**: Automated deployments (via `appspec.yml`)
- **Git**: Version control
- **Bash Scripts**: Deployment automation

### Environment Management
- **dotenv**: Environment variable management
- **AWS SSM Parameter Store**: Secure configuration storage

## Development Tools

### Build Tools
- **Babel**: JavaScript compiler
- **Nodemon**: Development auto-reload
- **React Scripts**: React build tooling

### Code Quality
- **ESLint**: Code linting (via React Scripts)
- **Jest**: Testing framework (via React Scripts)

## Third-Party Integrations

### Payment & Financial
- **Stripe**: Payment processing
- **Xero**: Accounting software integration

### Communication
- **Twilio**: SMS and WhatsApp messaging
- **AWS SES**: Email delivery
- **Nodemailer**: Email client

### Storage & CDN
- **AWS S3**: Object storage
- **Firebase**: Additional storage and services

### Analytics & Monitoring
- **AWS CloudWatch**: Logging and metrics
- **Winston**: Application logging

### Learning Management
- **Moodle**: LMS integration for training

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- MongoDB injection prevention
- Input validation and sanitization
- CORS configuration
- Secure cookie handling
- AWS IAM for access control
- SSL/TLS support (HTTPS in production)

## Performance Optimizations

- PM2 process management
- MongoDB indexing
- Aggregation pagination
- File upload size limits (50MB)
- Request body size limits (50MB)
- Log rotation and archival

