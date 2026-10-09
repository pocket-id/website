---
title: Environment variables
seoTitle: Pocket ID environment variables reference
description: Every environment variable Pocket ID reads, with its default, grouped by topic, plus the variables that replace the settings of the admin UI.
---

Pocket ID reads its configuration from environment variables, and from a `.env` file in the directory it runs in.
Only `ENCRYPTION_KEY` is required, and `APP_URL` has to be set for anything beyond trying Pocket ID on `localhost`.

Variables that hold secrets also accept a `_FILE` variant with the path of a file that contains the value, which works with Docker secrets: `ENCRYPTION_KEY_FILE`, `DB_CONNECTION_STRING_FILE`, `STATIC_API_KEY_FILE`, `S3_SECRET_ACCESS_KEY_FILE` and `MAXMIND_LICENSE_KEY_FILE`.
The file wins over the plain variable.

## Essentials

| Variable              | Default                 | Description                                                                                                                                                                                |
| --------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `APP_URL`             | `http://localhost:1411` | The address you open Pocket ID at, such as `https://id.example.com`, without a path. Passkeys are bound to its domain.                                                                     |
| `ENCRYPTION_KEY`      |                         | Encrypts sensitive data such as the token signing keys, at least 16 bytes. See [Encryption keys](#encryption-keys).                                                                        |
| `TRUST_PROXY`         | `false`                 | The reverse proxies to take the client IP from. See [Reverse proxy settings](#reverse-proxy-settings).                                                                                     |
| `MAXMIND_LICENSE_KEY` |                         | A free [MaxMind](https://www.maxmind.com/en/geolite2/signup) key, which lets Pocket ID download the GeoLite2 database to show locations in the audit log.                                  |
| `PUID`, `PGID`        | `1000`                  | The user and group the Docker container runs Pocket ID as, and which owns `/app/data`. They have no effect on the `-distroless` images or when the container already runs as another user. |

## Network

| Variable                        | Default   | Description                                                                                                                                                       |
| ------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PORT`                          | `1411`    | The port Pocket ID listens on.                                                                                                                                    |
| `HOST`                          | `0.0.0.0` | The address Pocket ID listens on.                                                                                                                                 |
| `UNIX_SOCKET`                   |           | Listen on this Unix socket path instead of `HOST` and `PORT`.                                                                                                     |
| `UNIX_SOCKET_MODE`              |           | The socket's permissions in octal, such as `0660`.                                                                                                                |
| `SYSTEMD_SOCKET`                | `false`   | Use the socket systemd passes in with socket activation, on Linux. Can't be combined with `UNIX_SOCKET`.                                                          |
| `TRUSTED_PLATFORM`              |           | The header your platform puts the client IP in, such as `CF-Connecting-IP`. See [Reverse proxy settings](#reverse-proxy-settings).                                |
| `PROXY_PROTOCOL`                | `false`   | The load balancers that send the PROXY protocol. See [Reverse proxy settings](#reverse-proxy-settings).                                                           |
| `INTERNAL_APP_URL`              | `APP_URL` | The base URL of the token, userinfo, introspection and JWKS endpoints in the discovery document, for apps that reach Pocket ID at another address than browsers.  |
| `TLS_CERT_FILE`, `TLS_KEY_FILE` |           | Paths of a PEM certificate and key, to serve HTTPS directly. Pocket ID reloads them when they change.                                                             |
| `TLS_CERT`, `TLS_KEY`           |           | The PEM certificate and key as values, instead of files. They can't be combined with the file variables.                                                          |
| `LOCAL_IPV6_RANGES`             |           | Comma-separated IPv6 ranges, such as `2001:db8:1::/48`, that Pocket ID treats as local network, in the audit log and for [outbound requests](#outbound-requests). |

## Database and file storage

| Variable                                   | Default             | Description                                                                                                                                                 |
| ------------------------------------------ | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DB_CONNECTION_STRING`                     | `data/pocket-id.db` | The SQLite database file or a PostgreSQL URL. See [Database connection string](#database-connection-string).                                                |
| `FILE_BACKEND`                             | `filesystem`        | Where uploads such as logos and profile pictures go: `filesystem`, `database` or `s3`.                                                                      |
| `UPLOAD_PATH`                              | `data/uploads`      | The uploads folder for `filesystem`, or the key prefix inside the bucket for `s3`.                                                                          |
| `S3_BUCKET`                                |                     | The bucket, for `FILE_BACKEND=s3`.                                                                                                                          |
| `S3_REGION`                                |                     | The bucket's region.                                                                                                                                        |
| `S3_ENDPOINT`                              |                     | The S3 endpoint, for storage other than AWS, such as MinIO or Cloudflare R2.                                                                                |
| `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` |                     | The S3 credentials.                                                                                                                                         |
| `S3_FORCE_PATH_STYLE`                      | `false`             | Address the bucket in the path instead of the host name, which MinIO and some other providers need.                                                         |
| `S3_DISABLE_DEFAULT_INTEGRITY_CHECKS`      | `false`             | Turn off the checksums newer AWS SDKs send, for providers that reject them.                                                                                 |
| `ALLOW_DOWNGRADE`                          | `false`             | Let an older version start on a database that a newer version already migrated, by downloading and running the newer version's down migrations from GitHub. |

## Security

| Variable                       | Default | Description                                                                                                                                                                    |
| ------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ALLOW_INSECURE_CALLBACK_URLS` | `true`  | Allow `http://` callback URLs on hosts other than `localhost`. Set it to `false` unless a client needs one.                                                                    |
| `DISABLE_RATE_LIMITING`        | `false` | Turn off the built-in rate limits. Only do this when your reverse proxy limits requests instead.                                                                               |
| `STATIC_API_KEY`               |         | An API key of at least 16 characters with admin rights, for declarative setups. It acts as a user named "Static API User". Prefer [regular API keys](/docs/api) where you can. |
| `AUDIT_LOG_RETENTION_DAYS`     | `90`    | How many days the audit log keeps events.                                                                                                                                      |

## Outbound requests

Some features send requests to URLs that admins or other people choose.
So that such a URL can't reach services on Pocket ID's own network, such as a router's admin page or a cloud metadata endpoint, each feature only connects to public addresses, plus what its variable allows.

| Variable                                    | Default            | Requests                                                                                     |
| ------------------------------------------- | ------------------ | -------------------------------------------------------------------------------------------- |
| `OUTBOUND_ALLOWED_HOSTS_SCIM`               | `private,loopback` | The **SCIM Endpoint** of [SCIM](/docs/configuration/scim) clients.                           |
| `OUTBOUND_ALLOWED_HOSTS_BACKCHANNEL_LOGOUT` | `private,loopback` | The **Back-Channel Logout URL** of OIDC clients.                                             |
| `OUTBOUND_ALLOWED_HOSTS_FEDERATED_JWKS`     | `private,loopback` | The **JWKS URL** of [federated client credentials](/docs/guides/oidc-client-authentication). |
| `OUTBOUND_ALLOWED_HOSTS_CLIENT_LOGO`        | `none`             | Logo URLs of OIDC clients. The host of `ICON_LIBRARY_URL` is always allowed.                 |
| `OUTBOUND_ALLOWED_HOSTS_CLIENT_METADATA`    | `none`             | [Client ID metadata documents](/docs/guides/client-id-metadata-documents).                   |
| `OUTBOUND_ALLOWED_HOSTS_LDAP_PICTURE`       | `none`             | Profile pictures that [LDAP](/docs/configuration/ldap) provides as a URL.                    |

Each value is a comma-separated list of these entries:

- `private`: `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `100.64.0.0/10` (Tailscale), `fc00::/7` and `LOCAL_IPV6_RANGES`.
- `loopback`: `127.0.0.0/8` and `::1`.
- An IP address or CIDR range, such as `10.0.3.7` or `172.18.0.0/16`.
- A hostname, such as `scim-app`, or `*.internal` for all subdomains of `internal`, trusted whatever address it resolves to.
- `none`, which allows public addresses only.

## Locations

Pocket ID shows where a sign-in came from in the audit log and in new-device emails.

| Variable                      | Default                   | Description                                                                                                                    |
| ----------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `MAXMIND_LICENSE_KEY`         |                           | Enables downloading and updating the GeoLite2 database.                                                                        |
| `GEOLITE_DB_PATH`             | `data/GeoLite2-City.mmdb` | Where the GeoLite2 database is stored. You can also place a database there yourself.                                           |
| `GEOLITE_DB_URL`              | MaxMind's download URL    | A different download URL, where `%s` stands for the license key. A custom URL works without a key.                             |
| `CLOUDFLARE_LOCATION_HEADERS` | `false`                   | Take locations from Cloudflare's headers instead of GeoLite2. See [Cloudflare location headers](#cloudflare-location-headers). |

## Logging

| Variable         | Default | Description                                                                                                                                  |
| ---------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `LOG_LEVEL`      | `info`  | `debug`, `info`, `warn` or `error`.                                                                                                          |
| `LOG_JSON`       | `false` | Write logs as JSON.                                                                                                                          |
| `LOG_QUERY_ARGS` | `false` | Include the values of database queries in debug logs and traces. They can contain personal data, so only turn this on while troubleshooting. |

[Observability](#observability) covers metrics and traces.

## Other

| Variable                         | Default                        | Description                                                                                                                                                                                                                                  |
| -------------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `UI_CONFIG_DISABLED`             | `false`                        | Take the settings of **Application Configuration** from environment variables. See [Overriding the UI configuration](#overriding-the-ui-configuration).                                                                                      |
| `ANALYTICS_DISABLED`             | `false`                        | Turn off the daily [heartbeat](/docs/configuration/analytics) that counts running instances.                                                                                                                                                 |
| `VERSION_CHECK_DISABLED`         | `false`                        | Turn off the check for new releases on GitHub.                                                                                                                                                                                               |
| `ICON_LIBRARY_URL`               | The selfh.st icons on jsDelivr | Where the logo picker of OIDC clients searches for icons. A mirror needs the layout of the [selfh.st icons](https://github.com/selfhst/icons) repository and may be on your local network. Set it to `disabled` to turn the icon search off. |
| `DISMISS_SQLITE_STORAGE_WARNING` |                                | Set to `i accept the risks` to hide the admin warning about a SQLite database on a network share.                                                                                                                                            |
| `ACTORS_PORT`, `ACTORS_HOST`     | `1414`, `0.0.0.0`              | The UDP port and address of Pocket ID's internal task runtime. Only change the port if 1414 is taken.                                                                                                                                        |

## Database connection string

Pocket ID supports SQLite and PostgreSQL and picks one from `DB_CONNECTION_STRING`: a URL that starts with `postgres://` or `postgresql://` is PostgreSQL, and anything else is a path to a SQLite file.

### SQLite

SQLite needs no setup, and the default `data/pocket-id.db` is fine for most installations.
Pocket ID adds the connection parameters it needs, such as write-ahead logging and a busy timeout, and you can pass a full `file:` connection string to change them.

:::danger
Don't store the SQLite database on a network share, such as NFS or SMB.
If you have to, and know the [risks](https://www.sqlite.org/useovernet.html), add `_journal_mode=DELETE` to the connection string and keep backups.
Pocket ID warns about this in the admin UI, which `DISMISS_SQLITE_STORAGE_WARNING` hides.
:::

### PostgreSQL

Use a PostgreSQL URL:

```ini
DB_CONNECTION_STRING=postgres://pocketid:password@localhost:5432/pocketid
```

Pocket ID creates its tables on the first start.
Only one Pocket ID instance may use a database at a time.

## Encryption keys

Pocket ID encrypts sensitive data, such as the keys it signs tokens with, using `ENCRYPTION_KEY`.
The key must be at least 16 bytes, and a random 32-character string is a good choice:

```bash
openssl rand -base64 32
```

Set it as `ENCRYPTION_KEY`, or save it in a file and point `ENCRYPTION_KEY_FILE` at it.
Pocket ID reads the file as it is, so a trailing newline becomes part of the key: write it with `printf '%s' "<key>" > encryption_key` rather than `echo`.

To change the key, re-encrypt the data with the new one, then update the variable and restart Pocket ID:

```bash
# With Docker Compose
docker compose exec pocket-id /app/pocket-id encryption-key-rotate --new-key <new key>

# With the binary
./pocket-id encryption-key-rotate --new-key <new key>
```

## Reverse proxy settings

Behind a [reverse proxy](/docs/setup/reverse-proxy), every request reaches Pocket ID from the proxy's address.
Pocket ID needs the client's real IP for the audit log and its rate limits, and there are three ways to pass it on.

### `TRUST_PROXY`

A comma-separated list of the proxies' IP addresses or CIDR ranges, such as `10.0.0.10,172.18.0.0/16`.
Requests from these addresses may set the client IP in `X-Forwarded-For` or `X-Real-IP`.

- `false`, the default, trusts no proxy.
- `true` trusts every address, so only use it when Pocket ID can't be reached without going through your proxy.

### `TRUSTED_PLATFORM`

The name of a header that a CDN or platform sets to the client IP, which Pocket ID then reads directly instead of `X-Forwarded-For`:

- `CF-Connecting-IP` for Cloudflare
- `Fly-Client-IP` for Fly.io
- `X-Appengine-Remote-Addr` for Google App Engine
- any header your own proxy sets

:::tip
Prefer `TRUSTED_PLATFORM` behind a CDN that sets such a header, since it's simpler and more reliable than listing the CDN's addresses.
:::

### `PROXY_PROTOCOL`

A comma-separated list of the load balancers that send the [PROXY protocol](https://www.haproxy.org/download/2.9/doc/proxy-protocol.txt) header, which carries the client address in front of the HTTP connection.
Connections from the listed addresses must send the header, and connections from other addresses are rejected, except from `localhost`, so the health check keeps working.
`true` expects the header from every address.

It needs a TCP listener, so it can't be combined with `UNIX_SOCKET`.

## Cloudflare location headers

With `CLOUDFLARE_LOCATION_HEADERS=true`, Pocket ID takes the country and city of sign-ins from Cloudflare's `CF-IPCountry` and `CF-IPCity` headers instead of the GeoLite2 database, so it needs no MaxMind key.
Turn on Cloudflare's [Add visitor location headers](https://developers.cloudflare.com/rules/transform/managed-transforms/reference/#add-visitor-location-headers) managed transform, and let Pocket ID read the client IP from Cloudflare too:

```ini
CLOUDFLARE_LOCATION_HEADERS=true
TRUSTED_PLATFORM=CF-Connecting-IP
```

Pocket ID trusts these headers without checking where a request came from, so only use this when Pocket ID is reachable through Cloudflare alone.
Locations are only known for the client of the current request, so a sign-in request from another device shows no location in this mode.

## Overriding the UI configuration

The settings under **Application Configuration** are stored in the database.
To manage them as environment variables instead, set `UI_CONFIG_DISABLED=true`.
The admin UI then shows a notice that the settings come from the environment, and every setting you don't set keeps its default.

Booleans must be exactly `true` or `false`, and a variable set to an empty value counts as set, so leave out the ones you don't use.
`SMTP_PASSWORD` and `LDAP_BIND_PASSWORD` also accept a `_FILE` variant.

### General

| Variable                         | Default             | Description                                                                                                                                       |
| -------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `APP_NAME`                       | `Pocket ID`         | The name shown in the UI and in emails, up to 30 characters.                                                                                      |
| `SESSION_DURATION`               | `60`                | How many minutes a Pocket ID session lasts before users sign in again.                                                                            |
| `HOME_PAGE_URL`                  | `/settings/account` | The page users land on after signing in to Pocket ID itself.                                                                                      |
| `ACCENT_COLOR`                   | `default`           | The UI's accent color, as any CSS color.                                                                                                          |
| `DISABLE_ANIMATIONS`             | `false`             | Turn off the UI's animations.                                                                                                                     |
| `ALLOW_OWN_ACCOUNT_EDIT`         | `true`              | Let users edit their own name and email address.                                                                                                  |
| `AUTO_CREATE_OIDC_CLIENT_SECRET` | `true`              | Create a secret that doesn't expire for every new confidential client.                                                                            |
| `CIMD_URL_ALLOWLIST`             | `[]`                | A JSON array of the [Client ID Metadata Document](/docs/guides/client-id-metadata-documents) URLs Pocket ID accepts. Empty turns the feature off. |

### Users and signups

| Variable                        | Default    | Description                                                                                           |
| ------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------- |
| `REQUIRE_USER_EMAIL`            | `true`     | Require an email address on every account. Users without one can't use features that send email.      |
| `EMAILS_VERIFIED`               | `false`    | Mark email addresses as verified when users sign up or change them.                                   |
| `ALLOW_USER_SIGNUPS`            | `disabled` | `disabled`, `withToken` for [signup links](/docs/setup/user-management#signup-links), or `open`.      |
| `SIGNUP_DEFAULT_USER_GROUP_IDS` | `[]`       | A JSON array of group IDs that new accounts join, such as `["a3888f2b-4c00-4b23-9c85-a3c8d685eb1f"]`. |
| `SIGNUP_DEFAULT_CUSTOM_CLAIMS`  | `[]`       | Custom claims for new accounts, such as `[{"key":"plan","value":"free"}]`.                            |

### Passkeys

| Variable                            | Default    | Description                                                                             |
| ----------------------------------- | ---------- | --------------------------------------------------------------------------------------- |
| `WEBAUTHN_USER_VERIFICATION`        | `required` | `required` or `preferred`, which also allows touch-only security keys.                  |
| `WEBAUTHN_ALLOW_SYNCED_PASSKEYS`    | `true`     | Allow passkeys that sync between devices.                                               |
| `WEBAUTHN_AUTHENTICATOR_ATTACHMENT` | `any`      | `any`, `platform` for device passkeys only, or `cross-platform` for security keys only. |

[Sign-in methods](/docs/guides/sign-in-methods#passkey) explains these settings.

### Email

| Variable                                           | Default | Description                                                                                          |
| -------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------- |
| `SMTP_HOST`, `SMTP_PORT`                           |         | The SMTP server.                                                                                     |
| `SMTP_FROM`                                        |         | The sender address, such as `id@example.com`.                                                        |
| `SMTP_USER`, `SMTP_PASSWORD`                       |         | The SMTP credentials.                                                                                |
| `SMTP_TLS`                                         | `none`  | `none`, `starttls` or `tls`.                                                                         |
| `SMTP_SKIP_CERT_VERIFY`                            | `false` | Accept self-signed certificates.                                                                     |
| `EMAIL_LOGIN_NOTIFICATION_ENABLED`                 | `false` | Email users when they sign in from a new device.                                                     |
| `EMAIL_ONE_TIME_ACCESS_AS_ADMIN_ENABLED`           | `false` | Let admins email a login code to a user.                                                             |
| `EMAIL_ONE_TIME_ACCESS_AS_UNAUTHENTICATED_ENABLED` | `false` | Let users request a login code by email. Anyone with access to their email can then sign in as them. |
| `EMAIL_API_KEY_EXPIRATION_ENABLED`                 | `false` | Email users before their API keys expire.                                                            |
| `EMAIL_VERIFICATION_ENABLED`                       | `false` | Email users a link to verify their address when they sign up or change it.                           |

### LDAP

| Variable                                                          | Default                      | Description                                                           |
| ----------------------------------------------------------------- | ---------------------------- | --------------------------------------------------------------------- |
| `LDAP_ENABLED`                                                    | `false`                      | Sync users and groups from LDAP.                                      |
| `LDAP_URL`                                                        |                              | The server's URL, such as `ldaps://ldap.example.com:636`.             |
| `LDAP_BIND_DN`, `LDAP_BIND_PASSWORD`                              |                              | The account Pocket ID searches LDAP with.                             |
| `LDAP_BASE`                                                       |                              | The base DN of the search.                                            |
| `LDAP_USER_SEARCH_FILTER`                                         | `(objectClass=person)`       | Which entries are users.                                              |
| `LDAP_USER_GROUP_SEARCH_FILTER`                                   | `(objectClass=groupOfNames)` | Which entries are groups.                                             |
| `LDAP_SKIP_CERT_VERIFY`                                           | `false`                      | Accept self-signed certificates.                                      |
| `LDAP_SOFT_DELETE_USERS`                                          | `true`                       | Disable users who disappear from LDAP instead of deleting them.       |
| `LDAP_ATTRIBUTE_USER_UNIQUE_IDENTIFIER`                           |                              | The attribute that identifies a user, whose value must never change.  |
| `LDAP_ATTRIBUTE_USER_USERNAME`                                    |                              | The username attribute.                                               |
| `LDAP_ATTRIBUTE_USER_EMAIL`                                       |                              | The email attribute.                                                  |
| `LDAP_ATTRIBUTE_USER_FIRST_NAME`, `LDAP_ATTRIBUTE_USER_LAST_NAME` |                              | The name attributes.                                                  |
| `LDAP_ATTRIBUTE_USER_DISPLAY_NAME`                                | `cn`                         | The display name attribute.                                           |
| `LDAP_ATTRIBUTE_USER_PROFILE_PICTURE`                             |                              | The profile picture attribute.                                        |
| `LDAP_ATTRIBUTE_GROUP_MEMBER`                                     | `member`                     | The attribute that lists a group's members.                           |
| `LDAP_ATTRIBUTE_GROUP_UNIQUE_IDENTIFIER`                          |                              | The attribute that identifies a group, whose value must never change. |
| `LDAP_ATTRIBUTE_GROUP_NAME`                                       |                              | The group name attribute.                                             |
| `LDAP_ADMIN_GROUP_NAME`                                           |                              | The group whose members become admins.                                |

[LDAP](/docs/configuration/ldap) explains these settings.

## Observability

Pocket ID writes logs, and can export metrics and traces through [OpenTelemetry](https://opentelemetry.io).
The standard `OTEL_*` [environment variables](https://opentelemetry.io/docs/specs/otel/configuration/sdk-environment-variables/) configure it, and every exporter is off by default.

To send logs, metrics and traces to a collector:

```ini
OTEL_LOGS_EXPORTER=otlp
OTEL_METRICS_EXPORTER=otlp
OTEL_TRACES_EXPORTER=otlp
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318
```

Traces include the database queries, without their values unless `LOG_QUERY_ARGS=true`.
When traces go to an OTLP/HTTP endpoint, Pocket ID also traces page views and API calls in the browser and sends them through its own `/internal/telemetry/traces` endpoint, so the collector stays private.

### Prometheus

To let Prometheus scrape metrics instead, set `OTEL_METRICS_EXPORTER=prometheus`.
Pocket ID then serves `/metrics` on a second port, `localhost:9464` by default, which `OTEL_EXPORTER_PROMETHEUS_HOST` and `OTEL_EXPORTER_PROMETHEUS_PORT` change.
