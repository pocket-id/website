---
id: mealie
---

# Mealie

1. In Pocket-ID, create a new OIDC Client, name it i.e. `Mealie`.
2. Set the callback URL to: `https://<your-mealie-domain>/login`
3. Add the following to your docker `.env` file for Mealie:


```yaml
    environment:
      ALLOW_SIGNUP: "true"
    #   LOG_LEVEL: "DEBUG"
    #   DB_ENGINE: sqlite # Optional: 'sqlite', 'postgres'  
      OIDC_AUTH_ENABLED: True
      OIDC_SIGNUP_ENABLED: True
      OIDC_CONFIGURATION_URL: https://<your pocket ID domain>/.well-known/openid-configuration
      OIDC_CLIENT_ID: <client id from pocket ID>
      OIDC_CLIENT_SECRET: <client secret from pocket ID>
```
```ini
  OIDC_AUTH_ENABLED=true
  OIDC_SIGNUP_ENABLED=true
  OIDC_CLIENT_ID=<client id from pocket ID>
  OIDC_CLIENT_SECRET=<client secret from pocket ID>
  OAUTH_PROVIDER_NAME=Pocket ID
  OIDC_CONFIGURATION_URL=https://<your pocket id url>/.well-known/openid-configuration
```
