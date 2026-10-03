---
title: SonarQube
description: Sign in to the SonarQube code analysis platform with Pocket ID.
client:
  callbackUrls:
    - https://sonarqube.example.com/oauth2/callback/oidc
---

## Requirements

- [SonarQube Community]
- [sonar-auth-oidc] plugin v3.0.0 or later
- HTTPS connection to your SonarQube instance

::create-client

## Configure SonarQube

1. Download [sonar-auth-oidc] v3.0.0 or later and copy it into the SonarQube `plugins` directory, usually `/opt/sonarqube/extensions/plugins`.
2. Restart SonarQube.
3. In SonarQube, open **Administration → Configuration → Security** and set the following parameters:
   - **Enabled**: checked
   - **Issuer URI**: `https://id.example.com` (the **OIDC Discovery URL** from Pocket ID without `/.well-known/openid-configuration`)
   - **Client ID**: the **Client ID** from Pocket ID
   - **Client secret**: the **Client secret** from Pocket ID
   - **Scopes**: `openid email profile groups`
   - **Allow users to sign-up**: checked (optional but recommended)
   - **Login generation strategy**: `Email`

## Control admin access with groups

To control **admin** access to SonarQube with Pocket ID groups:

1. In Pocket ID, open **Administration → User Groups** and click **Add Group** to create the group.
2. On the group's page, add a custom claim under **Custom Claims** that matches the SonarQube admin group.
   The value must be a JSON array.
   - **Key**: `sonargroups`
   - **Value**: `["sonar-administrators"]`
3. In SonarQube, open **Administration → Configuration → Security** and set:
   - **Synchronize groups**: checked
   - **Groups claim name**: `sonargroups`

SonarQube then automatically adds the members of the Pocket ID group to the SonarQube `sonar-administrators` group.

## Additional information

More information about [sonar-auth-oidc] can be found in its [configuration documentation](https://github.com/sonar-auth-oidc/sonar-auth-oidc?tab=readme-ov-file#configuration).

With Pocket ID **Custom Claims**, you can manage SonarQube groups entirely from Pocket ID.

[SonarQube Community]: https://www.sonarsource.com/open-source-editions/sonarqube-community-edition/
[sonar-auth-oidc]: https://github.com/sonar-auth-oidc/sonar-auth-oidc/releases/tag/v3.0.0
