---
id: rdpgw
---

# RDPGW [(bolkedebruin/rdpgw)](https://github.com/bolkedebruin/rdpgw)

RDPGW allows you to connect with the official Microsoft RDP clients to remote desktops over HTTPS.
The following example assumes you want to deploy rdpgw behind caddy reverse proxy with pocket-id.

## Pocket ID Setup

1. In Pocket-ID create a new OIDC Client, name it i.e. `rdpgw`.
2. Set a logo for this OIDC Client if you would like too.
3. Set the callback URL to: `https://rd.example.com/callback`.
4. Copy the `Client ID`, and `Client Secret` for use in the next steps.

## RDPGW Setup

rdpgw.yaml (adjust to your specific requirements):

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
 ProviderUrl: https://pocketid.example.com
 ClientId: your-client-id-from-pocket-id-for-rdpgw
 ClientSecret: your-client-secret-from-pocket-id-for-rdpgw
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
  UsernameTemplate: "{{ username }}"
  SplitUserDomain: false
Security:
  PAATokenSigningKey: 32-characters-long
  PAATokenEncryptionKey: 32-characters-long
  UserTokenEncryptionKey: 32-characters-long
  EnableUserToken: false
  VerifyClientIp: false
```

## Caddy config

First you need to setup your caddy proxy with caddy-security and pocket-id config following the [pocket-id documentation](https://pocket-id.org/docs/guides/proxy-services#caddy).

:::note You should have two different oidc clients, one for caddy-security and one for rdpgw.  For caddy-security the callback looks like `https://example.com/auth/oauth2/generic/authorization-code-callback` and for rdpgw its: `https://rd.example.com/callback` you need both oidc clients.  For the `/auth/oath2/generic/` route this is the route that caddy-security is handling (not rdpgw, rdpgw is handling `rd.example.com/connect?host=` and then `rd.example.com/callback`). :::

```ini
  oauth identity provider generic {
    delay_start 3
    realm generic
    driver generic
    client_id your-client-id-from-pocket-id-for-caddy-security
    client_secret your-client-secret-from-pocket-id-for-caddy-security
    scopes openid email profile
    base_auth_url https://pocketid.example.com
    metadata_url https://pocketid.example.com/.well-known/openid-configuration
  }

  transform user {
    match role user
    ui link "Pocket-ID" https://pocketid.example.com/ target_blank icon "las la-id-card"
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

pocketid.example.com {
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
	route /login/setup {
		respond "Forbidden" 403 {
			close
		}
	}
}
```
