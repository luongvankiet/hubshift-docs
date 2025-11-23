# Authentication APIs

## Overview

Hubshift uses JWT (JSON Web Token) based authentication with support for both web and mobile applications. The authentication system includes user registration, login, password reset, email verification, and token refresh mechanisms.

## Authentication Flow

```
1. User Registration/Login
   ↓
2. Server Validates Credentials
   ↓
3. Generate JWT Token
   ↓
4. Return Token + User Data
   ↓
5. Client Stores Token
   ↓
6. Subsequent Requests Include Token
   ↓
7. Middleware Validates Token
   ↓
8. Request Proceeds if Valid
```

## Base URLs

- **Web APIs**: `/api/user`
- **Mobile APIs**: `/api/frontend/user`

## Authentication Methods

### Web Authentication
- Token stored in HTTP-only cookies
- Fallback to `Authorization` header
- Middleware: `isLoggedIn`

### Mobile Authentication
- Token in `Authorization: Bearer <token>` header
- Duplicate login detection
- Middleware: `isLoggedInMobile`

## Endpoints

### User Registration

#### Web Signup
```http
POST /api/user/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe",
  "userType": "healthCarer",
  "phone": "+61400000000"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe"
    },
    "token": "jwt_token_here"
  }
}
```

#### Mobile Signup
```http
POST /api/frontend/user/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe",
  "userType": "healthCarer"
}
```

### User Login

#### Web Login
```http
POST /api/user/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "role": "healthCarer",
      "firstName": "John",
      "lastName": "Doe"
    },
    "token": "jwt_token_here"
  }
}
```

#### Mobile Login
```http
POST /api/frontend/user/login
Content-Type: application/json
Authorization: Bearer <token> (for subsequent requests)

{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

### Password Reset

#### Request Password Reset
```http
POST /api/user/forgotPassword
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

#### Verify Reset Link
```http
GET /api/user/newpassword/:key/:token
```

#### Set New Password
```http
PUT /api/user/newpassword
Content-Type: application/json

{
  "key": "reset_key",
  "token": "reset_token",
  "newPassword": "NewSecurePassword123!"
}
```

### Email Verification

#### Verify Email Link
```http
GET /api/user/:id/verify/:token
```

#### Verify Email OTP
```http
POST /api/user/verifymailOTP
Content-Type: application/json

{
  "email": "user@example.com",
  "otp": "123456"
}
```

#### Resend OTP
```http
POST /api/user/otp/resend
Content-Type: application/json

{
  "email": "user@example.com"
}
```

### Token Management

#### Get Refresh Token
```http
POST /api/user/getRefreshTokan
Content-Type: application/json

{
  "refreshToken": "refresh_token_here"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "new_jwt_token",
    "refreshToken": "new_refresh_token"
  }
}
```

#### Mobile Refresh Token
```http
GET /api/frontend/user/getRefreshToken
Authorization: Bearer <current_token>
```

### User Profile

#### Get User Details
```http
GET /api/user/getuserDetail/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "healthCarer",
    "phone": "+61400000000",
    "isActive": true
  }
}
```

#### Update User Profile
```http
PUT /api/user/update/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+61400000000"
}
```

### Mobile-Specific Endpoints

#### Save Device Token (Push Notifications)
```http
POST /api/frontend/user/device/token
Authorization: Bearer <token>
Content-Type: application/json

{
  "deviceToken": "firebase_device_token",
  "deviceType": "ios" | "android"
}
```

#### Reset All Tokens
```http
POST /api/frontend/user/tokens/reset
Authorization: Bearer <token>
```

#### Get User Profile (Mobile)
```http
GET /api/frontend/user/get/profile/:id
Authorization: Bearer <token>
```

## Error Responses

### Invalid Credentials
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

### Token Expired
```json
{
  "success": false,
  "message": "Token expired"
}
```

### Unauthorized
```json
{
  "success": false,
  "message": "Unauthorized"
}
```

### Duplicate Login (Mobile)
```json
{
  "success": false,
  "message": "Unauthorized! Duplicate login detected"
}
```

## Security Best Practices

1. **Token Storage**
   - Web: Use HTTP-only cookies
   - Mobile: Store securely (Keychain/Keystore)
   - Never store tokens in localStorage

2. **Token Expiry**
   - Access tokens: Short-lived (e.g., 24 hours)
   - Refresh tokens: Long-lived (e.g., 30 days)
   - Implement token refresh mechanism

3. **Password Requirements**
   - Minimum 8 characters
   - Include uppercase, lowercase, numbers
   - Include special characters

4. **Rate Limiting**
   - Implement rate limiting on login endpoints
   - Prevent brute force attacks

5. **HTTPS**
   - Always use HTTPS in production
   - Protect tokens in transit

## Role-Based Access Control

### User Roles

- `superAdmin`: Full system access
- `generalManager`: High-level oversight
- `supervisor`: Team management
- `healthCarer`: Appointment and timesheet management
- `supportCoordinator`: Client coordination
- `client`: Limited access
- `serviceProvider`: Service management
- `accountant`: Financial access
- `planManager`: Plan management

### Role Middleware

```javascript
// Example: Role-based route protection
router.get('/admin-only', isLoggedIn, customRole('superAdmin'), adminController);
```

## Token Structure

### JWT Payload
```json
{
  "id": "user_id",
  "_id": "user_id",
  "iat": 1234567890,
  "exp": 1234654290
}
```

### Token Validation
- Signature verification using `JWT_SECRET`
- Expiry check
- User existence verification
- Token match check (for mobile)

## Implementation Examples

### Web Login Example
```javascript
// Frontend
const login = async (email, password) => {
  const response = await axios.post('/api/user/login', {
    email,
    password
  });
  
  // Token automatically stored in cookie
  return response.data;
};
```

### Mobile Login Example
```javascript
// Mobile App
const login = async (email, password) => {
  const response = await axios.post('/api/frontend/user/login', {
    email,
    password
  });
  
  const token = response.data.data.token;
  // Store token securely
  await SecureStore.setItemAsync('authToken', token);
  
  // Use token in subsequent requests
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
  return response.data;
};
```

### Authenticated Request Example
```javascript
// Include token in requests
const getAppointments = async () => {
  const response = await axios.get('/api/appointment/getlists', {
    headers: {
      'Authorization': `Bearer ${token}` // Mobile
      // Web: Token automatically sent via cookie
    }
  });
  
  return response.data;
};
```

