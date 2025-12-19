---
title: Photoprism
description: Configure Photoprism with Pocket ID authentication. 
---

## Create an OIDC Client in Pocket ID

1. Create a new OIDC Client in Pocket ID (e.g., `Photoprism`).
2. Set the client launch URL:

   ```sh
   https://<PHOTOPRISM-DOMAIN>
   ```

3. Set the callback URL:

   ```sh
   https://<PHOTOPRISM-DOMAIN>/api/v1/oidc/redirect
   ```

4. Copy the **Client ID**, **Client Secret**, and **OIDC Discovery URL**.

5. _(Optional)_ Find and upload a logo from [Self-Hosted Dashboard Icons](https://selfh.st/icons)

## Configure Photoprism

Check out Photoprism's [OIDC Docs] for more details. If you happen to have Photoprism Pro, feel free to check out the additional options available [Pro OIDC Docs]

Configure the following environment file/variables:

```yml
# Required
PHOTOPRISM_OIDC_URI: https://<PocketID_URL>
PHOTOPRISM_OIDC_CLIENT: xxxxx-xxxxx-xxxxx
PHOTOPRISM_OIDC_SECRET: xxxxx-xxxxx-xxxxx
# Enable Auto User Registration
PHOTOPRISM_OIDC_REGISTER: true/false
```

Optional Configurations:

```yml
# Custom Identity Provider Name
PHOTOPRISM_OIDC_PROVIDER: PocketID
PHOTOPRISM_OIDC_REDIRECT: true/false
PHOTOPRISM_OIDC_ICON: <path>
```

## Note

Unless security settings are changed the icon must
be an accessible path from the Photoprism container
or served via the same domain as Photoprism.
See this [Github Issue] for more details.

[OIDC Docs]: https://docs.photoprism.app/developer-guide/api/oidc/
[Pro OIDC Docs]: https://www.photoprism.app/pro/kb/config-options
[GitHub Issue]: https://github.com/photoprism/photoprism/discussions/2622
