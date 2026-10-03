---
title: Node-RED
description: Sign in to the Node-RED editor with Pocket ID.
client:
  callbackUrls:
    - https://nodered.example.com/auth/strategy/callback
  values:
    - clientId
    - clientSecret
    - authorizationUrl
    - tokenUrl
    - userinfoUrl
---

::create-client

## Configure Node-RED

1. Make sure the following Passport strategy package is installed:

   ```bash
   npm install passport-openidconnect
   ```

2. Replace the `adminAuth` section in `settings.js` (adjust it to your requirements):

   ```js
   adminAuth: {
       type: 'strategy',
       strategy: {
           name: 'openidconnect',
           label: 'Sign in with Pocket ID',
           icon: 'fa-openid',
           strategy: require('passport-openidconnect').Strategy,
           options: {
               issuer: 'https://id.example.com',
               authorizationURL: 'https://id.example.com/authorize',
               tokenURL: 'https://id.example.com/api/oidc/token',
               userInfoURL: 'https://id.example.com/api/oidc/userinfo',
               clientID: '<client-id>',
               clientSecret: '<client-secret>',
               callbackURL: 'https://nodered.example.com/auth/strategy/callback',
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

3. Restart the container after editing `settings.js`.
