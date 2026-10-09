---
title: SCIM provisioning
seoTitle: Provision users and groups to apps with SCIM
description: Keep the users and groups of an app in sync with Pocket ID through SCIM, so new users exist before they sign in and removed users are gone.
---

OIDC only tells an app who signs in, so an app learns about a user at their first sign-in and never hears when they're deleted.
With [SCIM](https://scim.cloud), Pocket ID pushes its users and groups to the app instead, so the app creates, updates and removes them as you change them in Pocket ID.

The app has to offer a SCIM endpoint, and its documentation names the URL and how to get a token for it.

## Enable SCIM for a client

1. Open the client under **Administration → OIDC Clients** and go to its **SCIM Provisioning** tab.
2. Enter the **SCIM Endpoint** and **SCIM Token** from the app.
3. Click **Enable**.
4. Click **Sync now** to sync right away and check the setup.

## What gets synced

Pocket ID syncs the users who may sign in to the client and their groups.
For a client restricted to [some groups](/docs/configuration/allowed-groups), that's the members of those groups, and for a client open to all users, it's everyone.
When you change the groups, users who lose access are removed from the app at the next sync.

## When it syncs

- Five minutes after the last change to users or groups, so a batch of changes goes out in one sync.
- Every hour, even without changes.
- Whenever you click **Sync now**.

## Troubleshooting

First check whether the data reached the app, by listing its users and groups through its SCIM API:

```bash
curl -H "Authorization: Bearer <SCIM token>" "<SCIM endpoint>/Users"
curl -H "Authorization: Bearer <SCIM token>" "<SCIM endpoint>/Groups"
```

If they're there, the sync works and the problem lies in the app.
If they're missing, look for SCIM errors in Pocket ID's logs.
An error saying the connection is blocked means the endpoint resolves to an address that `OUTBOUND_ALLOWED_HOSTS_SCIM` doesn't allow, which [Outbound requests](/docs/configuration/environment-variables#outbound-requests) explains how to change.
Otherwise, [open an issue](https://github.com/pocket-id/pocket-id/issues/new/choose) if you think Pocket ID is at fault.
