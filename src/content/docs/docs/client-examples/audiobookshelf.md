---
title: Audiobookshelf
description: Sign in to the Audiobookshelf audiobook and podcast server with Pocket ID.
client:
  callbackUrls:
    - https://audiobookshelf.example.com/auth/openid/callback
    - https://audiobookshelf.example.com/auth/openid/mobile-redirect
  values:
    - clientId
    - clientSecret
---

::create-client

## Configure Audiobookshelf

1. Sign in to Audiobookshelf as an admin.
2. Open **Settings → Authentication** and select **OpenID Connect Authentication**.
3. Enter `https://id.example.com` in **Issuer URL** and click **Auto-Populate**.
   This fills in all the other URL fields.
4. Enter the **Client ID** from Pocket ID.
5. Enter the **Client secret** from Pocket ID.
6. Change **Subfolder for Redirect URLs** to match how you set up Audiobookshelf.
   In this example, change it to **None** if you use a dedicated subdomain for Audiobookshelf.
7. Set **Match existing users by** to how an OIDC user should be matched with an existing Audiobookshelf user.
8. Turn on **Auto Register** if you want to create a new user when it doesn't exist yet.
9. _(Optional)_ Configure the **Group Claim** (see [Group claim](#group-claim)).
   :::danger
   If you configure **Group Claim**, users who aren't in the `admin`, `user` or `guest` group can't sign in.
   :::
10. _(Optional)_ Configure the `abspermissions` claim (see [Advanced permission claim](#advanced-permission-claim)).
    :::danger
    If you configure `abspermissions`, normal users can't sign in when the claim is missing or invalid.
    :::

### Group claim

Use this if you want to assign permissions automatically based on group membership.

#### Audiobookshelf

Set **Group Claim** under **Settings → Authentication → OpenID Connect Authentication → Group Claim** to `groups`.

#### Pocket ID

1. In Pocket ID, open **Administration → User Groups**.
2. Click **Add Group** and create a group with the **Name** `admin`, `user` or `guest`.
3. Add users to the group that matches the permissions you want them to have.

### Advanced permission claim

#### Audiobookshelf

Set **Advanced Permission Claim** under **Settings → Authentication → OpenID Connect Authentication → Advanced Permission Claim** to `abspermissions`.

#### Pocket ID

1. In Pocket ID, open **Administration → User Groups** and open the group.
2. Under **Custom Claims**, add a claim with the key `abspermissions`.
3. Set the value to valid JSON like this:
   ```json
   {
     "canDownload": true,
     "canAccessAllLibraries": true,
     "canAccessAllTags": true,
     "tagsAreDenylist": false
   }
   ```
4. Save the custom claims.

#### abspermissions fields

```jsonc
{
  "canDownload": false, //Allows a user to download content
  "canUpload": false,   //Allows a user to Upload content
  "canDelete": false,   //Allows a user to delete content
  "canUpdate": false,
  "canAccessExplicitContent": false,  //Allow access to explicit content
  "canAccessAllLibraries": false,     //Allow access to all Libraries (only set to true if nothing is specified below)
  "canAccessAllTags": false,          //Allow access to all tags (only set to true if nothing is specified below)
  "canCreateEReader": false,
  "tagsAreDenylist": false,           //Invert the allowed tags list to a deny list
  "allowedLibraries": [   //Specify which libraries are allowed to be accessed via the library ID
    "5406ba8a-16e1-451d-96d7-4931b0a0d966", //You can get this ID via the Audiobookshelf api
    "918fd848-7c1d-4a02-818a-847435a879ca"  //https://audiobookshelf.example.com/api/libraries
  ],
  "allowedTags": [ //Specify which tags are allowed (or denied)
    "Romance",
    "Fantasy",
    "ThirdTag"
  ]
}
```

## Sources

- https://www.audiobookshelf.org/guides/oidc_authentication
- https://www.audiobookshelf.org/guides/users#access-control
- https://api.audiobookshelf.org/#libraries
