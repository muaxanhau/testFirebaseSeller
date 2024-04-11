import {StyleSheet, TextInput, View} from 'react-native';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {ComponentBaseModel} from 'models';
import {utils} from 'utils';
import {colors, valueStyles} from 'values';
import {TextComponent} from 'components/common';

export type InputOTPRefProps = {
  getValue: () => string | undefined;
  clearValue: () => void;
  focus: () => void;
};
type InputOTPProps = ComponentBaseModel<{
  length?: number;
  secureTextEntry?: boolean;
  onFullOtp: (otp: string) => void;
}>;
export const InputOTPComponent = forwardRef<InputOTPRefProps, InputOTPProps>(
  ({style, length = 6, onFullOtp, secureTextEntry = false}, ref) => {
    const [value, setValue] = useState('');
    const refInput = useRef<TextInput>(null);

    const getValue = () => (value.length === length ? value : undefined);
    const clearValue = () => setValue('');
    const focus = () => refInput.current?.focus();

    const onChangeText = (text: string) => {
      const isMaxLength = text.length > length;
      if (isMaxLength) return;

      setValue(text);
    };

    useImperativeHandle(ref, () => ({getValue, clearValue, focus}), [value]);

    useEffect(() => {
      value.length === length && onFullOtp(value);
    }, [value]);

    return (
      <View style={[styles.container, style]}>
        {Array(length)
          .fill(0)
          .map((_, index) => {
            const char = value.charAt(index);
            const text = char.length ? (secureTextEntry ? '●' : char) : '';
            const borderColor =
              index === value.length ||
              (index === length - 1 && value.length === length)
                ? colors.primary
                : colors.neutral300;

            return (
              <View key={index} style={[styles.box, {borderColor}]}>
                <TextComponent>{text}</TextComponent>
              </View>
            );
          })}

        <TextInput
          ref={refInput}
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          keyboardType="number-pad"
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    width: utils.wp(10),
    aspectRatio: 1,
    backgroundColor: colors.neutral100,
    borderRadius: valueStyles.borderRadius2,
    borderWidth: valueStyles.line3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    position: 'absolute',
    opacity: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
