import { AsyncStorage } from 'react-native';
import { UserRecord } from './interface';

const storageKeys: Record<string, string> = {
  messages: 'messages',
  user: 'user',
};

async function getAsyncStorage<T>(key: string): Promise<T | null> {
  try {
    const value: string | null = await AsyncStorage.getItem(key);

    if (value === null) {
      console.log(`AsyncStorage: Failed to get key:'${key}'`);
    } else {
      return JSON.parse(value);
    }
  } catch (e) {
    console.log(e);
  }
  return null;
}

async function setAsyncStorage<T>(key: string, value: T): void {
  try {
    const valueStr: string = JSON.stringify(value);
    await AsyncStorage.setItem(key, valueStr);
  } catch (e) {
    console.log(`AsyncStorage: Could not save value to key:'${key}'`);
  }
}

export async function getStoredUser(): Promise<UserRecord | null> {
  return getAsyncStorage<UserRecord>(storageKeys.user);
}

export async function storeUser(user: UserRecord): Promise<void> {
  setAsyncStorage<UserRecord>(storageKeys.user, user);
}
