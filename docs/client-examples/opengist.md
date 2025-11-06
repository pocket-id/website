---
title: OpenGist
description: Configure OpenGist with Pocket ID authentication
---

## Pocket ID Setup

1. Access your Pocket ID instance
2. Create a new OIDC application with the following parameters:
   - **Redirect URI**: `https://your-opengist-domain.com/oauth/oidc/callback`
   - **Scopes**: `openid profile email`

3. Note down the following values you'll need:
   - Client ID
   - Client Secret
   - Issuer URL (typically `https://your-pocket-id-domain.com`)

## OpenGist Setup

Add the following configuration to your OpenGist `config.yml` file:

```yaml
oauth:
  oidc:
    enabled: true
    client-id: "your-client-id"
    client-secret: "your-client-secret"
    discovery-url: "https://your-pocket-id-domain.com/.well-known/openid_configuration"
    scopes: "openid profile email"
    admin-group: "opengist-admins"
```

### Environment variables (alternative)

You can also configure OpenGist using environment variables:

```bash
OG_OAUTH_OIDC_ENABLED=1
OG_OAUTH_OIDC_CLIENT_ID=your-client-id
OG_OAUTH_OIDC_CLIENT_SECRET=your-client-secret
OG_OAUTH_OIDC_DISCOVERY_URL=https://your-pocket-id-domain.com/.well-known/openid_configuration
OG_OAUTH_OIDC_SCOPES="openid profile email"
OG_OAUTH_OIDC_ADMIN_GROUP=opengist-admins
```

## Testing

1. Restart OpenGist
2. Visit your OpenGist instance
3. You should see a "Login with OIDC" button on the login page
4. Click it to be redirected to Pocket ID for passkey authentication

## Admin Group Configuration

To grant admin privileges to specific users, configure the `admin-group` parameter. Users belonging to this group in Pocket ID will have admin access in OpenGist.

1. In Pocket ID, create a group called `opengist-admins` (or your preferred name)
2. Add users who should have admin privileges to this group
3. Configure OpenGist to use this group as shown in the examples above

## Important Notes

- Ensure the callback URL in Pocket ID matches exactly what's configured
- The discovery URL must point to the `.well-known/openid_configuration` endpoint of your Pocket ID instance
- Users will be automatically created in OpenGist on first authentication
- Admin group membership is checked on each login, so changes in Pocket ID take effect immediately
