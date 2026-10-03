---
title: MeshCentral
description: Sign in to the MeshCentral device manager with Pocket ID.
---

Replace `meshcentral.example.com` with the domain of your MeshCentral instance and `id.example.com` with the domain of your Pocket ID instance.

## Create the client in Pocket ID

1. In Pocket ID, open **Administration → OIDC Clients** and click **Add OIDC Client**.
2. Enter a name such as `MeshCentral`.
3. Click **Create** and copy the **Client ID** and the **Client secret**.
   The client secret is only shown once.
4. On the client's **Access** tab, select the groups that may sign in under **Allowed User Groups**, or choose **All Users**.

## Configure MeshCentral

Update the `authStrategies` object in your `config.json` to match the following, with the **Client ID** and the **Client secret** from Pocket ID:

```json
  "domains": {
    "": {
      "authStrategies": {
        "oidc": {
          "client": {
            "client_id": "<client-id>",
            "client_secret": "<client-secret>",
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
