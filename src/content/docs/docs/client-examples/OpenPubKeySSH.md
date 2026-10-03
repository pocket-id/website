---
slug: docs/client-examples/OpenPubKeySSH
title: OpenPubKey SSH
description: Sign in to SSH servers with OpenPubKey SSH (opkssh) and Pocket ID.
client:
  callbackUrls:
    - http://localhost:3000/login-callback
    - http://localhost:10001/login-callback
    - http://localhost:11110/login-callback
  public: true
  values:
    - clientId
---

This guide assumes OpenPubKey SSH (opkssh) is installed on both the server and the client.
For installation instructions for different operating systems, see https://github.com/openpubkey/opkssh.

::create-client

## Collect user and audience information

1. Open the client in Pocket ID and click **OIDC Data Preview** at the top of the page.
2. Select the user and copy the `aud` and `sub` values.

## Configure the provider on the server

1. Sign in to the server running SSH.
   Ubuntu is used in this example, but other Linux distributions, Windows Server and Windows 11 are supported as well.
2. Edit the providers file, located at `/etc/opk/providers` by default on Linux.
3. Add the following line to the bottom of the file:
   ```
   https://id.example.com <AUD_GUID> 24h
   ```
   - Replace `<AUD_GUID>` with the `aud` value you copied above.
   - `24h` is the token lifetime.
     You can change it to a different value, such as `12h` or `6h`.
4. Remove the default providers from the file if you don't need them, and save it.

## Map users and groups on the server

1. Map OIDC users and groups to a local user by running the following command on the server:
   ```bash
   opkssh add <user> <email/sub/group> <issuer>
   ```
2. User example (replace `<SUB_GUID>` with the `sub` value you copied above):
   ```bash
   opkssh add root <SUB_GUID> https://id.example.com
   ```
3. Group example (assumes there is a Pocket ID group named `opkssh_users`):
   ```bash
   opkssh add root oidc:groups:opkssh_users https://id.example.com
   ```
   Pocket ID only sends the groups claim when the `groups` scope is requested, so the client configuration below includes it.

:::note
User and group mappings are stored in `/etc/opk/auth_id`.
This file applies server-wide and requires root permissions to edit.
Users can also configure their own OIDC mappings in `~/.opk/auth_id`, which doesn't require root permissions.
In that file, users can only map OIDC users to their own local user account.
For more information, see https://github.com/openpubkey/opkssh.
:::

## Configure the client

1. In a terminal on the client, run the following command:
   ```bash
   opkssh login --create-config
   ```
   This creates the file `~/.opk/config.yml` in your home folder.
2. Add the following to the end of the file and replace `<client-id>` with the **Client ID** from Pocket ID:
   ```yaml
     - alias: pocket-id
       issuer: https://id.example.com
       client_id: <client-id>
       scopes: openid email groups
       access_type: offline
       prompt: consent
       redirect_uris:
         - http://localhost:3000/login-callback
         - http://localhost:10001/login-callback
         - http://localhost:11110/login-callback
   ```
3. Remove the other providers if you don't need them and save the file.

## Sign in

1. On the client, run the following command:
   ```bash
   opkssh login pocket-id
   ```
   This opens the Pocket ID sign-in page in your default browser.
2. After signing in, you can close the page.
3. Back in the terminal, run `ssh user@server`, where `user` is the mapped local user and `server` is the server running opkssh.
   You're signed in to the server automatically.

You can also run `opkssh login` without the alias.
This opens a page in your browser with a list of the configured providers, where you choose Pocket ID.

You can configure multiple servers to use the same Pocket ID client for opkssh.
If you want to limit different Pocket ID users to different servers, you need multiple clients.
