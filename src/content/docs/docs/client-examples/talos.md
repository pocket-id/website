---
title: Talos
description: Sign in to Kubernetes on Talos Linux with Pocket ID.
client:
  callbackUrls:
    - http://localhost:8000
  values:
    - clientId
    - clientSecret
---

Talos is a lightweight, API-driven, full-stack Kubernetes system.
As with any Kubernetes server, you can set it up to authenticate users with OIDC.
This guide configures Talos to use Pocket ID as the authentication and authorization server.

::create-client

## Configure Talos

Modify the `cluster.apiServer` block to include the following:

```diff
cluster:
    apiServer:
        image: registry.k8s.io/kube-apiserver:v1.33.1 # The container image used in the API server manifest.
+       extraArgs:
+           oidc-issuer-url: https://id.example.com
+           oidc-client-id: <client-id>
+           oidc-username-claim: sub
+           oidc-groups-claim: groups
+           oidc-groups-prefix: "oidc:"
```

Create a cluster role binding that links the admin group you want to use to Kubernetes.
In the following example, there is a group called `kubernetes` in Pocket ID that the user is assigned to.

```yaml
# filename=crb.yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: cluster-admins-from-pass-keys
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
  - apiGroup: rbac.authorization.k8s.io
    kind: Group
    name: oidc:kubernetes
```

Apply it:

```shell
kubectl apply -f crb.yaml
```

### Modify the kubeconfig file

Install the command line tool [kubelogin](https://github.com/int128/kubelogin).
Refer to its GitHub repository for instructions for your system.

Run the following command to generate a config and validate that the token works:

```shell
kubectl oidc-login setup \
--oidc-issuer-url=https://id.example.com \
--oidc-client-id=<client-id> \
--oidc-client-secret=<client-secret> \
--oidc-extra-scope=groups,email,name,sub,email_verified
```

Make sure that your email is verified, as [Kubernetes requires this](https://github.com/kubernetes/kubernetes/blob/77bd3f89fbc389d5dfebbed880e08a1e4949312c/staging/src/k8s.io/apiserver/plugin/pkg/authenticator/token/oidc/oidc.go#L833-L847) when working with OIDC.

You _should_ get a response similar to this:

```json
{
  "aud": "a60960a8-c856-43b7-add7-50d83bf7eeab",
  "email": "username@domain.com",
  "email_verified": true,
  "exp": 1749867571,
  "groups": ["kubernetes"],
  "iat": 1749863971,
  "iss": "https://id.example.com",
  "nonce": "sLY0SUaiLxe9JDfUpNEsBDbhKceOB-T1zxxRYJPQbvk",
  "sub": "643c3fba-370a-4738-92a6-9ergec96cd99"
}
```

Create a new user in your `~/.kube/config` file:

```yaml
- name: pocket-id
  user:
    exec:
      apiVersion: client.authentication.k8s.io/v1beta1
      args:
        - oidc-login
        - get-token
        - --oidc-issuer-url=<pocket ID url>
        - --oidc-client-id=<pocket ID url>
        - --oidc-client-secret=<pocket ID url>
        - --oidc-extra-scope=groups
        - --oidc-extra-scope=email
        - --oidc-extra-scope=name
```

Then update your current context to use this user:

```diff
 - context:
     cluster: testing
     namespace: default
-    user: admin@testng
+    user: pocket-id
    name: testing
```

## Further reading

- [Kubernetes OIDC](https://kubernetes.io/docs/reference/access-authn-authz/authentication/)
- [More in-depth documentation and possible errors](https://documentation.breadnet.co.uk/kubernetes/oidc/talos-oidc-pocket-id/)
