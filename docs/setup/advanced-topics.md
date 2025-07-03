---
id: advanced-topics
sidebar_position: 5
sidebar_label: Advanced
---

# Advanced topics

## Use Nginx as Reverse Proxy

To use Nginx as a reverse proxy for Pocket ID, update the configuration to increase the header buffer size. This adjustment is necessary because SvelteKit generates larger headers, which may exceed the default buffer limits.

```conf
proxy_busy_buffers_size   512k;
proxy_buffers   4 512k;
proxy_buffer_size   256k;
```

## Container security hardening

By default, the Pocket ID container starts as the root user, which is used to set permissions on the file system before dropping its privileges and starting the main process. This is done for convenience, while still running the Pocket ID binary as non-root.

If you prefer, you can run the Pocket ID container as a **non-root** user entirely and even ensure it uses a **read-only root file system**.

### Prerequisites

Make sure that the Pocket ID data volume is writable by the chosen user. This is the volume/folder mounted in the container at `/app/data`.

For example, if running the container as user `1000` and group `1000`, use a command similar to this to change the owner of the data folder:

```sh
# Set the owner to user 1000 and group 1000
chown -R 1000:1000 ./data
# Set permissions on all folders to 0700
find ./data -type d -exec chmod 0700 {} \;
# Set permissions on all files to 0600
find ./data -type f -exec chmod 0600 {} \;
```

> Alternatively, you can start up the Pocket ID container with the default configuration once (where it starts as root before dropping privileges), and it will create the directories and set permissions automatically.

### Container configuration

To run the container as non-root and with a read-only root file system, use one of the options below.

- **Docker CLI**: Add the `--user 1000:1000 --read-only` flags to the `docker run` command.
- **Docker Compose**: Set these options in the `pocket-id` service:

   - `read_only: true`
   - `user: "1000:1000"`

   Example:

   ```yaml
   services:
     pocket-id:
       # ...
       read_only: true
       user: "1000:1000"
   ```

## Use custom private keys

By default, Pocket ID generates a RSA-2048 private key upon first startup, which is used to sign all tokens. You can optionally use a key with a different RSA key size (e.g. 3072 or 4096), or even a different algorithm (e.g. ECDSA with P-256, or EdDSA with Ed25519).

> **Important:** rotating/re-generating the private key will invalidate all tokens signed by Pocket ID.
>
> You will need to restart Pocket ID for the new key to be picked up. Additionally, you may need to restart all applications that consume tokens issued by Pocket ID.

Pocket ID include a command that can be used to generate a new key, which replaces the existing one and also allows rotating the private key:

```sh
pocket-id key-rotate
```

When running in a container, use a command similar to:

```sh
docker compose exec pocket-id /app/pocket-id key-rotate
```

You can specify the key algorithm using the `--alg / -a` flag. Supported values include:

- `RS256`: RSA (PKCS#1 v1.5) with a 2048-bit key and SHA-256 (default)
- `RS384`: RSA (PKCS#1 v1.5) with a 3072-bit key and SHA-384
- `RS512`: RSA (PKCS#1 v1.5) with a 4096-bit key and SHA-512
- `ES256`: ECDSA with curve P-256 and SHA-256
- `ES384`: ECDSA with curve P-384 and SHA-384
- `ES512`: ECDSA with curve P-521 and SHA-512
- `EdDSA`: EdDSA with the curve specified with the `--crv / -c` flag; supported values: `Ed25519`

For example:

```sh
# Generates an ES256 token signing key
pocket-id key-rotate --alg ES256

# Generates an EdDSA token signing key with Ed25519
pocket-id key-rotate --alg EdDSA --crv Ed25519
```

> Note that the private key is used for all OAuth2 clients. If choosing an algorithm different than RS256 (RSA), make sure that your clients support that.
