import {Alert, KeyboardAvoidingView} from 'react-native';
import React, {FC, useRef} from 'react';
import {
  useHookForm,
  useMainStackNavigation,
  useResetMainStackNavigation,
} from 'utils';
import {loginFormSchema} from 'models';
import {
  ButtonComponent,
  InputTextComponent,
  ModalRefProps,
  ScreenLayoutComponent,
  TextComponent,
} from 'components';
import {LoginPhoneModalComponent} from './components';
import {useLoginRepo} from 'repositories';

export const LoginScreen: FC = () => {
  const navigation = useMainStackNavigation();
  const resetMainStackNavigation = useResetMainStackNavigation();
  const {control, handleSubmit} = useHookForm({schema: loginFormSchema});
  const refLoginPhoneModal = useRef<ModalRefProps>(null);
  const {login, isPending} = useLoginRepo({
    onSuccess: () => {
      Alert.alert('Alert', 'Login successful');
      resetMainStackNavigation('Home');
    },
  });

  const onPressLogin = handleSubmit(data => login(data));
  const onPressSignUp = () => navigation.navigate('SignUp');
  const onPressLoginWithPhone = () => refLoginPhoneModal.current?.open();

  return (
    <>
      <LoginPhoneModalComponent ref={refLoginPhoneModal} />

      <ScreenLayoutComponent paddingHorizontal gap>
        <TextComponent type="h1">Buyer</TextComponent>

        <KeyboardAvoidingView>
          <InputTextComponent
            control={control}
            name="email"
            title="Email"
            placeholder="Email"
            autoCapitalize="none"
          />

          <InputTextComponent
            control={control}
            name="password"
            title="Password"
            placeholder="Password"
            secureTextEntry
          />

          <ButtonComponent
            title="Login"
            onPress={onPressLogin}
            isLoading={isPending}
          />
        </KeyboardAvoidingView>

        <ButtonComponent
          title="Sign up"
          type="outline"
          onPress={onPressSignUp}
        />
        <ButtonComponent
          title="Login with Phone"
          color="warning"
          type="outline"
          onPress={onPressLoginWithPhone}
        />
      </ScreenLayoutComponent>
    </>
  );
};
