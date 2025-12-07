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

All protected endpoints require a JWT token obtained through the login flow. The authentication process involves two steps:

### Step 1: Login

**Endpoint:** `POST /api/user/login`

**Request:**

```bash
curl -X POST "http://54.79.179.57:5000/api/user/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@hubshift.au",
    "password": "Hubshift2026!"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "OTP sent to your email and phone",
  "data": {
    "email": "admin@hubshift.au"
  }
}
```

### Step 2: Verify OTP

**Endpoint:** `POST /api/user/verifymailOTP`

**Request:**

```bash
curl -X POST "http://54.79.179.57:5000/api/user/verifymailOTP" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@hubshift.au",
    "emailOTP": "561234",
    "deviceToken": "optional-device-token"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "User Verified",
  "data": {
    "_id": "user_id",
    "firstName": "Admin",
    "lastName": "User",
    "email": "admin@hubshift.au",
    "userType": "superAdmin",
    "token": "jwt_token_here",
    "checkLoginString": "random_string"
  }
}
```

**Note:** The token is automatically set in cookies. For API calls, extract the token from the response and include it in the Authorization header:

```bash
-H "Authorization: Bearer YOUR_JWT_TOKEN"
```

Or use cookies (which curl handles automatically):

```bash
-c cookies.txt -b cookies.txt
```

**Super Admin Credentials:**

- Email: `admin@hubshift.au`
- Password: `Hubshift2026!`
- OTP: `561234`

### Response Pattern

Most API responses follow this structure:

**Success Response:**

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information"
}
```

**List Response:**

```json
{
  "success": true,
  "data": [ ... ],
  "total": 100,
  "page": 1,
  "limit": 10
}
```

**Note:** Replace `YOUR_JWT_TOKEN` in all examples with the actual token obtained from the login flow above.

---

