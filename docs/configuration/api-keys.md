# API Documentation

## Generating a API Key

1. Navigate to https://id.example.com/settings/admin/api-keys
2. Click `Add API Key`
3. Enter a `Name` for the new API Key
4. Select a `Expires At` Date for when this API Key should be valid until.
5. Enter a `Description` for the new API Key
6. Click `Generate API Key`

:::important  
Make sure you copy the API Key from the Dialog window it will not be shown again!
:::

## Authentication with API Keys

API keys provide a secure method to authenticate requests to the Pocket ID API without using your user credentials. Include your API key in the `Authorization` header:

```
Authorization: Bearer YOUR_API_KEY
```

## Endpoints

### User Management

#### Get Current User

```http
GET /api/users/me
```

**Example Request:**

```bash
curl -X GET 'http://localhost/api/users/me' \
  -H 'Authorization: Bearer YOUR_API_KEY'
```

**Example Response:**

```json
{
  "id": "4b89dc2-62fb-46bf-9f5f-c34f4eafe93e",
  "username": "tim",
  "email": "tim.cook@test.com",
  "firstName": "Tim",
  "lastName": "Cook",
  "isAdmin": true,
  "createdAt": "2023-08-15T10:30:00Z"
}
```

#### Get User Profile Picture

```http
GET /api/users/me/profile-picture.png
```

**Example Request:**

```bash
curl -X GET 'http://localhost/api/users/me/profile-picture.png' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  --output profile-picture.png
```

### OIDC Clients (Admin Only)

#### List OIDC Clients

```http
GET /api/oidc/clients
```

**Example Request:**

```bash
curl -X GET 'http://localhost/api/oidc/clients' \
  -H 'Authorization: Bearer YOUR_API_KEY'
```

**Example Response:**

```json
[
  {
    "id": "3654a746-35d4-4321-ac61-0bdcff2b4055",
    "name": "Nextcloud",
    "callbackUrl": "http://nextcloud/auth/callback",
    "logoutCallbackUrl": "http://nextcloud/auth/logout/callback",
    "createdAt": "2023-08-15T10:30:00Z"
  },
  {
    "id": "606c7782-f2b1-49e5-8ea9-26eb1b06d018",
    "name": "Immich",
    "callbackUrl": "http://immich/auth/callback",
    "createdAt": "2023-08-15T10:30:00Z"
  }
]
```

#### Get OIDC Client by ID

```http
GET /api/oidc/clients/:id
```

**Example Request:**

```bash
curl -X GET 'http://localhost/api/oidc/clients/3654a746-35d4-4321-ac61-0bdcff2b4055' \
  -H 'Authorization: Bearer YOUR_API_KEY'
```

#### Create OIDC Client (Admin Only)

```http
POST /api/oidc/clients
```

**Example Request:**

```bash
curl -X POST 'http://localhost/api/oidc/clients' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "New Application",
    "callbackUrl": "https://app.example.com/auth/callback",
    "logoutCallbackUrl": "https://app.example.com/auth/logout",
    "deviceCodeEnabled": true,
    "accessTokenLifespan": 3600,
    "allowedGroups": ["everyone"]
  }'
```

#### Update OIDC Client (Admin Only)

```http
PUT /api/oidc/clients/:id
```

**Example Request:**

```bash
curl -X PUT 'http://localhost/api/oidc/clients/3654a746-35d4-4321-ac61-0bdcff2b4055' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Updated App",
    "callbackUrl": "https://app.example.com/auth/callback",
    "deviceCodeEnabled": true
  }'
```

#### Delete OIDC Client (Admin Only)

```http
DELETE /api/oidc/clients/:id
```

**Example Request:**

```bash
curl -X DELETE 'http://localhost/api/oidc/clients/3654a746-35d4-4321-ac61-0bdcff2b4055' \
  -H 'Authorization: Bearer YOUR_API_KEY'
```

### User Groups (Admin Only)

#### List User Groups

```http
GET /api/user-groups
```

**Example Request:**

```bash
curl -X GET 'http://localhost/api/user-groups' \
  -H 'Authorization: Bearer YOUR_API_KEY'
```

**Example Response:**

```json
{
  "data": [
    {
      "id": "1cd19686-f9a6-43f4-a41f-14a0bf5b4036",
      "name": "Admins",
      "description": "Administrator group",
      "createdAt": "2023-08-15T10:30:00Z",
      "userCount": 2
    },
    {
      "id": "f4b89dc2-62fb-46bf-9f5f-c34f4eafe93e",
      "name": "Users",
      "description": "Regular users",
      "createdAt": "2023-08-15T10:30:00Z",
      "userCount": 5
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalItems": 2,
    "totalPages": 1,
    "itemsPerPage": 10
  }
}
```

#### Create User Group (Admin Only)

```http
POST /api/user-groups
```

**Example Request:**

```bash
curl -X POST 'http://localhost/api/user-groups' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Developers",
    "description": "App developers"
  }'
```

#### Update User Group (Admin Only)

```http
PUT /api/user-groups/:id
```

**Example Request:**

```bash
curl -X PUT 'http://localhost/api/user-groups/1cd19686-f9a6-43f4-a41f-14a0bf5b4036' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Super Admins",
    "description": "Super administrator group"
  }'
```

#### Delete User Group (Admin Only)

```http
DELETE /api/user-groups/:id
```

**Example Request:**

```bash
curl -X DELETE 'http://localhost/api/user-groups/1cd19686-f9a6-43f4-a41f-14a0bf5b4036' \
  -H 'Authorization: Bearer YOUR_API_KEY'
```

### Users Management (Admin Only)

#### List Users

```http
GET /api/users
```

**Example Request:**

```bash
curl -X GET 'http://localhost/api/users' \
  -H 'Authorization: Bearer YOUR_API_KEY'
```

**Example Response:**

```json
{
  "data": [
    {
      "id": "f4b89dc2-62fb-46bf-9f5f-c34f4eafe93e",
      "username": "tim",
      "email": "tim.cook@test.com",
      "firstName": "Tim",
      "lastName": "Cook",
      "isAdmin": true,
      "createdAt": "2023-08-15T10:30:00Z"
    },
    {
      "id": "1cd19686-f9a6-43f4-a41f-14a0bf5b4036",
      "username": "craig",
      "email": "craig.federighi@test.com",
      "firstName": "Craig",
      "lastName": "Federighi",
      "isAdmin": false,
      "createdAt": "2023-08-15T11:45:00Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalItems": 2,
    "totalPages": 1,
    "itemsPerPage": 10
  }
}
```

#### Get User by ID (Admin Only)

```http
GET /api/users/:id
```

**Example Request:**

```bash
curl -X GET 'http://localhost/api/users/f4b89dc2-62fb-46bf-9f5f-c34f4eafe93e' \
  -H 'Authorization: Bearer YOUR_API_KEY'
```

#### Create User (Admin Only)

```http
POST /api/users
```

**Example Request:**

```bash
curl -X POST 'http://localhost/api/users' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "username": "steve",
    "email": "steve.jobs@test.com",
    "firstName": "Steve",
    "lastName": "Jobs",
    "isAdmin": false
  }'
```

#### Update User (Admin Only)

```http
PUT /api/users/:id
```

**Example Request:**

```bash
curl -X PUT 'http://localhost/api/users/f4b89dc2-62fb-46bf-9f5f-c34f4eafe93e' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "username": "tim",
    "email": "tim.cook@test.com",
    "firstName": "Timothy",
    "lastName": "Cook",
    "isAdmin": true
  }'
```

#### Delete User (Admin Only)

```http
DELETE /api/users/:id
```

**Example Request:**

```bash
curl -X DELETE 'http://localhost/api/users/f4b89dc2-62fb-46bf-9f5f-c34f4eafe93e' \
  -H 'Authorization: Bearer YOUR_API_KEY'
```

### API Key Management

#### List API Keys (Own Keys Only)

```http
GET /api/api-keys
```

**Example Request:**

```bash
curl -X GET 'http://localhost/api/api-keys' \
  -H 'Authorization: Bearer YOUR_API_KEY'
```

**Example Response:**

```json
{
  "data": [
    {
      "id": "606c7782-f2b1-49e5-8ea9-26eb1b06d018",
      "name": "CI/CD Pipeline",
      "description": "Used for automated deployments",
      "expiresAt": "2024-08-15T00:00:00Z",
      "lastUsedAt": "2023-08-16T09:23:45Z",
      "createdAt": "2023-08-15T10:30:00Z"
    },
    {
      "id": "3654a746-35d4-4321-ac61-0bdcff2b4055",
      "name": "Monitoring System",
      "description": "System health checks",
      "expiresAt": "2024-06-01T00:00:00Z",
      "lastUsedAt": "2023-08-16T08:15:30Z",
      "createdAt": "2023-08-15T11:45:00Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalItems": 2,
    "totalPages": 1,
    "itemsPerPage": 10
  }
}
```

#### Create API Key

```http
POST /api/api-keys
```

**Example Request:**

```bash
curl -X POST 'http://localhost/api/api-keys' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Test Integration",
    "description": "For integration testing",
    "expiresAt": "2024-12-31T23:59:59Z"
  }'
```

**Example Response:**

```json
{
  "apiKey": {
    "id": "7890abcd-ef12-34gh-5678-ijklmnopqrst",
    "name": "Test Integration",
    "description": "For integration testing",
    "expiresAt": "2024-12-31T23:59:59Z",
    "createdAt": "2023-08-16T15:30:00Z"
  },
  "token": "abcdef1234567890abcdef1234567890"
}
```

#### Revoke API Key

```http
DELETE /api/api-keys/:id
```

**Example Request:**

```bash
curl -X DELETE 'http://localhost/api/api-keys/7890abcd-ef12-34gh-5678-ijklmnopqrst' \
  -H 'Authorization: Bearer YOUR_API_KEY'
```

### Application Configuration (Admin Only)

#### Get Application Configuration

```http
GET /api/application-configuration
```

**Example Request:**

```bash
curl -X GET 'http://localhost/api/application-configuration' \
  -H 'Authorization: Bearer YOUR_API_KEY'
```

**Example Response:**

```json
{
  "appTitle": "Pocket ID",
  "appUrl": "https://id.example.com",
  "registration": {
    "enabled": true,
    "requireEmailVerification": true,
    "requireApproval": false
  },
  "ldap": {
    "enabled": false,
    "server": "",
    "bindDN": "",
    "searchBaseDN": "",
    "userFilter": ""
  }
}
```

#### Update Application Configuration

```http
PUT /api/application-configuration
```

**Example Request:**

```bash
curl -X PUT 'http://localhost/api/application-configuration' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "appTitle": "Company SSO",
    "appUrl": "https://sso.company.com",
    "registration": {
      "enabled": true,
      "requireEmailVerification": true,
      "requireApproval": true
    }
  }'
```

## Response Status Codes

| Code | Description                                                                       |
| ---- | --------------------------------------------------------------------------------- |
| 200  | OK - The request was successful                                                   |
| 201  | Created - A new resource was created                                              |
| 204  | No Content - The request was successful but returns no content                    |
| 400  | Bad Request - The request was invalid                                             |
| 401  | Unauthorized - Authentication failed or user does not have permissions            |
| 403  | Forbidden - The authenticated user does not have access to the requested resource |
| 404  | Not Found - The requested resource was not found                                  |
| 500  | Internal Server Error - An error occurred on the server                           |

## API Key Best Practices

1. **Keep API keys secure**: Never expose your API keys in client-side code or public repositories
2. **Use separate keys for different purposes**: Create dedicated API keys for different integrations or services
3. **Set appropriate permissions**: Only grant the necessary permissions for each API key
4. **Add descriptive names**: Name your API keys according to their purpose or the service using them
5. **Set reasonable expiration dates**: Set your keys to expire after a reasonable period to limit exposure if compromised
6. **Rotate keys regularly**: Create new API keys and deprecate old ones periodically
7. **Monitor key usage**: Regularly check the "Last Used" timestamp to identify potentially unused or compromised keys
8. **Revoke immediately when compromised**: If you suspect a key has been compromised, revoke it immediately
