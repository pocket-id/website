---
id: miniflux
---

1. Create a new OIDC Client in Pocket ID (e.g., `miniflux`).
2. In Callback URLs, add `https://<MINIFLUX DOMAIN>/oauth2/oidc/callback`
3. Save and get the Client ID and Client Secret
4. Set the following environment variables in your Miniflux instance:
   ```env
   OAUTH2_PROVIDER=oidc
   OAUTH2_CLIENT_ID=<client ID>
   OAUTH2_CLIENT_SECRET=<client secret>
   OAUTH2_REDIRECT_URL=https://<MINIFLUX DOMAIN>/oauth2/oidc/callback
   OAUTH2_OIDC_DISCOVERY_ENDPOINT=https://<POCKET ID DOMAIN> # no trailing slashes or ".well-known/openid-configuration"
   OAUTH2_OIDC_PROVIDER_NAME=PocketID
   OAUTH2_USER_CREATION=1 # optional, if you want nes users to be created automatically
   DISABLE_LOCAL_AUTH=1 # optional, if you want to disable local authentication
   ```
5. Restart Miniflux and enjoy!
