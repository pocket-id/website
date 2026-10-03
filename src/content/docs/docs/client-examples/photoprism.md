---
title: PhotoPrism
description: Sign in to the PhotoPrism photo library with Pocket ID.
client:
  callbackUrls:
    - https://photoprism.example.com/api/v1/oidc/redirect
  launchUrl: https://photoprism.example.com
  values:
    - clientId
    - clientSecret
---

::create-client

## Configure PhotoPrism

Check out PhotoPrism's [OIDC Docs] for more details.
If you have PhotoPrism Pro, see the additional options in the [Pro OIDC Docs].

Configure the following environment variables:

```yaml
# Required
PHOTOPRISM_OIDC_URI: https://id.example.com
PHOTOPRISM_OIDC_CLIENT: <client-id>
PHOTOPRISM_OIDC_SECRET: <client-secret>
# Enable Auto User Registration
PHOTOPRISM_OIDC_REGISTER: true/false
```

Optional configuration:

```yaml
# Custom Identity Provider Name
PHOTOPRISM_OIDC_PROVIDER: Pocket ID
PHOTOPRISM_OIDC_REDIRECT: true/false
PHOTOPRISM_OIDC_ICON: <path>
```

:::note
Unless security settings are changed, the icon must be an accessible path from the PhotoPrism container or served via the same domain as PhotoPrism.
See this [GitHub issue] for more details.
:::

[OIDC Docs]: https://docs.photoprism.app/developer-guide/api/oidc/
[Pro OIDC Docs]: https://www.photoprism.app/pro/kb/config-options
[GitHub issue]: https://github.com/photoprism/photoprism/discussions/2622
