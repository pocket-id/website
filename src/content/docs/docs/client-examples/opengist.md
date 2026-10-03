---
title: Opengist
description: Sign in to Opengist with Pocket ID.
client:
  callbackUrls:
    - https://opengist.example.com/oauth/oidc/callback
---

::create-client

## Configure Opengist

Add the following configuration to your Opengist `config.yml` file:

```yaml
oauth:
  oidc:
    provider-name: "PocketID"
    client-key: "<client-id>"
    secret: "<client-secret>"
    discovery-url: "https://id.example.com/.well-known/openid-configuration"
    group-claim-name: "opengist"
    admin-group: "opengist-admins"
```

### Environment variables (alternative)

You can also configure Opengist using environment variables:

```bash
OG_OIDC_PROVIDER_NAME=PocketID
OG_OIDC_CLIENT_KEY=<client-id>
OG_OIDC_SECRET=<client-secret>
OG_OIDC_DISCOVERY_URL=https://id.example.com/.well-known/openid-configuration
OG_OIDC_GROUP_CLAIM_NAME=opengist
OG_OIDC_ADMIN_GROUP=opengist-admins
```

## Testing

1. Restart Opengist.
2. Open your Opengist instance.
3. You should see a **Login with OIDC** button on the login page.
4. Click it to be redirected to Pocket ID and sign in with your passkey.

## Admin group

To grant admin privileges to specific users, configure the `admin-group` parameter.
Users who belong to this group in Pocket ID have admin access in Opengist.

1. In Pocket ID, open **Administration → User Groups**, click **Add Group** and create a group with the **Name** `opengist-admins` (or your preferred name).
2. Add the users who should have admin privileges to this group.
3. Configure Opengist to use this group as shown in the examples above.

## Notes

- Make sure the callback URL in Pocket ID exactly matches what's configured in Opengist.
- The discovery URL must point to the `.well-known/openid-configuration` endpoint of your Pocket ID instance.
- Users are automatically created in Opengist on their first sign-in.
- Admin group membership is checked on each sign-in, so changes in Pocket ID take effect immediately.
