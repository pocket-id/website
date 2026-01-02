---
title: Data Export and Import
description: Learn how to export and import your Pocket ID data for backup or migration
order: 4
---

The Pocket ID CLI lets you export and import your Pocket ID, including the database and the uploaded images. This is useful when creating backups, moving an installation to another instance or switch datbase providers.

> [!WARNING]
> This feature is experimental and may not work correctly. Please create a backup before importing data and report any issues you encounter.

## Exporting Data

Use the `export` command to create a backup file:

```bash
pocket-id export --path ./path/to/export.zip
```

#### Exporting to standard output

You can pass `--path -` to write the export to standard output. This is helpful when piping the archive or working with Docker:

```bash
pocket-id export --path - > ./path/to/export.zip
```

#### Example: Export with Docker

Exporting to standard output is often the simplest approach when running Pocket ID in Docker:

```bash
docker compose exec pocket-id ./pocket-id export --path - > ./path/to/export.zip
```

## Importing Data

Use the import command to restore a previously exported archive:

```bash
pocket-id import --path ./path/to/export.zip
```

#### Importing from standard input

Like export, you can use `--path -` to read from standard input:

```bash
pocket-id import --yes --path - < ./path/to/export.zip
```

When importing from standard input, you must include `--yes` to confirm the operation without a prompt. The following prompt cannot be shown when reading from standard input:

```
WARNING: This feature is experimental and may not work correctly. Please create a backup before proceeding and report any issues you encounter.

WARNING: Import will erase all existing data at the following locations:
Database:      /app/data/pocket-id.db
Uploads Path:  /app/data/uploads
Do you want to continue? [y/N]:
```

##### Example: Import with Docker

When using Docker, importing from standard input is often the easiest method:

```bash
cat ./export.zip | docker compose run pocket-id ./pocket-id import --yes --path -
```
