---
title: Talos
description: Set up Talos Linux with Pocket ID authentication
---

Talos is a lightweight API driven full stack Kubernetes system. As with any Kubernetes server, you can set it up to
authenticate users using OIDC. This guide details configuring Talos to use Pocket ID as the Authentication and Authorization server

## Pocket ID Setup

1. In Pocket-ID create a new OIDC Client, name it i.e. `Kubernetes`.
2. Set a logo for this OIDC Client if you would like too.
3. Set the callback URL to: `http://localhost:8000`, or leave blank to autofill on first login.
4. Copy the `Client ID`, and the `Client Secret` for use in the next steps.

## Talos setup

Modify the `cluster.apiServer` block to include the below

```diff
cluster:
    apiServer:
        image: registry.k8s.io/kube-apiserver:v1.33.1 # The container image used in the API server manifest.
+       extraArgs:
+           oidc-issuer-url: <url of pocket-id>
+           oidc-client-id: <Client ID from Pocket ID>
+           oidc-username-claim: sub
+           oidc-groups-claim: groups
+           oidc-groups-prefix: "oidc:"
```

Create a Cluster role binding linking the admin group you wish to have in to Kubernetes. In the below example, there is a group
called `kubernetes` in Pocket ID that our user is assigned to

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

Apply this

```shell
kubectl apply -f crb.yaml
```

### Modify Kubeconfig file

You will need to install a command line tool [kubelogin](https://github.com/int128/kubelogin) - Refer to the github repo for
instructions related to your system.

Run the below command to generate a config and validate the token is working

```shell
kubectl oidc-login setup \
--oidc-issuer-url=<pocket ID url> \
--oidc-client-id=<client ID> \
--oidc-client-secret=<client secret> \
--oidc-extra-scope=groups,email,name,sub,email_verified
```

You need to ensure that your email is verified as [Kubernetes requires this](https://github.com/kubernetes/kubernetes/blob/77bd3f89fbc389d5dfebbed880e08a1e4949312c/staging/src/k8s.io/apiserver/plugin/pkg/authenticator/token/oidc/oidc.go#L833-L847)
when working with OIDC

You _should_ get a response similar to

```json
{
  "aud": "a60960a8-c856-43b7-add7-50d83bf7eeab",
  "email": "username@domain.com",
  "email_verified": true,
  "exp": 1749867571,
  "groups": ["kubernetes"],
  "iat": 1749863971,
  "iss": "<Pocket ID url>",
  "nonce": "sLY0SUaiLxe9JDfUpNEsBDbhKceOB-T1zxxRYJPQbvk",
  "sub": "643c3fba-370a-4738-92a6-9ergec96cd99"
}
```

Create a new user in your `~/.kube/config` file with the below

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

Then update your current context to use this user

```diff
 - context:
     cluster: testing
     namespace: default
-    user: admin@testng
+    user: pocket-id
    name: testing
```

## Further Reading

- [Kubernetes OIDC](https://kubernetes.io/docs/reference/access-authn-authz/authentication/)
- [More indepth documentation and possible errors](https://documentation.breadnet.co.uk/kubernetes/oidc/talos-oidc-pocket-id/)
