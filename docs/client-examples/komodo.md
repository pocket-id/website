---
title: Komodo
description: Configure Komodo with Pocket ID authentication
---

---
id: komodo
---

The following example variables are used, and should be replaced with your actual URLS.

- komodo.example.com (The url of your Komodo instance.)
- id.example.com (The url of your Pocket ID instance.)

## Pocket ID Setup

1. In Pocket-ID create a new OIDC Client, name it i.e. `Komodo`.
2. Set a logo for this OIDC Client if you would like too.
3. Set the callback URL to: `https://komodo.example.com/auth/oidc/callback`, or leave blank to autofill on first login.
4. Copy the `Client ID`, and `Client Secret` for use in the next steps.

## Komodo Setup

**This example uses the docker-compose deployment type of komodo** See the [Official Docs](https://komo.do/docs/intro) for more information.

Add the following lines to your komodo `.env` file replacing the values with the ones you copied above:

```env
KOMODO_OIDC_ENABLED=true
KOMODO_OIDC_PROVIDER=https://id.example.com
KOMODO_OIDC_CLIENT_ID=<your client id from above>
KOMODO_OIDC_CLIENT_SECRET=<your client id from above>
## Make usernames the full email.
KOMODO_OIDC_USE_FULL_EMAIL=true
```

Save and redeploy komodo and you should be able to login using OIDC with Pocket ID.
