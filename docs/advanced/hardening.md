---
id: container-security-hardening
sidebar_label: Container Security Hardening
---

# Container security hardening

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