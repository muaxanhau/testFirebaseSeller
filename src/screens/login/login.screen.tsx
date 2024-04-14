import {Alert, KeyboardAvoidingView} from 'react-native';
import React, {FC} from 'react';
import {
  useHookForm,
  useMainStackNavigation,
  useResetMainStackNavigation,
} from 'utils';
import {loginFormSchema} from 'models';
import {
  ButtonComponent,
  InputTextComponent,
  ScreenLayoutComponent,
  TextComponent,
} from 'components';
import {useLoginRepo} from 'repositories';

export const LoginScreen: FC = () => {
  const navigation = useMainStackNavigation();
  const reset = useResetMainStackNavigation();
  const {control, handleSubmit} = useHookForm({schema: loginFormSchema});
  const {login, isPending} = useLoginRepo({
    onSuccess: () => {
      Alert.alert('Alert', 'Login successful');
      reset('Home');
    },
  });

  const onPressLogin = handleSubmit(data => login(data));
  const onPressSignUp = () => navigation.navigate('SignUp');

  return (
    <ScreenLayoutComponent paddingHorizontal gap>
      <TextComponent type="h1">Seller</TextComponent>

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

      <ButtonComponent title="Sign up" type="outline" onPress={onPressSignUp} />
    </ScreenLayoutComponent>
  );
};
