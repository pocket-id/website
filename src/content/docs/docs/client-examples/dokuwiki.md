---
title: DokuWiki
description: Sign in to the DokuWiki wiki with Pocket ID.
client:
  callbackUrls:
    - https://dokuwiki.example.com/doku.php
  logoutCallbackUrls:
    - https://dokuwiki.example.com/doku.php
  values:
    - clientId
    - clientSecret
    - authorizationUrl
    - tokenUrl
    - userinfoUrl
    - logoutUrl
---

::create-client

## Configure DokuWiki

1. In DokuWiki, open **Admin → Extension Manager → Search and Install** and install the **oauth** and **oauthgeneric** plugins.
2. Open **Admin → Configuration Settings**.
3. Make sure **baseurl** is set to your wiki's URL, such as `https://dokuwiki.example.com`, so the **Redirect URI** shown at the top of the **oauth** plugin settings matches the callback URL in Pocket ID.
4. Set **authtype** to `oauth`.
5. In the **oauth** plugin settings, turn on **register-on-auth** so new users can sign in.
6. In the **oauthgeneric** plugin settings, fill in the fields:
   - **key**: the **Client ID** from Pocket ID.
   - **secret**: the **Client secret** from Pocket ID.
   - **authurl**: the **Authorization URL** from Pocket ID.
   - **tokenurl**: the **Token URL** from Pocket ID.
   - **userurl**: the **Userinfo URL** from Pocket ID.
   - **logouturl**: the **Logout URL** from Pocket ID.
   - **authmethod**: `Bearer Header`.
   - **scopes**: `openid, profile, email, groups`.
   - **needs-state**: on.
   - **json-user**: `preferred_username`.
   - **json-name**: `name`.
   - **json-mail**: `email`.
   - **json-grps**: `groups`.
   - **label**: `Pocket ID`.
7. Save the settings.
   DokuWiki signs you out because the authentication backend changed, and the login page now shows the **Pocket ID** button.

To turn off password login, turn on **singleService** in the **oauth** plugin settings.
