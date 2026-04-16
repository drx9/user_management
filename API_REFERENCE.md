# API Reference - User Management System

## Base URL

- **Development**: `http://localhost:5000/api`
- **Production**: `https://your-backend-url.com/api` (after deployment)

## Authentication Header

All protected endpoints require:
```
Authorization: Bearer <JWT_TOKEN>
```

---

## Public Endpoints

### 1. User Registration

**Endpoint**: `POST /auth/register`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response** (201 Created):
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "active"
  }
}
```

**Validation**:
```
✓ name: Required, non-empty string
✓ email: Required, valid email format
✓ password: Required, minimum 6 characters
```

---

### 2. User Login

**Endpoint**: `POST /auth/login`

**Request Body**:
```json
{
  "email": "admin@demo.com",
  "password": "admin123"
}
```

**Response** (200 OK):
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Admin User",
    "email": "admin@demo.com",
    "role": "admin",
    "status": "active"
  }
}
```

**Error Responses**:
```
400: Invalid credentials
403: User account is inactive
```

---

## Protected Endpoints (Requires Authentication)

### 3. Get Current User

**Endpoint**: `GET /auth/me`

**Headers**:
```
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Admin User",
    "email": "admin@demo.com",
    "role": "admin",
    "status": "active",
    "createdAt": "2024-04-14T10:30:00Z"
  }
}
```

---

### 4. Get All Users (Paginated)

**Endpoint**: `GET /users`

**Query Parameters**:
```
page: number (default: 1)
limit: number (default: 10)
search: string (search by name or email)
role: string (all, user, manager, admin)
status: string (all, active, inactive)
```

**Example**:
```
GET /users?page=1&limit=10&search=john&role=all&status=active
```

**Headers**:
```
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
{
  "users": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "status": "active",
      "createdAt": "2024-04-14T10:30:00Z",
      "updatedAt": "2024-04-14T10:30:00Z",
      "createdBy": {
        "_id": "507f1f77bcf86cd799439001",
        "name": "Admin",
        "email": "admin@demo.com"
      },
      "updatedBy": null
    }
  ],
  "pagination": {
    "total": 5,
    "pages": 1,
    "currentPage": 1,
    "limit": 10
  }
}
```

**Access Control**:
- ✅ Admin: Can view all users
- ✅ Manager: Can view all users
- ❌ User: Can only view themselves

**Error Responses**:
```
401: Unauthorized (invalid/expired token)
403: Forbidden (insufficient permissions)
```

---

### 5. Get User by ID

**Endpoint**: `GET /users/:id`

**Parameters**:
```
id: MongoDB ObjectId
```

**Headers**:
```
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "active",
    "createdAt": "2024-04-14T10:30:00Z",
    "updatedAt": "2024-04-14T10:30:00Z",
    "createdBy": {
      "_id": "507f1f77bcf86cd799439001",
      "name": "Admin",
      "email": "admin@.com"
    },
    "updatedBy": null
  }
}
```

**Error Responses**:
```
404: User not found
401: Unauthorized
```

---

### 6. Create User (Admin Only)

**Endpoint**: `POST /users`

**Headers**:
```
Authorization: Bearer <token> (Admin only)
```

**Request Body**:
```json
{
  "name": "New User",
  "email": "newuser@example.com",
  "password": "password123",
  "role": "user",
  "status": "active"
}
```

**Response** (201 Created):
```json
{
  "message": "User created successfully",
  "user": {
    "id": "507f1f77bcf86cd799439012",
    "name": "New User",
    "email": "newuser@example.com",
    "role": "user",
    "status": "active"
  }
}
```

**Validation**:
```
✓ name: Required
✓ email: Required, must be unique
✓ password: Optional (auto-generated if not provided)
✓ role: Required, must be valid enum
✓ status: Required, must be valid enum
```

**Error Responses**:
```
400: Email already exists / Invalid role / Invalid status
403: Forbidden (not admin)
401: Unauthorized
```

---

### 7. Update User

**Endpoint**: `PUT /users/:id`

**Headers**:
```
Authorization: Bearer <token>
```

**Request Body**:
```json
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "password": "newpassword123",
  "role": "manager",
  "status": "active"
}
```

**Response** (200 OK):
```json
{
  "message": "User updated successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Updated Name",
    "email": "updated@example.com",
    "role": "manager",
    "status": "active"
  }
}
```

**Access Control**:
- ✅ Admin: Can update any user (including role)
- ✅ Manager: Can update non-admin users (except role)
- ✅ User: Can update own profile (name, password only)

**Restrictions**:
- Users cannot change own role
- Managers cannot update admin users
- Email is immutable after creation

**Error Responses**:
```
400: Invalid data
403: Forbidden (insufficient permissions)
404: User not found
401: Unauthorized
```

---

### 8. Deactivate User (Admin Only)

**Endpoint**: `DELETE /users/:id`

**Headers**:
```
Authorization: Bearer <token> (Admin only)
```

**Response** (200 OK):
```json
{
  "message": "User deactivated successfully"
}
```

**Behavior**:
- Sets user status to "inactive"
- User cannot login after deactivation
- Data is preserved (soft delete)

**Access Control**:
- ✅ Admin: Can deactivate any user
- ❌ Manager: Cannot deactivate users
- ❌ User: Cannot deactivate anyone

**Error Responses**:
```
403: Forbidden (not admin)
404: User not found
401: Unauthorized
```

---

## Error Response Format

All errors follow this format:

```json
{
  "message": "Error description here"
}
```

### Common HTTP Status Codes

```
200: OK (successful GET, POST, PUT)
201: Created (successful POST creating resource)
400: Bad Request (validation failed, missing fields)
401: Unauthorized (missing or invalid token)
403: Forbidden (authorized but insufficient permissions)
404: Not Found (resource doesn't exist)
500: Internal Server Error (server error)
```

---

## Testing with cURL

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@demo.com",
    "password": "admin123"
  }'
```

### Get All Users (with token)
```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:5000/api/users?page=1&limit=10
```

### Create User
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New User",
    "email": "newuser@example.com",
    "password": "password123",
    "role": "user",
    "status": "active"
  }'
```

---

## Testing with Postman

1. **Create Environment Variable**:
   - Variable: `token`
   - Set after login response

2. **Use in Headers**:
   ```
   Authorization: Bearer {{token}}
   ```

3. **Pre-request Script** (to extract token):
   ```javascript
   if (pm.response.code === 200) {
     var jsonData = pm.response.json();
     pm.environment.set("token", jsonData.token);
   }
   ```

---

## Rate Limiting

No rate limiting is currently implemented. For production deployment, consider adding rate limiting middleware.

---

## CORS

Allowed origins:
- `http://localhost:3000` (development)
- Configured via `FRONTEND_URL` environment variable

---

## Data Types

### User Object
```javascript
{
  _id: ObjectId,           // MongoDB ID
  name: String,
  email: String,
  password: String,        // Hashed (never returned)
  role: String,            // 'user' | 'manager' | 'admin'
  status: String,          // 'active' | 'inactive'
  createdBy: ObjectId,
  updatedBy: ObjectId,
  createdAt: Date,         // ISO 8601
  updatedAt: Date          // ISO 8601
}
```

---

## Pagination

```json
{
  "users": [...],
  "pagination": {
    "total": 25,           // Total users
    "pages": 3,            // Total pages
    "currentPage": 1,      // Current page
    "limit": 10            // Per page
  }
}
```

---

## Tips & Best Practices

1. **Store Token Securely**: Use localStorage (frontend) or HttpOnly cookies
2. **Refresh Token**: Implement refresh token flow for production
3. **Error Handling**: Always check `message` field in error responses
4. **Validation**: Server validates all inputs; don't rely only on frontend
5. **Performance**: Use pagination for large datasets
6. **Security**: Never expose sensitive data in responses
7. **Testing**: Use Postman collections for API testing
8. **Monitoring**: Log all API calls for debugging

---

## Webhook/Event Support

Not currently implemented. Future enhancements could include:
- Email notifications on user creation
- Audit log webhooks
- Admin alerts for suspicious activities

---

*API Reference v1.0 - Last Updated: April 14, 2024*
