---
title: Jellyfin
description: Sign in to the Jellyfin media server with Pocket ID.
client:
  callbackUrls:
    - https://jellyfin.example.com/sso/OID/redirect/<PROVIDER>
  values:
    - clientId
    - clientSecret
---

:::caution
Due to the current limitations of the Jellyfin SSO plugin, this integration will only work in a browser.
When tested, the Jellyfin app did not work and displayed an error, even when custom menu buttons were created.

Current workflow:

- Web browser: sign in using SSO
- App (Android app, iOS app, smart TV app, Windows app): sign in via QuickConnect only

To sign in to any app, click **QuickConnect**, then:

1. Open the web browser on your phone or PC and navigate to your Jellyfin.
2. Sign in using Pocket ID.
3. Accept the QuickConnect ID from the app.
:::

:::note
To view the original references and a full list of capabilities, visit the [Jellyfin SSO OpenID section](https://github.com/9p4/jellyfin-plugin-sso?tab=readme-ov-file#openid).
:::

## Requirements

- [Jellyfin Server](https://jellyfin.org/downloads/server)
- [Jellyfin SSO Plugin](https://github.com/9p4/jellyfin-plugin-sso) (archived by the owner on May 12, 2026)
- HTTPS connection to your Jellyfin server

:::tip
This guide covers two setups.
Follow the steps marked with the emoji for the setup that suits you:

- 😊 = Setup for normal users only (no distinction between users, no admins)
- ⚡ = Setup for normal users and admins
:::

## Create groups in Pocket ID

⚡ only:

1. In Pocket ID, open **Administration → User Groups** and click **Add Group**.
2. Add the two groups `jellyfin_admins` and `jellyfin_users`.

::create-client

Replace `<PROVIDER>` with the provider name you set in Jellyfin; this example uses `PocketID`.
⚡ On the **Access** tab, select the groups `jellyfin_admins` and `jellyfin_users`.

## Configure Jellyfin

1. Visit the plugin page (**Administration Dashboard → My Plugins → SSO-Auth**).
2. Use the following values for the fields:
   - **Name of OID Provider**: `<PROVIDER>` (e.g. `PocketID`)
   - **OID Endpoint**: `https://id.example.com`
   - **OpenID Client ID**: the **Client ID** from Pocket ID
   - **OID Secret**: the **Client secret** from Pocket ID
   - **Enabled**: [X]
   - **Enable Authorization by Plugin**:
     - 😊 -> [ ]
     - ⚡ -> [X]
   - **Enable All Folders**: [ ] (Enable to publish all and new folders to every user)
   - **Enabled Folders**: Choose the folders/libraries which users will use
   - **Roles**:
     - 😊 -> [ ] (if you have a group for Jellyfin users, use that group, e.g. `jellyfin_users`)
     - ⚡ -> add both groups, one per line:
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
   - **Set avatar url format**: `@{picture}` (Leave blank if you don't want avatar sync)
   - **Disable OpenID HTTPS Discovery (Insecure)**: [ ]
   - **Disable Pushed Authorization (Insecure)**: [ ]
   - **Do Not Validate OpenID Endpoints (Insecure)**: [ ]
   - **Do Not Validate OpenID Issuer Name (Insecure)**: [ ]
   - **Scheme Override**: `https`
   - **Port Override**: [ ]
3. Click **Save**.
4. Restart Jellyfin (**General → Restart**).

## Custom login button on the main page

_(Optional)_ In the Jellyfin administration UI, under **Branding**, add the following code in the **Login disclaimer** block (replace `<PROVIDER>`, e.g. with `PocketID`):

```html
<form action="https://jellyfin.example.com/sso/OID/start/<PROVIDER>">
  <button class="raised block emby-button button-submit">
    Sign in with Pocket ID
  </button>
</form>
```

Then, add the following code in the **Custom CSS code** section:

```css
a.raised.emby-button {
  padding: 0.9em 1em;
  color: inherit !important;
}

.disclaimerContainer {
  display: block;
}
```

**Source**: [guide to create a login button on the login page](https://github.com/9p4/jellyfin-plugin-sso?tab=readme-ov-file#creating-a-login-button-on-the-main-page)

## Sign in to Jellyfin

Done! You have successfully set up SSO for your Jellyfin instance using Pocket ID.

:::note
Sometimes there may be a brief delay when using the custom menu option.
This is related to the Jellyfin plugin and not Pocket ID.
:::

If your users already have accounts, as long as their Pocket ID username matches their Jellyfin ID, they will be signed in automatically.
Otherwise, a new user will be created with access to all of your folders.
You can change this in your configuration as desired.

This setup will only work if sign-in is performed using the `https://jellyfin.example.com/sso/OID/start/<PROVIDER>` URL.
This URL initiates the SSO plugin and applies all the configurations we completed above.

---

<sub>Written for Jellyfin v10.11.2 and SSO-Auth-Plugin v4.0.0.2</sub>
