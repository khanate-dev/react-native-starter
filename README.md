# React Native Starter

React Native Starter using Typescript and Expo

## Technologies

- `React`
- `React Native`
- `Expo` (Managed Workflow)
- `Typescript`
- `React Native Paper`en for theming and components
- `Sentry` for logging and error reporting
- `npm` for package management
- `dotenv-vault` to share environment variables

---

## Scripts

Start: `npm start`

Start (Android): `npm run android`

Start (iOS): `npm run ios`

Build: `npm run build`

Build A Preview Version: `npm run build:preview`

Build A Development Version (APK): `npm run build:development`

Build An Independent APK: `expo build:android -t apk`

Publish: `expo publish`

Convert svg icons to components: `npm run svgr`

Lint the code: `npm run lint`

---

## Environment Variables

Environment variables are securely shared with `dotenv-vault`.

Create new vault: `npm run env:new`

Open vault: `npm run env:open`

Pull environment from vault: `yarn env:pull`

Push environment to vault: `yarn env:push`
