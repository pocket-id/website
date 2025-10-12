---
title: Pangolin
description: Configure Pangolin with Pocket ID authentication
---

## Pocket ID Setup

1. In Pocket ID create a new OIDC Client, name it, for example, `Pangolin`
2. Copy the `Client ID`, `Client Secret`, `Authorization URL` and `Token URL` for the following steps
3. Leave the `Callback URL` blank to auto-fill


## Pangolin Setup

1. Log into Pangolin using your super user account
2. Under Server Admin, select Identity Providers, then "+ Add Identity Provider"
3. Enter the following:
   - Name: PocketID (or anything you want)
   - Select Provider Type: OAuth2/OIDC
   - Client ID: Your **Client ID** from Pocket ID
   - Client Secret: Your **Client Secret** from Pocket ID.
   - Authorization URL: Your **Authorization URL** from Pocket ID.
   - Token URL: Your **Token URL** from Pocket ID.
   - Identifier Path: One of `email`, `preferred_username` or `sub` (Advanced)
   - Email Path: `email`
   - Name Path: `name`
   - Scopes: `openid profile email`
4. Save your new Identity Provider

> [!IMPORTANT]
> **Automatic user provisioning is only supported on a Pangolin Professional license.**

If you're on a non-Professional License, you'll need to manually create new users in Pangolin.

You can create one like so:

1. Back in your Pangolin instance, go to your organization, select Users, then "+ Create User".
2. Select "External User", select your Pocket ID Identity provider, and fill in the relevant details.

Depending on what you configured in `Identifier Path`, you'll need to add that in the `username` field.

- `email` will be your Pocket ID email.
- `preferred_username` will be your Pocket ID username.

Once you have your user created, you can save, log out from Pangolin, and test your new OIDC connection.

## Errors

### User not provisioned in the system

Make sure you have a user created in Pangolin and that the "Username" matches the `Identifier Path` used.

### Invalid callback URL, it might be necessary for an admin to fix this

Your Callback URL is not correctly defined in Pocket ID. Make sure this matches the `Redirect URL` in your Pangolin OIDC config.

This should be automatically setup in [recent versions](https://github.com/pocket-id/pocket-id/pull/583).

Example: `https://pangolin.example.com/auth/idp/1/oidc/callback`
