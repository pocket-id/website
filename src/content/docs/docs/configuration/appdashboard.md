---
title: App Dashboard
description: The user application dashboard shows apps that the user has access to
---

Since [v1.7.0](https://github.com/pocket-id/pocket-id/pull/727), Pocket ID has a **My Apps** dashboard view.

Users and administrators can launch applications and revoke previously granted access from this page.

## My Apps

To access apps as an admin:

- Click your Pocket ID **profile icon**
- Click on **My Apps**
- Find the app you want and click **Launch**

To access apps as a user:

- Click **My Apps** on the navigation bar
- Find the app you want and click **Launch**

By default, the dashboard shows only clients that have a launch URL. Select **Show all apps** to include authorized clients without a launch URL.

## App Configuration

To enable an app tile on the dashboard:

- Click on **OIDC Clients**
- Click the pencil to **edit** the client
- Fill in the **Client Launch URL**

## Self-Serve Revoke

If a user wants to revoke their OIDC consent to login to a specific app:

- Click **My Apps** on the navigation bar
- Find the app you want and click **...**
- Click **Revoke**
