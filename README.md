# Raahi - Explore beyond the map, like a local. 🌍🔥
![Thumbnail](https://github.com/SainathPoojary/Raahi/assets/53347682/6dc25699-f3af-470d-9afa-c766647a66a1)

Raahi streamlines navigation by offering users access to efficient hidden routes contributed by local guides. Easily searchable within the app, these routes enhance travel experiences, providing alternatives to conventional paths and potentially saving time. The platform's collaborative approach encourages users to share their own routes, creating a community-driven environment with rewards for contributors.

## Prerequisites 🛠️

Before you start, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [React Native CLI](https://reactnative.dev/docs/environment-setup)

## Getting Started 🚀

1. Clone the repository:

   ```bash
   git clone https://github.com/sainathPoojary/raahi
   ```

2. Navigate to the project directory:

   ```bash
   cd raahi
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Configure Firebase 🔥

1. Create a new Firebase project on the [Firebase Console](https://console.firebase.google.com/).
2. Set up a Firebase Realtime Database and Authentication
3. Obtain your Firebase configuration object.
4. Add the `google-services.json` in `android/app` folder.

## Configure Google Maps API 🗺️

1. Obtain a Google Maps API key from the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a `.env` file in the project root.
3. Add your Google Maps API key to the `.env` file:

   ```env
   GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE
   ```

## Run the App 🏃‍♂️

### Run Metro server

```bash
npx react-native start
```

### iOS

```bash
npx react-native run-ios
```

### Android

```bash
npx react-native run-android
```

## That's it! 🎉

You're all set to explore the app. If you encounter any issues, feel free to open an [issue](https://github.com/sainathpoojary/raahi/issues) on the repository.

Happy coding! 🚀✨
