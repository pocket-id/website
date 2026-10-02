---
title: MeshCentral
description: Configure MeshCentral device manager with PocketID.
---
The following example variables are used, and should be replaced with your actual URLs.

    meshcentral.example.com (The URL of your MeshCentral instance.)
    id.example.com (The URL of your Pocket ID instance.)

## Pocket ID Setup

1. In Pocket ID create a new OIDC Client, name it i.e. `MeshCentral`
2. Copy the Client ID and Client Secret for use in the next steps.

## MeshCentral Setup

Update the `authStrategies` object in your `config.json` to match the following:

```json
  "domains": {
    "": {
      "authStrategies": {
        "oidc": {
          "client": {
            "client_id": "<POCKET_ID_CLIENT_ID>",
            "client_secret": "<POCKET_ID_SECRET>",
            "redirect_uri": "https://meshcentral.example.com/auth-oidc-callback"
          },
          "issuer": {
            "issuer": "https://id.example.com"
          }
        }
      }
    }
  }
```