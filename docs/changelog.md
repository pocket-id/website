---
title: 'Changelog'
description: 'Release notes for pocket-id'
---

## v2.0.0 - 2026-01-02

[Release](https://github.com/pocket-id/pocket-id/releases/tag/v2.0.0)

> [!WARNING]  
> This is a major release which includes some breaking changes, please follow the [migration guide](https://pocket-id.org/docs/setup/major-releases/migrate-v2) to upgrade to `v2`. 

### Features

- add support for SCIM provisioning ([#1182](https://github.com/pocket-id/pocket-id/pull/1182) by @stonith404)
- add CLI command for importing and exporting Pocket ID data ([3420a00](https://github.com/pocket-id/pocket-id/commit/3420a000737d89a5c3c6c250d171d96126553beb) by @stonith404)
- add HTTP `HEAD` method support ([#1135](https://github.com/pocket-id/pocket-id/pull/1135) by @stonith404)
- add email logo customization ([#1150](https://github.com/pocket-id/pocket-id/pull/1150) by @MelvinSnijders)
- add ability define user groups for sign up tokens ([#1155](https://github.com/pocket-id/pocket-id/pull/1155) by @stonith404)
- minor redesign of auth pages ([08e4ffe](https://github.com/pocket-id/pocket-id/commit/08e4ffeb600a4a6644d91b1600b0205997ed1685) by @stonith404)
- allow audit log retention to be controlled by env variable ([#1158](https://github.com/pocket-id/pocket-id/pull/1158) by @jenic)
- restrict oidc clients by user groups per default ([#1164](https://github.com/pocket-id/pocket-id/pull/1164) by @stonith404)
- add "restricted" column to oidc client table ([1bc9f5f](https://github.com/pocket-id/pocket-id/commit/1bc9f5f7e780310d81608381544ba530df7f433b) by @stonith404)
- drop support for storing JWK on the filesystem ([f014458](https://github.com/pocket-id/pocket-id/commit/f0144584af90b918a3157a298f1bb95928a117b8) by @stonith404)
- remove DbProvider env variable and calculate it dynamically ([ba2f0f1](https://github.com/pocket-id/pocket-id/commit/ba2f0f18f4bacc5a86217dec0b0dcb6030c40cb9) by @kmendell)


### Bug Fixes

- update image format message to include WEBP ([#1133](https://github.com/pocket-id/pocket-id/pull/1133) by @sebdanielsson)
- add Japanese locale to inlang settings ([#1142](https://github.com/pocket-id/pocket-id/pull/1142) by @tai-ga)
- restrict email one time sign in token to same browser ([#1144](https://github.com/pocket-id/pocket-id/pull/1144) by @stonith404)
- rename `LDAP_ATTRIBUTE_ADMIN_GROUP` env variable to `LDAP_ADMIN_GROUP_NAME` ([e1c5021](https://github.com/pocket-id/pocket-id/commit/e1c5021eeedcbc54bad0eccd72d7ae760be61934) by @stonith404)
- make wildcard matching in callback URLs more stricter ([078152d](https://github.com/pocket-id/pocket-id/commit/078152d4dbb05dd027ff323f39d090ecb67927c7) by @stonith404)
- remove ambiguous characters from login code ([d9e7bf9](https://github.com/pocket-id/pocket-id/commit/d9e7bf9eef522d8c081fac2000bace6f95518039) by @stonith404)
- add missing translations to date picker ([894eaf3](https://github.com/pocket-id/pocket-id/commit/894eaf3cffdd9182b9c29e28b4dcb7e8bcbda26b) by @stonith404)

### Other

- update AAGUIDs ([#1128](https://github.com/pocket-id/pocket-id/pull/1128) by @github-actions[bot])
- fix api key e2e test ([25f67bd](https://github.com/pocket-id/pocket-id/commit/25f67bd25a0ee0cab48d72107722e8c8428fa547) by @stonith404)
- update AAGUIDs ([#1140](https://github.com/pocket-id/pocket-id/pull/1140) by @github-actions[bot])
- upgrade dependencies ([90f555f](https://github.com/pocket-id/pocket-id/commit/90f555f7c12ff07545f7cd1a1754a8c19f5a4978) by @stonith404)
- fix type error after version bump ([edb32d8](https://github.com/pocket-id/pocket-id/commit/edb32d82b2c138433d8eb17d5a6a19f4728ae2d4) by @stonith404)
- remove `breaking/**` push trigger from actions ([461293b](https://github.com/pocket-id/pocket-id/commit/461293ba1da4ddbff2c77f23a42487b63964e474) by @stonith404)
- update AAGUIDs ([#1177](https://github.com/pocket-id/pocket-id/pull/1177) by @github-actions[bot])
- preparation for merge into main branch ([#1113](https://github.com/pocket-id/pocket-id/pull/1113) by @stonith404)
- bump pnpm to version 10.27.0 ([#1183](https://github.com/pocket-id/pocket-id/pull/1183) by @kmendell)
- update forms and other areas to use new shadcn components ([#1115](https://github.com/pocket-id/pocket-id/pull/1115) by @kmendell)
- run formatter ([e4a8ca4](https://github.com/pocket-id/pocket-id/commit/e4a8ca476cc3c7e8d8cdc8de21b5d7d99d07f7a0) by @stonith404)
- upgrade dependencies ([4776b70](https://github.com/pocket-id/pocket-id/commit/4776b70d96f3dc291394dc79c941738bbe48199a) by @stonith404)
- change translation string in e2e tests ([ffb2ef9](https://github.com/pocket-id/pocket-id/commit/ffb2ef91bd7bbe78eb29e86cd3675b695e821498) by @stonith404)

**Full Changelog**: https://github.com/pocket-id/pocket-id/compare/v1.16.0...v2.0.0


## v1.16.0 - 2025-11-30

[Release](https://github.com/pocket-id/pocket-id/releases/tag/v1.16.0)


### Bug Fixes

- use `quoted-printable` encoding for mails to prevent line limitation ([5cf73e9](https://github.com/pocket-id/pocket-id/commit/5cf73e9309640d097ba94d97851cf502b7b2e063) by @stonith404)
- automatically create parent directory of Sqlite db ([cfc9e46](https://github.com/pocket-id/pocket-id/commit/cfc9e464d983b051e7ed4da1620fae61dc73cff2) by @stonith404)
- global audit log user filter not working ([d98c0a3](https://github.com/pocket-id/pocket-id/commit/d98c0a391a747f9eea70ea01c3f984264a4a7a19) by @stonith404)
- theme mode not correctly applied if selected manually ([a1cd325](https://github.com/pocket-id/pocket-id/commit/a1cd3251cd2b7d7aca610696ef338c5d01fdce2e) by @stonith404)
- hide theme switcher on auth pages because of dynamic background ([5d6a7fd](https://github.com/pocket-id/pocket-id/commit/5d6a7fdb58b6b82894dcb9be3b9fe6ca3e53f5fa) by @stonith404)

### Documentation

- add `ENCRYPTION_KEY` to `.env.example` for breaking change preparation ([4eeb06f](https://github.com/pocket-id/pocket-id/commit/4eeb06f29d984164939bf66299075efead87ee19) by @stonith404)

### Features

- light/dark/system mode switcher ([#1081](https://github.com/pocket-id/pocket-id/pull/1081) by @kmendell)
- add support for S3 storage backend ([#1080](https://github.com/pocket-id/pocket-id/pull/1080) by @stonith404)
- add support for WEBP profile pictures ([#1090](https://github.com/pocket-id/pocket-id/pull/1090) by @stonith404)
- add database storage backend ([#1091](https://github.com/pocket-id/pocket-id/pull/1091) by @ItalyPaleAle)
- adding/removing passkeys creates an entry in audit logs ([#1099](https://github.com/pocket-id/pocket-id/pull/1099) by @ItalyPaleAle)
- add option to disable S3 integrity check ([a3c9687](https://github.com/pocket-id/pocket-id/commit/a3c968758a17e95b2e55ae179d6601d8ec2cf052) by @stonith404)
- add `Cache-Control: private, no-store` to all API routes per default ([#1126](https://github.com/pocket-id/pocket-id/pull/1126) by @stonith404)

### Other

- update pnpm to 10.20 ([#1082](https://github.com/pocket-id/pocket-id/pull/1082) by @kmendell)
- run checks on PR to `breaking/**` branches ([ab9c0f9](https://github.com/pocket-id/pocket-id/commit/ab9c0f9ac092725c70ec3a963f57bc739f425d4f) by @stonith404)
- use constants for AppEnv values ([#1098](https://github.com/pocket-id/pocket-id/pull/1098) by @ItalyPaleAle)
- bump golang.org/x/crypto from 0.43.0 to 0.45.0 in /backend in the go_modules group across 1 directory ([#1107](https://github.com/pocket-id/pocket-id/pull/1107) by @dependabot[bot])
- add Finish files ([ca888b3](https://github.com/pocket-id/pocket-id/commit/ca888b3dd221a209df5e7beb749156f7ea21e1c0) by @stonith404)
- upgrade dependencies ([4bde271](https://github.com/pocket-id/pocket-id/commit/4bde271b4715f59bd2ed1f7c18a867daf0f26b8b) by @stonith404)
- fix Dutch validation message ([f523f39](https://github.com/pocket-id/pocket-id/commit/f523f39483a06256892d17dc02528ea009c87a9f) by @stonith404)
- fix package vulnerabilities ([3d46bad](https://github.com/pocket-id/pocket-id/commit/3d46badb3cecc1ee8eb8bfc9b377108be32d4ffc) by @stonith404)
- update vscode launch.json ([#1117](https://github.com/pocket-id/pocket-id/pull/1117) by @mnestor)
- rename file backend value `fs` to `filesystem` ([8d30346](https://github.com/pocket-id/pocket-id/commit/8d30346f642b483653f7a3dec006cb0273927afb) by @stonith404)
- fix wrong storage value ([b2c718d](https://github.com/pocket-id/pocket-id/commit/b2c718d13d12b6c152e19974d3490c2ed7f5d51d) by @stonith404)
- run formatter ([14c7471](https://github.com/pocket-id/pocket-id/commit/14c7471b5272cdaf42751701d842348d0d60cd0e) by @stonith404)

**Full Changelog**: https://github.com/pocket-id/pocket-id/compare/v1.15.0...v1.16.0


## v1.15.0 - 2025-11-06

[Release](https://github.com/pocket-id/pocket-id/releases/tag/v1.15.0)


### Bug Fixes

- sorting by PKCE and re-auth of OIDC clients ([e03270e](https://github.com/pocket-id/pocket-id/commit/e03270eb9d474735ff4a1b4d8c90f1857b8cd52b) by @stonith404)
- replace %lang% placeholder in html lang ([#1071](https://github.com/pocket-id/pocket-id/pull/1071) by @daimond113)
- disabled property gets ignored when creating an user ([76e0192](https://github.com/pocket-id/pocket-id/commit/76e0192ceec339b6ddb4ad3424057d2bb48fae8f) by @stonith404)
- remove redundant indexes in Postgres ([6a038fc](https://github.com/pocket-id/pocket-id/commit/6a038fcf9afabbf00c45e42071e9bbe62ecab403) by @stonith404)

### Features

- open edit page on table row click ([f184120](https://github.com/pocket-id/pocket-id/commit/f184120890c32f1e75a918c171084878a10e8b42) by @stonith404)
- add ability to set default profile picture ([#1061](https://github.com/pocket-id/pocket-id/pull/1061) by @stonith404)

### Other

- add support for OpenBSD binaries ([d683d18](https://github.com/pocket-id/pocket-id/commit/d683d18d9109ca2850e278b78f7bf3e5aca1d34d) by @stonith404)

**Full Changelog**: https://github.com/pocket-id/pocket-id/compare/v1.14.2...v1.15.0


## v1.14.2 - 2025-10-29

[Release](https://github.com/pocket-id/pocket-id/releases/tag/v1.14.2)


### Bug Fixes

- dark oidc client icons not saved on client creation ([#1057](https://github.com/pocket-id/pocket-id/pull/1057) by @mufeedali)

### Other

- add Turkish language files ([a190529](https://github.com/pocket-id/pocket-id/commit/a190529117fe20b5b836d452b382da69abba9458) by @stonith404)

**Full Changelog**: https://github.com/pocket-id/pocket-id/compare/v1.14.1...v1.14.2


## v1.14.1 - 2025-10-27

[Release](https://github.com/pocket-id/pocket-id/releases/tag/v1.14.1)


### Bug Fixes

- Prevent blinding FOUC in dark mode ([#1054](https://github.com/pocket-id/pocket-id/pull/1054) by @mufeedali)
- use credProps to save passkey on firefox android ([#1055](https://github.com/pocket-id/pocket-id/pull/1055) by @lhoursquentin)
- ignore trailing slashes in `APP_URL` ([65616f6](https://github.com/pocket-id/pocket-id/commit/65616f65e53f3e62d18a8209929e68ddc8d2b9b8) by @stonith404)

**Full Changelog**: https://github.com/pocket-id/pocket-id/compare/v1.14.0...v1.14.1


## v1.14.0 - 2025-10-24

[Release](https://github.com/pocket-id/pocket-id/releases/tag/v1.14.0)


### Bug Fixes

- ignore trailing slash in URL ([9f0aa55](https://github.com/pocket-id/pocket-id/commit/9f0aa55be67b7a09810569250563bb388b40590a) by @stonith404)
- use constant time comparisons when validating PKCE challenges ([#1047](https://github.com/pocket-id/pocket-id/pull/1047) by @ItalyPaleAle)
- only animate login background on initial page load ([b356cef](https://github.com/pocket-id/pocket-id/commit/b356cef766697c621157235ae1d2743f3fe6720d) by @stonith404)
- make pkce requirement visible in the oidc form if client is public ([47927d1](https://github.com/pocket-id/pocket-id/commit/47927d157470daa5b5a5b30e61a2ba69110eeff9) by @stonith404)
- prevent page flickering on redirection based on auth state ([10d6403](https://github.com/pocket-id/pocket-id/commit/10d640385ff2078299a07f05e5ca3f0d392eecf7) by @stonith404)

### Features

- add various improvements to the table component ([#961](https://github.com/pocket-id/pocket-id/pull/961) by @stonith404)
- add support for dark mode oidc client icons ([#1039](https://github.com/pocket-id/pocket-id/pull/1039) by @kmendell)

### Other

- add Japanese files ([068fcc6](https://github.com/pocket-id/pocket-id/commit/068fcc65a62c76f55c9636f830fc769bd59220c4) by @kmendell)
- bump sveltekit-superforms from 2.27.1 to 2.27.4 in the npm_and_yarn group across 1 directory ([#1031](https://github.com/pocket-id/pocket-id/pull/1031) by @dependabot[bot])
- update AAGUIDs ([#1041](https://github.com/pocket-id/pocket-id/pull/1041) by @github-actions[bot])
- bump vite from 7.0.7 to 7.0.8 in the npm_and_yarn group across 1 directory ([#1042](https://github.com/pocket-id/pocket-id/pull/1042) by @dependabot[bot])
- upgrade dependencies ([6362ff9](https://github.com/pocket-id/pocket-id/commit/6362ff986124d056cc07d214855f198eab9cb97d) by @stonith404)

**Full Changelog**: https://github.com/pocket-id/pocket-id/compare/v1.13.1...v1.14.0


## v1.13.1 - 2025-10-07

[Release](https://github.com/pocket-id/pocket-id/releases/tag/v1.13.1)


### Bug Fixes

- uploading a client logo with an URL fails ([#1008](https://github.com/pocket-id/pocket-id/pull/1008) by @CzBiX)
- mark any callback url as valid if they contain a wildcard ([#1006](https://github.com/pocket-id/pocket-id/pull/1006) by @stonith404)

### Other

- cleanup root of repo, update workflow actions ([#1003](https://github.com/pocket-id/pocket-id/pull/1003) by @kmendell)

**Full Changelog**: https://github.com/pocket-id/pocket-id/compare/v1.13.0...v1.13.1

## v1.13.0 - 2025-10-05

[Release](https://github.com/pocket-id/pocket-id/releases/tag/v1.13.0)


### Bug Fixes

- uploading a client logo with an URL fails if folder doesn't exist ([ad8a90c](https://github.com/pocket-id/pocket-id/commit/ad8a90c839cc79b542b60ae66c7eb9254fa5f3e4) by @stonith404)

### Features

- add link to API docs on API key page ([2c74865](https://github.com/pocket-id/pocket-id/commit/2c74865173344766bd43ffd6ae6d93d564de47c7) by @stonith404)

**Full Changelog**: https://github.com/pocket-id/pocket-id/compare/v1.12.0...v1.13.0

## v1.12.0 - 2025-10-03

[Release](https://github.com/pocket-id/pocket-id/releases/tag/v1.12.0)

### Bug Fixes

- do not use cache=shared for in-memory SQLite ([#971](https://github.com/pocket-id/pocket-id/pull/971) by @ItalyPaleAle)
- show only country in audit log location if no city instead of Unknown ([#977](https://github.com/pocket-id/pocket-id/pull/977) by @vilisseranen)
- display login location correctly if country or city is not present ([79989fb](https://github.com/pocket-id/pocket-id/commit/79989fb176273cef070dc52c338004b443364db8) by @stonith404)
- remove previous socket file to prevent bind error ([#979](https://github.com/pocket-id/pocket-id/pull/979) by @Caian)
- tokens issued with refresh token flow don't contain groups ([#989](https://github.com/pocket-id/pocket-id/pull/989) by @ItalyPaleAle)
- make logo and oidc client images sizes consistent ([01db8c0](https://github.com/pocket-id/pocket-id/commit/01db8c0a46b69a15a40951ba863e6bc08fa8e1f8) by @stonith404)
- include port in OIDC client details ([2c1c67b](https://github.com/pocket-id/pocket-id/commit/2c1c67b5e403b365204854c5eb222a68236f3ce0) by @stonith404)
- prevent endless effect loop in login wrapper ([fc9939d](https://github.com/pocket-id/pocket-id/commit/fc9939d1f1817c0b014cc54e6525b98762835295) by @stonith404)
- improve back button handling on auth pages ([d47b203](https://github.com/pocket-id/pocket-id/commit/d47b20326f96b6fff405fcc211719bf3068085ee) by @stonith404)
- allow any image source but disallow base64 ([22f4254](https://github.com/pocket-id/pocket-id/commit/22f42549323fde8b9eaeff682bfa4c7f27e05526) by @stonith404)
- date locale can't be loaded if locale is `en` ([b81de45](https://github.com/pocket-id/pocket-id/commit/b81de451668c425bfc5ca7cd6071fe2756b31594) by @stonith404)

### Features

- support for url based icons ([#840](https://github.com/pocket-id/pocket-id/pull/840) by @kmendell)
- hide alternative sign in methods page if email login disabled ([d010be4](https://github.com/pocket-id/pocket-id/commit/d010be4c8804153b4a7f55bd4ea1cedb0df471df) by @stonith404)
- add required indicator for required inputs ([#993](https://github.com/pocket-id/pocket-id/pull/993) by @stonith404)
- add the ability to make email optional ([#994](https://github.com/pocket-id/pocket-id/pull/994) by @stonith404)

### Other

- fix whitespace after commit message ([e8b172f](https://github.com/pocket-id/pocket-id/commit/e8b172f1c3df8eca8f463d7fa25a483b90a7e66c) by @stonith404)
- update AAGUIDs ([#972](https://github.com/pocket-id/pocket-id/pull/972) by @github-actions[bot])
- remove unnecessary logo fallback ([b746ac0](https://github.com/pocket-id/pocket-id/commit/b746ac0835da059e747a829df3a74e1eae79e107) by @stonith404)

### Sponsors
Thanks @paradosi for your tip ❤️

**Full Changelog**: https://github.com/pocket-id/pocket-id/compare/v1.11.2...v1.12.0

## v1.11.2 - 2025-09-20

[Release](https://github.com/pocket-id/pocket-id/releases/tag/v1.11.2)

### Bug Fixes

* embedded paths not found on windows ([c55143d](https://github.com/pocket-id/pocket-id/commit/c55143d8c995fcd604edcdd448c50669e8682e33) by @stonith404)
* do not treat certain failures in app images bootstrap as fatal ([#966](https://github.com/pocket-id/pocket-id/pull/966) by @ItalyPaleAle)
* decouple images from app config service ([#965](https://github.com/pocket-id/pocket-id/pull/965) by @stonith404)

### Other

* use git cliff for release notes ([fde4e9b](https://github.com/pocket-id/pocket-id/commit/fde4e9b38a34331137a64ce328dad6faf9885808) by @stonith404)



**Full Changelog**: https://github.com/pocket-id/pocket-id/compare/v1.11.1...v1.11.2

## v1.11.1 - 2025-09-18

[Release](https://github.com/pocket-id/pocket-id/releases/tag/v1.11.1)

> [!NOTE]  
> This release adds missing translations for `v1.11.0` because I forgot to merge the PR before creating the release. See the release notes for `v1.11.0` [here](https://github.com/pocket-id/pocket-id/releases/tag/v1.11.0).

### Bug Fixes

- add missing translations ([8c9cac2](https://github.com/pocket-id/pocket-id/commit/8c9cac2655ddbe4872234a1b55fdd51d2f3ac31c))

## v1.11.0 - 2025-09-18

[Release](https://github.com/pocket-id/pocket-id/releases/tag/v1.11.0)

### Features

* add CSP header ([#908](https://github.com/pocket-id/pocket-id/issues/908)) ([6215e1a](https://github.com/pocket-id/pocket-id/commit/6215e1ac01c03866f8b2e89ac084ddd6a3c3ac9e))
* add `INTERNAL_APP_URL` env variable ([#858](https://github.com/pocket-id/pocket-id/issues/858) by @DerSteph)
* add info box to app settings if UI config is disabled ([a1d8538](https://github.com/pocket-id/pocket-id/commit/a1d8538c64beb4d7e8559934985772fba27623ca))
* add PWA support ([#938](https://github.com/pocket-id/pocket-id/issues/938)) ([5367463](https://github.com/pocket-id/pocket-id/commit/5367463239b354640fd65390bc409e4a0ac13fd1))
* add support for `LOG_LEVEL` env variable ([#942](https://github.com/pocket-id/pocket-id/issues/942)) ([2d6d5df](https://github.com/pocket-id/pocket-id/commit/2d6d5df0e7f104a148fb4eeac89a2fbb7db8047a))
* add user display name field ([#898](https://github.com/pocket-id/pocket-id/issues/898)) ([6837360](https://github.com/pocket-id/pocket-id/commit/68373604dd30065947226922233bc1e19e778b01))
* allow uppercase usernames ([#958](https://github.com/pocket-id/pocket-id/issues/958)) ([0224949](https://github.com/pocket-id/pocket-id/commit/02249491f86c289adf596d9d9922dfa04779edee))
* client_credentials flow support ([#901](https://github.com/pocket-id/pocket-id/issues/901) by @savely-krasovsky) 
* return new id_token when using refresh token ([#925](https://github.com/pocket-id/pocket-id/issues/925)) ([307caaa](https://github.com/pocket-id/pocket-id/commit/307caaa3efbc966341b95ee4b5ff18c81ed98e54))


### Bug Fixes

* add validation for callback URLs ([#929](https://github.com/pocket-id/pocket-id/issues/929)) ([6c91474](https://github.com/pocket-id/pocket-id/commit/6c9147483c0a370e2b5011d13898279d2acc445d))
* disable sign up options in UI if `UI_CONFIG_DISABLED` ([1d7cbc2](https://github.com/pocket-id/pocket-id/commit/1d7cbc2a4ecf352d46087f30b477f6bbaa23adf5))
* ensure users imported from LDAP have fields validated ([#923](https://github.com/pocket-id/pocket-id/issues/923)) ([4215523](https://github.com/pocket-id/pocket-id/commit/42155238b750b015b0547294f397e1e285594e3e))
* key-rotate doesn't work with database storage ([#940](https://github.com/pocket-id/pocket-id/issues/940)) ([c018f29](https://github.com/pocket-id/pocket-id/commit/c018f29ad7c61a3ef1b235b0d404a3a2024a26ca))
* list items on previous page get unselected if other items selected on next page ([6c696b4](https://github.com/pocket-id/pocket-id/commit/6c696b46c8b60b3dc4af35c9c6cf1b8e1322f4cd))
* make environment variables case insensitive where necessary ([#954](https://github.com/pocket-id/pocket-id/issues/954)) ([99f31a7](https://github.com/pocket-id/pocket-id/commit/99f31a7c26c63dec76682ddf450d88e6ee40876f))
* my apps card shouldn't take full width if only one item exists ([e7e53a8](https://github.com/pocket-id/pocket-id/commit/e7e53a8b8c87bee922167d24556aef3ea219b1a2))
* update localized name and description of ldap group name attribute ([#892](https://github.com/pocket-id/pocket-id/issues/892)) ([e88be7e](https://github.com/pocket-id/pocket-id/commit/e88be7e61a8aafabcae70adf9265023c50626705))

### Sponsors
Thank you @Felitendo very much for your tip!

## v1.10.0 - 2025-08-27

[Release](https://github.com/pocket-id/pocket-id/releases/tag/v1.10.0)

### Features

* redesigned sidebar with administrative dropdown ([#881](https://github.com/pocket-id/pocket-id/issues/881)) ([096d214](https://github.com/pocket-id/pocket-id/commit/096d214a88808848dae726b0ef4c9a9987185836))

### Bug Fixes

* apps showed multiple times if user is in multiple groups ([641bbc9](https://github.com/pocket-id/pocket-id/commit/641bbc935191bad8afbfec90943fc3e9de7a0cb6))

## v1.9.1 - 2025-08-24

[Release](https://github.com/pocket-id/pocket-id/releases/tag/v1.9.1)

> [!WARNING]  
> A bug was introduced in `v1.8.0` that caused the deletion of all allowed user groups on OIDC clients. It is highly recommended to check if the allowed user groups are still in place. If they are not, unfortunately, the deleted relations cannot be restored automatically. You will need to either restore them from a backup or recreate them manually. You can learn more about the cause in this [comment](https://github.com/pocket-id/pocket-id/issues/865#issuecomment-3218287796).

### Bug Fixes

* sqlite migration drops allowed user groups ([d6d1a4c](https://github.com/pocket-id/pocket-id/commit/d6d1a4ced23886f255a9c2048d19ad3599a17f26))

## v1.9.0 - 2025-08-24

[Release](https://github.com/pocket-id/pocket-id/releases/tag/v1.9.0)

### Features

* support automatic db migration rollbacks ([#874](https://github.com/pocket-id/pocket-id/issues/874)) ([c114a2e](https://github.com/pocket-id/pocket-id/commit/c114a2edaae4c007c75c34c02e8b0bb011845cae))


### Bug Fixes

* don't force uuid for client id in postgres ([2ffc6ba](https://github.com/pocket-id/pocket-id/commit/2ffc6ba42af4742a13b77543142b66b3e826ab88))
* ensure SQLite has a writable temporary directory ([#876](https://github.com/pocket-id/pocket-id/issues/876)) ([1f3550c](https://github.com/pocket-id/pocket-id/commit/1f3550c9bd3aafd3bd2272ef47f3ed8736037d81))
* sort order incorrect for apps when using postgres ([d0392d2](https://github.com/pocket-id/pocket-id/commit/d0392d25edcaa5f3c7da2aad70febf63b47763fa))

## v1.8.1 - 2025-08-24

[Release](https://github.com/pocket-id/pocket-id/releases/tag/v1.8.1)

### Bug Fixes

* migration clears allowed users groups ([5971bfb](https://github.com/pocket-id/pocket-id/commit/5971bfbfa66ecfebf2b1c08d34fcbd8c18cdc046))
* wrong column type for reauthentication tokens in Postgres ([#869](https://github.com/pocket-id/pocket-id/issues/869)) ([1283314](https://github.com/pocket-id/pocket-id/commit/1283314f776a0ba43be7d796e7e2243e31f860de))

## v1.8.0 - 2025-08-23

[Release](https://github.com/pocket-id/pocket-id/releases/tag/v1.8.0)

### Features

* add option to OIDC client to require re-authentication ([#747](https://github.com/pocket-id/pocket-id/issues/747) by @MorrisMorrison) ([0cb039d](https://github.com/pocket-id/pocket-id/commit/0cb039d35d49206011064e622f3bfd3d8f88720f))
* allow custom client IDs ([#864](https://github.com/pocket-id/pocket-id/issues/864) thanks to @James18232) ([a5efb95](https://github.com/pocket-id/pocket-id/commit/a5efb9506582884c70b9b1fd737ebdd44b101b47))
* display all accessible oidc clients in the dashboard ([#832](https://github.com/pocket-id/pocket-id/issues/832)) ([3188e92](https://github.com/pocket-id/pocket-id/commit/3188e92257afcaf7a16dd418e4c40626d7e1d034))
* login code font change ([#851](https://github.com/pocket-id/pocket-id/issues/851) by @James18232) ([d28bfac](https://github.com/pocket-id/pocket-id/commit/d28bfac81fc24ee79e4896538a616f0a89ab30a5))
* **signup:** add default user groups and claims for new users ([#812](https://github.com/pocket-id/pocket-id/issues/812) by @zeedif) ([182d809](https://github.com/pocket-id/pocket-id/commit/182d8090286f9953171c6c410283be679889aca7))


### Bug Fixes

* authorization can't be revoked ([0aab3f3](https://github.com/pocket-id/pocket-id/commit/0aab3f3c7ad8c1b14939de3ded60c9f201eab8fc))
* delete webauthn session after login to prevent replay attacks ([fe003b9](https://github.com/pocket-id/pocket-id/commit/fe003b927ce7772692439992860c804de89ce424))
* **deps:** bump rollup from 4.45.3 to 4.46.3 ([#845](https://github.com/pocket-id/pocket-id/issues/845) by @gepbird) ([b5e6371](https://github.com/pocket-id/pocket-id/commit/b5e6371eaaf3d9e85d8b05c457487c4425fa8381))
* enable foreign key check for sqlite ([#863](https://github.com/pocket-id/pocket-id/issues/863)) ([625f235](https://github.com/pocket-id/pocket-id/commit/625f23574001ebd7074b8d98d448a2811847be16))
* ferated identities can't be cleared ([24e2742](https://github.com/pocket-id/pocket-id/commit/24e274200fe4002d01c58cc3fa74094b598d7599))
* for one-time access tokens and signup tokens, pass TTLs instead of absolute expiration date ([#855](https://github.com/pocket-id/pocket-id/issues/855)) ([7ab0fd3](https://github.com/pocket-id/pocket-id/commit/7ab0fd30286e6b67b5ce586484d82a20c42b471d))
* ignore client secret if client is public ([#836](https://github.com/pocket-id/pocket-id/issues/836) by @James18232) ([7b1f6b8](https://github.com/pocket-id/pocket-id/commit/7b1f6b88572bac1f3e838a9e904917fbd5fbdf61))
* move audit log call before TX is committed ([#854](https://github.com/pocket-id/pocket-id/issues/854)) ([9339e88](https://github.com/pocket-id/pocket-id/commit/9339e88a5a26ff77a5e40149cbb1a5b339b7ec6a))
* non admin users can't revoke oidc client but see edit link ([0e44f24](https://github.com/pocket-id/pocket-id/commit/0e44f245afcdf8179bf619613ca9ef4bffa176ca))
* oidc client advanced options color ([fc0c99a](https://github.com/pocket-id/pocket-id/commit/fc0c99a232b0efb1a5b5d2c551102418b1080293))

### Sponsors
Thanks Brandon Butler (@Starttoaster) for your support!

## v1.7.0 - 2025-08-10

[Release](https://github.com/pocket-id/pocket-id/releases/tag/v1.7.0)

### Features

* add robots.txt to block indexing ([#806](https://github.com/pocket-id/pocket-id/issues/806) by @Etienne-bdt) ([06e1656](https://github.com/pocket-id/pocket-id/commit/06e1656923eb2f4531be497716f9147c09d60b65))
* add support for `code_challenge_methods_supported` ([#794](https://github.com/pocket-id/pocket-id/issues/794)) ([d479817](https://github.com/pocket-id/pocket-id/commit/d479817b6a7ca4807b5de500b3ba713d436b0770))
* Support OTel and JSON for logs (via log/slog) ([#760](https://github.com/pocket-id/pocket-id/issues/760)) ([78266e3](https://github.com/pocket-id/pocket-id/commit/78266e3e4cab2b23249c3baf20f4387d00eebd9e))
* support reading secret env vars from _FILE ([#799](https://github.com/pocket-id/pocket-id/issues/799)) ([0a3b1c6](https://github.com/pocket-id/pocket-id/commit/0a3b1c653050f2237d30ec437c5de88baa704a25))
* user application dashboard ([#727](https://github.com/pocket-id/pocket-id/issues/727)) ([484c2f6](https://github.com/pocket-id/pocket-id/commit/484c2f6ef20efc1fade1a41e2aeace54c7bb4f1b))


### Bug Fixes

* admins can not delete or disable their own account ([f0c144c](https://github.com/pocket-id/pocket-id/commit/f0c144c51c635bc348222a00d3bc88bc4e0711ef))
* authorization animation not working ([9ac5d51](https://github.com/pocket-id/pocket-id/commit/9ac5d5118710cad59c8c4ce7cef7ab09be3de664))
* custom claims input suggestions instantly close after opening ([4d59e72](https://github.com/pocket-id/pocket-id/commit/4d59e7286666480e20c728787a95e82513509240))
* delete WebAuthn registration session after use ([#783](https://github.com/pocket-id/pocket-id/issues/783)) ([c8478d7](https://github.com/pocket-id/pocket-id/commit/c8478d75bed7295625cd3cf62ef46fcd95902410))
* set input type 'email' for email-based login ([#776](https://github.com/pocket-id/pocket-id/issues/776)) ([d541c9a](https://github.com/pocket-id/pocket-id/commit/d541c9ab4af8d7283891a80f886dd5d4ebc52f53))

## v1.6.4 - 2025-07-21

[Release](https://github.com/pocket-id/pocket-id/releases/tag/v1.6.4)

### Bug Fixes

* migration fails on postgres ([#762](https://github.com/pocket-id/pocket-id/issues/762)) ([35d5f88](https://github.com/pocket-id/pocket-id/commit/35d5f887ce7c88933d7e4c2f0acd2aeedd18c214))

## v1.6.3 - 2025-07-21

[Release](https://github.com/pocket-id/pocket-id/releases/tag/v1.6.3)

### Bug Fixes

* allow passkey names up to 50 characters ([b03e91b](https://github.com/pocket-id/pocket-id/commit/b03e91b6530c2393ad20ac49aa2cb2b4962651b2))
* ensure user inputs are normalized ([#724](https://github.com/pocket-id/pocket-id/issues/724)) ([7b4ccd1](https://github.com/pocket-id/pocket-id/commit/7b4ccd1f306f4882c52fe30133fcda114ef0d18b))
* show rename and delete buttons for passkeys without hovering over the row ([2952b15](https://github.com/pocket-id/pocket-id/commit/2952b1575542ecd0062fe740e2d6a3caad05190d))
* use object-contain for images on oidc-client list ([d3bc179](https://github.com/pocket-id/pocket-id/commit/d3bc1797b65ec8bc9201c55d06f3612093f3a873))
* use user-agent for identifying known device signins ([ef1d599](https://github.com/pocket-id/pocket-id/commit/ef1d5996624fc534190f80a26f2c48bbad206f49))

## v1.6.2 - 2025-07-09

[Release](https://github.com/pocket-id/pocket-id/releases/tag/v1.6.2)

### Bug Fixes

* ensure confirmation dialog shows on top of other components ([f103a54](https://github.com/pocket-id/pocket-id/commit/f103a547904070c5b192e519c8b5a8fed9d80e96))
* login failures on Postgres when IP is null ([#737](https://github.com/pocket-id/pocket-id/issues/737)) ([e1de593](https://github.com/pocket-id/pocket-id/commit/e1de593dcd30b7b04da3b003455134992b702595))

## v1.6.1 - 2025-07-06

[Release](https://github.com/pocket-id/pocket-id/releases/tag/v1.6.1)

> [!NOTE]  
> This release is the same as `v1.6.0` but the images are now tagged correctly. There was an issue that the `latest` tag was added to the distroless image instead of the regular one.

## v1.6.0 - 2025-07-06

[Release](https://github.com/pocket-id/pocket-id/releases/tag/v1.6.0)

### Features

* add support for OAuth 2.0 Authorization Server Issuer Identification ([bf04256](https://github.com/pocket-id/pocket-id/commit/bf042563e997d57bb087705a5789fd72ffbed467))
* add distroless container additional variant + healthcheck command ([#716](https://github.com/pocket-id/pocket-id/issues/716))
* encrypt private keys saved on disk and in database ([#682](https://github.com/pocket-id/pocket-id/issues/682))
* enhance language selection message and add translation contribution link ([be52660](https://github.com/pocket-id/pocket-id/commit/be526602273c1689cb4057ca96d4214e7f817d1d))
* add "key-rotate" command ([#709](https://github.com/pocket-id/pocket-id/issues/709))


### Bug Fixes

* allow profile picture update even if "allow own account edit" enabled ([9872608](https://github.com/pocket-id/pocket-id/commit/9872608d61a486f7b775f314d9392e0620bcd891))
* app config forms not updating with latest values ([#696](https://github.com/pocket-id/pocket-id/issues/696))
* auth fails when client IP is empty on Postgres ([#695](https://github.com/pocket-id/pocket-id/issues/695))
* custom claims input suggestions flickering ([49f1ab2](https://github.com/pocket-id/pocket-id/commit/49f1ab2f75df97d551fff5acbadcd55df74af617))
* keep sidebar in settings sticky ([e46f60a](https://github.com/pocket-id/pocket-id/commit/e46f60ac8d6944bcea54d0708af1950d98f66c3c))
* show friendly name in user group selection ([5c9e504](https://github.com/pocket-id/pocket-id/commit/5c9e504291b3bffe947bcbe907701806e301d1fe))
* support non UTF-8 LDAP IDs ([#714](https://github.com/pocket-id/pocket-id/issues/714))
* token introspection authentication not handled correctly ([#704](https://github.com/pocket-id/pocket-id/issues/704))

## v1.5.0 - 2025-06-27

[Release](https://github.com/pocket-id/pocket-id/releases/tag/v1.5.0)

### Features

* add self-service signup with token and open registration modes ([#672](https://github.com/pocket-id/pocket-id/issues/672))
* improve initial admin creation workflow ([287314f](https://github.com/pocket-id/pocket-id/commit/287314f01644e42ddb2ce1b1115bd14f2f0c1768))
* redact sensitive app config variables if set with env variable ([ba61cdb](https://github.com/pocket-id/pocket-id/commit/ba61cdba4eb3d5659f3ae6b6c21249985c0aa630))



### Bug Fixes

* error page flickering after sign out ([1a77bd9](https://github.com/pocket-id/pocket-id/commit/1a77bd9914ea01e445ff3d6e116c9ed3bcfbf153))
* improve accent color picker disabled state ([d976bf5](https://github.com/pocket-id/pocket-id/commit/d976bf5965eda10e3ecb71821c23e93e5d712a02))
* less noisy logging for certain GET requests ([#681](https://github.com/pocket-id/pocket-id/issues/681) by @11notes)
* margin of user sign up description ([052ac00](https://github.com/pocket-id/pocket-id/commit/052ac008c3a8c910d1ce79ee99b2b2f75e4090f4))
* remove duplicate request logging ([#678](https://github.com/pocket-id/pocket-id/issues/678) by @ryankask)
* users can't be updated by admin if self account editing is disabled ([29cb551](https://github.com/pocket-id/pocket-id/commit/29cb5513a03d1a9571969c8a42deec9b2bdee037))

## v1.4.1 - 2025-06-22

[Release](https://github.com/pocket-id/pocket-id/releases/tag/v1.4.1)

### Bug Fixes

* app not starting if UI config is disabled and Postgres is used ([7d36bda](https://github.com/pocket-id/pocket-id/commit/7d36bda769e25497dec6b76206a4f7e151b0bd72))

## v1.4.0 - 2025-06-19

[Release](https://github.com/pocket-id/pocket-id/releases/tag/v1.4.0)

### Features

* allow setting unix socket mode ([#661](https://github.com/pocket-id/pocket-id/issues/661) by @CnTeng) ([7677a3d](https://github.com/pocket-id/pocket-id/commit/7677a3de2c923c11a58bc8c4d1b2121d403a1504))
* auto-focus on the login buttons ([#647](https://github.com/pocket-id/pocket-id/issues/647) By @ItalyPaleAle) ([d679530](https://github.com/pocket-id/pocket-id/commit/d6795300b158b85dd9feadd561b6ecd891f5db0d))
* configurable local ipv6 ranges for audit log ([#657](https://github.com/pocket-id/pocket-id/issues/657)) ([d548523](https://github.com/pocket-id/pocket-id/commit/d5485238b8fd4cc566af00eae2b17d69a119f991))
* location filter for global audit log ([#662](https://github.com/pocket-id/pocket-id/issues/662)) ([ac5a121](https://github.com/pocket-id/pocket-id/commit/ac5a121f664b8127d0faf30c0f93432f30e7f33a))
* ui accent colors ([#643](https://github.com/pocket-id/pocket-id/issues/643)) ([883877a](https://github.com/pocket-id/pocket-id/commit/883877adec6fc3e65bd5a705499449959b894fb5))
* use icon instead of text on application image update hover state ([215531d](https://github.com/pocket-id/pocket-id/commit/215531d65c6683609b0b4a5505fdb72696fdb93e))

### Bug Fixes

* allow images with uppercase file extension ([1bcb50e](https://github.com/pocket-id/pocket-id/commit/1bcb50edc335886dd722a4c69960c48cc3cd1687))
* center oidc client images if they are smaller than the box ([946c534](https://github.com/pocket-id/pocket-id/commit/946c534b0877a074a6b658060f9af27e4061397c))
* explicitly cache images to prevent unexpected behavior ([2e5d268](https://github.com/pocket-id/pocket-id/commit/2e5d2687982186c12e530492292d49895cb6043a))
* reduce duration of animations on login and signin page ([#648](https://github.com/pocket-id/pocket-id/issues/648) By @ItalyPaleAle) ([d770448](https://github.com/pocket-id/pocket-id/commit/d77044882d5a41da22df1c0099c1eb1f20bcbc5b))

## v1.3.1 - 2025-06-09

[Release](https://github.com/pocket-id/pocket-id/releases/tag/v1.3.1)

### Bug Fixes

* change timestamp of `client_credentials.sql` migration ([2935236](https://github.com/pocket-id/pocket-id/commit/2935236acee9c78c2fe6787ec8b5f53ae0eca047))

## v1.3.0 - 2025-06-09

[Release](https://github.com/pocket-id/pocket-id/releases/tag/v1.3.0)

### Features

* add API endpoint for user authorized clients ([d217083](https://github.com/pocket-id/pocket-id/commit/d217083059120171d5c555b09eefe6ba3c8a8d42))
* add unix socket support ([#615](https://github.com/pocket-id/pocket-id/issues/615) by @CnTeng)
* JWT bearer assertions for client authentication ([#566](https://github.com/pocket-id/pocket-id/issues/566) by @ItalyPaleAle)
* new color theme for the UI ([97f7326](https://github.com/pocket-id/pocket-id/commit/97f7326da40265a954340d519661969530f097a0))
* oidc client data preview ([#624](https://github.com/pocket-id/pocket-id/issues/624))


### Bug Fixes

* don't load app config and user on every route change ([bdcef60](https://github.com/pocket-id/pocket-id/commit/bdcef60cab6a61e1717661e918c42e3650d23fee))
* misleading text for disable animations option ([657a51f](https://github.com/pocket-id/pocket-id/commit/657a51f7ed8a77e8a937971032091058aacfded6))
* OIDC client image can't be deleted ([61b62d4](https://github.com/pocket-id/pocket-id/commit/61b62d461200c1359a16c92c9c62530362a4785c))
* UI config overridden by env variables don't apply on first start ([5e9096e](https://github.com/pocket-id/pocket-id/commit/5e9096e328741ba2a0e03835927fe62e6aea2a89))

## v1.2.0 - 2025-06-03

[Release](https://github.com/pocket-id/pocket-id/releases/tag/v1.2.0)

### Features

* auto detect callback url ([#583](https://github.com/pocket-id/pocket-id/issues/583))


### Bug Fixes

* allow users to update their locale even when own account update disabled ([6c00aaa](https://github.com/pocket-id/pocket-id/commit/6c00aaa3efa75c76d340718698a0f4556e8de268))
* clear default app config variables from database ([decf8ec](https://github.com/pocket-id/pocket-id/commit/decf8ec70b5f6a69fe201d6e4ad60ee62e374ad0))
* fallback to primary language if no translation available for specific country ([2440379](https://github.com/pocket-id/pocket-id/commit/2440379cd11b4a6da7c52b122ba8f49d7c72ce1d))
* improve spacing on auth screens ([04fcf11](https://github.com/pocket-id/pocket-id/commit/04fcf1110e97b42dc5f0c20e169c569075d1e797))
* page scrolls up on form submission ([31ad904](https://github.com/pocket-id/pocket-id/commit/31ad904367e53dd47a15abcce5402dfe84828a14))
* run jobs at interval instead of specific time ([#585](https://github.com/pocket-id/pocket-id/issues/585) by @ItalyPaleAle)
* show LAN for auditlog location for internal networks ([b874681](https://github.com/pocket-id/pocket-id/commit/b8746818240fde052e6f3b5db5c3355d7bbfcbda))
* small fixes in analytics_job ([#582](https://github.com/pocket-id/pocket-id/issues/582) by @ItalyPaleAle)
* whitelist authorization header for CORS ([b9489b5](https://github.com/pocket-id/pocket-id/commit/b9489b5e9a32a2a3f54d48705e731a7bcf188d20))

## v1.1.0 - 2025-05-28

[Release](https://github.com/pocket-id/pocket-id/releases/tag/v1.1.0)

> [!NOTE]  
>  This version introduces a heartbeat request that gets sent once everyday to the [Pocket ID analytics server](https://github.com/pocket-id/analytics) to count how many instances of Pocket ID exist. The heartbeat request only contains a random instance ID, the version of Pocket ID and when it was first/last seen. Seeing how many active Pocket ID instances are out there genuinely motivates us to keep developing and maintaining the project. Of course this heartbeat can also be disabled by setting `ANALYTICS_DISABLED` to `true`. For more information visit the [docs page](https://pocket-id.org/docs/configuration/analytics).


### Features

* add daily heartbeat request for counting Pocket ID instances ([#578](https://github.com/pocket-id/pocket-id/issues/578))
* require user verification for passkey sign in ([68e4b67](https://github.com/pocket-id/pocket-id/commit/68e4b67bd212e31ecc20277bfd293c94bf7f3642))
* show allowed group count on oidc client list ([#567](https://github.com/pocket-id/pocket-id/issues/567)) ([38d7ee4](https://github.com/pocket-id/pocket-id/commit/38d7ee4432e0dacc2cfbabad4bfd9336b8b84079))


### Bug Fixes

* use ldapAttributeUserUsername for finding group members ([#565](https://github.com/pocket-id/pocket-id/issues/565))

## v1.0.0 - 2025-05-24

[Release](https://github.com/pocket-id/pocket-id/releases/tag/v1.0.0)

> [!WARNING]  
> This release contains breaking changes and Pocket ID won't work correctly if you don't follow the migration steps. 
 → Please follow the [migration guide](https://pocket-id.org/docs/setup/migrate-to-v1/).



### Features
* serve the static frontend trough the backend (#520)


### Bug Fixes

* animation speed set to max of 300ms ([c726c16](https://github.com/pocket-id/pocket-id/commit/c726c1621b8bd88b20cb05263f6d10888f0af8e2))
* custom logo not correctly loaded if UI configuration is disabled ([bf710ae](https://github.com/pocket-id/pocket-id/commit/bf710aec5625c9dcb43c83d920318a036a135bae))
* show correct app name on sign out page ([131f470](https://github.com/pocket-id/pocket-id/commit/131f470757044fddd0989a76e9dc9e310f19819c))
* trim whitespaces from string inputs ([059073d](https://github.com/pocket-id/pocket-id/commit/059073d4c24e34c142dddd4c150c384779fb51a9))

## v0.53.0 - 2025-05-08

[Release](https://github.com/pocket-id/pocket-id/releases/tag/v0.53.0)

### Features

* add support for `TZ` environment variable ([5e2e947](https://github.com/pocket-id/pocket-id/commit/5e2e947fe09fa881a7bbc70133a243a4baf30e90))


### Bug Fixes

* handle CORS correctly for endpoints that SPAs need ([#513](https://github.com/pocket-id/pocket-id/issues/513))

## v0.52.0 - 2025-05-06

[Release](https://github.com/pocket-id/pocket-id/releases/tag/v0.52.0)

### Features

* add healthz endpoint ([#494](https://github.com/pocket-id/pocket-id/issues/494) by @ItalyPaleAle)
* add OpenTelemetry tracing and metrics ([#495](https://github.com/pocket-id/pocket-id/issues/495) by @daenney)


### Bug Fixes

* correctly set script permissions inside Docker container ([c55fef0](https://github.com/pocket-id/pocket-id/commit/c55fef057cdcec867af91b29968541983cd80ec0))

## v0.51.1 - 2025-05-03

[Release](https://github.com/pocket-id/pocket-id/releases/tag/v0.51.1)

### Bug Fixes

* allow LDAP users to update their locale ([0b9cbf4](https://github.com/pocket-id/pocket-id/commit/0b9cbf47e36a332cfd854aa92e761264fb3e4795))
* last name still showing as required on account form ([#492](https://github.com/pocket-id/pocket-id/issues/492))
* non admin users weren't able to call the end session endpoint ([6bd6cef](https://github.com/pocket-id/pocket-id/commit/6bd6cefaa6dc571a319a6a1c2b2facc2404eadd3))

## v0.51.0 - 2025-04-28

[Release](https://github.com/pocket-id/pocket-id/releases/tag/v0.51.0)

### Features

* new login code card position for mobile devices ([#452](https://github.com/pocket-id/pocket-id/issues/452) by @James18232)


### Bug Fixes

* do not require PKCE for public clients ([ce24372](https://github.com/pocket-id/pocket-id/commit/ce24372c571cc3b277095dc6a4107663d64f45b3))
* hide global audit log switch for non admin users ([1efd1d1](https://github.com/pocket-id/pocket-id/commit/1efd1d182dbb6190d3c7e27034426c9e48781b4a))
* return correct error message if user isn't authorized ([86d2b5f](https://github.com/pocket-id/pocket-id/commit/86d2b5f59f26cb944017826cbd8df915cdc986f1))
* updating scopes of an authorized client fails with Postgres ([0a24ab8](https://github.com/pocket-id/pocket-id/commit/0a24ab80010eb5a15d99915802c6698274a5c57c))

## v0.50.0 - 2025-04-27

[Release](https://github.com/pocket-id/pocket-id/releases/tag/v0.50.0)

### Features

* device authorization endpoint ([#270](https://github.com/pocket-id/pocket-id/issues/270))
* make family name optional ([#476](https://github.com/pocket-id/pocket-id/issues/476))

### Bug Fixes
* incorrectly swapped refreshToken and accessToken (#490 by @j-baker)
* do not override XDG_DATA_HOME/XDG_CONFIG_HOME if they are already set ([#472](https://github.com/pocket-id/pocket-id/issues/472) by @it)
* pass context to methods that were missing it ([#487](https://github.com/pocket-id/pocket-id/issues/487) by @ItalyPaleAle)
* prevent deadlock when trying to delete LDAP users ([#471](https://github.com/pocket-id/pocket-id/issues/471) by @ItalyPaleAle)
* rootless Caddy data and configuration ([#470](https://github.com/pocket-id/pocket-id/issues/470) by @eiqnepm)

