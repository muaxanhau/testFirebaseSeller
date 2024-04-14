import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {devToolConfig} from 'config';
import {RoleEnum} from 'models';
import {KeyService, useApiMutation} from 'repositories/services';
import {useAddUserRepo} from 'repositories/users';
import {utils} from 'utils';

type LoginProps = {onSuccess?: () => void} | void;
type LoginInput = {email: string; password: string};
type LoginOutput = FirebaseAuthTypes.UserCredential;
export const useSignUpRepo = (props: LoginProps) => {
  const {addUser} = useAddUserRepo();

  const {mutate: signUp, ...rest} = useApiMutation<LoginOutput, LoginInput>({
    mutationKey: [KeyService.SIGN_UP],
    mutationFn: async ({email, password}) => {
      await utils.sleep(devToolConfig.delayFetching);

      const user = await auth().createUserWithEmailAndPassword(email, password);

      return user;
    },
    onSuccess: data => {
      addUser({data: {id: data.user.uid, role: RoleEnum.ADMIN}});

      if (typeof props === 'undefined') return;
      props.onSuccess?.();
    },
  });

  return {signUp, ...rest};
};
