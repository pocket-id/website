---
id: installation
---

# Installation

# Before you start

Pocket ID requires a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts), meaning it must be served over HTTPS. This is necessary because Pocket ID uses the [WebAuthn API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API).

### Installation with Docker (recommended)

1. Download the `docker-compose.yml` and `.env` file:

   ```bash
    curl -O https://raw.githubusercontent.com/pocket-id/pocket-id/main/docker-compose.yml

    curl -o .env https://raw.githubusercontent.com/pocket-id/pocket-id/main/.env.example
   ```

2. Edit the `.env` file so that it fits your needs. See the [environment variables](/docs/configuration/environment-variables) section for more information.
3. Run `docker compose up -d`

You can now sign in with the admin account on `http://localhost/login/setup`.

### Proxmox

Run the [helper script](https://community-scripts.github.io/ProxmoxVE/scripts?id=pocketid) as root in your Proxmox shell. 

**Configuration Paths**
- /opt/pocket-id/backend/.env
- /opt/pocket-id/frontend/.env

```bash
bash -c "$(wget -qLO - https://github.com/community-scripts/ProxmoxVE/raw/main/ct/pocketid.sh)"
```

### Unraid

Pocket ID is available as a template on the Community Apps store.

### Podman

You can run Pocket ID with Podman using a Pod spec similar to the one in the example below.

<details>
  <summary>`pocket-id.yaml`</summary>

```yaml
kind: Pod
apiVersion: v1
metadata:
  labels:
    app: pocket-id
  annotations:
    io.containers.autoupdate: registry
  name: pocket-id
spec:
  containers:
    - name: pocket-id
      image: ghcr.io/pocket-id/pocket-id:latest
      env:
        - name: "PUBLIC_APP_URL"
          value: "http://localhost"
        - name: "TRUST_PROXY"
          value: "false"
        - name: "MAXMIND_LICENSE_KEY"
          valueFrom:
            secretKeyRef:
              name: "pocket-id-env"
              key: "MAXMIND_LICENSE_KEY"
        - name: "CADDY_PORT"
          value: "4000"
        - name: "PUID"
          value: "1000"
        - name: "PGID"
          value: "1000"
        # Expose Caddy on a non-privileged port to be able to run as non-root
        - name: "CADDY_PORT"
          value: "4000"
        - name: "BACKEND_PORT"
          value: "8080"
        - name: "PORT"
          value: "3000"
        - name: "DB_PROVIDER"
          value: "sqlite" # "sqlite" or "postgres"
        # For Postgres
        # This is ignored if not using Postgres
        - name: "POSTGRES_CONNECTION_STRING"
          valueFrom:
            secretKeyRef:
              name: "pocket-id-env"
              key: "POSTGRES_CONNECTION_STRING"
        # Used by Caddy
        - name: "XDG_DATA_HOME"
          value: "/mnt/xdgdata/"
        # Used by Caddy
        - name: "XDG_CONFIG_HOME"
          value: "/mnt/xdgconfig/"
      ports:
        - containerPort: 4000
          hostPort: 4000
      # These work because the container includes curl
      # See: https://github.com/containers/podman/issues/18318
      livenessProbe:
        httpGet:
          path: "/health"
          # Caddy's port
          port: 4000
        failureThreshold: 3
        initialDelaySeconds: 10
        periodSeconds: 30
        timeoutSeconds: 3
      securityContext:
        readOnlyRootFilesystem: true
        runAsUser: 1000
        runAsGroup: 1000
      restart: Always
      volumeMounts:
        - name: pocket-id-data
          mountPath: /app/backend/data
        - name: pocket-id-xdgconfig
          mountPath: /mnt/xdgconfig
        - name: pocket-id-xdgdata
          mountPath: /mnt/xdgdata
      resources: {}

  # In this example we are mounting volumes from the host
  # Replace `/path/to/pocket-id` with the path on the host
  # Make sure to set permissions with: `chmod -R 1000:1000 /path/to/pocket-id`
  # If SELinux is enabled, also: `chcon -Rt svirt_sandbox_file_t /var/mnt/apps/pocketid` 
  volumes:
    # For SQLite database
    - name: pocket-id-data
      hostPath:
        path: /path/to/pocket-id/data
        type: Directory
    # Used by Caddy
    - name: pocket-id-xdgconfig
      hostPath:
        path: /path/to/pocket-id/xdgconfig
        type: Directory
    # Used by Caddy
    - name: pocket-id-xdgdata
      hostPath:
        path: /path/to/pocket-id/xdgdata
        type: Directory

---
kind: Secret
apiVersion: v1
metadata:
  name: pocket-id-env
type: Opaque
stringData:
  MAXMIND_LICENSE_KEY: ""
  # Example
  # This is ignored if not using postgres as database
  POSTGRES_CONNECTION_STRING: "postgresql://user:password@host:5432/pocket-id"
```

</details>

You can create the pod with:

```sh
podman play kube pocket-id.yaml
```

The Pod spec can also be run as a systemd service using a [Quadlet](https://docs.podman.io/en/latest/markdown/podman-systemd.unit.5.html) unit, for example:

<details>
  <summary>`pocket-id.kube`</summary>

```conf
[Unit]
Description=Pocket ID service
Requires=network-online.target local-fs.target
After=network-online.target local-fs.target
StartLimitIntervalSec=0

[Service]
Restart=always
RestartSec=2s

[Kube]
Yaml=/etc/pods/pocket-id.yaml
AutoUpdate=registry

[Install]
WantedBy=multi-user.target default.target
```

</details>

### Stand-alone Installation (advanced)

Required tools:

- [Node.js](https://nodejs.org/en/download/) >= 22
- [Go](https://golang.org/doc/install) >= 1.23
- [Git](https://git-scm.com/downloads)
- [PM2](https://pm2.keymetrics.io/)
- [Caddy](https://caddyserver.com/docs/install) (optional)

1. Copy the `.env.example` file in the `frontend` and `backend` folder to `.env` and change it so that it fits your needs.

   ```bash
   cp frontend/.env.example frontend/.env
   cp backend/.env.example backend/.env
   ```

2. Run the following commands:

   ```bash
   git clone https://github.com/pocket-id/pocket-id
   cd pocket-id

   # Checkout the latest version
   git fetch --tags && git checkout $(git describe --tags `git rev-list --tags --max-count=1`)

   # Start the backend
   cd backend/cmd
   go build -o ../pocket-id-backend
   cd ..
   pm2 start pocket-id-backend --name pocket-id-backend

   # Start the frontend
   cd ../frontend
   npm install
   npm run build
   pm2 start --name pocket-id-frontend --node-args="--env-file .env" build/index.js

   # Optional: Start Caddy (You can use any other reverse proxy)
   cd ..
   pm2 start --name pocket-id-caddy caddy -- run --config reverse-proxy/Caddyfile
   ```

You can now sign in with the admin account on `http://localhost/login/setup`.
