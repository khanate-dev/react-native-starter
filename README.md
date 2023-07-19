# React Native Starter

React Native Starter using Typescript and Expo

## Technologies

- `React`
- `React Native`
- `Expo` (Managed Workflow)
- `Typescript`
- `React Native Paper`en for theming and components
- `Sentry` for logging and error reporting
- `yarn` for package management
- `dotenv-vault` to share environment variables

---

## Scripts

Start: `yarn start`

Start (Android): `yarn android`

Start (iOS): `yarn ios`

Build: `yarn build`

Build A Preview Version: `yarn build:preview`

Build A Development Version (APK): `yarn build:development`

Build An Independent APK: `yarn expo build:android -t apk`

Publish: `yarn expo publish`

Convert svg icons to components: `yarn svgr`

Lint the code: `yarn lint`

---

## Environment Variables

Environment variables are securely shared with `dotenv-vault`.

Create new vault: `yarn env:new`

Open vault: `yarn env:open`

Pull environment from vault: `yarn env:pull`

Push environment to vault: `yarn env:push`
