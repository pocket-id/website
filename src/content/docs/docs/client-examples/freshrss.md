---
title: FreshRSS
description: Sign in to the FreshRSS feed reader with Pocket ID.
client:
  callbackUrls:
    - https://freshrss.example.com/i/oidc/
---

::create-client

## Configure FreshRSS

See [FreshRSS’ OpenID Connect documentation](https://freshrss.github.io/FreshRSS/en/admins/16_OpenID-Connect.html) for specific FreshRSS OIDC settings.

This is an example Docker Compose file for FreshRSS with OIDC enabled:

```yaml
services:
  freshrss:
    image: freshrss/freshrss:1.25.0
    container_name: freshrss
    ports:
      - 8080:80
    volumes:
      - /freshrss_data:/var/www/FreshRSS/data
      - /freshrss_extensions:/var/www/FreshRSS/extensions
    environment:
      CRON_MIN: 1,31
      TZ: Etc/UTC
      OIDC_ENABLED: 1
      OIDC_CLIENT_ID: <client-id>
      OIDC_CLIENT_SECRET: <client-secret>
      OIDC_PROVIDER_METADATA_URL: https://id.example.com/.well-known/openid-configuration
      OIDC_SCOPES: openid email profile
      OIDC_X_FORWARDED_HEADERS: X-Forwarded-Proto X-Forwarded-Host
      OIDC_REMOTE_USER_CLAIM: preferred_username
    restart: unless-stopped
    networks:
      - freshrss
networks:
  freshrss:
    name: freshrss
```

:::caution
The username in Pocket ID must match the username in FreshRSS **exactly**, including case.
As of version `0.24` of Pocket ID, all usernames must be entirely lowercase, while FreshRSS allows uppercase.
If a Pocket ID username is `amanda` and your FreshRSS username is `Amanda`, you will get a 403 error in FreshRSS and be unable to log in.
As of version `1.25` of FreshRSS, you can't change your username in the GUI.
To change your FreshRSS username to lowercase or to match your Pocket ID username, go to your FreshRSS volume location.
In `data/users/`, rename the folder for your user to the matching username in Pocket ID, then restart the FreshRSS container to apply the changes.
:::

## Complete the setup

If you are setting up a new instance of FreshRSS, start the container with the OIDC variables and open your FreshRSS URL.

If you are adding OIDC to an existing FreshRSS instance, recreate the container with the Docker Compose file that contains the OIDC variables and open your FreshRSS URL.
Open **Settings → Authentication**, change the authentication method to **HTTP** and click **Submit**.
Log out to test your OIDC connection.

If you get an error from Pocket ID or can't log in to your FreshRSS account, you can revert to password login by editing the FreshRSS `config.php` file.
Find the value for `auth_type` and change it from `http_auth` to `form`.
Restart the FreshRSS container to revert to password login.
