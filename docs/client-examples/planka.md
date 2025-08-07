---
id: planka
---

## Requirements

- [Planka](https://docs.planka.cloud/)
- HTTPS connection to your Planka instance

## Create OIDC Client in Pocket ID

1. Create a new OIDC Client in Pocket ID (e.g., `planka`).
2. Set the **Callback URL** to the value below:

   ```env
   https://<your-planka-instance>/oidc-callback
   ```

3. _Optional:_ Download a PNG or SVG **logo** from the [Planka project](https://github.com/plankanban/planka) and upload.
4. Copy the **Client ID**, **Client Secret**, and **OIDC Discovery URL** for use in the next section.

5. Set the following environment variables in your Planka instance:

   ```env
   OIDC_ISSUER=https://<OIDC Discovery URL> # remove "/.well-known/openid-configuration"
   OIDC_CLIENT_ID=<Client ID>
   OIDC_CLIENT_SECRET=<Client Secret>
   ```

6. Restart Planka and enjoy!

## Controlling admins access with groups

To control **admin** access to Planka using Pocket ID groups:

1. Set the following additional environment variables in your Planka instance:

   ```env
   OIDC_SCOPES=openid profile email groups
   OIDC_ROLES_ATTRIBUTE=groups
   OIDC_ADMIN_ROLES=<your Planka admin group name on Pocket ID>
   ```

2. Restart Planka and enjoy!

## Additional information

More information about Planka OIDC can be found [here](https://docs.planka.cloud/docs/configuration/oidc)
