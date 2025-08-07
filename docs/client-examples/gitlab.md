---
id: gitlab
---

Setting this app up requires access to the GitLab configuration file (most likely `/etc/gitlab/gitlab.rb`) as well shell access for reconfiguring. Below are URLs used as placeholders for the GitLab and Pocket ID instances:

| Placeholder        | Replace with                   |
| ------------------ | ------------------------------ |
| gitlab.example.com | URL of your GitLab instance    |
| oidc.example.com   | URL of your Pocket ID instance |

## Pocket ID Setup

1. In Pocket ID, create a new OIDC client, named whatever you want.
1. (Optional) Set a logo for the OIDC client
1. Set the callback URL to `https://gitlab.example.com/users/auth/openid_connect/callback`
1. Copy the `Client ID` and `Client Secret` for the GitLab Setup

## GitLab Setup

You can reference the GitLab documentation for [OmniAuth](https://docs.gitlab.com/integration/omniauth/) for more information on OmniAuth. There is more detailed information of available features, such as group assignment, of OIDC [here](https://docs.gitlab.com/administration/auth/oidc/).

1. Open the config file in an editor of your choice
1. Either find the `OmniAuth` section of the config file (around line 579). These next few steps can be done by either uncommenting the options or adding new ones
1. Enable OmniAuth: `gitlab_rails['omniauth_enabled'] = true`
1. Allow single sign on: `gitlab_rails['omniauth_allow_single_sign_on] = ['openid_connect']`
1. Create a new provider:

```ruby
gitlab_rails['omniauth_providers'] = [
  {
    name: "openid_connect",
    label: "Pocket ID",
    icon: "https://oidc.example.com/api/application-configuration/logo",
    args: {
      name: "openid_connect",
      scope: ["openid","profile","email"],
      response_type: "code",
      issuer: "https://oidc.example.com",
      discovery: true,
      client_auth_method: "query",
      uid_field: "preferred_username",
      send_scope_to_token_endpoint: "false",
      pkce: true,
      client_options: {
        identifier: "<Client ID>",
        secret: "<Client Secret>",
        redirect_uri: "https://gitlab.example.com/users/auth/openid_connect/callback"
      }
    }
  }
]
```

After completing these edits to the configuration file, you will need to reconfigure GitLab:

```bash
gitlab-ctl reconfigure
```

## Existing Accounts

After enabling OIDC, existing accounts will need to sign in with a username and password then link their OIDC. This is done from the `Profile`>`Account` page (`https://gitlab.example.com/-/profile/account`). Here, under the `Service sign-in` section should be a button to `Connect Pocket ID`, where you can login using Pocket ID. After you do this, you will be able to just use Pocket ID to sign in on the sign in page.

## New Accounts

Depending on your GitLab instance's policies, your administrator may need to provision or enable each new account as they are created.
