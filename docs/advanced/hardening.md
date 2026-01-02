---
title: Container Security Hardening
description: Secure your Pocket ID deployment with distroless containers and hardening
---

By default, the Pocket ID container starts as the root user, which is used to set permissions on the file system before dropping its privileges and starting the main process. This is done for convenience, while still running the Pocket ID binary as non-root. If you prefer, you can run the Pocket ID container as a **non-root** user entirely and even ensure it uses a **read-only root file system**.

Additionally, you can also switch to a **distroless** container, which is leaner and has a smaller potential attack surface.

## System requirements

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

> [!NOTE]
> Alternatively, you can start up the regular (non-distroless) Pocket ID container with the default configuration once (where it starts as root before dropping privileges), and it will create the directories and set permissions automatically.

## Container configuration

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
      user: '1000:1000'
  ```

## Distroless container

Distroless containers are based on a minimal image, which includes "just enough" to run Pocket ID. These images are leaner, resulting in faster pulls, and because they do not include a shell or other system libraries, they also have a reduced potential attack surface.

To use distroless container, append `-distroless` to the container image, for example:

```
ghcr.io/pocket-id/pocket-id:v2-distroless
```

You can also use a specific version (such as `v2.x.x-distroless`) or branch (`v2.x-distroless`).

Note that distroless containers are non-root by default. You will need to **set permissions on the mountpoints** as described in the [System requirements](#system-requirements) section.

> [!NOTE]
> Distroless containers do not include a shell, so you will not be able to enter into the container (e.g. with `docker exec`) for debugging purposes.

## Docker Compose

This `docker-compose.yml` includes a full example of using Pocket ID's distroless containers, with non-root user and a read-only root filesystem.

```yaml
services:
  pocket-id:
    image: ghcr.io/pocket-id/pocket-id:v2-distroless
    restart: unless-stopped
    env_file: .env
    ports:
      - 1411:1411
    volumes:
      - './data:/app/data'
    read_only: true
    user: '1000:1000'
    # Optional healthcheck
    healthcheck:
      test: ['CMD', '/app/pocket-id', 'healthcheck']
      interval: 1m30s
      timeout: 5s
      retries: 2
      start_period: 10s
```
