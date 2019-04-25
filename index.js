import { AppRegistry } from 'react-native';
import { Sentry } from 'react-native-sentry';
import { name as appName } from './app.json';
import App from './App';

Sentry.config('https://5d0d01368b2d47eb9543593126cd3a10@sentry.io/1402400').install();
AppRegistry.registerComponent(appName, () => App);