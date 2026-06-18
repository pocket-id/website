---
title: ByteStash
description: Configure ByteStash with Pocket ID authentication
---

1. Create a new OIDC Client in Pocket ID (e.g., `ByteStash`).
2. Set the Callback URL to `https://{bytestash_host}/api/oauth/openid`, or leave blank to autofill on first login.
3. _(Optional)_ Find and upload a logo from [Self-Hosted Dashboard Icons](https://selfh.st/icons)
4. Configure ByteStash environment variables

   - `OIDC_ENABLED`: Set to `true` to enable OIDC authentication.
   - `OIDC_DISPLAY_NAME`: The lowercase name of the provider (`pocketid`).
   - `OIDC_ISSUER_URL`: The authorization URL for you Pocket ID instance, e.g. `https://id.host.local`.
   - `OIDC_CLIENT_ID`: The client ID copied from Pocket ID.
   - `OIDC_CLIENT_SECRET`: The client secret copied from Pocket ID.

5. Set up your email address in ByteStash. This email has to match your user email in Pocket ID.
