---
id: healthchecks
---
# Healthchecks

## Requirements

- [Healthchecks.io](https://healthchecks.io/docs/self_hosted_docker/) container self hosted on Docker
- [oauth2-proxy](https://github.com/oauth2-proxy/oauth2-proxy) reverse proxy container for authentication
- Reverse proxy with SSL termination at the edge (HTTPS)

## Pocket ID Setup
1. Create a new OIDC client (example: `healthchecks`)
2. Enable the **PKCE** checkmark for maximum security
3. Copy the **Client ID** and **Client Secret** for use below
4. The **Callback URL** will be automatically populated at first login (Pocket v.1.2.0+)

## Configure oauth2-proxy

In the same `docker-compose.yml` you use for Healthchecks:

1. Add a new **oauth2-proxy** container under the `services:` section with the following config:
    ```yml
    oauth2-proxy: 
        image: quay.io/oauth2-proxy/oauth2-proxy
        restart: unless-stopped
        command: --config /oauth2-proxy.cfg
        volumes:
        - ./oauth2-proxy.cfg:/oauth2-proxy.cfg
        ports:
        - 1234:4180
    ```

2. Add the following to the Healthchecks `environment:` section:

    ```
    - REMOTE_USER_HEADER=HTTP_X_FORWARDED_EMAIL
    ```

3. Comment out the `ports:` section on Healthchecks, so that oauth2-proxy picks up the authentication request instead of Healthchecks directly.

4. Create a file beside `docker-compose.yml` called `oauth2-proxy.cfg` with the following config. Make sure to update with your own **Client ID**, **Client Secret**, and **Pocket ID URL**:

    ```
    provider_display_name="Pocket ID"
    provider="oidc"
    oidc_issuer_url="<<Pocket ID URL>>"
    client_id="<<Client ID>>"
    client_secret="<<Client Secret>>"
    cookie_secret="xxx" # generate with: openssl rand -base64 32 | tr -- '+/' '-_'
    upstreams="http://healthchecks:8000" # internal port
    code_challenge_method="S256" # PKCE challenges plain or S256
    skip_auth_routes = [".*/ping", ".*/api", ".*/badge"]
    reverse_proxy = true
    scope = "openid email profile groups"

    cookie_expire="0" # seconds, 0 for session
    cookie_name="__Host-oauth2-proxy" # or __Secure-oauth2-proxy (less secure)
    cookie_secure="true"
    email_domains = ["*"]
    http_address="0.0.0.0:4180"
    insecure_oidc_allow_unverified_email = "true"
    ```

5. Update your public facing edge reverse proxy config (Caddy, Nginx, etc.) to forward `https://hc.domain.com` to **port `1234`** (the external port for the oauth2-proxy)

6. Restart the entire stack with 
    ```sh
    docker compose down 
    docker compose pull 
    docker compose up -d 
    ```

You can now login to Healthchecks with Pocket ID.

## Example full stack 

```yml
---
services:
  healthchecks:
    image: healthchecks/healthchecks:latest
    environment:
      - ALLOWED_HOSTS=hc.example.com
      - DB=sqlite
      - DB_NAME=/data/hc.sqlite
      - SECRET_KEY=${SECRET_KEY}
      - SITE_ROOT=https://hc.example.com
      - PING_EMAIL_DOMAIN=hc.example.com
      - REGISTRATION_OPEN=False
      - SITE_NAME=Healthchecks
      - RP_ID=hc.example.com
      - REMOTE_USER_HEADER=HTTP_X_FORWARDED_EMAIL
    volumes:
      - ./data:/data
    restart: unless-stopped
    # ports:
    #   - 8000:8000
  oauth2-proxy:
    image: quay.io/oauth2-proxy/oauth2-proxy
    restart: unless-stopped
    command: --config /oauth2-proxy.cfg
    volumes:
      - ./oauth2-proxy.cfg:/oauth2-proxy.cfg
    ports:
      - 1234:4180
```