---
title: OpenPubKey SSH
description: Configure OpenPubKey SSH authentication with Pocket ID
---

> The following example uses `id.example.com`, make sure to update this to your Pocket-ID server name. It also assumes OpenPubKey SSH (OPKSSH) is installed on both the server and the client. For instructions on installation for different operating systems see: https://github.com/openpubkey/opkssh

## Create Pocket-ID OIDC Client
1. In Pocket-ID create a new OIDC Client, name it i.e. `Opkssh`.
2. Set the following callback URLs:
  a) `http://localhost:3000/login-callback`
  b) `http://localhost:10001/login-callback`
  c) `http://localhost:11110/login-callback`
3. Enable `Public Client`. This will automatically enable `PKCE`.
4. Save the configuration and copy the *Client ID*.
5. Assign a user group and/or users to the new OIDC client.

## Collect User and Audience Information
1. Open the new OIDC client.
2. Scroll to the bottom of the settings screen and click the *Show* button next to *OIDC Data Preview*.
3. In the new window, make sure the correct user is select from the *Users* drop-down menu, then copy the *aud* and *sub* values that appear beneath.


## Configure Provider on Server
1. Log in to the server running SSH. Ubuntu Linux is used in this example, but various Linux distributions, Windows Server and Windows 11 are supported as well.
2. Edit the Providers file, located in `/etc/opk/providers` by default on Linux.
3. Add the following line to the bottom of the file:
```bash
https://id.example.com <AUD_GUID> 24h
```
  a) replace *<AUD_GUID>* with the *aud* value you copied above
  b) "24h" means a 24 hour token lifetime. This can be changed to a different value (e.g. 12h, 6h) if required.
4. Remove the the default providers from the file if not needed, and save.


## Map Users and Group on Server
1. Map OIDC users and groups to a local user by running the following command on the server:
```bash
opkssh add <user> <email/sub/group> <issuer>
```
2. User example (replace `<SUB_GUID>` with the *sub* value recorded above.
```bash
opkssh add root <SUB_GUID> https://id.example.com
```
3. Group example (assumes there is a Pocket ID group called *opkssh_users*):
```bash
opkssh add root oidc:groups:opkssh_users https://id.example.com
```
NOTE: Users and group mapping are stored in `/etc/opk/auth_id`. This applies server-wide and require root permission to edit. Users can also configure their own OIDC mappings in `~/.opk/auth_id`. Root permission is not required to edit this file. The user can only map OIDC users to their own local user account. For more information see:
https://github.com/openpubkey/opkssh


## Configure Client
1. From a terminal on the client, run the following command:
```bash
`opkssh login --create-config`
```
2. This created a new file in the users' home folder: `~/.opk/config.yml`
3. Edit the file and add the following to the end of the file(replace `<CLIENT_ID>` with the *Client ID* recorded above):
```Yaml
  - alias: pocket-id
    issuer: https://id.example.com
    client_id: <CLIENT_ID>
    scopes: openid email
    access_type: offline
    prompt: consent
    redirect_uris:
      - http://localhost:3000/login-callback
      - http://localhost:10001/login-callback
      - http://localhost:11110/login-callback
 ```
4. Remove the other providers if not needed and save the file.


## Sign In
1. Run the following command on the client:
```bash
okpssh login pocket-id
```
2. This will open a new tab in your default web browser at the Pocket-ID sign-in page.
3. Once signed in, the web page can be closed.
4. Return to the terminal and run `ssh user@server`
  a) user = OIDC->local mapped user.
  b) server = server running openPubKey.
5. You will be automatically signed in to the server.
NOTE: You can also just run `okpssh login`, which will open a web page in the browser with a list of configured providers. You would then need to click on Pocket-ID to continue.

You can configure multiple servers to use the same Pocket-ID OIDC client for OPKSSH. If you want to limit different Pocket-ID SSH users to different servers, multiple OPKSSH OIDC clients would be required.
