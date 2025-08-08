---
title: Custom Keys
description: Configure custom signing keys for enhanced security
---

By default, Pocket ID generates a RSA-2048 private key upon first startup, which is used to sign all tokens. You can optionally use a key with a different RSA key size (e.g. 3072 or 4096), or even a different algorithm (e.g. ECDSA with P-256, or EdDSA with Ed25519).

> [!IMPORTANT]
> Rotating/re-generating the private key will invalidate all tokens signed by Pocket ID.
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

> [!NOTE]
> Note that the private key is used for all OAuth2 clients. If choosing an algorithm different than RS256 (RSA), make sure that your clients support that.
