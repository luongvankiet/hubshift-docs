---
title: Shift Management APIs
description: Shift creation, allocation, types, and rate management APIs
navigation:
  icon: i-lucide-clock
seo:
  title: Hubshift Shift Management APIs
  description: Complete guide to shift APIs including creation, allocation, types, and rates
---

# Shift APIs

### Base Paths

- `/api/createShift`
- `/api/shiftAllocation`
- `/api/shiftType`
- `/api/shiftRate`

### Create Shift (`/api/createShift`)

#### GET /getlists - Get create shift list

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/createShift/getlists" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "shift_id",
      "clientId": "client_id",
      "shiftType": "shift_type_id",
      "date": "2024-01-01",
      "startTime": "09:00",
      "endTime": "17:00",
      "status": "scheduled",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 50,
  "page": 1,
  "limit": 10
}
```

#### GET /:id - Get create shift details

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/createShift/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "123",
    "clientId": "client_id",
    "shiftType": "shift_type_id",
    "date": "2024-01-01",
    "startTime": "09:00",
    "endTime": "17:00",
    "status": "scheduled",
    "allocatedTo": "carer_id",
    "notes": "Shift notes",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST /create - Create shift

**Request:**

```bash
curl -X POST "http://54.79.179.57:5000/api/createShift/create" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": "client_id",
    "shiftType": "shift_type_id",
    "date": "2024-01-01",
    "startTime": "09:00",
    "endTime": "17:00",
    "notes": "Shift notes"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Shift created successfully",
  "data": {
    "_id": "new_shift_id",
    "clientId": "client_id",
    "status": "scheduled",
    "date": "2024-01-01",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### PUT /update/:id - Update create shift

**Request:**

```bash
curl -X PUT "http://54.79.179.57:5000/api/createShift/update/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "startTime": "10:00",
    "endTime": "18:00",
    "status": "updated"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Shift updated successfully",
  "data": {
    "_id": "123",
    "startTime": "10:00",
    "endTime": "18:00",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

#### PUT /swap/:id - Swap shift

**Request:**

```bash
curl -X PUT "http://54.79.179.57:5000/api/createShift/swap/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "newCarerId": "456",
    "reason": "Swap reason"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Shift swapped successfully",
  "data": {
    "_id": "123",
    "allocatedTo": "456",
    "swappedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

#### DELETE /delete/:id - Delete create shift

**Request:**

```bash
curl -X DELETE "http://54.79.179.57:5000/api/createShift/delete/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "message": "Shift deleted successfully"
}
```

### Shift Allocation (`/api/shiftAllocation`)

#### GET /getlists - Get shift allocation list

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/shiftAllocation/getlists" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "allocation_id",
      "shiftId": "shift_id",
      "carerId": "carer_id",
      "status": "allocated",
      "allocatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### GET /:id - Get shift allocation details

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/shiftAllocation/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "123",
    "shiftId": {
      "_id": "shift_id",
      "date": "2024-01-01",
      "startTime": "09:00"
    },
    "carerId": {
      "_id": "carer_id",
      "firstName": "Health",
      "lastName": "Carer"
    },
    "status": "allocated",
    "allocatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST /create - Create shift allocation

**Request:**

```bash
curl -X POST "http://54.79.179.57:5000/api/shiftAllocation/create" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "shiftId": "123",
    "carerId": "456"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Shift allocation created successfully",
  "data": {
    "_id": "new_allocation_id",
    "shiftId": "123",
    "carerId": "456",
    "status": "allocated",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### PUT /update/:id - Update shift allocation

**Request:**

```bash
curl -X PUT "http://54.79.179.57:5000/api/shiftAllocation/update/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "carerId": "789",
    "status": "reallocated"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Shift allocation updated successfully",
  "data": {
    "_id": "123",
    "carerId": "789",
    "status": "reallocated",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

#### DELETE /delete/:id - Delete shift allocation

**Request:**

```bash
curl -X DELETE "http://54.79.179.57:5000/api/shiftAllocation/delete/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "message": "Shift allocation deleted successfully"
}
```

### Shift Type (`/api/shiftType`)

#### GET /get-all-shiftType - Get all shift types (paginated)

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/shiftType/get-all-shiftType?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "shift_type_id",
      "name": "Day Shift",
      "startTime": "09:00",
      "endTime": "17:00",
      "description": "Day shift description",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 20,
  "page": 1,
  "limit": 10
}
```

#### POST /create - Create shift type

**Request:**

```bash
curl -X POST "http://54.79.179.57:5000/api/shiftType/create" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Day Shift",
    "startTime": "09:00",
    "endTime": "17:00",
    "description": "Day shift description"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Shift type created successfully",
  "data": {
    "_id": "new_shift_type_id",
    "name": "Day Shift",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### PUT /update/:id - Update shift type

**Request:**

```bash
curl -X PUT "http://54.79.179.57:5000/api/shiftType/update/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Shift",
    "startTime": "08:00",
    "endTime": "16:00"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Shift type updated successfully",
  "data": {
    "_id": "123",
    "name": "Updated Shift",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

#### DELETE /delete/:id - Delete shift type

**Request:**

```bash
curl -X DELETE "http://54.79.179.57:5000/api/shiftType/delete/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "message": "Shift type deleted successfully"
}
```

**Note:** Most endpoints require authentication (`isLoggedIn` middleware).

### Shift Rate (`/api/shiftRate`)

#### GET /get-all-shiftRate - Get all shift rates

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/shiftRate/get-all-shiftRate" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "rate_id",
      "shiftTypeId": "shift_type_id",
      "rate": 25.5,
      "currency": "AUD",
      "effectiveDate": "2024-01-01",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### GET /:id - Get shift rate details

**Request:**

```bash
curl -X GET "http://54.79.179.57:5000/api/shiftRate/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "123",
    "shiftTypeId": {
      "_id": "shift_type_id",
      "name": "Day Shift"
    },
    "rate": 25.5,
    "currency": "AUD",
    "effectiveDate": "2024-01-01",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST /create - Create shift rate

**Request:**

```bash
curl -X POST "http://54.79.179.57:5000/api/shiftRate/create" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "shiftTypeId": "123",
    "rate": 25.50,
    "currency": "AUD",
    "effectiveDate": "2024-01-01"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Shift rate created successfully",
  "data": {
    "_id": "new_rate_id",
    "shiftTypeId": "123",
    "rate": 25.5,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### PUT /update/:id - Update shift rate

**Request:**

```bash
curl -X PUT "http://54.79.179.57:5000/api/shiftRate/update/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "rate": 30.00
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Shift rate updated successfully",
  "data": {
    "_id": "123",
    "rate": 30.0,
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

#### DELETE /delete/:id - Delete shift rate

**Request:**

```bash
curl -X DELETE "http://54.79.179.57:5000/api/shiftRate/delete/123" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**

```json
{
  "success": true,
  "message": "Shift rate deleted successfully"
}
```

---

