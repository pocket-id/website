
---
title: LubeLogger
description: Integrate Pocket ID with LubeLogger
---

## Requirements

- [LubeLogger](https://lubelogger.com/)
- HTTPS connection to your LubeLogger server

## Create OIDC Client in Pocket ID

1. Create a new OIDC Client in Pocket ID (e.g., `Lube Logger`).
2. Set the **Callback URL** to the value below.
   ```
   https://<lubelogger.example.com>/Login/RemoteAuth
   ```
3. Enable PKCE
4. _Optional:_ Download a PNG or SVG **logo** from the [LubeLogger Branding](https://docs.lubelogger.com/Misc/Branding/) and upload.
5. Click Save
6. Copy or save the **Client Secret** for use in the next section as you will not be able to read it again once you navigate away from this page.
7. Set User Groups according to your preference or Unrestrict and Save

## Configure LugeLogger using the UI

1. Open LubeLogger and navigate to:
   **`User Icon > Configure > Acknowledge and Continue > Next > Next > Next > Single Sing On`**
2. Copy/Enter the following values from Pocket-ID. Leave all others empty/default
   
   |LubeLogger|Pocket-ID Value|
   |---|---|
   |OIDC Provider|Pocket-ID|
   |OIDC Client ID|Client ID|
   |OIDC Client Secret|Client Secret|
   |OIDC Auth URL|Authorization URL|
   |OIDC Token URL|Token URL|
   |OIDC UserInfo URL|Userinfo URL|
   |OIDC JWKS URL|Certificate URL|
   |OIDC Logout URL|Logout URL|
   |OIDC USE PKCE|True|
   
4. Click **Next**
5. Enable OIDC for Root User
6. Enter Root User Email Address
7. Click **Save**
8. Return to Garage and logout to test connection
9. After logging out you should see a **Login via Pocket-ID** button
