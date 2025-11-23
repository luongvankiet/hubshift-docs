---
title: Authentication APIs
description: Authentication and user management APIs with JWT tokens
navigation:
  icon: i-lucide-key
seo:
  title: Hubshift Authentication APIs
  description: Complete guide to Hubshift authentication APIs including login, signup, password reset, and token management
---

# Authentication APIs

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

**Request:**
```bash
curl -X POST http://54.79.179.57:5000/api/user/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123!",
    "firstName": "John",
    "lastName": "Doe",
    "userType": "healthCarer",
    "phone": "+61400000000"
  }'
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

```bash
curl -X POST http://54.79.179.57:5000/api/frontend/user/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123!",
    "firstName": "John",
    "lastName": "Doe",
    "userType": "healthCarer"
  }'
```

### User Login

#### Web Login

```bash
curl -X POST http://54.79.179.57:5000/api/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123!"
  }' \
  -c cookies.txt
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

```bash
curl -X POST http://54.79.179.57:5000/api/frontend/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123!"
  }'
```

**Save the token from response for subsequent requests:**
```bash
TOKEN="your_jwt_token_here"
```

### Password Reset

#### Request Password Reset

```bash
curl -X POST http://54.79.179.57:5000/api/user/forgotPassword \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

#### Set New Password

```bash
curl -X PUT http://54.79.179.57:5000/api/user/newpassword \
  -H "Content-Type: application/json" \
  -d '{
    "key": "reset_key",
    "token": "reset_token",
    "newPassword": "NewSecurePassword123!"
  }'
```

### Email Verification

#### Verify Email OTP

```bash
curl -X POST http://54.79.179.57:5000/api/user/verifymailOTP \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "otp": "123456"
  }'
```

#### Resend OTP

```bash
curl -X POST http://54.79.179.57:5000/api/user/otp/resend \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com"
  }'
```

### Token Management

#### Get Refresh Token (Web)

```bash
curl -X POST http://54.79.179.57:5000/api/user/getRefreshTokan \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "refresh_token_here"
  }'
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

```bash
curl -X GET http://54.79.179.57:5000/api/frontend/user/getRefreshToken \
  -H "Authorization: Bearer $TOKEN"
```

### User Profile

#### Get User Details

```bash
curl -X GET http://54.79.179.57:5000/api/user/getuserDetail/USER_ID \
  -H "Authorization: Bearer $TOKEN"
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

```bash
curl -X PUT http://54.79.179.57:5000/api/user/update/USER_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+61400000001"
  }'
```

### Mobile-Specific Endpoints

#### Save Device Token (Push Notifications)

```bash
curl -X POST http://54.79.179.57:5000/api/frontend/user/device/token \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "deviceToken": "firebase_device_token",
    "deviceType": "ios"
  }'
```

#### Reset All Tokens

```bash
curl -X POST http://54.79.179.57:5000/api/frontend/user/tokens/reset \
  -H "Authorization: Bearer $TOKEN"
```

#### Get User Profile (Mobile)

```bash
curl -X GET http://54.79.179.57:5000/api/frontend/user/get/profile/USER_ID \
  -H "Authorization: Bearer $TOKEN"
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

