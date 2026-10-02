---
title: Client ID Metadata Documents
description: Let public OAuth clients provide their configuration from an HTTPS URL
---

Client ID Metadata Documents (CIMD) let an OAuth client use an HTTPS URL as its client ID. Pocket ID fetches the JSON document at that URL and creates the client configuration when it is first used, so an administrator does not need to register every client manually.

This feature follows the [OAuth Client ID Metadata Document Internet-Draft](https://datatracker.ietf.org/doc/draft-ietf-oauth-client-id-metadata-document/). The specification is still a draft and may change.

## Enable metadata-document clients

Metadata-document clients are disabled by default.

1. Open **Settings > Application Configuration > OIDC**.
2. Add the exact metadata document URLs that Pocket ID should accept.
3. Save the configuration.

[Wildcard URL patterns](/docs/advanced/callback-url-wildcards) are supported, but exact URLs are safer. An empty allowlist blocks all metadata-document clients.

When the allowlist is not empty, Pocket ID advertises `client_id_metadata_document_supported: true` in its OpenID Connect discovery document.

## Create the metadata document

Usually you don't have to create a metadata document yourself. The client developer should host it at a public HTTPS URL. If you are building your own client, you can create a document like this:

Host a JSON document at the HTTPS URL that the client will use as its `client_id`:

```json
{
  "client_id": "https://app.example.com/oauth/client-metadata.json",
  "client_name": "Example App",
  "redirect_uris": ["https://app.example.com/oauth/callback"],
  "post_logout_redirect_uris": ["https://app.example.com/"],
  "token_endpoint_auth_method": "none",
  "grant_types": ["authorization_code", "refresh_token"],
  "response_types": ["code"]
}
```

Serve it with a `200 OK` response and a JSON content type such as `application/json`. The `client_id` in the document must exactly match the URL used to fetch it.

Pocket ID supports these metadata-document clients:

- The client ID must be a public HTTPS URL with a path. User information, query strings, fragments, private IP addresses, and local network destinations are not accepted.
- Only public clients are supported, so `token_endpoint_auth_method` must be `none`. PKCE is enabled automatically.
- Supported grant types are `authorization_code`, `urn:ietf:params:oauth:grant-type:device_code`, and `refresh_token`. At least `authorization_code` or the device code grant is required. If `grant_types` is omitted, only `authorization_code` is enabled.
- The only supported response type is `code`.
- Redirect and post-logout redirect URIs must be absolute URLs. Wildcards are not accepted in document-provided redirect URIs.

The client sends the document URL as the `client_id` in its OAuth requests. Pocket ID downloads and caches the document, then shows the resulting client under **Settings > OIDC Clients** with the type **Metadata Document**.

## Refresh and manage a client

Pocket ID follows the document's HTTP caching headers. Without an explicit cache lifetime, it refreshes the document after one hour; the maximum cache lifetime is 24 hours. Responses with `Cache-Control: no-store` cannot be used because Pocket ID must persist the resolved client.

Use **Refresh** in the OIDC client list to fetch a document immediately. Fields supplied by the document are read-only in Pocket ID, while local policies such as allowed user groups, API access, and token lifetimes remain configurable.

## Grant API access

An administrator can grant an API to every current and future metadata-document client:

1. Open **Settings > APIs** and select the API.
2. Under **API access**, select **Metadata document clients**.
3. Enable access and select the permissions that these clients may request.
4. Save the API.

This grants user-delegated access only. Metadata-document clients are public clients and cannot use client access (M2M). See [APIs and Permissions](/docs/guides/apis) for the complete API setup and token request flow.
