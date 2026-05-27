---
title: Seafile
description: Configure Seafile Community Edition authentication with Pocket ID
---

> The following example uses `seafile.example.com` and `id.example.com`, make sure to update these to your server names.


### Create Pocket-ID OIDC Client
1. In Pocket-ID create a new OIDC Client, name it i.e. `Seafile`.
2. Set the client launch URL to: `https://seafile.example.com`.
2. Set the callback url to: `https://seafile.example.com/oauth/callback`, or leave blank to autofill on first login.
3. Save the configuration and copy the following information for use in the following steps:<br>
  a) `Client ID`<br>
  b) `Client Secret`<br>
  c) `Authorization Endpoint`<br>
  d) `Token Endpoint`<br> 
  e) `Userinfo Endpoint`<br>


### Seafile Seahub-settings.py OIDC Settings
Set the following variables in your seahub-settings.py file, which is normally located at `/opt/seafile/conf/seahub_settings.py` on your Seafile server:

```bash
ENABLE_OAUTH = True 
OAUTH_CREATE_UNKNOWN_USER = True
OAUTH_ACTIVATE_USER_AFTER_CREATION = True

# Only set this to True if you are NOT using HTTPS
OAUTH_ENABLE_INSECURE_TRANSPORT = False

# ---- Pocket-ID Client Credentials ----
OAUTH_CLIENT_ID = # Paste in Client ID copied above
OAUTH_CLIENT_SECRET = # Paste in Client Secret copied above

# ---- Redirect URL (must match Pocket-ID client config) ----
OAUTH_REDIRECT_URL = "https://seafile.example.com/oauth/callback"

# ---- Pocket-ID OIDC Endpoints ----
OAUTH_PROVIDER = "pocket-id"
OAUTH_PROVIDER_DOMAIN = "pocket-id"   # <= required for Seafile < 11.0 compatibility

OAUTH_AUTHORIZATION_URL = # Paste in Authorization Endpoint copied above
OAUTH_TOKEN_URL = # Paste in Token Endpoint copied above
OAUTH_USER_INFO_URL = # Paste in Userinfo Endpoint copied above

# ---- OIDC Scopes ----
OAUTH_SCOPE = [
    "openid",
    "profile",
    "email"
]

# ---- Attribute Mapping ----
OAUTH_ATTRIBUTE_MAP = {
    "sub": (True, "uid"),               # required unique identifier
    "name": (False, "name"),
    "email": (False, "contact_email"),
}

# Force Seafile desktop & mobile clients to redirect to web browser for SSO authentication
CLIENT_SSO_VIA_LOCAL_BROWSER = True
```


### Match Existing Local Users to OIDC Login
When OIDC is configured in Seafile, users with an existing local account who log in will have a brand new account created for them. Seafile will not automatically match the user to their existing local Seafile account. Automatic user matching is only available for LDAP accounts. This appears to be a deliberate design decision, rather than a feature which is not yet implemented.

This can cause issues if the existing local account has the *User ID* set to an email address, but *Contact Email* address is blank. The OIDC login will create a new account with *LONG_GUID@auth.local* as the User ID and the email address as the *Contact Email*. The original account now can't log in because the *User ID* clashes with the new account *Contact Email*. An administrator will need to resolve this.

To match OIDC logins to existing local accounts, manual changes need to be made to the Seafile databases using the following steps:


#### Get Seafile User ID
1. To get the *User ID* (email) of a user, login in to Seafile as an admin, click on the user photo at to the top-right and click on *System Admin*.

2. Click on *Users* and then click on the name of the user you want to enable for OIDC. Copy the *User ID*.


#### Get Pocket-ID User UID/Sub
3. To get the UID/Sub from Pocket-ID, log in to Pocket-ID as an admin.

4. Click on *Administration - OIDC Clients*, then edit the OIDC Client you set up for Seafile.

5. Scroll to the bottom of the settings screen and click the *Show* button next to *OIDC Data Preview*.

6. In the new window, make sure the correct user is select from the *Users* drop-down menu, then scroll to the bottom and copy the value for *sub*.


#### Match User in MariaDB Database

Connect to the command line of your Seafile database server/container and run the following commands (the first command requires the MariaDB root password):

```Bash
MySQL -u root -p

# Connect to ccnet_db database
MariaDB [(none)]> use ccnet_db;

# Check the User ID/email and password of the local account you want to match
MariaDB [ccnet_db]> select email,left(passwd,25) from EmailUser where email = 'joe@example.com';
+-------------------------+---------------------------+
| email                   | left(passwd,25)           |
+-------------------------+---------------------------+
| joe@example.com         | PBKDF2SHA256$10000$53a6a8 |
+-------------------------+---------------------------+

# Blank the password
MariaDB [ccnet_db]> update EmailUser set passwd = '!' where email = 'joe@example.com';

# The password command should now show a blank password
MariaDB [ccnet_db]> select email,left(passwd,25) from EmailUser where email = 'joe@example.com';
+-------------------------+-----------------+
| email                   | left(passwd,25) |
+-------------------------+-----------------+
| joe@example.com         | !               |
+-------------------------+-----------------+

# Connect to the seahub_db database
MariaDB [ccnet_db]> use seahub_db;

# Add the email, provider (Pocket-ID provider created earlier) and Sub from Pocket-ID to the social_auth_usersocialauth table
MariaDB [seahub_db]> insert into `social_auth_usersocialauth` (`username`, `provider`, `uid`, `extra_data`) values ('joe@example.com', 'pocket-id', '5942c94c-1b20-509d-964f-dc95835d3484', '');

# Check the command has worked
MariaDB [seahub_db]> select * from social_auth_usersocialauth;
+----+-------------------------+-----------+--------------------------------------+------------+
| id | username                | provider  | uid                                  | extra_data |
+----+-------------------------+-----------+--------------------------------------+------------+
|  6 | joe@example.com         | pocket-id | 5942c94c-1b20-509d-964f-dc95835d3484 |            |
+----+-------------------------+-----------+--------------------------------------+------------+
```

When joe@example.com now authenticates to Seafile using Pocket-ID, he will see his existing account, rather than having a new one created for him.
