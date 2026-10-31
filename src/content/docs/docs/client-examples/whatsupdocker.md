---
title: What's up Docker
description: Sign in to What's up Docker (WUD) web interface with Pocket ID.
client:
  callbackUrls:
    - https://wud.example.com/auth/oidc/pocketid/cb
  launchUrl: https://wud.example.com
  values:
    - clientId
    - clientSecret
---

## Requirements

- Pocket ID on HTTPS, reachable at `https://id.example.com`
- What's up Docker server on HTTPS, reachable at `https://wud.example.com`

::create-client

On the clients **Access** tab, select the groups that may able to sign in under **Allowed User Groups**. 
This group will be mapped later to grant admin permissions in WUD.

## Configure WUD

1. Edit your docker compose file (e.g. docker-compose.yml) of WUD
2. Set environment variables for your container:

```
WUD_AUTH_OIDC_POCKETID_CLIENTID=<Client ID>
WUD_AUTH_OIDC_POCKETID_CLIENTSECRET=<Client Secret>
WUD_AUTH_OIDC_POCKETID_DISCOVERY=<OIDC Discovery URL>
WUD_AUTH_OIDC_POCKETID_ADMINGROUP=<OIDC group>
```
> The OIDC group is the group that you've selected in the "Access" tab in PocketID OIDC Clients settings.
> Users within this group will have admin permissions in WUD.

3. Start the WUD container: `docker compose up`
4. Try to login at WUD website with SSO
5. When you click on your username in the lower left corner you should see that you're ADMIN

Optional: If you want to omit local administrator after OIDC login was successful:

- In WUD in the menu bar navigate to Users
- Delete the admin account

From now on you'll only be able to login with OIDC.