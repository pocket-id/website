---
title: Common issues
seoTitle: Troubleshooting Pocket ID sign-in, passkey and OIDC errors
description: Fixes for the problems people run into most often, from passkeys that won't register to callback URL and group errors.
---

## Passkeys don't work

The browser refuses to create or use a passkey, or shows "Passkeys are not configured correctly for this domain".

- Pocket ID has to be served over HTTPS, except on `localhost`, as [Reverse proxy](/docs/setup/reverse-proxy) shows.
- `APP_URL` has to match the address in the browser exactly, such as `APP_URL=https://id.example.com`.
  Passkeys are bound to that domain, so a passkey created for one domain doesn't work on another, and changing the domain later means adding new passkeys.

A passkey prompt that fails with "Your passkey couldn't verify you" comes from a security key without a PIN, while **User verification** is set to **Required**.
Set a FIDO2 PIN on the key, or choose **Preferred** under [Application Configuration → Passkeys](/docs/guides/sign-in-methods#passkey).

## The setup page is gone

`/setup` only works until the first account exists.
If you created an account but never added a passkey, sign in with a login code from the [command line](/docs/troubleshooting/account-recovery#you-lost-the-admin-passkey) and add one.

## The redirect_uri is not registered for this client

Pocket ID only sends users back to the callback URLs listed on the client, and the URL the app sent doesn't match any of them.
The error shows the URL the app sent, so add exactly that one to the client's **Callback URLs**.

A common cause is an app behind a reverse proxy that thinks it runs on `http://` and sends an `http://` callback URL.
Configure the app to know its public `https://` address, or as a last resort, add both versions of the URL.

## You are not allowed to access this service

The user isn't in any of the groups the client allows, and a new client allows no group at all.
Add the user to a group on the client's **Access** tab, or allow all users, as [Allowed user groups](/docs/configuration/allowed-groups) describes.

## The app can't reach Pocket ID

Sign-in starts, but the app fails after the redirect back, often with a timeout, a connection error or a TLS error in its logs.
The app's server fetches the discovery document and the tokens from Pocket ID directly, so it has to reach `APP_URL` from where it runs:

- `https://id.example.com` has to resolve inside the app's container, which split-horizon DNS or a missing hairpin NAT on the router can break.
- A self-signed or private certificate has to be trusted by the app too.
- If the app can only reach Pocket ID at another address, such as `http://pocket-id:1411`, set `INTERNAL_APP_URL` to it.
  The discovery document then sends the app's server to that address for tokens, user info and signing keys, while browsers keep using `APP_URL`.
  The app still has to load the discovery document itself, so give it `http://pocket-id:1411/.well-known/openid-configuration` if it lets you set the discovery URL.

## Content Security Policy errors

The browser console shows an error like this, and parts of Pocket ID don't load:

> Content-Security-Policy: The page's settings blocked an inline script (script-src-elem) from being executed because it violates the following directive: "script-src 'self' ...

Something in front of Pocket ID injects its own scripts or styles into the page, such as Cloudflare's **Rocket Loader**.
Turn off that feature for the Pocket ID domain.

## nginx returns 502 Bad Gateway

nginx logs `upstream sent too big header`, because Pocket ID's response headers are larger than nginx's default buffers.
Raise them as in the [nginx example](/docs/setup/reverse-proxy).
