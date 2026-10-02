---
title: Account Recovery
description: Solutions to account recovery issues
---

There are two ways for an administrator to create a login code for a user:

1.  **UI**: An admin can create a login code for the user in the admin panel under the **Users** tab by clicking on the three dots next to the user's name and selecting **Login Code**.
2.  **Terminal**: You can create a login code for a user by running `pocket-id one-time-access-token <user name or email>`. To execute this command with Docker you have to run:

```bash
docker compose exec pocket-id /app/pocket-id one-time-access-token <user name or email>
```

The command prints a link that signs the user in once:

```txt
A one-time access token valid for 1 hour has been created for "test".
Use the following URL to sign in once: https://id.example.com/lc/YCvmQgrJbX0zEZbh
```

The user can enter the code on the **Login Code** page. A login code can also be used to set up a passkey for the user. Only send the code to the person it was created for, and use a short expiration time where possible.
