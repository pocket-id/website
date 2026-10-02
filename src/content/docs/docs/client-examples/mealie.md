---
title: Mealie
description: Configure Mealie recipe manager with Pocket ID
---

1. In Pocket-ID, create a new OIDC Client, name it i.e. `Mealie`.
2. Set the callback URL to: `https://<your-mealie-domain>/login`.
3. Add the following to your docker `compose` or `.env` file for Mealie:

Example directly in `compose.yaml`:
```yaml
environment:
  ALLOW_SIGNUP: 'true'
  #   LOG_LEVEL: "DEBUG"
  #   DB_ENGINE: sqlite # Optional: 'sqlite', 'postgres'
  OIDC_AUTH_ENABLED: True
  OIDC_SIGNUP_ENABLED: True
  OIDC_CONFIGURATION_URL: https://<your pocket ID domain>/.well-known/openid-configuration
  OIDC_CLIENT_ID: <client id from pocket ID>
  OIDC_CLIENT_SECRET: <client secret from pocket ID>
```

Example using an `.env` file:
```ini
  OIDC_AUTH_ENABLED=true
  OIDC_SIGNUP_ENABLED=true
  OIDC_CLIENT_ID=<client id from pocket ID>
  OIDC_CLIENT_SECRET=<client secret from pocket ID>
  OIDC_PROVIDER_NAME="Pocket ID"
  OIDC_CONFIGURATION_URL=https://<your pocket id url>/.well-known/openid-configuration

  # Optionally, uncomment  the following:
# ALLOW_SIGNUP=false # Disables Mealie's public/local account registration. Users cannot create accounts through Mealie's standard signup form.
# OIDC_SIGNUP_ENABLED=true # Allows Mealie to create an account automatically when an authorized Pocket ID user signs in for the first time.
# ALLOW_PASSWORD_LOGIN=false # Disables Mealie's local username and password login form. Authentication must occur through Pocket ID.
# OIDC_AUTO_REDIRECT=true # Bypasses Mealie's login selection page and redirect visitors directly to Pocket ID for authentication.
```
If you are using an `.env` file, be sure to reference the file in your `compose.yaml` under mealie add:
```yaml
env_file:
  - .env
```
