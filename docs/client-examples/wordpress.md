---
title: WordPress
description: Configure any WordPress instance with Pocket ID OIDC
---

The following example variables are used, and should be replaced with your actual URLS.

- my-website.com (The url of your WordPress instance.)
- id.example.com (The url of your Pocket ID instance.)

We will be using the [OpenID Connect Generic Client WordPress Plugin](https://github.com/oidc-wp/openid-connect-generic). Other plugins should work about the same.

## Pocket ID Setup

1. In Pocket-ID create a new OIDC Client, name it i.e. `WordPress`.
2. Set the callback URL to: `https://my-website.com/wp-admin`, or leave blank to autofill on first login.
3. _(Optional)_ Upload a logo for your website or download the wordpress logo from [Self-Hosted Dashboard Icons](https://selfh.st/icons)
4. Copy the `Client ID`, `Client Secret`, `OIDC Discovery URL` for use in the next steps.

## WordPress Setup

1. Open your admin interface of your WordPress and navigate to _Plugins > Add Plugin_
2. Search for `OpenID Connect Generic Client` from author `Jonathan Daggerhart`. _Install_ and _Activate_ that plugin
3. Navigate to _Settings > OpenID Connect Client_
4. On the top you'll find a **Quick Setup**_**. Enter your `OIDC Discovery URL` and click the _Load Configuration_ button
5. After that, fill out the following fields:
   - **Login Type**: `OpenID connect button on login form`. _Do **NOT** change this until you've successfully tested your new OIDC login!_
   - **Client ID**: Paste the `Client ID` from Pocket ID
   - **Client Secret**: Paste the `Client Secret` from Pocket ID
6. Save your settings
7. Open an InPrivate window and ensure OIDC login works
8. _(Optional)_ Change **Login Type** to `Auto Login - SSO`

## Troubleshooting

If you use the _Kadence Security_ plugin, make sure you have `2FA` disabled. This will cause the login process to redirect you back to your Pocket-ID instance and you won't be able to get into the WordPress admin page