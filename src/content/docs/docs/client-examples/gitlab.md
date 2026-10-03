---
title: GitLab
description: Sign in to GitLab with Pocket ID.
client:
  callbackUrls:
    - https://gitlab.example.com/users/auth/openid_connect/callback
  values:
    - clientId
    - clientSecret
---

Setting up GitLab requires access to the GitLab configuration file (most likely `/etc/gitlab/gitlab.rb`) as well as shell access for reconfiguring.

::create-client

## Configure GitLab

See the GitLab documentation for [OmniAuth](https://docs.gitlab.com/integration/omniauth/) for more information on OmniAuth.
More detailed information on the available OIDC features, such as group assignment, is [here](https://docs.gitlab.com/administration/auth/oidc/).

1. Open the config file in an editor of your choice.
2. Find the `OmniAuth` section of the config file (around line 579).
   You can do the next steps by either uncommenting the options or adding new ones.
3. Enable OmniAuth: `gitlab_rails['omniauth_enabled'] = true`
4. Allow single sign-on: `gitlab_rails['omniauth_allow_single_sign_on] = ['openid_connect']`
5. Create a new provider:
   ```ruby
   gitlab_rails['omniauth_providers'] = [
     {
       name: "openid_connect",
       label: "Pocket ID",
       icon: "https://id.example.com/api/application-images/logo",
       args: {
         name: "openid_connect",
         scope: ["openid","profile","email"],
         response_type: "code",
         issuer: "https://id.example.com",
         discovery: true,
         client_auth_method: "query",
         uid_field: "preferred_username",
         send_scope_to_token_endpoint: "false",
         pkce: true,
         client_options: {
           identifier: "<client-id>",
           secret: "<client-secret>",
           redirect_uri: "https://gitlab.example.com/users/auth/openid_connect/callback"
         }
       }
     }
   ]
   ```
6. After completing these edits to the configuration file, reconfigure GitLab:
   ```bash
   gitlab-ctl reconfigure
   ```

## Existing accounts

After enabling OIDC, existing users need to sign in with their username and password and then link their Pocket ID account.
They can do this on the **Profile → Account** page (`https://gitlab.example.com/-/profile/account`).
Under **Service sign-in**, there is a **Connect Pocket ID** button to sign in with Pocket ID.
After that, they can sign in with Pocket ID on the sign-in page.

## New accounts

Depending on your GitLab instance's policies, your administrator may need to provision or enable each new account as it is created.
