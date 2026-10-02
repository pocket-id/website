---
title: Dozzle
description: Integrate Dozzle authentication with Pocket ID
---

## Requirements

- [Dozzle](https://github.com/amir20/dozzle)
- HTTPS connection to your Pocket ID server

### Setting up Dozzle with Pocket ID

Dozzle now natively supports OICD, there is no need for middleware proxy anymore.

1. Create a new OIDC client in Pocket ID for Dozzle: 
    
    - **Name:** `Dozzle` # can be whatever
    - **Callback URLs:** `https://dozzle.example.com/api/auth/callback`.

    Copy the **Client ID** and **Client Secret** values for use later.
    
2. Add the following to your existing Dozzle compose or .env file:
   
    ```yml
    environment:
        DOZZLE_AUTH_PROVIDER: oidc # do not change.
        DOZZLE_AUTH_OIDC_NAME: pocket-id # this is just a visual control to set the label in the login button, It is not necessary.
        DOZZLE_AUTH_OIDC_ISSUER: https://pocketid.example.com # base domain only, dozzle will automatically fetch the well-known endpoint.
        DOZZLE_AUTH_OIDC_CLIENT_IDL: ${client-id generated before}
        DOZZLE_AUTH_OIDC_CLIENT_SECRET: ${client-secret generated before}
        
    ```

3. Dozzle requires custom claims in order to allow login:

  - In pocket-id go to Administration > Users.
  - Click on the user you wish to grand dozzle access.
  - Navigate to the last tab: Custom Claims.
  - Create a key:value such as dozzle_roles : all,^shell (this will grant full access to the user, minus the ability to attach shell to containers, for security reasons)
    To customize the value of the dozzle_roles see the possible options at the [Dozzle docs](https://dozzle.dev/guide/authentication/oidc#roles)
   
   
4. Finally - restart your Docker compose stack, remember to recreate the container to pick up the env changes. 
   

