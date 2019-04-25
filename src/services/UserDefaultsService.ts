import { AsyncStorage } from "react-native";

export enum UserDefaultsKeys {
  Email = 'Keychain:email',
  Password = 'Keychain:password',
  Token = 'Auth:token'
}

interface IAuthToken {
  value: string | null;
}

interface ICredentials {
  email: string | null;
  password: string | null;
}

export interface IUserDefaultsService {
  saveToken(token: IAuthToken): Promise<void>;
  getToken(): Promise<IAuthToken>;
  saveCredentials(credentials: ICredentials): Promise<void>;
  getCredentials(): Promise<ICredentials>;
}

export class UserDefaultsService implements IUserDefaultsService {
  async saveToken(token: IAuthToken): Promise<void> {
    await AsyncStorage.setItem(UserDefaultsKeys.Token, token.value!);
  }

  async getToken(): Promise<IAuthToken> {
    const token = await AsyncStorage.getItem(UserDefaultsKeys.Token);
    return { value: token };
  }

  async saveCredentials(credentials: ICredentials): Promise<void> {
    await AsyncStorage.setItem(UserDefaultsKeys.Email, credentials.email!);
    await AsyncStorage.setItem(UserDefaultsKeys.Password, credentials.password!);
  }

  async getCredentials(): Promise<ICredentials> {
    const email = await AsyncStorage.getItem(UserDefaultsKeys.Email);
    const password = await AsyncStorage.getItem(UserDefaultsKeys.Password);
    return { email: email, password: password };
  }
}