---
id: migrate-to-v1
sidebar_position: 2
---

# Migrating to v1.0

:::warning
v1.0 is a major release that includes breaking changes. Please read this migration guide carefully before upgrading.
:::

We hate breaking changes as much as you do, but we decided to bundle them all into the v1.0 release to make future upgrades easier. This guide will help you understand the changes and how to migrate your existing Pocket ID installation.

## Breaking Changes

### Port

- **Default Port Change**: The default port for Pocket ID has changed from `80` to `1411`.
- **New Port Variable**: As Caddy has been removed and the frontend is now served directly by the backend, you no longer need to set `CADDY_PORT` or `BACKEND_PORT`. Instead, you must use the new `PORT` environment variable to specify the port on which Pocket ID listens.

### Environment Variables

| Previous Variable            | New Variable           | Notes                                                                                    |
| ---------------------------- | ---------------------- | ---------------------------------------------------------------------------------------- |
| `PUBLIC_APP_URL`             | `APP_URL`              | Variable renamed                                                                         |
| `PUBLIC_UI_CONFIG_DISABLED`  | `UI_CONFIG_DISABLED`   | Variable renamed                                                                         |
| `CADDY_DISABLED`             | Removed                | Not neccessary anymore                                                                   |
| `CADDY_PORT`                 | `PORT`                 | Use new `PORT` variable                                                                  |
| `BACKEND_PORT`               | `PORT`                 | Use new `PORT` variable                                                                  |
| `POSTGRES_CONNECTION_STRING` | `DB_CONNECTION_STRING` | Variable renamed. See [Database Configuration](#database-configuration)                  |
| `SQLITE_DB_PATH`             | `DB_CONNECTION_STRING` | Now uses connection string format. See [Database Configuration](#database-configuration) |
| `INTERNAL_BACKEND_URL`       | Removed                | Not neccessary anymore                                                                   |

### Database Configuration

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

This releases removes the integrated Caddy server, which was used for reverse proxying and serving the frontend. **There are no actions required if you haven't disabled Caddy with `CADDY_DISABLED=true`.**

If you previously disabled Caddy, you likely had path mappings in your reverse proxy configuration. With v1.0:

- Path mappings to `/api/` and `/.well-known` are no longer necessary
- Your reverse proxy should now point directly to Pocket ID on port 1411 (or the port set with the `PORT` variable)

## Migration Steps

Follow the following steps to migrate from previous versions to v1.0.

### Docker

1. Adapt your `docker-compose.yml` for the new version:

   ```yaml
   services:
     pocket-id:
       image: pocketid/pocket-id:latest
       ports:
         - "1411:1411" # Make sure to change the internal port (right side) to 1411. The exposed port (left side) can remain the same.
       volumes:
         - ./data:/app/data # Make sure to change the target for the volume (path on the right side) to `/app/data`. The source for the volume (path on the left side) can remain the same.
       healthcheck:
         test: "curl -f http://localhost:1411/healthz" # Make sure to change the port to 1411 regardless of the exposed port.
         interval: 1m30s
         timeout: 5s
         retries: 2
         start_period: 10s
   ```

2. Adapt the environment variables [mentioned above](#environment-variables) in your `.env` file.
3. Apply the changes by running:

   ```bash
   docker compose up -d
   ```

### Standalone

While you still can build Pocket ID from source, it's now much easier to install and upgrade Pocket ID by using the prebuilt binaries.
To migrate from previous versions to v1.0 and use the prebuilt binaries, follow these steps:

1. Stop Pocket ID if it's currently running.
2. Create a backup of the repository directy:
   ```bash
   cp -r /path/to/pocket-id /path/to/pocket-id-old
   ```
3. Download the latest binary from the [releases page](https://github.com/pocket-id/pocket-id/releases/latest).

   Make sure to download the correct version for your operating system. The binary names follow this pattern:

   - `pocket-id-<operating-system>-<architecture>`
   - Example: `pocket-id-linux-amd64`

   You can use curl to download the binary directly. For example, for Linux on AMD64 architecture:

   ```bash
   curl -L -o pocket-id-linux-amd64 https://github.com/pocket-id/pocket-id/releases/latest/download/pocket-id-linux-amd64
   ```

4. Rename the binary and make it executable:

   ```bash
   mv pocket-id-<operating-system>-<architecture> pocket-id
   chmod +x pocket-id
   ```

5. If you haven't edited the default paths where data is stored, like `UPLOAD_PATH`, `DB_CONNECTION_STRING`, `GEOLITE_DB_PATH` and `KEYS_PATH` everything is stored in the `data` directory. Because of that you have to move the `data` directory to the same folder as the new binary.

   Copy the `data` directory from the old Pocket ID installation to the same folder as the new binary:

   ```bash
   cp -r /path/to/pocket-id-old/data /path/to/pocket-id/data
   ```

6. Create a `.env` file in the same directory as the binary. Previously you had two `.env` files, one in the `frontend` directory and one in the `backend` directory.

   You have to merge these two files into one `.env` file in the same directory as the binary. Make sure to also adapt the environment variables like [mentioned above](#environment-variables)

Enjoy Pocket ID v1.0! We're grateful for your ongoing support and contributions that made this milestone release possible.
