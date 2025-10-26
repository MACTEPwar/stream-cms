import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.streamcms.app',
  appName: 'stream-cms',
  webDir: 'dist/stream-cms',
  bundledWebRuntime: false,
  server: {
    cleartext: true,
    androidScheme: 'http',
    // hostname: '192.168.0.107'
    url: 'http://192.168.0.100:4200'
  },
};

export default config;