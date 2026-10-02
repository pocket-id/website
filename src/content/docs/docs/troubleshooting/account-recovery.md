---
title: Account recovery
seoTitle: Recover a Pocket ID account after losing the passkey
description: Let a user back in who lost their passkeys, or yourself when you lost the last admin passkey, with a one-time login code.
---

A user who lost all their passkeys signs in once with a **login code** and adds a new passkey.

## A user lost their passkeys

An admin creates the login code in **Administration → Users**, from the **⋯** menu of the user with **Login Code**, as [User management](/docs/setup/user-management#add-the-first-passkey) shows.
The user opens the link or enters the code under **Alternative Sign In Methods → Login Code**, then adds a passkey on their account page.

If they still have a passkey on another device, they don't need a code: [Sign in with another device](/docs/guides/sign-in-methods#sign-in-with-another-device) gets them in with it.

## You lost the admin passkey

Without access to the admin UI, create the login code on the server instead:

```bash
# With Docker Compose
docker compose exec pocket-id /app/pocket-id one-time-access-token <username or email>

# With the binary
./pocket-id one-time-access-token <username or email>
```

The command prints a link that signs the user in once within the next hour:

```txt
A one-time access token valid for 1 hour has been created for "taylor".
Use the following URL to sign in once: https://id.example.com/lc/YCvmQgrJbX0zEZbh
```

Anyone with the link can sign in as that user, so only send it to the person it's for.
