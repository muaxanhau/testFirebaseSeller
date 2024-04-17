import auth from '@react-native-firebase/auth';
import {devToolConfig} from 'config';
import {KeyService, useApiMutation} from 'repositories/services';
import {useDisableDeviceIdRepo} from 'repositories/users';
import {useResetMainStackNavigation, utils} from 'utils';

type LogoutOutput = null;
export const useLogoutRepo = () => {
  const reset = useResetMainStackNavigation();
  const {disableDeviceId} = useDisableDeviceIdRepo();

  const {mutate: logout, ...rest} = useApiMutation<LogoutOutput>({
    mutationKey: [KeyService.LOGOUT],
    mutationFn: async () => {
      await utils.sleep(devToolConfig.delayFetching);

      disableDeviceId();
      await auth().signOut();

      return null;
    },
    onSuccess: () => reset('Login'),
  });

  return {logout, ...rest};
};
