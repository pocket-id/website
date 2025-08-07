---
id: linkding
---

The following example variables are used, and should be replaced with your actual URLS.

- **linkding.example.com:** The URL of your Linkding instance.
- **pocketid.example.com:** The URL of your Pocket ID instance.

## Pocket ID Setup

1. **Create a New OIDC Client:**  
   In your Pocket ID instance, create a new OIDC Client and give it a name (e.g., "Linkding").

2. **Set a Logo (Optional):**  
   Set a logo for the OIDC Client if desired.

3. **Configure the Callback URL:**  
   Set the callback URL to:

   ```
   https://linkding.example.com/oidc/callback/
   ```

4. **Copy Credentials:**  
   Copy the Client ID and Client Secret provided by Pocket ID for use in Linkding.

## Linkding Setup

This example assumes you are using a docker-compose deployment for Linkding. For more details, see the [Linkding Documentation](https://linkding.link/installation) or more specifically, [the OIDC section](https://linkding.link/options/#ld_enable_oidc).

1. **Edit Your .env File:**  
   Add the following environment variables to your Linkding `.env` file. Replace the placeholder values with those from Pocket ID:

   ```ini
   # Enable OIDC in Linkding
   LD_ENABLE_OIDC=True

   # Client credentials from Pocket ID
   OIDC_RP_CLIENT_ID=<your client id from Pocket ID>
   OIDC_RP_CLIENT_SECRET=<your client secret from Pocket ID>

   # OIDC endpoints
   OIDC_OP_AUTHORIZATION_ENDPOINT=https://pocketid.example.com/authorize
   OIDC_OP_TOKEN_ENDPOINT=https://pocketid.example.com/api/oidc/token
   OIDC_OP_USER_ENDPOINT=https://pocketid.example.com/api/oidc/userinfo
   OIDC_OP_JWKS_ENDPOINT=https://pocketid.example.com/.well-known/jwks.json

   # Use PKCE if required (adjust based on your setup, True by default)
   OIDC_USE_PKCE=False

   # Verify SSL certificate (set to False if using self-signed certificates)
   OIDC_VERIFY_SSL=True

   # Optional: Customize the username claim (defaults to email if not set)
   # OIDC_USERNAME_CLAIM=preferred_username
   ```

2. **Redeploy Linkding:**  
   Save the changes to your `.env` file and redeploy your Linkding instance using docker-compose.

Once redeployed, you should be able to log in using OIDC with Pocket ID.
