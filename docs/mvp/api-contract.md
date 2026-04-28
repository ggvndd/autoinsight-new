# API Contracts

Since this is the MVP phase, API contracts documented here typically represent the mocked endpoints used by the frontend to demonstrate functionality.

## API Summary
| Endpoint | Method | Purpose | Mocked Status |
| :--- | :--- | :--- | :--- |
| `/api/v1/demo/login` | POST | Mock authentication | Mocked JSON response |
| `/api/v1/demo/data` | GET | Retrieve dashboard data | Mocked JSON response |

---

## 1. [Name of API, e.g., Mock Login API]

**Endpoint:** `[METHOD] /api/v1/...`
**Description:** Briefly describe what this mock endpoint does.

### Request Object

**Headers:**
- `Content-Type`: `application/json`

**Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

### Response Object (Success: 200 OK)

**Body:**
```json
{
  "status": "success",
  "data": {
    "token": "mock_jwt_token_12345",
    "user": {
      "id": 1,
      "email": "demo@orionex.com",
      "name": "Demo User"
    }
  }
}
```

### Response Object (Error: 401 Unauthorized)
*(Document typical error responses if simulated in the demo)*
```json
{
  "status": "error",
  "message": "Invalid mock credentials"
}
```
