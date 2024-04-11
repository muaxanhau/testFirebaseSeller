import auth from '@react-native-firebase/auth';
import {devToolConfig} from 'config';
import {KeyService, service, useApiMutation} from 'repositories/services';
import {useResetMainStackNavigation, utils} from 'utils';

type LogoutOutput = null;
export const useLogoutRepo = () => {
  const reset = useResetMainStackNavigation();

  const {mutate: logout, ...rest} = useApiMutation<LogoutOutput>({
    mutationKey: [KeyService.LOGOUT],
    mutationFn: async () => {
      await utils.sleep(devToolConfig.delayFetching);

      await service.get<LogoutOutput>('auth/logout');
      await auth().signOut();

      return null;
    },
    onSuccess: () => reset('Login'),
  });

  return {logout, ...rest};
};
