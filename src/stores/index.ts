import {useAuthStore} from './auth.store';

export * from './auth.store';

export const resetAllStores = () => {
  useAuthStore.getState().reset();
};
