---
title: Dozzle
description: Integrate Dozzle authentication with Pocket ID
---

## Requirements

- [Dozzle](https://github.com/amir20/dozzle) setup with [Forward Proxy authentication](https://dozzle.dev/guide/authentication)
- HTTPS connection to your Pocket ID server

### Setting up Dozzle with Pocket ID

You must first setup a container to pass OpenID Connect authentication through your reverse proxy.

Below is an example using oauth2-proxy.

1. Create a new OIDC client in Pocket ID for Dozzle: 
    
    - **Name:** `Dozzle`
    - **Callback URLs:** `https://dozzle.example.com/oauth2/callback`
    - **PKCE:** `Enabled`

    Copy the **Client ID** and **Client Secret** values for use later.
    
    You can leave the **Callback URL** blank to autofill on first login.


2. Add the following to your existing Dozzle compose:
   
    ```yml
    environment:
      DOZZLE_AUTH_PROVIDER: forward-proxy
      DOZZLE_AUTH_HEADER_USER: X-Forwarded-User
      DOZZLE_AUTH_HEADER_EMAIL: X-Forwarded-Email
      DOZZLE_AUTH_HEADER_NAME: X-Forwarded-Preferred-Username
    ```

   Comment out the Dozzle ports, as we will redirect these through the new authentication container.

   This method should not require any changes to your reverse proxy configuration.

    ```yml
    # ports:
    #   - 8080:8080
    ```


3. Add a new oauth2-proxy container service to your existing Dozzle compose: 
   
   ```yml
   services:
   # ...
    oauth2-proxy:
      image: quay.io/oauth2-proxy/oauth2-proxy:latest
      restart: unless-stopped
      container_name: dozzle-oidc
      command: --config /oauth2-proxy.cfg
      volumes:
        - "./oauth2-proxy.cfg:/oauth2-proxy.cfg"
      ports:
        - 8080:4180
   ```

4. Create the oauth2-proxy config file.
   
   In the directory beside your compose file, create `oauth2-proxy.cfg` :

   ```toml
    client_id = "xxx"                            # from Pocket ID
    client_secret = "xxx"                        # from Pocket ID
    cookie_secret = "xxx"                        # generate with openssl rand -base64 32 | tr -- '+/' '-_'
    upstreams = "http://dozzle:8080"             # upstream to Dozzle containers internal port
    code_challenge_method = "S256"               # PKCE challenges plain or S256
    cookie_expire = "0"                          # seconds, 0 for session
    cookie_name = "__Host-oauth2-proxy"          # or __Secure-oauth2-proxy (less secure)
    cookie_secure = true                         # uses the secure HTTPS cookie
    email_domains = ["*"]                        # allows any email domain to authenticate
    http_address = "0.0.0.0:4180"                # port oauth2-proxy listens on
    oidc_issuer_url = "https://id.example.com"   # your Pocket base URL
    provider_display_name = "Pocket ID"          # display name for OIDC login
    provider = "oidc"                            # use OpenID connect
    reverse_proxy = true                         # reverse proxy the traffic
    scope = "openid email profile groups"        # passthru these OIDC scopes
   ```

   Fill in the variables per the comments.
   
   
5. Finally - restart your Docker compose stack. 
   
   Your reverse proxy should now authenticate you to Dozzle via oauth2-proxy.

   Check logs for troubleshooting.
