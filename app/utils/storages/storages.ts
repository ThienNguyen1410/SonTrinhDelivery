import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

export const useStorage = (key, defaultValue) => {
  const [storageValue, updateStorageValue] = useState(defaultValue);

  async function getStorageValue() {
    let value = defaultValue;
    try {
      value = JSON.parse(await AsyncStorage.getItem(key)) || defaultValue;
    } catch (e) {
    } finally {
      updateStorageValue(value);
    }
  }

  async function updateStorage(newValue) {
    try {
      if (newValue === null) {
        await AsyncStorage.removeItem(key);
      } else {
        const value = JSON.stringify(newValue);
        await AsyncStorage.setItem(key, value);
      }
    } catch (e) {
    } finally {
      updateStorageValue(newValue);
    }
  }

  useEffect(() => {
    getStorageValue();
  }, []);

  return [storageValue, updateStorage];
};

/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export function loadString(key: string) {
  try {
    return AsyncStorage.getItem(key);
  } catch {
    // not sure why this would fail... even reading the RN docs I'm unclear
    return null;
  }
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function saveString(key: string, value: string) {
  try {
    AsyncStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
export async function load(key: string) {
  try {
    const almostThere = await AsyncStorage.getItem(key);
    return JSON.parse(almostThere);
  } catch {
    return null;
  }
}

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function save(key: string, value: any) {
  try {
    AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
export async function remove(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch {}
}

/**
 * Burn it all to the ground.
 */
export async function clear() {
  try {
    await AsyncStorage.clear();
  } catch {}
}
