module.exports = {
  project: {
    ios: {},
    android: {},
  },
  dependencies: {
    'react-native-pusher-push-notifications': {
      platforms: {
        android: null, // this skips autolink for android
      },
    },
  },
  assets: ['./src/assets/fonts'],
};
