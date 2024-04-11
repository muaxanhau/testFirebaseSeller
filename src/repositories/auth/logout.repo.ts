import auth from '@react-native-firebase/auth';
import {devToolConfig} from 'config';
import {KeyService, service, useApiMutation} from 'repositories/services';
import {utils} from 'utils';

type LogoutProps = {onSuccess?: () => void} | void;
type LogoutOutput = null;
export const useLogoutRepo = (props: LogoutProps) => {
  const {mutate: logout, ...rest} = useApiMutation<LogoutOutput>({
    mutationKey: [KeyService.LOGOUT],
    mutationFn: async () => {
      await utils.sleep(devToolConfig.delayFetching);

      await service.get<LogoutOutput>('auth/logout');
      await auth().signOut();

      return null;
    },
    ...props,
  });

  return {logout, ...rest};
};
