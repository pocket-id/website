---
title: Nextcloud
description: Sign in to Nextcloud with Pocket ID.
---

Nextcloud doesn't come with OIDC/SSO out of the box, so you need to install a Nextcloud app for it.
There are two main options: `nextcloud/user_oidc` and `pulsejet/nextcloud-oidc-login`.
This guide uses **`nextcloud/user_oidc`**, because it's maintained by Nextcloud and is expected to be supported longer.

Replace `nextcloud.example.com` with the domain of your Nextcloud instance and `id.example.com` with the domain of your Pocket ID instance.

## Create the client in Pocket ID

1. In Pocket ID, open **Administration → OIDC Clients** and click **Add OIDC Client**.
2. Enter a name such as `Nextcloud`, keep **Confidential Client** as the client type and add the callback URL `https://nextcloud.example.com/apps/user_oidc/code`.
3. Click **Create** and copy the **Client ID**, the **Client secret** and the **OIDC Discovery URL**.
   Also copy the **Logout URL**, which is under **Show more details**.
   The client secret is only shown once.
4. On the client's **General** tab, set **Back-Channel Logout URL** to the address the `user_oidc` app gives you.
   Usually it's `https://nextcloud.example.com/apps/user_oidc/backchannel-logout/PocketID`, where `PocketID` is the identifier you give the provider in Nextcloud.
   Consider turning on **PKCE**, then save.
5. On the client's **Access** tab, select the groups that may sign in under **Allowed User Groups**, or choose **All Users**.

## Configure Nextcloud

1. Sign in to Nextcloud with your admin account.
2. In the upper right corner, click your profile picture and select **Apps**.
3. Under **Integration**, select **OpenID Connect user backend** and install it.
4. After installing, go to **Administration settings → OpenID Connect**.
5. Click **+** and fill in the information as follows:
   1. **Identifier**: `PocketID` (suggestion only)
   2. **Client ID**: the **Client ID** from Pocket ID.
   3. **Client secret**: the **Client secret** from Pocket ID.
   4. **Discovery endpoint**: the **OIDC Discovery URL** from Pocket ID.
   5. **Custom end session endpoint**: the **Logout URL** from Pocket ID.
   6. **Scope**: `openid email profile groups`
   7. By default, Nextcloud creates a new user when someone signs in with Pocket ID.
      If you want to sign in with an existing Nextcloud user, you need to tell Nextcloud how to match Pocket ID users with Nextcloud users.
      You can either:
      - Match accounts using a custom claim: set **User ID mapping** to `nextcloud_username`.

        Then, for each user in Pocket ID, add a custom claim under **Custom Claims** on the user's page, with the key `nextcloud_username` and the Nextcloud account name to sign in to as the value.

      - If you have turned off **Enable Self-Account Editing** in the Pocket ID configuration, match accounts using the Pocket ID username directly: set **User ID mapping** to `preferred_username`.

        If **Enable Self-Account Editing** is on, Pocket ID users can change their own username and therefore choose the Nextcloud account they sign in to.

   8. _(Optional)_ Open **Extra-Attribute-Mapping** and set **Avatar-Mapping** to `picture`.
      This downloads the profile picture from Pocket ID.
   9. _(Optional)_ Check **Use group provisioning** if you want Pocket ID groups to be replicated on Nextcloud.
   10. _(Optional)_ If you use groups, you can whitelist them with **Group-Whitelist-Regex**, for example `^(nextcloud_(admins|users))$`.
       This regex matches both the `nextcloud_admins` and `nextcloud_users` groups.
       If you also enable the next option, **User Login only matching Whitelist-Regex**, only users in these groups have access.
   11. Check **Use unique user ID** and uncheck **Send ID token hint on logout**.

6. After creating the provider, make sure the **Backchannel Logout URL** and **Redirect URI** shown by Nextcloud match the **Back-Channel Logout URL** and the callback URL in Pocket ID.

## Sign in on the Nextcloud mobile app

The Nextcloud app for iOS doesn't accept passkey input, which creates a small barrier when using Pocket ID.
If you didn't disable the regular login, you can use your Nextcloud username and password to sign in.
If you disabled the regular login, create a **Login Code** on your Pocket ID dashboard (`id.example.com`).
Then open the Nextcloud app and add your Nextcloud URL (`nextcloud.example.com`).
When the Pocket ID login appears, select **Don't have access to your passkey?**, select **Login Code** and enter the code you created.

## Disable the Nextcloud login form

You can disable the built-in login form in two ways, with slightly different outcomes:

1. Hide the login form: in the Nextcloud `config.php`, set `'hide_login_form' => true`.
   Nextcloud still shows its login page at `nextcloud.example.com`, but it says "The Nextcloud login form is disabled." and shows a `Login with PocketID` button instead.
   The login form is only hidden and can still be accessed by appending `login?direct=1` to the URL: `nextcloud.example.com/login?direct=1`.

   ![Nextcloud login page with the login form disabled](https://github.com/user-attachments/assets/a34b5ea2-bc86-4d10-8a0e-6c253329235e)

2. Remove the login form: run a command with the Nextcloud CLI inside the container.
   Since there are many containers and platforms, make sure to use the right form for your container and platform.
   1. Run `occ config:app:set user_oidc allow_multiple_user_backends --value=0`.
   2. The built-in login form is no longer available at `nextcloud.example.com`, and you're automatically redirected to sign in with Pocket ID.
   3. This only works if there is a single OIDC provider and no other login methods.

## Troubleshooting

If you can't sign in to Nextcloud:

1. Using the Nextcloud CLI, reactivate the login form: `occ config:app:set user_oidc allow_multiple_user_backends --value=1`.
2. Remove the current OIDC configuration with `occ user_oidc:provider:delete PocketID`.
   Replace `PocketID` with the identifier you used, or the one listed by `occ user_oidc:provider`.
3. Create a new OIDC connection with the command below.
   Make sure to adjust it as appropriate.
   1. After the command is run and you can login back to Nextcloud, make sure to adjust the `Scope`and
   2. Run:

      ```bash
      occ user_oidc:provider PocketID \
          --clientid="<client-id>" \
          --clientsecret="<client-secret>" \
          --discoveryuri="https://id.example.com/.well-known/openid-configuration" \
          --mapping-uid="preferred_username" \
          --unique-uid=1 \
          --send-id-token-hint=0
      ```

      Replace `PocketID`, `<client-id>`, `<client-secret>` and the discovery URL with your identifier and the **Client ID**, **Client secret** and **OIDC Discovery URL** from Pocket ID.
