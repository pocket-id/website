---
id: migrate-to-v1
sidebar_position: 2
---

# Migrate to Pocket ID v1.0

:::warning

### Breaking Changes

This guide outlines the **breaking** changes in Pocket ID v1.0 and how to migrate from previous versions.
:::

### Port Configuration

- **Default Port Change**: The port in the `ports` section and `healthcheck` in the `docker-compose.yml` has to be changed to use the new default port **`1411`**.
  - ```yaml
    ports:
      - "1411:1411"
    # ....
    healthcheck:
      test: "curl -f http://localhost:1411/healthz"
      interval: 1m30s
      timeout: 5s
      retries: 2
      start_period: 10s
    ```
- **PORT Variable Behavior**: The behavior of `PORT` environment variable has changed significantly. It now controls the port for the entire application rather than just the frontend.

### Environment Variables

| Previous Variable            | New Variable              | Notes                                                           |
| ---------------------------- | ------------------------- | --------------------------------------------------------------- |
| `PUBLIC_APP_URL`             | `APP_URL`                 | Variable renamed                                                |
| `PUBLIC_UI_CONFIG_DISABLED`  | `UI_CONFIG_DISABLED`      | Variable renamed                                                |
| `CADDY_DISABLED`             | Removed                   | No direct replacement                                           |
| `CADDY_PORT`                 | `PORT`                    | Use new `PORT` variable                                         |
| `BACKEND_PORT`               | `PORT`                    | Use new `PORT` variable                                         |
| `POSTGRES_CONNECTION_STRING` | `DB_CONNECTION_STRING`    | Variable renamed (deprecated since v0.45.0)                     |
| `SQLITE_DB_PATH`             | `DB_CONNECTION_STRING`    | Now uses connection string format (deprecated since v0.45.0)    |
| `INTERNAL_BACKEND_URL`       | `DEVELOPMENT_BACKEND_URL` | Used for specifying alternative backend URLs during development |

### Database Configuration Changes

#### SQLite Configuration

- The `SQLITE_DB_PATH` environment variable has been removed (**deprecated** since [v0.45.0](https://github.com/pocket-id/pocket-id/releases/tag/v0.45.0))
- You must now use the `DB_CONNECTION_STRING` with SQLite connection string format:
  - Old: `SQLITE_DB_PATH=/data/db.sqlite`
  - New: `DB_CONNECTION_STRING=file:/data/db.sqlite?_journal_mode=WAL&_busy_timeout=2500&_txlock=immediate`

#### PostgreSQL Connection

- `POSTGRES_CONNECTION_STRING` has been removed (**deprecated** since [v0.45.0](https://github.com/pocket-id/pocket-id/releases/tag/v0.45.0))
- You must now use the `DB_CONNECTION_STRING`. The PostgreSQL connection string format remains the same:
  - Old: `POSTGRES_CONNECTION_STRING=postgresql://username:password@host:port/database`
  - New: `DB_CONNECTION_STRING=postgresql://username:password@host:port/database`

### Reverse Proxy Configuration

If you previously disabled Caddy (`CADDY_DISABLED=true`), you likely had path mappings in your reverse proxy configuration. With v1.0:

- Path mappings to `/api/` and `/auth/` are no longer necessary
- Your reverse proxy should now point directly to Pocket ID on port 1411 (or the port set with the `PORT` variable)

### Migration Removals

#### JWK Key Migration

- The automatic PEM to JWK key format conversion has been removed in v1.0
- If you're upgrading from a very old version (pre-v0.45.0) with PEM keys, upgrade to `v0.53.0` before upgrading to `v1.0.0`.
- Keys already in JWK format will continue to work as expected

## Migration Steps

Follow the following steps to migrate from previous versions to v1.0.0.

### Docker

1. You **must** first upgrade to **v0.53.0** before upgrading to **v1.0.0** to ensure proper migration of all components. Change the image tag to `v0.53.0` and start the container with `docker compose up -d`:

   ```yaml
   services:
     pocket-id:
       image: ghcr.io/pocket-id/pocket-id:v0.53.0
       # ...
   ```

2. Update your `docker-compose.yml` for upgrading to v1.0.0:

   ```yaml
   services:
     pocket-id:
       image: pocketid/pocket-id:1.0.0
       ports:
         - "1411:1411" # Make sure to change the port to 1411
       volumes:
         - ./data:/app/data # Make sure to change the volume path to /app/data
       healthcheck:
         test: "curl -f http://localhost:1411/healthz" # Make sure to change the port to 1411
         interval: 1m30s
         timeout: 5s
         retries: 2
         start_period: 10s
   ```

3. Adapt the environment variables [mentioned above](#environment-variables) in your `.env` file.
4. Apply the changes by running:

   ```bash
   docker compose up -d
   ```

5. Enjoy Pocket ID v1.0.0! We're grateful for your ongoing support and contributions that made this milestone release possible.

### Standalone

WIP
