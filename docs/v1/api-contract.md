# Comprehensive API Contracts (V1)

Unlike the mocked MVP API contracts, the V1 documentation outlines actual production endpoints, authentication flows, rate limits, and comprehensive error handling schemas.

## 1. Authentication & Headers

All authenticated V1 endpoints require a Bearer Token derived from the Orionex Auth & IdP system.

**Required Headers:**
- `Authorization: Bearer <JWT_TOKEN>`
- `Content-Type: application/json`

*(If applicable, detail X-Requested-With headers for CSRF protection here).*

## 2. Global Rate Limiting
Outline the global rate limiting policy for the V1 API.
- e.g., Unauthenticated: 100 requests / 15 minutes per IP.
- e.g., Authenticated: 1000 requests / 15 minutes per Token.

## 3. Global Error Handling Structure
Detail the standardized error schema returned by all endpoints when a failure occurs.

```json
{
  "status": "error",
  "error_code": "RESOURCE_NOT_FOUND",
  "message": "The requested user profile could not be located."
}
```

---

## Endpoint Details

### [Epic Name] Endpoints

#### `POST /api/v1/users/register`
**Description:** Registers a new user into the system and triggers an email verification workflow.

**Request Body:**
```json
{
  "email": "user@client.com",
  "password": "StrongPassword123!",
  "first_name": "John"
}
```

**Success Response (201 Created):**
```json
{
  "status": "success",
  "data": {
    "user_id": "uuid-1234",
    "message": "Verification email dispatched."
  }
}
```

**Common Error Responses:**
- `400 Bad Request` - Validation error (e.g., password too weak).
- `409 Conflict` - Email already exists in the system.

*(Add details for all core production endpoints here)*
