---
title: REST API
seoTitle: Pocket ID REST API and API keys
description: Automate Pocket ID with its REST API, authenticated with an API key, and handle its errors.
---

Everything the admin UI does goes through the Pocket ID REST API, so you can script it, such as to create users or OIDC clients from your provisioning tools.
[API endpoints](/docs/api/endpoints) lists every route with its parameters and response fields.

## Create an API key

1. Open **Administration → API Keys** and click **Add API Key**.
2. Enter a **Name**, an optional **Description**, and the date the key **Expires At**.
3. Click **Create API Key** and copy the key, which is only shown once.

A key acts with the rights of the admin who created it.
For declarative setups, such as a Kubernetes operator, `STATIC_API_KEY` sets a fixed key through an [environment variable](/docs/configuration/environment-variables#security) instead.

## Send requests

Send the key in the `X-API-KEY` header:

```bash
curl -H "X-API-KEY: <api key>" https://id.example.com/api/users
```

List endpoints take `pagination[page]` and `pagination[limit]` query parameters and answer with the items under `data` and the totals under `pagination`.

## Errors

Failed requests answer with an HTTP error status and a JSON body:

```json
{
  "error": "User not found",
  "code": "user_not_found",
  "request_id": "d3fe340d-fa44-43c4-828d-893bb616ed29"
}
```

`code` is stable, so check it rather than the message, and `request_id` finds the request in Pocket ID's logs.
Validation errors, with the code `validation_failed`, list each failing field under `details.fields`.

## Custom dashboards

[pocket-id-portal](https://github.com/pocket-id/pocket-id-portal) is an example of a custom portal built on the API.
