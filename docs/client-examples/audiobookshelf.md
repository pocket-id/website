---
title: Audiobookshelf
description: Configure OIDC authentication for Audiobookshelf
---

The following example variables are used, and should be replaced with your actual URLs.

- `audiobookshelf.example.com` (The URL of your Audiobookshelf instance.)
- `id.example.com` (The URL of your Pocket ID instance.)

## Pocket-ID setup

1. In Pocket-ID create a new OIDC Client, name it, for example `audiobookshelf`
2. Set a logo for this OIDC Client if you would like to.
3. Set the callback URLs to: `https://audiobookshelf.example.com/auth/openid/callback` and add another one, for the mobile app to `https://audiobookshelf.example.com/auth/openid/mobile-redirect`.
4. Copy the `Client ID` and `Client Secret` for use in the next steps.

## Audiobookshelf setup

1. Log in to Audiobookshelf as an admin.
2. Go to **Settings → Authentication** check the checkbox for **OpenID Connect Authentication**
3. In the field **Issuer URL** put `id.example.com` and click on **Auto-Populate**, this should automatically populate all the other URL fields.
4. Enter the **Client ID**.
5. Enter the **Client Secret**.
6. Change the **Subfolder for Redirect URLs** according to how you configured Audiobookshelf. In this example change it to **None**, if you are using a dedicated subdomain for it.
7. Change **Match existing users by**, to what you want it to match an OIDC user with an existing (Audiobookshelf) user by.
8. Toggle **Auto Register** to true, if you want to create a new user if it does not exist.
9. Configure the **group claim** if you want.
   > [!CAUTION]
   > If you configure **group claim**, you will not be able to sign in as user. If you're not part of admin, user or guest.
10. Configure the **abspermissions** claim if you want.

> [!CAUTION]
> If you configure **abspermissions**, you will not be able to sign in as a normal user. If your configuration for it is not valid or not configured.

### Group Claim

If you want to automatically assign permissions based on group membership.

#### Audiobookshelf

Set the **Group Claim** under **Settings → Authentication → OpenID Connect Authentication → Group Claim** to `groups`.

#### Pocket-ID

Create a group `admin`, `user` or `guest` via **User Groups → Add Group**. Add the users depending on what permissions you want them to have to the groups.

### Advanced Permission Claim

#### Audiobookshelf

Set the **Advanced permission Claim** under **Settings → Authentication → OpenID Connect Authentication → Advanced Permission Claim** to `abspermissions`.

#### Pocket-ID

1. Create a custom claim for the group `yourgroupname` under **User Groups → Manage User Groups → `yourgroupname` → ... → Edit → Custom Claims → + Add custom claim**.
2. Set Key to `abspermissions`
3. set value to a valid JSON like this:

```json
{
  "canDownload": true,
  "canAccessAllLibraries": true,
  "canAccessAllTags": true,
  "tagsAreDenylist": false
}
```

#### Little explanation of the abspermissions:

```
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
