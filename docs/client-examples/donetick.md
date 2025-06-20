---
id: donetick
---
# Donetick

## Pocket ID Setup

1. In Pocket-ID create a new OIDC Client, name it. e.g. `donetick`.
2. Set a logo for this OIDC Client if you would like too. The official logo is located [here](https://github.com/donetick/donetick/blob/main/assets/icon.png).
3. Set the callback URL to: `https://<your-app-and-domain-name>/auth/oauth2` e.g. `https://donetick.example.com/auth/oauth2`.
4. Copy the Client ID, Client Secret, Authorization URL, Token URL, etc... for the next steps.

## Donetick Setup

In the configuration file called `selfhosted.yaml` in the documentation, fill the oauth fields with:
```yaml
oauth2:
  client_id: <pocket-client-id>
  client_secret: <pocket-client-secret>
  auth_url: <pocket-authorization-url>
  token_url: <pocket-token-url>
  user_info_url: <pocket-userinfo-url>
  redirect_url: <pocket-callback-url>
  name: PocketID
```
Restart your donetick docker and your good to go! 
