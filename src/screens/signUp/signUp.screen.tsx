import {Alert, KeyboardAvoidingView} from 'react-native';
import React, {FC} from 'react';
import {useGoBackScreen, useHookForm} from 'utils';
import {loginFormSchema} from 'models';
import {
  ButtonComponent,
  InputTextComponent,
  ScreenLayoutComponent,
  TextComponent,
} from 'components';
import {useSignUpRepo} from 'repositories';

export const SignUpScreen: FC = () => {
  const goBack = useGoBackScreen();
  const {control, handleSubmit} = useHookForm({schema: loginFormSchema});
  const {signUp, isPending} = useSignUpRepo({
    onSuccess: () => {
      Alert.alert('Alert', 'Sign up successful');
      goBack();
    },
  });

  const onPressSignUp = handleSubmit(data => signUp(data));

  return (
    <ScreenLayoutComponent paddingHorizontal>
      <TextComponent type="h1">Sign up</TextComponent>

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
          title="Sign up"
          onPress={onPressSignUp}
          isLoading={isPending}
        />
      </KeyboardAvoidingView>
    </ScreenLayoutComponent>
  );
};
