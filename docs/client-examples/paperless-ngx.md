---
id: paperless-ngx
---

Below URLs are used as placeholders for the paperless-ngx and Pocket ID instances. Replace them with the actual URLs.

- paperless-ngx.example.com (The url of your paperless-ngx instance.)
- pocketid.example.com (The url of your Pocket ID instance.)

## Pocket ID Setup

1. In Pocket ID, create a new OIDC client named `paperless-ngx` (or any name you prefer).
2. (Optional) Set a logo for the OIDC client.
3. Set the callback URL to: `https://paperless-ngx.example.com/accounts/oidc/pocket-id/login/callback/`
4. Copy the `Client ID` and `Client Secret` for the next steps.

## paperless-ngx Docker Setup

1. Add The below environment variables for the paperless-ngx web server container. See the [docs](https://docs.paperless-ngx.com/configuration/#PAPERLESS_SOCIALACCOUNT_PROVIDERS) for more information. **NOTE:** The `provider_id` value, for e.g. `pocket-id` should match what is in the callback URL in the Pocket ID configuration described above.

```yaml
PAPERLESS_APPS=allauth.socialaccount.providers.openid_connect
PAPERLESS_SOCIALACCOUNT_PROVIDERS='{"openid_connect":{"SCOPE":["openid","profile","email"],"OAUTH_PKCE_ENABLED":true,"APPS":[{"provider_id":"pocket-id","name":"Pocket-ID","client_id":"Place the Client ID","secret":"Place the Client Secret","settings":{"server_url":"https://pocketid.example.com"}}]}}'
```

2. Restart your docker containers.
3. Now you should be able to login to paperless using OAuth.
4. To allow for your existing paperless-ngx user ID to be linked to the user in Pocket ID
   - Login to paperless-ngx using the password authentication.
   - Click on your user name on the top right corner and click **My Profile**.
   - Link the account to Pocket ID using the **Connect new social account** option.
