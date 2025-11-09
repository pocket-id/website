---
title: Jellyfin
description: Set up Jellyfin media server with OIDC authentication
---

> [!WARNING]
> Due to the current limitations of the Jellyfin SSO plugin, this integration will only work in a browser. When tested, the Jellyfin app did not work and displayed an error, even when custom menu buttons were created.
> Current work-flow:
> - Web browser: Login using SSO
> - App (Android-App, iOS-App, Smart-TV-App, Windows-App): Login via QuickConnect only
>
> To login to any app, you have to click on "QuickConnect", then:
> 1. Open the web browser on your phone or PC and navigate to your Jellyfin
> 2. Login using Pocket ID
> 3. Accept the QuickConnect-ID from the app

> [!NOTE]
> To view the original references and a full list of capabilities, please visit the [Jellyfin SSO OpenID Section](https://github.com/9p4/jellyfin-plugin-sso?tab=readme-ov-file#openid).

## Requirements

- [Jellyfin Server](https://jellyfin.org/downloads/server)
- [Jellyfin SSO Plugin](https://github.com/9p4/jellyfin-plugin-sso)
- HTTPS connection to your Jellyfin server

## OIDC - Pocket ID Setup

To start, we need to create a new SSO resource in our Jellyfin application.

> [!TIP]
> This guide divides between two setups. See the following emojis for the guide which suits you:

> - 😊 = Setup for normal users only (no derivation between users, no admins)
> - ⚡ = Setup for normal users and admins

1. Log into the admin panel
- ⚡ -> go to User-Groups and add the two groups: `jellyfin_admins`, `jellyfin_users`
2. Go to OIDC Clients -> Add OIDC Client:
- **Name**: Jellyfin (or any name you prefer)
- **Callback URL**: `https://<JELLYFIN_URL>/sso/OID/redirect/<PROVIDER>`, or leave blank to autofill on first login.
- For this example, we’ll be using the provider named <i>"PocketID"</i>
3. Click **Save**. Keep the page open, as we will need the OID client ID and OID secret.
- ⚡ -> Add your groups `jellyfin_admins`, `jellyfin_users` to the client, then click **Save**

## OIDC Client - Jellyfin SSO Resource

1. Visit the plugin page (**Administration Dashboard -> My Plugins -> SSO-Auth**).
2. Use the following values for the fields:
- **Name of OID Provider**: `<PROVIDER>` (e.g. `PocketID`)
- **OID Endpoint**: `https://<PocketID_URL>` (e.g. `https://auth.yourdomain.tld`)
- **OpenID Client ID**: `<ID from PocketID-Client>`
- **OID Secret**: `<Secret from PocketID-Client>`
- **Enabled**: [X]
- **Enable Authorization by Plugin**:

  - 😊 -> [ ]
  - ⚡ -> [X]
- **Enable All Folders**: [ ] (Enable to publish all and new folders to every user)
- **Enabled Folders**: Choose the folders/libraries which users will use
- **Roles**:

  - 😊 -> [ ] (if you have a group for jellyfin-users, use that group, e.g. `jellyfin_users`)
  - ⚡ -> add both groups, each per line:
```
jellyfin_users
jellyfin_admins
```
- **Admin Roles**:

  - 😊 -> [ ]
  - ⚡ -> `jellyfin_admins`
- **Enable Role-Based Folder Access**: [ ]
- **Enable Live TV RBAC**: [ ]
- **Live TV Roles**: [ ]
- **Live TV Management Roles**: [ ]
- **Enable Live TV Access By Default**: [ ]
- **Enable Live TV Management By Default**: [ ]
- **Role Claim**: `groups`
- **Request Additional Scopes**: `groups`
- **Set default Provider**: [ ]
- **Set default username claim**: `preferred_username`
- **Set avatar url format**: `@{picture}` (Leave blank if you don't want Avatar-Sync)
- **Disable OpenID HTTPS Discovery (Insecure)**: [ ]
- **Disable Pushed Authorization (Insecure)**: [ ]
- **Do Not Validate OpenID Endpoints (Insecure)**: [ ]
- **Do Not Validate OpenID Issuer Name (Insecure)**: [ ]
- **Scheme Override**: `https`
- **Port Override**: [ ]
3. Click **Save**
4. Now **Restart** Jellyfin (Go to **General -> Restart**)

## Optional Step - Custom Login Button on Main Page

In the Jellyfin administration UI, under **Branding**, add the following code in the **Login disclaimer** block (replacing JELLYFIN_URL and the PROVIDER, e.g. `PocketID`):
```
<form action="https://<JELLYFIN_URL>/sso/OID/start/<PROVIDER>">
  <button class="raised block emby-button button-submit">
    Sign in with PocketID
  </button>
</form>
```

Then, add the following code in the **Custom CSS code** section:
```
a.raised.emby-button {
  padding: 0.9em 1em;
  color: inherit !important;
}

.disclaimerContainer {
  display: block;
}
```

**Source**: [guide to create a login button on the login page](https://github.com/9p4/jellyfin-plugin-sso?tab=readme-ov-file#creating-a-login-button-on-the-main-page)

## Signing into Your Jellyfin Instance

Done! You have successfully set up SSO for your Jellyfin instance using Pocket ID.

> [!NOTE]
> Sometimes there may be a brief delay when using the custom menu option. This is related to the Jellyfin plugin and not Pocket ID.

If your users already have accounts, as long as their Pocket ID username matches their Jellyfin ID, they will be logged in automatically. Otherwise, a new user will be created with access to all of your folders. Of course, you can modify this in your configuration as desired.

This setup will only work if sign-in is performed using the `https://<JELLYFIN_URL>/sso/OID/start/<PROVIDER>` URL. This URL initiates the SSO plugin and applies all the configurations we completed above.

---

<sub>Written for Jellyfin v10.11.2 and SSO-Auth-Plugin v4.0.0.2</sub>