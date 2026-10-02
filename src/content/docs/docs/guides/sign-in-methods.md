---
title: Sign-in methods
description: The different ways users can sign in to Pocket ID
---

Pocket ID is mainly made for signing in with passkeys. If a user does not have access to a passkey, there are a few other ways to sign in. Some of them need to be enabled by an administrator first.

## Passkey

This is the normal sign-in method. The user can use a passkey saved in their browser, on their phone, in a password manager, or on a hardware security key.

Passkeys are secure because the private part of the credential stays on the user's device and is not sent to Pocket ID or the service. The user unlocks it with their device security, such as a fingerprint, face scan, PIN, or hardware key. Passkeys are also tied to the website they were created for, which makes phishing much harder.

## Sign in with another device

This method is useful when the user is signing in on a device which does not have their passkey.

1. On the device where the user wants to sign in, click **Don't have access to your passkey?**.
2. Select **Sign in with another device**.
3. Scan the QR code with a device that has the user's passkey, or open the shown address and enter the code.
4. Approve the request with the passkey on the other device.

The request is valid for 5 minutes. The location and device information shown on the approval screen should be checked before approving it.

## Login code from an administrator

An administrator can create a login code from the **Users** page. The administrator can send the code to the user, who enters it on the **Login Code** page.

This is useful for setting up a first passkey or for recovering access to an account. The code has an expiration time and should only be sent through a safe channel.

An administrator can also create a code from the terminal:

```bash
pocket-id one-time-access-token <user name or email>
```

For Docker Compose:

```bash
docker compose exec pocket-id /app/pocket-id one-time-access-token <user name or email>
```

## Login code by email

:::caution
This option is not secure. Anyone who can access the user's email account can use the login code. It should only be enabled when this risk is acceptable.
:::

If SMTP is configured, an administrator can enable **Email One-Time Access** in **Application Configuration**. Users can then click **Don't have access to your passkey?**, choose **Email login**, and request a login code with their Pocket ID email address.
