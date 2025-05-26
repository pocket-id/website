---
id: sonarqube
---
# SonarQube

## Requirements

- [SonarQube Community]
- [sonar-auth-oidc] plugin v3.0.0 (or later)
- HTTPS connection to your SonarQube instance

## Create OIDC Client in Pocket ID

1. Create a new OIDC Client in Pocket ID (e.g., `sonarqube`).
2. Set the **Callback URL** to the value below:

    ```env
    https://<your-sonarqube-instance>/oauth2/callback/oidc
    ```

3. *Optional:* Download a PNG or SVG **logo** from the [SonarQube Community] and upload.
4. Copy the **Client ID**, **Client Secret**, and **OIDC Discovery URL** for use in the next section.

## Install and configure the plugin

1. Download [sonar-auth-oidc] v3.0.0 (or later) and copy it into the SonarQube *plugins* directory,
   usually `/opt/sonarqube/extensions/plugins`
2. Restart SonarQube instance.
3. Go to *Administration* -> *Configuration* -> *Security* and set the following parameters

   >- **Enabled:** `true` (*checked*)
   >- **Issuer URI:** your `OIDC Discovery URL` **without** /.well-known/openid-configuration
   >- **Client ID:** your `Client ID`
   >- **Client secret:** your `Client Secret`
   >- **Scopes:** `openid email profile groups`
   >- **Allow users to sign-up:** `true` (*checked*)  (optional but recommended)
   >- **Login generation strategy:** `Email`

## Controlling admins access with groups

To control **admin** access to SonarQube using Pocket ID groups:

1. Create your Pocket ID group.
2. Add a `Custom Claim` inside group to match SonarQube admin group.

   **Note:** Value must be a JSON array.

   >- **Key:** `sonargroups`
   >- **Value:** `["sonar-administrators"]`

3. Go to SonarQube -> *Administration* -> *Configuration* -> *Security* and set

   >- **Synchronize groups:** `true` (*checked*)
   >- **Groups claim name:** `sonargroups`

This will cause SonarQube to automatically add the members of the Pocket ID group to the SonarQube `sonar-administrators` administration group.

## Additional information

More information about [sonar-auth-oidc] can be found [here](https://github.com/sonar-auth-oidc/sonar-auth-oidc?tab=readme-ov-file#configuration).

Hint: Thanks to Pocket ID `Custom Claims` it is possible to completely manage SonarQube groups via Pocket ID.

[SonarQube Community]: <https://www.sonarsource.com/open-source-editions/sonarqube-community-edition/>
[sonar-auth-oidc]: <https://github.com/sonar-auth-oidc/sonar-auth-oidc/releases/tag/v3.0.0>
