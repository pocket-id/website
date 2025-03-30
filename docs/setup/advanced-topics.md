---
id: advanced-topics
sidebar_position: 4
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
