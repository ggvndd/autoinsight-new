# Example: API Contracts

> [!NOTE] 
> This is a generalized example of an API Contract for a standard "To-Do Application". Use this format to rigorously document your real REST APIs.

## Global Error Handling Structure
```json
{
  "status": "error",
  "error_code": "RESOURCE_NOT_FOUND",
  "message": "The requested item could not be found."
}
```

---

## Endpoint Details

### `GET /api/v1/todos`
**Description:** Retrieves a paginated list of the authenticated user's to-do items.

**Headers:**
- `Authorization: Bearer <JWT_TOKEN>`

**Query Parameters:**
- `page` (integer, default: 1)
- `limit` (integer, default: 20)
- `status` (string, enum: `PENDING`, `COMPLETED`) - Optional filter.

**Success Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "items": [
      {
        "id": "uuid-111",
        "title": "Buy groceries",
        "status": "PENDING",
        "created_at": "2024-10-12T08:00:00Z"
      }
    ],
    "pagination": {
      "total": 1,
      "page": 1,
      "limit": 20
    }
  }
}
```

---

### `POST /api/v1/todos`
**Description:** Creates a new to-do item for the authenticated user.

**Headers:**
- `Authorization: Bearer <JWT_TOKEN>`
- `Content-Type: application/json`

**Request Body:**
```json
{
  "title": "Call the dentist",
  "due_date": "2024-10-15T14:00:00Z" 
}
```

**Success Response (201 Created):**
```json
{
  "status": "success",
  "data": {
    "id": "uuid-222",
    "title": "Call the dentist",
    "status": "PENDING",
    "due_date": "2024-10-15T14:00:00Z"
  }
}
```

**Common Error Responses:**
- `400 Bad Request` - `title` is required and must be a string.
- `401 Unauthorized` - Missing or invalid JWT token.
