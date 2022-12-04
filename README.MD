# Jobfinder

https://developers.facebook.com/docs/facebook-login/guides/advanced/manual-flow

## dependencies

expo@45 - https://docs.expo.dev/versions/v45.0.0/sdk/facebook/
AsyncStorage - https://github.com/react-native-async-storage/async-storage.git
npx expo install @react-native-async-storage/async-storage

```
npx expo install expo@45
```

1. WelcomeScreen - introduction swipe tutorial page
2. AuthScreen - login (OAuth)
3. (maps flow)
   - MapScreen - set location
   - DeckScreen - rate (swipe left/right)
   - (review flow)
     - ReviewScreen - saved list
     - SettingsScreen - reset jobs (clear saved list)

## Navigation

- React Navigation (https://reactnavigation.org/docs/getting-started)

## oauth

https://docs.expo.dev/guides/authentication/#facebook

## FB

- https://developers.facebook.com/

1. create a project
2. App ID
3. App Secret

- valid oauth redirect url

## MapView / Expo-Location

```console
npx expo install react-native-maps
npx expo install expo-location
```

## Troubleshoot

LATEST: https://docs.expo.dev/guides/authentication/
https://docs.expo.dev/guides/authentication/#google

## tried..

1. expo-facebook for fb authentication
   -requires expo@45 as support is removed from expo v46

2. trying to login using https://www.facebook.com/v15.0/dialog/oauth?

- inital problem: needed WebView (React-native webview) to open fb auth.
- To resolve the issue of 'Logging into Facebook from an embedded browser is disabled', visit the Facebook account settings page to enable the 'Links open externally' option. This ensures that whenever you try to open Facebook through a game or an app that uses an embedded browser, the error message would not pop up. (DOES NOT WORK - DEPRECATED...).
- As of October 5, 2021, Facebook has depreciated the support for Facebook login authentication on Android embedded browsers.
- Facebook Login for the Web with the JavaScript SDK (https://developers.facebook.com/docs/facebook-login/web)
  cant use this method as there is no html pages in react-native

```console
expo install expo-facebook
```

3. https://github.com/thebergamo/react-native-fbsdk-next/#expo-installation

- it states it does not work with expo-go

4. Using android studio - https://docs.expo.dev/workflow/android-studio-emulator/

- running expo in an emulator

## Expo Notifications

- testing notifications

```console
https://expo.dev/notifications
```

https://expo.dev/notifications

https://www.udemy.com/course/react-native-advanced/learn/lecture/6853776#questions/17724982

- You will need to have an expo developer account and login on your terminal for this to work. As well as run the app on a real device.
- To login use the command below on the terminal then enter username + password.

```console
expo login
```

- To then send push notifications to your app you would copy the token from your terminal/console that will look something like

-1.save token - ExponentPushToken[******************************] saved to backend

- And you can enter this token plus a message on this expo website to send a notification to your device

2. send message from backend

3. handle message
