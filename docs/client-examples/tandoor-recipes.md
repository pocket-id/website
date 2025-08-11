---
title: Tandoor Recipes
description: Configure Tandoor Recipes with Pocket ID
---

1. In Pocket-ID, create a new OIDC Client, name it e.g. `Tandoor`
2. Set the callback URL to: `https://<your-tandoor-domain>/accounts/oidc/pocket-id/login/callback/`
3. Add the following environment variables to your Tandoor setup, e.g. via the `.env` file. Make sure to replace the 3 placeholders in `SOCIALACCOUNT_PROVIDERS`:

```ini
SOCIAL_PROVIDERS=allauth.socialaccount.providers.openid_connect
SOCIALACCOUNT_PROVIDERS='{"openid_connect":{"APPS":[{"provider_id":"pocket-id","name":"Pocket ID","client_id":"<pocket-id-client-id>","secret":"<pocket-id-client-secret>","settings":{"server_url":"https://<your-pocket-id-domain>/.well-known/openid-configuration"}}]}}'
```

Restart Tandoor and you will see an option to login with Pocket ID on the login page. You can also link existing accounts with Pocket ID through your Tandoor profile settings.