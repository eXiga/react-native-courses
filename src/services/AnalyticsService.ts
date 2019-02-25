import { Sentry } from 'react-native-sentry';

export interface IAnalyticsService {
  trackError(error: Error): void;
  trackMessage(screen: string, message: string): void;
}

export class AnalyticsService implements IAnalyticsService {
  trackError(error: Error): void {
    Sentry.captureException(error);
  }

  trackMessage(screen: string, message: string): void {
    Sentry.setTagsContext({screen: screen});
    Sentry.captureMessage(message);
  }
}