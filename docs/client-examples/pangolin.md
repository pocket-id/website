---
title: Pangolin
description: Configure Pangolin with Pocket ID authentication
---

## Pocket ID Setup

1. In Pocket ID create a new OIDC Client, name it, for example, `Pangolin`
2. Note the `Client ID`, `Client Secret`, `Authorization URL` and `Token URL` for the following steps
3. Leave the `Callback URL` blank to auto-fill


## Pangolin Setup

 1. Log into Pangolin using your superuser account
 2. Under Server Admin, select Identity Providers, then "**+ Add Identity Provider**"
 3. Enter the following:
	- ### Identity Provider
		 1. Name: **PocketID** (or anything you want)
		 2. Enable **Auto Provision Users** (only if you want auto provisioning)
	- ### Provider Type
		1. Select **OAuth2/OIDC**

	- ### OAuth2/OIDC Configuration
		1. Client ID: Your **Client ID** from Pocket ID
		2. Client Secret: Your **Client Secret** from Pocket ID.
		3. Authorization URL: Your **Authorization URL** from Pocket ID.
		4. Token URL: Your **Token URL** from Pocket ID.

	- ### Token Configuration
		1. Identifier Path: One of `email`, `preferred_username` or `sub` (Advanced)
		2. Email Path: `email`
		3. Name Path: `name`
		4. Scopes: `openid profile email` (include `groups` for auto provisioning)

5. Save your new Identity Provider
6. Create User

	 - ### Auto Provision
		View [Pangolin's docs on Auto Provisioning](https://docs.pangolin.net/manage/identity-providers/auto-provisioning) for more advanced setups
		1. Create **User Group** in Pocket ID
			- Friendly Name: `Admin` (or anything you want)
			- Name: `admin` (or anything you want)
		 2. Add desired admin users to group
		 3. (In your Pangolin instance under Server Admin, Identity Providers, edit Pocket ID) Make sure **Auto Provision Users** is enabled and your token **scopes** include `groups`
		 4. Navigate to **Organization Policies**
		 5. Enter the following:
			 - #### Default Mappings
				 1. Default Role Mapping: `contains(groups, 'admin') && 'Admin' || 'Member'` (replace `admin` with whatever your user group name is)
				 2. Default Organization Mapping: `'YOUR PANGOLIN ORGANIZATION ID'` (there is examples of [advanced mappings in Pangolin's docs](https://docs.pangolin.net/manage/identity-providers/auto-provisioning#selecting-organizations)
				 3. **Save Default Mappings**

	
	 -  ### Manually 
		1. Back in your Pangolin instance, go to your organization, select Users, then "+ Create User".
		2. Select "External User", select your Pocket ID Identity provider, and fill in the relevant details.

			Depending on what you configured in `Identifier Path`, you'll need to add that in the `username` field.

			- `email` will be your Pocket ID email.
			- `preferred_username` will be your Pocket ID username.

7. Once you have your user created, you can save, log out from Pangolin, and test your new OIDC connection.

## Errors

### User not provisioned (Manual) in the system

Make sure you have a user created in Pangolin and that the "Username" matches the `Identifier Path` used.

### After logging in with OIDC connection (Auto Provisioned) `There was a problem connecting to Pocket ID. Please contact your administrator.`

Make sure in your Pangolin instance under Server Admin, Identity Providers, edit Pocket ID, the token **scopes** include `groups`

### Invalid callback URL, it might be necessary for an admin to fix this

Your Callback URL is not correctly defined in Pocket ID. Make sure this matches the `Redirect URL` in your Pangolin OIDC config.

This should be automatically setup in [recent versions](https://github.com/pocket-id/pocket-id/pull/583).

Example: `https://pangolin.example.com/auth/idp/1/oidc/callback`
