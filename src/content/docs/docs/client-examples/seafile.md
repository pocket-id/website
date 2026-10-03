---
title: Seafile
description: Sign in to Seafile Community Edition with Pocket ID.
client:
  callbackUrls:
    - https://seafile.example.com/oauth/callback
  launchUrl: https://seafile.example.com
  values:
    - clientId
    - clientSecret
    - authorizationUrl
    - tokenUrl
    - userinfoUrl
---

Replace `seafile.example.com` with the URL of your Seafile instance and `id.example.com` with the URL of your Pocket ID instance.

::create-client

## Configure Seafile

Set the following variables in your `seahub_settings.py` file, which is normally located at `/opt/seafile/conf/seahub_settings.py` on your Seafile server:

```python
ENABLE_OAUTH = True
OAUTH_CREATE_UNKNOWN_USER = True
OAUTH_ACTIVATE_USER_AFTER_CREATION = True

# Only set this to True if you are NOT using HTTPS
OAUTH_ENABLE_INSECURE_TRANSPORT = False

# ---- Pocket ID client credentials ----
OAUTH_CLIENT_ID = "<client-id>"
OAUTH_CLIENT_SECRET = "<client-secret>"

# ---- Redirect URL (must match the Pocket ID callback URL) ----
OAUTH_REDIRECT_URL = "https://seafile.example.com/oauth/callback"

# ---- Pocket ID OIDC endpoints ----
OAUTH_PROVIDER = "pocket-id"
OAUTH_PROVIDER_DOMAIN = "pocket-id"   # <= required for Seafile < 11.0 compatibility

OAUTH_AUTHORIZATION_URL = "https://id.example.com/authorize"   # Authorization URL from Pocket ID
OAUTH_TOKEN_URL = "https://id.example.com/api/oidc/token"      # Token URL from Pocket ID
OAUTH_USER_INFO_URL = "https://id.example.com/api/oidc/userinfo"   # Userinfo URL from Pocket ID

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

## Match existing local users to OIDC login

When OIDC is configured in Seafile, users with an existing local account who sign in get a brand new account.
Seafile doesn't automatically match the user to their existing local Seafile account.
Automatic user matching is only available for LDAP accounts.
This appears to be a deliberate design decision rather than a feature that isn't implemented yet.

This can cause issues if the existing local account has the **User ID** set to an email address, but the **Contact Email** is blank.
The OIDC login creates a new account with `LONG_GUID@auth.local` as the **User ID** and the email address as the **Contact Email**.
The original account then can't sign in because its **User ID** clashes with the new account's **Contact Email**.
An administrator needs to resolve this.

To match OIDC logins to existing local accounts, make manual changes to the Seafile databases with the following steps.

### Get the Seafile user ID

1. To get the **User ID** (email) of a user, sign in to Seafile as an admin, click the user photo at the top right and click **System Admin**.
2. Click **Users**, then click the name of the user you want to enable for OIDC.
   Copy the **User ID**.

### Get the Pocket ID user sub

1. Sign in to Pocket ID as an admin.
2. Open **Administration → OIDC Clients** and open the client you created for Seafile.
3. Click **OIDC Data Preview** at the top of the client's page.
4. Select the correct user, then copy the value of `sub`.

### Match the user in the MariaDB database

Connect to the command line of your Seafile database server or container and run the following commands (the first command requires the MariaDB root password):

```bash
mysql -u root -p

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

# Add the email, provider (the pocket-id provider configured earlier) and sub from Pocket ID to the social_auth_usersocialauth table
MariaDB [seahub_db]> insert into `social_auth_usersocialauth` (`username`, `provider`, `uid`, `extra_data`) values ('joe@example.com', 'pocket-id', '5942c94c-1b20-509d-964f-dc95835d3484', '');

# Check the command has worked
MariaDB [seahub_db]> select * from social_auth_usersocialauth;
+----+-------------------------+-----------+--------------------------------------+------------+
| id | username                | provider  | uid                                  | extra_data |
+----+-------------------------+-----------+--------------------------------------+------------+
|  6 | joe@example.com         | pocket-id | 5942c94c-1b20-509d-964f-dc95835d3484 |            |
+----+-------------------------+-----------+--------------------------------------+------------+
```

When `joe@example.com` now signs in to Seafile with Pocket ID, he sees his existing account instead of getting a new one.
