---
title: Nginx Reverse Proxy
description: Set up Nginx as a reverse proxy for Pocket ID
---

To use Nginx as a reverse proxy for Pocket ID, update the configuration to increase the header buffer size. This adjustment is necessary because SvelteKit generates larger headers, which may exceed the default buffer limits.

```conf
proxy_busy_buffers_size   512k;
proxy_buffers   4 512k;
proxy_buffer_size   256k;
```
