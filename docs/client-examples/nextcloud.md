
Nextcloud does not come with OIDC/SSO installed out-of-the-box. Therefore, it's necessary to install a Nextcloud app for this functionality. There are two main options: `nextcloud/user_oidc` and `pulsejet/nextcloud-oidc-login`. This guide will focus on **`nextcloud/user_oidc`**, as it is maintained by Nextcloud and is expected to be supported longer. 

The following example variables are used and should be replaced with your actual URLs:
- `nextcloud.example.com` (The URL of your Nextcloud instance.)
- `id.example.com` (The URL of your Pocket ID instance.)

## Pocket ID Setup

1. In Pocket ID create a new OIDC Client, name it, for example, `Nextcloud`.
2. Set a logo for this OIDC Client if you would like to.
3. Set the callback URL to: `https://nextcloud.example.com/apps/user_oidc/code`.
4. Set the Logout Callback URLs to the address the nextcloud/user_oidc plugin will give you. For most of the time it will be the address below with the portion `PocketID` being the name you gave to it on Nextcloud. e.g:`https://nextcloud.example.com/apps/user_oidc/backchannel-logout/PocketID`.
5. Leave `Public Client` and `PKCE` unchecked.
6. Copy the `Client ID`, `Client Secret`, `OIDC Discovery URL` and `Logout URL` for use in the next steps.

## Nextcloud Setup

1. Login to Nextcloud with your admin account.
2. On the right upper corner, click your profile picture/logo and select `Apps`
3. On `Integration`select `OpenID Connect user backend` and install it.
4. After installing, go to `Administration settings`-> `OpenID Connect`.
5. Click the `+` and add the information and add the information as follows:
	1. `Identifier` -> `PocketID` (suggestion only)
	2. `Client ID` -> `Client ID`from Pocket ID
	3. `Client secret` -> `Client Secret` from Pocket ID
	4. `Discovery endpoint` -> `OIDC Discovery URL`from Pocket ID
	5. `Custom end session endpoint`-> `Logout URL`from Pocket ID
	6. `Scope` -> openid email profile
	7. By default, Nextcloud will create a new user when logging in using Pocket ID. If you want to log in with an existing Nextcloud user, you need to tell Nextcloud how to match Pocket ID users with Nextcloud users. You can either:
 		- Match accounts using a custom claim: `User ID mapping` -> nextcloud_username

		  And for each user in the Pocket ID configuration, add a custom claim `nextcloud_username` -> the Nextcloud account name to log into.

		- If you have unchecked `Enable Self-Account Editing` in the Pocket ID configuration, match accounts using the Pocket ID username directly: `User ID mapping` -> preferred_username
  
		  (if `Enable Self-Account Editing` is enabled, Pocket ID users are allowed to change their own username and therefore chose the Nextcloud account they log into!)
	8. (Optional) Check `Use group provisioning`if you want Pocket ID groups to be replicated on Nextcloud
	9. `Use unique user ID` -> Checked, `Send ID token hint on logout` -> Unchecked
6. After the creation of the Provider, make sure `Backchannel Logout URL` and `Redirect URI` matches the setting on Pocket ID.

## Logging In on Nextcloud on mobile (Important)

The mobile app for Nextcloud on IOS does not accept passkey input, which create a small barrier when using Pocket ID. If you didn't disable regular login, you can use your Nextcloud username and password to login. If you disabled the regular login, you have to create a `Login Code`on your Pocket ID dashboard (id.example.com). After getting the `Login Code`, go to the Nextcloud app, add your Nextcloud URL (nextcloud.example.com). When Pocket ID login appears, select `Don't have access to your passkey?`, select `Login Code`and enter the code you received previously. 

## Disabling traditional login In on Nextcloud

You can disable the built-in login form with 2 different ways, which are going to produce slightly different outcomes:

1. Disabling login form: On the `config.php`of Nextcloud, set an entry for `'hide_login_form' => true`. This will still show Nextcloud login page when going to `nextcloud.example.com`, but it show that "The Nextcloud login form is disabled." and a button to `Login with PocketID`will appear instead. 
	1. The login form is only hidden and can be access by appending login?direct=1 to the URL `nextcloud.example.com/login?direct=1`.
![Img 1](https://github.com/user-attachments/assets/a34b5ea2-bc86-4d10-8a0e-6c253329235e)


1. Remove built-in login form: You have to execute a command inside the container using Nextcloud CLI method. Since there are many containers and platforms, please make sure use the appropriate form for you container/platform combo
	1. Run -> `occ config:app:set user_oidc allow_multiple_user_backends --value=0`
	2. The built-in login form won't be available anymore when going to `nextcloud.example.com`and will be automatically redirected to login with Pocket ID
	3. This only works if the user have a single OIDC provider and no other login methods

## Troubleshooting if you can't login into Nextcloud

1. Using Nextcloud CLI, reactivate the login form: `occ config:app:set user_oidc allow_multiple_user_backends --value=1`
2. Remove current ODIC configuration with `occ user_oidc:provider:delete PocketID`. Substitute `PocketID`to the name you used or the one listed on `user_oidc:provider`
3. Create a new OIDC connection with the command below. Make sure to adjust as appropriate. 
	1. After the command is run and you can login back to Nextcloud, make sure to adjust the `Scope`and 
	2. occ user_oidc:provider `Identifier` \
     --clientid="`Client ID`" \
     --clientsecret="`Client secret`" \
     --discoveryuri="`OIDC Discovery URL`" \
     --mapping-uid="preferred_username" \
     --unique-uid=1 \
     --send-id-token-hint=0
     
     *(Note: Replace 'Identifier', "Client ID", "Client Secret", and "OIDC Discovery URL" with your actual values.)*
     
