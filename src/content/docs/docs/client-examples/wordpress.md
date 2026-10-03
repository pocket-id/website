---
title: WordPress
description: Sign in to any WordPress site with Pocket ID.
client:
  callbackUrls:
    - https://my-website.com/wp-admin
---

Replace `my-website.com` with the URL of your WordPress instance and `id.example.com` with the URL of your Pocket ID instance.

This guide uses the [OpenID Connect Generic Client WordPress Plugin](https://github.com/oidc-wp/openid-connect-generic).
Other plugins should work about the same.

::create-client

## Configure WordPress

1. Open the WordPress admin interface and go to **Plugins → Add Plugin**.
2. Search for `OpenID Connect Generic Client` by `Jonathan Daggerhart`, then click **Install** and **Activate**.
3. Go to **Settings → OpenID Connect Client**.
4. At the top, you'll find a **Quick Setup**.
   Enter the **OIDC Discovery URL** from Pocket ID and click **Load Configuration**.
5. Fill out the following fields:
   - **Login Type**: `OpenID connect button on login form`.
     _Do **NOT** change this until you've successfully tested your new OIDC login!_
   - **Client ID**: the **Client ID** from Pocket ID
   - **Client Secret**: the **Client secret** from Pocket ID
6. Save your settings.
7. Open a private browser window and make sure the OIDC login works.
8. _(Optional)_ Change **Login Type** to `Auto Login - SSO`.

## Troubleshooting

If you use the _Kadence Security_ plugin, make sure `2FA` is disabled.
Otherwise the login process redirects you back to your Pocket ID instance and you can't get into the WordPress admin page.
