import {Alert, View} from 'react-native';
import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {ComponentBaseModel, phoneFormSchema} from 'models';
import {
  ButtonComponent,
  InputTextComponent,
  ModalComponent,
  TextComponent,
  type ModalRefProps,
} from 'components';
import {commonStyles} from 'values';
import {useHookForm} from 'utils';
import {OtpModalComponent, OtpModalRefProps} from './otpModal.component';
import {useLoginWithPhoneRepo} from 'repositories';

type LoginPhoneModalProps = ComponentBaseModel;
export const LoginPhoneModalComponent = forwardRef<
  ModalRefProps,
  LoginPhoneModalProps
>(({}, ref) => {
  const {control, handleSubmit, reset} = useHookForm({
    schema: phoneFormSchema,
    defaultValues: {phone: '+84111111111'},
  });
  const {loginWithPhone, isPending} = useLoginWithPhoneRepo({
    onSuccess: confirmation => {
      close();
      refOtpModal.current?.open(confirmation);
    },
  });
  const refPhoneModal = useRef<ModalRefProps>(null);
  const refOtpModal = useRef<OtpModalRefProps>(null);

  const open = () => refPhoneModal.current?.open();
  const close = () => refPhoneModal.current?.close();

  const onPress = handleSubmit(data => loginWithPhone(data));

  useImperativeHandle(ref, () => ({open, close}), []);

  return (
    <>
      <ModalComponent ref={refPhoneModal} onDismiss={reset}>
        <View style={commonStyles.modalContainer}>
          <TextComponent type="h2">Login with phone number</TextComponent>

          <InputTextComponent
            control={control}
            name={'phone'}
            title="Enter your phone number"
            placeholder="0123..."
          />

          <ButtonComponent
            title={'Send OTP'}
            onPress={onPress}
            isLoading={isPending}
          />
        </View>
      </ModalComponent>

      <OtpModalComponent ref={refOtpModal} />
    </>
  );
});
