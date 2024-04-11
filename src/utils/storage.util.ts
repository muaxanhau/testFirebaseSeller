import {StorageEnum} from 'models';
import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

const store = (key: StorageEnum, item: unknown) => {
  storage.set(key, JSON.stringify(item));
};

const retrieve = <T>(key: StorageEnum): T | undefined => {
  const retrievedItem = storage.getString(key);

  return retrievedItem ? (JSON.parse(retrievedItem) as T) : undefined;
};

const remove = (key: StorageEnum) => storage.delete(key);

const removeAll = storage.clearAll;

export const storageUtil = {
  store,
  retrieve,
  remove,
  removeAll,
};
