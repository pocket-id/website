---
title: SonarQube
description: Set up SonarQube code analysis with Pocket ID
---

## Requirements

- [SonarQube Community]
- [sonar-auth-oidc] plugin v3.0.0 (or later)
- HTTPS connection to your SonarQube instance

## Create OIDC Client in Pocket ID

1. Create a new OIDC Client in Pocket ID (e.g., `sonarqube`).
2. Set the **Callback URL** to the value below, or leave blank to autofill on first login.

   ```env
   https://<your-sonarqube-instance>/oauth2/callback/oidc
   ```

3. _Optional:_ Download a PNG or SVG **logo** from the [SonarQube Community] and upload.
4. Copy the **Client ID**, **Client Secret**, and **OIDC Discovery URL** for use in the next section.

## Install and configure the plugin

1. Download [sonar-auth-oidc] v3.0.0 (or later) and copy it into the SonarQube _plugins_ directory,
   usually `/opt/sonarqube/extensions/plugins`
2. Restart SonarQube instance.
3. Go to _Administration_ -> _Configuration_ -> _Security_ and set the following parameters

   > - **Enabled:** `true` (_checked_)
   > - **Issuer URI:** your `OIDC Discovery URL` **without** /.well-known/openid-configuration
   > - **Client ID:** your `Client ID`
   > - **Client secret:** your `Client Secret`
   > - **Scopes:** `openid email profile groups`
   > - **Allow users to sign-up:** `true` (_checked_) (optional but recommended)
   > - **Login generation strategy:** `Email`

## Controlling admins access with groups

To control **admin** access to SonarQube using Pocket ID groups:

1. Create your Pocket ID group.
2. Add a `Custom Claim` inside group to match SonarQube admin group.

   **Note:** Value must be a JSON array.

   > - **Key:** `sonargroups`
   > - **Value:** `["sonar-administrators"]`

3. Go to SonarQube -> _Administration_ -> _Configuration_ -> _Security_ and set

   > - **Synchronize groups:** `true` (_checked_)
   > - **Groups claim name:** `sonargroups`

This will cause SonarQube to automatically add the members of the Pocket ID group to the SonarQube `sonar-administrators` administration group.

## Additional information

More information about [sonar-auth-oidc] can be found [here](https://github.com/sonar-auth-oidc/sonar-auth-oidc?tab=readme-ov-file#configuration).

Hint: Thanks to Pocket ID `Custom Claims` it is possible to completely manage SonarQube groups via Pocket ID.

[SonarQube Community]: https://www.sonarsource.com/open-source-editions/sonarqube-community-edition/
[sonar-auth-oidc]: https://github.com/sonar-auth-oidc/sonar-auth-oidc/releases/tag/v3.0.0
