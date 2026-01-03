---
title: Node-RED
description: Set up Node-RED with Pocket ID authentication
---

## Pocket ID Setup

1. In Pocket-ID create a new OIDC Client, name it i.e. `node-red`.
2. Set a logo for this OIDC Client if you would like too.
3. Set the callback URL to: `https://nodered.yoururl.com/auth/strategy/callback`, or leave blank to autofill on first login.
4. Copy the `Client ID`, and `Client Secret` for use in the next steps.

## Node-RED Setup

Make sure the following "Passport strategy" package is installed:

```sh
npm install passport-openidconnect
```

Replace the adminAuth section in settings.js (adjust to your specific requirements):

```yaml
adminAuth: {
    type: 'strategy',
    strategy: {
        name: 'openidconnect',
        label: 'Sign in with Pocked-ID',
        icon: 'fa-openid',
        strategy: require('passport-openidconnect').Strategy,
        options: {
            issuer: 'https://pocketid.yoururl.com',
            authorizationURL: 'https://pocketid.yoururl.com/authorize',
            tokenURL: 'https://pocketid.yoururl.com/api/oidc/token',
            userInfoURL: 'https://pocketid.yoururl.com/api/oidc/userinfo',
            clientID: 'yourclientid',
            clientSecret: 'yourclientsecret',
            callbackURL: 'https://node-red.yoururl.com/auth/strategy/callback',
            scope: ['openid', 'email', 'profile', 'groups'],
            proxy: true,
            verify: function(issuer, profile, done) {
                done(null, profile)
            }
        }
    },
    users: function(user) {
        return Promise.resolve({ username: user, permissions: "*" });
    }
},
```
Restart the container after editing the settings.js file.
