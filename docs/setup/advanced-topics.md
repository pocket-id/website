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

By default, Pocket ID generates a RSA-2048 private key upon first startup, which is used to sign all tokens.

You can optionally use a key with a different RSA key size (e.g. 3072 or 4096), or even a different algorithm (e.g. ECDSA with P-256, or EdDSA with Ed25519).

The private key is stored in the file `data/keys/jwt_private_key.json` (in the container, this is normally `/app/backend/data/keys/jwt_private_key.json`), in a JSON Web Key (JWK) format. You can override that with another private key.

These examples use the [step CLI](https://smallstep.com/docs/step-cli/installation/) to generate private keys in various formats and encode them as JWK.

<details>
  <summary>RS384 with RSA-3072</summary>

```sh
step crypto jwk create \
  jwt_public_key.json jwt_private_key.json \
  --kty=RSA \
  --alg=RS384 \
  --use=sig \
  --size=3072 \
  --no-password --insecure
```

</details>

<details>
  <summary>ECDSA with NIST curve P-256</summary>

```sh
step crypto jwk create \
  jwt_public_key.json jwt_private_key.json \
  --kty=EC \
  --alg=ES256 \
  --use=sig \
  --no-password --insecure
```

</details>

<details>
  <summary>EdDSA with curve Ed25519</summary>

```sh
step crypto jwk create \
  jwt_public_key.json jwt_private_key.json \
  --kty=OKP \
  --alg=EdDSA \
  --use=sig \
  --crv=Ed25519 \
  --no-password --insecure
```

</details>

> Note that the private key is used for all OAuth2 clients. If choosing an algorithm different than RS256 (RSA), make sure that your clients support that.
