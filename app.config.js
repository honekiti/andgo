module.exports = {
  name: 'つみたてとこ',
  slug: 'hongo-v3',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'myapp',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#2A2A2B',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    buildNumber: '5',
    supportsTablet: false,
    config: {
      usesNonExemptEncryption: false,
    },
    bundleIdentifier: 'jp.co.andgo.hongov3',
  },
  android: {
    versionCode: 5,
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#2A2A2B',
    },
    package: 'jp.co.andgo.hongov3',
  },
  plugins: ['expo-router'],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: '8e2e8369-e74f-4dd3-83a1-65f3939d4cf7',
    },
    datadog: {
      clientToken: 'pubd722168176307e176ad3018cbecbebf1',
      rumApplicationId: '9d502846-d208-4039-baca-3aa6448da715',
    },
  },
  owner: 'andgo',
};
