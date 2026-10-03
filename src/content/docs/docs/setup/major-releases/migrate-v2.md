---
title: Migrate to v2
description: The breaking changes in Pocket ID v2.0, such as the mandatory encryption key, and how to upgrade from v1.
---

If you're on a version before 1.0, follow the [migration guide to v1](/docs/setup/major-releases/migrate-v1) first.

If you are using Docker, you have to change the image tag in your `docker-compose.yml` from `v1` to `v2`:

```yaml
services:
  pocket-id:
    image: ghcr.io/pocket-id/pocket-id:v2
    # ...
```

## Breaking Changes

:::caution
v2.0 is a major release that includes breaking changes. Please read this migration guide carefully before upgrading.
:::

### Environment Variables

- The `ENCRYPTION_KEY` environment variable is now **mandatory**. You must set this variable to a random string of at least 16 characters. You can generate a secure random string using `openssl rand -base64 32`.
- `KEYS_STORAGE` and `KEYS_PATH` have been removed. JWKs are now always stored in the database. See [JWKs on Disk](#jwks-on-disk) for more information.
- `LDAP_ATTRIBUTE_ADMIN_GROUP` has been renamed to `LDAP_ADMIN_GROUP_NAME`.
- `DB_PROVIDER` has been removed. We will now automatically detect the database type from the `DB_CONNECTION_STRING`.

### New Locking Mechanism

v2.0 introduces a new locking mechanism which prevents multiple instances of Pocket ID from running simultaneously on the same database. This is to avoid data corruption and ensure data integrity.

If you are running multiple instances of Pocket ID connected to the same database, you will need to update your deployment to ensure that only one instance is running at a time.

### JWKs on Disk

Pocket ID used to store JWKs on the disk by default, unless `KEYS_STORAGE=database` was set.

Since v2.0, JWKs are always stored in the database. **No action is required, but your users may need to re-authenticate** after the upgrade, as new keys will be generated and the old keys will no longer be available.

The folder at `KEYS_PATH` (default: `data/keys`) is no longer used and can be deleted.

### Wildcards in Callback URLs

This version makes wildcards in callback URLs more strict. If you were using wildcard callback URLs, please ensure they conform to the [new rules](/docs/advanced/callback-url-wildcards).
