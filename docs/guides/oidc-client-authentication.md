---
id: oidc-client-authentication
sidebar_position: 2
---

# OIDC Client authentication

In the context of OAuth2 / OpenID Connect, "Clients" refers to applications that request access to protected resources. In Pocket ID, they are configured in the *OIDC Clients* section in the *Settings* portal.

Typically OIDC Clients have a set of credentials that include:

- Client ID: in Pocket ID, this is a UUID that identifies the client (application)
- Client Secret: a shared secret, which in Pocket ID is a randomly-generated sequence of characters

When using OAuth2 with flows such as the "authorization code flow", the most common one for confidential (non-public) clients, in the last step your application exchanges an authorization code for an access token by invoking Pocket ID's `/token` endpoint, and including its client ID and secret in the request.

## Shared secrets and security

Client secrets are a kind of "shared secret", which means it is known to both the client (your application) and Pocket ID. It's a very important secret that must be protected.

Just like with all secrets, however, managing the client secret correctly can be hard. In fact, [OWASP's 2025 list of "Top 10 Non-Human Identities Risks"](https://owasp.org/www-project-non-human-identities-top-10/2025/top-10-2025/) includes "secret leakage" in the second position. In practice, managing secrets, especially shared ones, is hard, and even seasoned DevOps professionals can sometimes make mistakes.

Thankfully, OAuth2 includes alternatives to shared secrets for authenticating clients (applications). This is supported in Pocket ID starting with version 1.3.0, with Federated Client Credentials.

## Using Federated Client Credentials

With Federated Client Credentials, OIDC clients can authenticate themselves (e.g. during the exchange of the authorization code for an access token when invoking the `/token` endpoint) using JWT tokens signed by third-party Identity Providers (IdP).

> Support for Federated Client Credentials in Pocket ID is based on [RFC 7523](https://datatracker.ietf.org/doc/html/rfc7523)

To use Federated Client Credentials:

- You will need an external IdP that can authenticate your application by issuing JWT tokens, for example:
  - On apps running on Kubernetes, you can use service account tokens that are issued by the Kubernetes API server
  - On cloud providers like AWS, Microsoft Azure, GCP, etc, you can use tokens issued by the cloud platform itself (e.g. AWS IAM Roles, Microsoft Entra Workload ID / Managed Identity, etc)
  - [SPIFFE/SPIRE](https://spiffe.io/) 
  - Any other OIDC-compliant IdP
- Your application must support using JWTs for client authentication, as per [RFC 7523 section 2.2](https://datatracker.ietf.org/doc/html/rfc7523#section-2.2). You will need to ensure that your application can obtain a JWT from the external IdP in an appropriate way (see below for some examples), and that you use that token as client assertion during the OAuth2 token exchange.

> To use Federated Client Credentials during the OAuth2 token exchange, your application will need to invoke the `/token` endpoint as per usual (including `grant_type=authorization_code` and the other parameters). However, instead of including a `client_secret`, you need to pass these two options:
>
> - `client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer` (this is a constant value)
> - `client_assertion=<jwt-token>` replacing `<jwt-token>` with the token issued by the external IdP

## Configuring a client for Federated Client Credentials in Pocket ID

When editing a client in Pocket ID (in the *OIDC Clients* section in the *Settings* page), you can configure Federated Client Credentials for the client.

> Federated Client Credentials may be hidden under *Advanced Options* by default.

Each identity allows specifying:

- **Issuer** (required): Must map to the value of the `iss` claim in the JWT tokens issued by the external IdP.
- **Audience**  (optional): Must map to the value of the `aud` claim in the JWT tokens.  
  If empty, this defaults to the public URL of Pocket ID.
- **Subject**  (optional): Must map to the value of the `sub` claim in the JWT tokens.  
  If empty, this defaults to the ID of the OIDC client in Pocket ID (the UUID).
- **JWKS URL**  (optional): URL where the JWKS (JSON Web Key Set) document can be retrieved.  
  If empty, this defaults to `<issuer>/.well-known/jwks.json`.  
  > Note: while HTTP URLs are accepted, using HTTPS is strongly recommended for security.

### Kubernetes Service Account Tokens

Using Kubernetes 1.21 or higher, you can use Projected Token Volumes to have the Kubernetes API server issue a token for the audience of your choice, and make it available to your app as projected volume.

Configuration values for using Kubernetes are:

- **Issuer**: Value of the Kubernetes' API server's issuer (this is generally passed as the value of the `--service-account-issuer` flag for `kube-apiserver`).
- **Audience**: Value of the `audience` option specified when creating the Service Account for the Pod. While you can set this to any value, a good option is to use the public URL of Pocket ID.
- **Subject**: The value is in the format `system:serviceaccount:<namespace>:<service-account-name>`. E.g. for a *ServiceAccount* resource named `my-sa` in the namespace `myappns`, the value is `system:serviceaccount:myappns:my-sa`.
- **JWKS URL** (optional): The URL where the JWKS of the Kubernetes API server can be retrieved from. The default value is `<issuer>/.well-known/jwks.json`.

Inside your application, you can obtain a JWT token to use as client assertion by reading the file where the projected token volume is mounted.

Additional resources:

- Kubernetes docs: [Configure Service Accounts for Pods](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/)
- Kubernetes docs: [Projected Volumes for `serviceAccountToken`](https://kubernetes.io/docs/concepts/storage/projected-volumes/#serviceaccounttoken)

### Microsoft Azure

On Microsoft Azure, you can use Microsoft Entra Workload ID (e.g. Managed Identity or Workload Identity) to federate with Pocket ID.

Set up steps for Azure:

1. Assign an identity to your application, such as a System-assigned or User-assigned Identity. [Instructions](https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview) are specific to each service being used.
   - For workloads running on Azure Kubernetes Service, you may want to use [Workload Identity](https://learn.microsoft.com/en-us/azure/aks/workload-identity-overview)
2. Create an application in Microsoft Entra ID ([docs](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app))
   - Take note of the client ID of this app, which will be a UUID
   - Configure the Entra ID app with Federated credentials for the Managed Identity created for your resource ([docs](https://learn.microsoft.com/en-us/entra/workload-id/workload-identity-federation))

Configuration values for Federated Client Credentials in Pocket ID:

- **Issuer**: `https://sts.windows.net/<tenant-id>/` where `<tenant-id>` is the UUID of your Microsoft Entra ID tenant
- **Audience**: The client ID of the Entra ID application created above
- **Subject**: The object ID of the managed identity (note: this is the _object_ (or _principal_) ID, not a client ID)
- **JWKS URL**: Constant value `https://login.microsoftonline.com/common/discovery/keys`

Inside your application, you can [obtain a token](https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/how-to-use-vm-token) from the Managed Identity by:

- Recommended: using one of the Azure SDKs to get a token from Managed Identity, with the requested *resource* as the client ID of the Entra ID application. SDKs work on all Azure services automatically.
- Manually invoking the endpoint metadata service. The endpoint can be different depending on the Azure service; in the case of an Azure Virtual Machine, the URL is `http://169.254.169.254/metadata/identity/oauth2/token?api-version=2018-02-01&resource=<client-id>` (where `<client-id>` is the client ID of the Entra ID application); make sure to also set the HTTP header `Metadata:true` in the request.
