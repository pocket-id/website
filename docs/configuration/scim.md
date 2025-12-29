---
title: SCIM Provisioning
description: Configure automatic user and group provisioning for client applications
---

Pocket ID supports [SCIM](https://scim.cloud/) (System for Cross-domain Identity Management) to provision and deprovision users and groups automatically. With SCIM enabled, changes you make in Pocket ID are synchronized to connected client applications without manual updates.

OIDC is responsible only for authentication and does not manage user lifecycle events. For example:

- Deleting a user in Pocket ID does not remove them from the client application.
- Creating a user in Pocket ID does not create them in the client application unless they sign in at least once.

SCIM fills this gap by keeping user and group data in sync between Pocket ID and your applications.

## What gets synced

If the client is unrestricted, meaning every user can access it, all users and groups in Pocket ID are synced to the client application. If the clients has configured allowed user groups, only users and groups assigned to that client are synced. If you change the allowed user groups or user assignments, the resources get removed or added during the next sync.

## Enable SCIM on an OIDC Client

To enable SCIM provisioning:

1. Select the client you want to configure SCIM for in the list of the **OIDC Clients** page.
2. Scroll to the **SCIM Provisioning** section.
3. Enter the **SCIM Endpoint URL** and **SCIM Token** provided by your client application.
4. Click **Enable**.
5. (Optional) Click **Sync** to run an immediate synchronization and verify the setup.

## Sync Interval

Pocket ID synchronizes users and groups with the client application at least once per hour.

When you make changes to users or groups, a sync is scheduled to run **five minutes after the most recent change**. If additional changes occur during that period, the timer resets. In practice:

- A sync runs five minutes after the last change, or
- A sync runs automatically once per hour if no changes occur.

You can also trigger a manual synchronization at any time by clicking **Sync** in the SCIM Provisioning section.
