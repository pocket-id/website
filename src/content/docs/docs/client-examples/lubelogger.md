---
title: LubeLogger
description: Sign in to the LubeLogger vehicle maintenance tracker with Pocket ID.
client:
  callbackUrls:
    - https://lubelogger.example.com/Login/RemoteAuth
  pkce: true
  values:
    - clientId
    - clientSecret
    - authorizationUrl
    - tokenUrl
    - userinfoUrl
    - logoutUrl
    - certificateUrl
---

## Requirements

- [LubeLogger](https://lubelogger.com/)
- HTTPS connection to your LubeLogger server

::create-client

## Configure LubeLogger

1. Open LubeLogger and navigate to **User Icon → Configure → Acknowledge and Continue → Next → Next → Next → Single Sign On**.
2. Enter the following values from Pocket ID.
   Leave all others empty or at their defaults.

   | LubeLogger         | Pocket ID value         |
   | ------------------ | ----------------------- |
   | OIDC Provider      | `Pocket ID`             |
   | OIDC Client ID     | **Client ID**           |
   | OIDC Client Secret | **Client secret**       |
   | OIDC Auth URL      | **Authorization URL**   |
   | OIDC Token URL     | **Token URL**           |
   | OIDC UserInfo URL  | **Userinfo URL**        |
   | OIDC JWKS URL      | **Certificate URL**     |
   | OIDC Logout URL    | **Logout URL**          |
   | OIDC USE PKCE      | `True`                  |

3. Click **Next**.
4. Enable OIDC for Root User.
5. Enter the Root User Email Address.
6. Click **Save**.
7. Return to **Garage** and sign out to test the connection.
   After signing out, you should see a **Login via Pocket ID** button.
