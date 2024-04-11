import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {devToolConfig} from 'config';
import {KeyService, useApiMutation} from 'repositories/services';
import {utils} from 'utils';

type LoginWithPhoneProps = {
  onSuccess?: (data: LoginWithPhoneOutput) => void;
} | void;
type LoginWithPhoneInput = {phone: string};
type LoginWithPhoneOutput = FirebaseAuthTypes.ConfirmationResult;
export const useLoginWithPhoneRepo = (props: LoginWithPhoneProps) => {
  const {mutate: loginWithPhone, ...rest} = useApiMutation<
    LoginWithPhoneOutput,
    LoginWithPhoneInput
  >({
    mutationKey: [KeyService.LOGIN_WITH_PHONE],
    mutationFn: async ({phone}) => {
      await utils.sleep(devToolConfig.delayFetching);

      const confirmation = await auth().signInWithPhoneNumber(phone);
      return confirmation;
    },
    ...props,
  });

  return {loginWithPhone, ...rest};
};
