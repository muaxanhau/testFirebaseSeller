import auth from '@react-native-firebase/auth';
import {devToolConfig} from 'config';
import {KeyService, useApiMutation} from 'repositories/services';
import {utils} from 'utils';

type LogoutProps = {onSuccess?: () => void} | void;
type LogoutOutput = void;
export const useLogoutRepo = (props: LogoutProps) => {
  const {mutate: logout, ...rest} = useApiMutation<LogoutOutput>({
    mutationKey: [KeyService.LOGOUT],
    mutationFn: async () => {
      await utils.sleep(devToolConfig.delayFetching);

      await auth().signOut();
    },
    ...props,
  });

  return {logout, ...rest};
};
