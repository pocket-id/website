---
title: Migrate to v2.0
description: Migrate from previous versions to Pocket ID v2.0
order: 3
---

If you are upgrading from a version prior to v1.0, please first follow the [migration guide to v1.0](/docs/setup/major-releases/migrate-v1) before proceeding with this guide.

## Breaking Changes

> [!WARNING]
> v2.0 is a major release that includes breaking changes. Please read this migration guide carefully before upgrading.

### Environment Variables

- The `ENCRYPTION_KEY` environment variable is now **mandatory**. You must set this variable to a at least 16 characters long random string. You can generate a secure random string using `openssl rand -base64 32`.
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
