---
title: RDP Gateway
description: Sign in to RDP Gateway with Pocket ID to connect to remote desktops.
client:
  callbackUrls:
    - https://rd.example.com/callback
  values:
    - clientId
    - clientSecret
---

[RDPGW](https://github.com/bolkedebruin/rdpgw) allows you to connect with the official Microsoft RDP clients to remote desktops over HTTPS.
The following example deploys RDPGW behind a Caddy reverse proxy with Pocket ID.

::create-client

## Configure RDPGW

`rdpgw.yaml` (adjust to your specific requirements):

```yaml
Server:
  Authentication:
    - openid
  Tls: disable
  GatewayAddress: https://rd.example.com
  Port: 80
  # list of acceptable desktop hosts to connect to
  Hosts:
    - unraid-vm.local:3389
    - 192.168.100.14:3389
  HostSelection: unsigned
  SessionKey: 32-characters-long
  SessionEncryptionKey: 32-characters-long
  SessionStore: cookie
# Open ID Connect specific settings
OpenId:
  ProviderUrl: https://id.example.com
  ClientId: <client-id>
  ClientSecret: <client-secret>
Caps:
  SmartCardAuth: false
  # required for openid connect
  TokenAuth: true
  IdleTimeout: 0
  EnablePrinter: true
  EnablePort: true
  EnablePnp: true
  EnableDrive: true
  EnableClipboard: true
Client:
  UsernameTemplate: '{{ username }}'
  SplitUserDomain: false
Security:
  PAATokenSigningKey: 32-characters-long
  PAATokenEncryptionKey: 32-characters-long
  UserTokenEncryptionKey: 32-characters-long
  EnableUserToken: false
  VerifyClientIp: false
```

## Configure Caddy

Then set up your Caddy proxy with caddy-security and Pocket ID by following the [Pocket ID documentation](/docs/guides/proxy-services#caddy).

:::note
You need two different OIDC clients in Pocket ID: one for caddy-security and one for RDPGW.
For caddy-security, the callback URL looks like `https://example.com/auth/oauth2/generic/authorization-code-callback`, and for RDPGW it's `https://rd.example.com/callback`.
The `/auth/oauth2/generic/` route is handled by caddy-security, not RDPGW.
RDPGW handles `rd.example.com/connect?host=` and then `rd.example.com/callback`.
:::

```ini
  oauth identity provider generic {
    delay_start 3
    realm generic
    driver generic
    client_id your-client-id-from-pocket-id-for-caddy-security
    client_secret your-client-secret-from-pocket-id-for-caddy-security
    scopes openid email profile
    base_auth_url https://id.example.com
    metadata_url https://id.example.com/.well-known/openid-configuration
  }

  transform user {
    match role user
    ui link "Pocket-ID" https://id.example.com/ target_blank icon "las la-id-card"
    ui link "RDPGW Unraid-vm" https://rd.example.com/connect?host=unraid-vm.local%3A3389 target_blank icon "las la-desktop"
    ui link "RDPGW My-PC" https://rd.example.com/connect?host=192.168.100.14%3A3389 target_blank icon "las la-desktop"
  }

  example.com {

	handle / {
		redir / /auth
	}
	handle /login* {
		redir * /auth/login
	}
	handle /auth* {
		authenticate with myportal
	}
	respond * "Forbidden" 403 {
		close
	}
}

  rd.example.com {
	route {
		@ws {
				header Connection *Upgrade*
				header Upgrade websocket
		}
		reverse_proxy http://rdpgw {
			# Allow non-standard HTTP methods used by RDPGW
			header_up X-HTTP-Method-Override {http.method}
			header_up X-Real-IP {remote_host}
			header_up X-Forwarded-For {remote_host}
			header_up X-Forwarded-Proto {scheme}
			header_up X-Forwarded-Host {host}
			transport http {
					versions 1.1
			}
		}
	}
}

id.example.com {
	route {
		reverse_proxy http://pocket-id {
			header_up X-Real-IP {remote_host}
			header_up X-Forwarded-For {remote_host}
			header_up X-Forwarded-Proto {scheme}
			header_up X-Forwarded-Host {host}
		}
	}
	route /caddy-security/* {
		authenticate with myportal
	}
}
```
