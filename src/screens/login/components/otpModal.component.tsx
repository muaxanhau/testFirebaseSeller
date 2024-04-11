import {Alert, View} from 'react-native';
import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {ComponentBaseModel} from 'models';
import {
  ButtonComponent,
  InputOTPComponent,
  InputOTPRefProps,
  ModalComponent,
  ModalRefProps,
  TextComponent,
} from 'components';
import {commonStyles} from 'values';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useResetMainStackNavigation} from 'utils';
import {useConfirmOtpRepo} from 'repositories';

export type OtpModalRefProps = {
  open: (confirmation: FirebaseAuthTypes.ConfirmationResult) => void;
  close: () => void;
};
type OtpModalProps = ComponentBaseModel;
export const OtpModalComponent = forwardRef<OtpModalRefProps, OtpModalProps>(
  (_, ref) => {
    const resetMainStackNavigation = useResetMainStackNavigation();
    const refOtp = useRef<InputOTPRefProps>(null);
    const refModal = useRef<ModalRefProps>(null);
    const refConfirmation = useRef<FirebaseAuthTypes.ConfirmationResult>();
    const {confirmOtp, isPending} = useConfirmOtpRepo({
      onSuccess: () => {
        close();
        resetMainStackNavigation('Home');
      },
    });

    const open = (confirmation: FirebaseAuthTypes.ConfirmationResult) => {
      refConfirmation.current = confirmation;
      refModal.current?.open();
    };
    const close = () => {
      refConfirmation.current = undefined;
      refModal.current?.close();
    };
    const verifyOtp = async (otp: string) =>
      refConfirmation.current &&
      confirmOtp({confirmation: refConfirmation.current, otp});

    const onPress = () => {
      const otp = refOtp.current?.getValue();
      if (!otp) {
        Alert.alert('Warning', 'Please fill OTP');
        return;
      }

      verifyOtp(otp);
    };
    const onShow = () => setTimeout(() => refOtp.current?.focus(), 100);
    const onDismiss = () => refOtp.current?.clearValue();

    useImperativeHandle(ref, () => ({open, close}), []);

    return (
      <ModalComponent ref={refModal} onDismiss={onDismiss} onShow={onShow}>
        <View style={commonStyles.modalContainer}>
          <TextComponent type="h2">Confirm OTP</TextComponent>

          <InputOTPComponent ref={refOtp} onFullOtp={verifyOtp} />

          <ButtonComponent
            title={'Confirm OTP'}
            onPress={onPress}
            isLoading={isPending}
          />
        </View>
      </ModalComponent>
    );
  },
);
