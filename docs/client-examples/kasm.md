---
id: kasm
---

# Kasm

## Kasm Setup
1. In Kasm, login using an administrator account
2. From the navigation pane on the left, select 'Access Management' --> 'Authentication' --> 'OpenID'
3. Click the 'Add Config' button on the right. Scroll to the bottom of the page and copy the 'redirect URL' - this will be the callback URL configured in PocketID
4. Open PocketID in a new tab and continue configuration below.

## Pocket ID Setup

1. In Pocket ID, create a new OIDC client (example: `kasm`).
2. Set the Callback URL to the value of the 'redirect URL' copied from Kasm (example: `https://kasm.domain.com/api/oidc_callback`)
3. Do *not* enable PKCE, as it is not supported by Kasm
4. Copy the generated **Client ID** and **Client Secret** values for next steps.

## Kasm Setup, continued
1. Back in the Kasm admin view, fill out the fields as follows:

    a. Display name: the string a Kasm user will see when logging in (example: `Click here to authenticate with PocketID`, or similar)

    b. Auto login: This can be optionally enabled to bypass the Kasm local login and go straight to PocketID. This can be enabled *after* setup is complete.

    c. Client ID: Enter the Client ID value from PocketID

    d. Client Secret: Enter the Client Secret value copied from PocketID

    e. Authorization URL: Enter the Authorization URL copied from PocketID

    f. Token URL: Enter the Token URL copied from PocketID

    g. User Info URL: Enter the Userinfo URL copied from PocketID

    h. Scope: The following values can be entered: [`openid, email, profile, groups`]. These values can be extracted by entering the OIDC Discovery URL in a web browser, and looking for the "scopes_supported" string

    i. Username attribute: Enter "preferred_username"

    j. Groups attribute: Enter "groups"

    k. Redirect URL: This value is pre-populated and doesn't need to be changed

    l. OpenID Connect Issuer: This URL is optional and is simply the base URL where PocketID is accessed (example: `https://auth.domain.com`)

    m. Logout with OIDC provider: This is configured in conjunction with the value from step `l` above. If configured, this will prompt a user who logs out of Kasm to also log out of PocketID for additional security.

## Testing

Once setup, save all configurations and login to Kasm in a private/incognito browser window. You should be able to click PocketID to login accordingly.  If auto-login was enabled, it will redirect to PocketID immediately, skipping the Kasm local login.

**Note**: In case you need to login to Kasm using local accounts (for instance, admin access), this can be done by click "Cancel" in PocketID before selecting your passkey. If auto login is enabled, this has to be done quickly before PocketID redirects to Kasm.
