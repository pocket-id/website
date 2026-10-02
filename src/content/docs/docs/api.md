---
title: REST API
seoTitle: Pocket ID REST API and API keys
description: Automate Pocket ID with its REST API, authenticated with an API key.
---

Everything the admin UI does goes through the Pocket ID REST API, so you can automate it with an API key.
[API endpoints](/docs/api/endpoints) lists every route with its parameters and response fields.

## Generate an API key

1. Navigate to `https://id.example.com/settings/admin/api-keys`.
2. Click **Add API Key**.
3. Enter a **Name** for the new API key.
4. Select an **Expires At** date for when this API key should be valid until.
5. Enter a **Description** for the new API key.
6. Click **Generate API Key**.

:::caution
Copy the API key from the dialog, since it won't be shown again.
:::

## Send requests

Send the API key in the `X-API-KEY` header with every request:

```bash
curl -H "X-API-KEY: <api-key>" https://id.example.com/api/users
```

## Custom dashboards

If you want to use Pocket ID's API to build custom dashboards or portals, see [pocket-id/pocket-id-portal](https://github.com/pocket-id/pocket-id-portal) for an example to get you started.
