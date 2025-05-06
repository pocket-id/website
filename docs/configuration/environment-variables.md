---
id: environment-variables
---

# Environment Variables

Below are all the environment variables supported by Pocket ID. These should be configured in your `.env ` file.

Be cautious when modifying environment variables that are not recommended to change.

<div className="env-var-table">

| Variable                    | Default Value                                                                                           | Recommended to change | Description                                                                                                                                                                                                                                                                                                                                                               |
| --------------------------- | ------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PUBLIC_APP_URL`            | `http://localhost`                                                                                      | yes                   | The URL where you will access the app.                                                                                                                                                                                                                                                                                                                                    |
| `TRUST_PROXY`               | `false`                                                                                                 | yes                   | Whether the app is behind a reverse proxy.                                                                                                                                                                                                                                                                                                                                |
| `MAXMIND_LICENSE_KEY`       | `-`                                                                                                     | yes                   | License Key for the GeoLite2 Database. The license key is required to retrieve the geographical location of IP addresses in the audit log. If the key is not provided, IP locations will be marked as "unknown." You can obtain a license key for free [here](https://www.maxmind.com/en/geolite2/signup).                                                                |
| `PUID` and `PGID`           | `1000`                                                                                                  | yes                   | The user and group ID of the user who should run Pocket ID inside the Docker container and owns the files that are mounted with the volume. You can get the `PUID` and `GUID` of your user on your host machine by using the command `id`. For more information see [this article](https://docs.linuxserver.io/general/understanding-puid-and-pgid/#using-the-variables). |
| `DB_PROVIDER`               | `sqlite`                                                                                                | no                    | The database provider you want to use. Currently `sqlite` and `postgres` are supported.                                                                                                                                                                                                                                                                                   |
| `DB_CONNECTION_STRING`      | `file:data/pocket-id.db?_journal_mode=WAL&_busy_timeout=2500&_txlock=immediate`                         | no                    | Specifies the connection string used to connect to the database. See the [Database connection string](#database-connection-string) section below for more details.                                                                                                                                                                                                        |
| `UPLOAD_PATH`               | `data/uploads`                                                                                          | no                    | The path where the uploaded files are stored.                                                                                                                                                                                                                                                                                                                             |
| `KEYS_PATH`                 | `data/keys`                                                                                             | no                    | The path where the private keys are stored.                                                                                                                                                                                                                                                                                                                               |
| `INTERNAL_BACKEND_URL`      | `http://localhost:8080`                                                                                 | no                    | The URL where the backend is accessible.                                                                                                                                                                                                                                                                                                                                  |
| `GEOLITE_DB_PATH`           | `data/GeoLite2-City.mmdb`                                                                               | no                    | The path where the GeoLite2 database should be stored.                                                                                                                                                                                                                                                                                                                    |
| `GEOLITE_DB_URL`            | `https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-City&license_key=%s&suffix=tar.gz` | no                    | The custom download URL for the Geolite DB (default value should be fine for most users.)                                                                                                                                                                                                                                                                                 |
| `CADDY_PORT`                | `80`                                                                                                    | no                    | The port on which Caddy should listen. Caddy is only active inside the Docker container. If you want to change the exposed port of the container then you should change this variable.                                                                                                                                                                                    |
| `CADDY_DISABLED`            | `false`                                                                                                 | no                    | Whether Caddy should be disabled inside the Docker container. If disabled, you must configure your reverse proxy to correctly map all paths. Refer to the [official Caddyfile](https://github.com/pocket-id/pocket-id/blob/main/reverse-proxy/Caddyfile) for guidance.                                                                                                    |
| `PORT`                      | `3000`                                                                                                  | no                    | The port on which the frontend should listen.                                                                                                                                                                                                                                                                                                                             |
| `BACKEND_PORT`              | `8080`                                                                                                  | no                    | The port on which the backend should listen                                                                                                                                                                                                                                                                                                                               |
| `HOST`                      | `0.0.0.0`                                                                                               | no                    | The address on which the backend and frontend should listen.                                                                                                                                                                                                                                                                                                              |
| `PUBLIC_UI_CONFIG_DISABLED` | `false`                                                                                                 | no                    | See [Overriding the UI configuration](#overriding-the-ui-configuration).                                                                                                                                                                                                                                                                                                  |
| `UPDATE_CHECK_DISABLED`     | `false`                                                                                                 | no                    | Whether checking for a new version on github.com should be disabled.                                                                                                                                                                                                                                                                                                      |

</div>

### Database connection string

The `DB_CONNECTION_STRING` environmental variable configures how Pocket ID connects to the database.

When using **SQLite** (`DB_PROVIDER=sqlite`, the default), this contains the path to the database file as well as some additional parameters. Most users should not modify the default value `file:data/pocket-id.db?_journal_mode=WAL&_busy_timeout=2500&_txlock=immediate`.

> We **do not recommend** storing the SQLite database inside a networked filesystem, such as a NFS or SMB share. However, if you absolutely must, and are [aware of the risks](https://www.sqlite.org/useovernet.html), you need to modify `DB_CONNECTION_STRING` and disable journaling, by setting `_journal_mode=DELETE`. Note that this is not a recommended or supported scenario by the SQLite developers, and you should ensure to have proper backups for your database.

When using **PostgreSQL** (`DB_PROVIDER=postgres`), the connection string is a DSN as supported by libpq:

```
Format:
postgresql://[user[:password]@][netloc][:port][/dbname][?param1=value1&...]

Example:
postgres://pocketid:123456@localhost:5432/pocketid
```

## Overriding the UI configuration

You can change additional settings directly in the Pocket ID UI. However, if you prefer to configure them via environment variables, you can do so by setting the following variables.

To enable environment variable overrides, set `PUBLIC_UI_CONFIG_DISABLED` to `true`. When `PUBLIC_UI_CONFIG_DISABLED` is set to true, Pocket ID will use values from the environment variables. If a variable is not set, the system will fall back to its default values.

| Variable                                           | Default Value                | Description                                                                                                                                                                       |
| -------------------------------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `APP_NAME`                                         | `Pocket ID`                  | The name of the app.                                                                                                                                                              |
| `SESSION_DURATION`                                 | `60`                         | The duration of a session in minutes before the user has to sign in again.                                                                                                        |
| `EMAILS_VERIFIED`                                  | `false`                      | Whether the user's email should be marked as verified for the OIDC clients.                                                                                                       |
| `ALLOW_OWN_ACCOUNT_EDIT`                           | `true`                       | Whether the users should be able to edit their own account details.                                                                                                               |
| `DISABLE_ANIMATIONS`                               | `false`                      | Turn off all animations throughout the Admin UI.                                                                                                                                  |
| `SMTP_HOST`                                        | `-`                          | SMTP server hostname.                                                                                                                                                             |
| `SMTP_PORT`                                        | `-`                          | SMTP server port.                                                                                                                                                                 |
| `SMTP_FROM`                                        | `-`                          | Sender email address for outgoing emails.                                                                                                                                         |
| `SMTP_USER`                                        | `-`                          | SMTP username for authentication.                                                                                                                                                 |
| `SMTP_PASSWORD`                                    | `-`                          | SMTP password for authentication.                                                                                                                                                 |
| `SMTP_TLS`                                         | `none`                       | Which TLS Option to use. Valid values are: `none`, `starttls` and `tls`.                                                                                                          |
| `SMTP_SKIP_CERT_VERIFY`                            | `false`                      | Whether to skip SMTP certificate verification. This can be useful for self-signed certificates.                                                                                   |
| `EMAIL_LOGIN_NOTIFICATION_ENABLED`                 | `false`                      | Send an email to the user when they log in from a new device.                                                                                                                     |
| `EMAIL_ONE_TIME_ACCESS_AS_ADMIN_ENABLED`           | `false`                      | Allows an admin to send a login code to the user via email.                                                                                                                       |
| `EMAIL_API_KEY_EXPIRATION_ENABLED`                 | `false`                      | Send an email to the user when their API key is about to expire.                                                                                                                  |
| `EMAIL_ONE_TIME_ACCESS_AS_UNAUTHENTICATED_ENABLED` | `false`                      | Allows users to bypass passkeys by requesting a login code sent to their email. This reduces the security significantly as anyone with access to the user's email can gain entry. |
| `LDAP_ENABLED`                                     | `false`                      | Whether LDAP authentication is enabled.                                                                                                                                           |
| `LDAP_URL`                                         | `-`                          | LDAP server URL.                                                                                                                                                                  |
| `LDAP_BIND_DN`                                     | `-`                          | LDAP bind distinguished name (DN).                                                                                                                                                |
| `LDAP_BIND_PASSWORD`                               | `-`                          | LDAP bind password.                                                                                                                                                               |
| `LDAP_BASE`                                        | `-`                          | LDAP search base DN.                                                                                                                                                              |
| `LDAP_USER_SEARCH_FILTER`                          | `(objectClass=person)`       | LDAP user search filter.                                                                                                                                                          |
| `LDAP_USER_GROUP_SEARCH_FILTER`                    | `(objectClass=groupOfNames)` | The Search filter to use to search/sync groups.                                                                                                                                   |
| `LDAP_SKIP_CERT_VERIFY`                            | `false`                      | Whether to skip LDAP certificate verification. This can be useful for self-signed certificates.                                                                                   |
| `LDAP_SOFT_DELETE_USERS`                           | `false`                      | When enabled, users removed from LDAP will be disabled rather than deleted from the system.                                                                                       |
| `LDAP_ATTRIBUTE_USER_UNIQUE_IDENTIFIER`            | `-`                          | LDAP attribute for user unique identifier. The value of this attribute should never change.                                                                                       |
| `LDAP_ATTRIBUTE_USER_USERNAME`                     | `-`                          | LDAP attribute for user username.                                                                                                                                                 |
| `LDAP_ATTRIBUTE_USER_EMAIL`                        | `-`                          | LDAP attribute for user email.                                                                                                                                                    |
| `LDAP_ATTRIBUTE_USER_FIRST_NAME`                   | `-`                          | LDAP attribute for user first name.                                                                                                                                               |
| `LDAP_ATTRIBUTE_USER_LAST_NAME`                    | `-`                          | LDAP attribute for user last name.                                                                                                                                                |
| `LDAP_ATTRIBUTE_USER_PROFILE_PICTURE`              | `-`                          | LDAP attribute for the profile picture of a user.                                                                                                                                 |
| `LDAP_ATTRIBUTE_GROUP_MEMBER`                      | `member`                     | LDAP attribute to use for querying members of a group.                                                                                                                            |
| `LDAP_ATTRIBUTE_GROUP_UNIQUE_IDENTIFIER`           | `-`                          | LDAP attribute for group unique identifier. The value of this attribute should never change.                                                                                      |
| `LDAP_ATTRIBUTE_GROUP_NAME`                        | `-`                          | LDAP attribute for group name.                                                                                                                                                    |
| `LDAP_ATTRIBUTE_ADMIN_GROUP`                       | `-`                          | LDAP attribute for admin group. Members of this group will have Admin Privileges in Pocket ID.                                                                                    |

## Observability

You can configure Pocket ID to emit metrics and/or traces. This is done using OpenTelemetry. For metrics, Prometheus is also supported.

| Variable          | Default Value | Description                    |
| ----------------- | ------------- | ------------------------------ |
| `TRACING_ENABLED` | `false`       | Enables OpenTelemetry tracing. |
| `METRICS_ENABLED` | `false`       | Enables OpenTelemetry metrics. |

The behaviour of metrics, traces and which metric and trace exporters are enabled can be controlled using the `OTEL` environment variables. These are documented in the [OpenTelemetry SDK environment variables documentation](https://opentelemetry.io/docs/specs/otel/configuration/sdk-environment-variables/).

If you want to enable the `/metrics` endpoint for Prometheus metrics scraping instead of using OTLP metrics pushing, you'll need to also set:

```
OTEL_METRICS_EXPORTER=prometheus
```

This will start a **second** HTTP server with just the metrics endpoint. It is by default bound to:

- `OTEL_EXPORTER_PROMETHEUS_HOST`: `localhost`
- `OTEL_EXPORTER_PROMETHEUS_PORT`: `9464`
