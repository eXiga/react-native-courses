import { AsyncStorage } from "react-native";

interface ICredentials {
  email: string | null;
  password: string | null;
}

export interface IKeychainService {
  save(credentials: ICredentials): Promise<void>;
  getCredentials(): Promise<ICredentials>;
}

export class KeychainService implements IKeychainService {
  async save(credentials: ICredentials) {
    await AsyncStorage.setItem('Keychain:email', credentials.email!);
    await AsyncStorage.setItem('Keychain:password', credentials.password!);
  }

  async getCredentials() {
    const email = await AsyncStorage.getItem('Keychain:email');
    const password = await AsyncStorage.getItem('Keychain:password');
    return { email: email, password: password };
  }
}