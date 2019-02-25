import { Sentry } from 'react-native-sentry';
import { IUserDefaultsService, UserDefaultsService } from '../services/UserDefaultsService';

export interface IAnalyticsService {
  trackError(screen: string, error: Error): void;
  trackMessage(screen: string, message: string): void;
}

export class AnalyticsService implements IAnalyticsService {
  private userDefaultsService: IUserDefaultsService;

  constructor() {
    this.userDefaultsService = new UserDefaultsService();
  }

  trackError(screen: string, error: Error): void {
    this.setUserContext();
    this.setTagsContext(screen);
    Sentry.captureException(error);
  }

  trackMessage(screen: string, message: string): void {
    this.setUserContext();
    this.setTagsContext(screen);
    Sentry.captureMessage(message);
  }

  private setTagsContext(screen: string) {
    Sentry.setTagsContext({screen: screen});
  }

  private async setUserContext() {
    const credentials = await this.userDefaultsService.getCredentials();
    if (credentials.email == null) {
      return;
    }

    Sentry.setUserContext({ email: credentials.email });
  }
}