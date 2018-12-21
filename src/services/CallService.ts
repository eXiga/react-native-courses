import { Linking, Platform } from 'react-native';

export interface ICallService {
  call(contactNumber: string, errorHandler: (reason: any) => void): Promise<void>;
}

export class CallService implements ICallService {
  call(contactNumber: string, errorHandler: (reason: any) => void) {
    const url = `${Platform.OS === 'ios' ? 'telprompt' : 'tel'}${contactNumber}`;
    return Linking.canOpenURL(url).then(canOpen => {
      if (canOpen) {
        return Linking.openURL(url)
          .catch(error => errorHandler(error));
      } else {
        errorHandler("OS can't perform call");
      }
    });
  }
}