---
title: Upgrading
description: Keep your Pocket ID installation up to date
---

## Docker

For upgrading Pocket ID when using Docker, you just need to pull the latest image and restart the services:

```bash
docker compose pull
docker compose up -d
```

## Stand-alone

1. Stop Pocket ID
2. Remove the old binary:

```bash
   rm pocket-id
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

5. Start Pocket ID again:

```bash
   ./pocket-id
```
