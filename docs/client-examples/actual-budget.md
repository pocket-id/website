---
title: Actual Budget
description: Integrate Pocket ID with Actual Budget
---

## Requirements

- [Actual Budget](https://actualbudget.org/docs/config/oauth-auth) Client and Server version `25.1.0` or higher
- HTTPS connection to your Actual server

**NOTE:** At the time of writing, OpenID support in Actual is considered experimental.

## Create OIDC Client in Pocket ID

1. Create a new OIDC Client in Pocket ID (e.g., `actual`).
2. Set the **Callback URL** to the value below, or leave blank to autofill on first login.
   ```
   https://<actual-domain.tld>/openid/callback
   ```
3. _Optional:_ Download a PNG or SVG **logo** from the [Actual project](https://github.com/actualbudget/actual) and upload.
4. Copy the **Client ID**, **Client Secret**, and **OIDC Discovery URL** for use in the next section.

## Configure Actual using the UI

1. Open Actual, open a file, and navigate to:
   **`Settings > Advanced > Experimental > Authentication method`**
2. Click **Start using OpenID**.
3. Fill in the required fields:
   - **OpenID Provider**: Choose `Other`
   - **Provider URL**: Paste either your base `Pocket URL` or `OIDC Discovery URL` from Pocket ID.
   - **Client ID**: Paste the `Client ID` from Pocket ID.
   - **Client Secret**: Paste the `Client Secret` from Pocket ID.
4. Click **OK** and you will be redirected to the login page.
5. Provide your existing file password, and test OpenID login. The first successful login will become the administrator.

## Managing multi-users

After setting up the integration, you can manage users in Actual by following [these instructions](https://actualbudget.org/docs/config/multi-user).

## Configure Actual with other methods

You can also configure OpenID via the following methods. Check out Actual's documentation for more information.

- [Environment variables](https://actualbudget.org/docs/config/oauth-auth#configuration-using-environment-variables)
- [Configuration file](https://actualbudget.org/docs/config/oauth-auth#configuration-using-a-configuration-file)

**Example with `.env`:**

```
ACTUAL_OPENID_DISCOVERY_URL=https://<pocket-id-domain.tld>
ACTUAL_OPENID_CLIENT_ID=xxxxx-xxxxx-xxxxx
ACTUAL_OPENID_CLIENT_SECRET=xxxxx-xxxxx-xxxxx
```

**Example with `config.json`:**

```json
"openId": {
        "discoveryURL": "URL for the OpenID Provider",
        "client_id": "client_id given by the provider",
        "client_secret": "client_secret given by the provider",
        "server_hostname": "your Actual Server URL (so the provider redirects you to this)",
        "authMethod": "openid" // or "oauth2"
    }
```
