import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import React from 'react';
import {ComponentBaseModel} from 'models';
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form';
import {ErrorComponent} from './error.component';
import {colors, valueStyles} from 'values';
import {TextComponent} from 'components';

type InputTextProps<
  T extends FieldValues,
  TControl = Control<T>,
  TName = FieldPath<T>,
> = ComponentBaseModel<
  {
    control: TControl;
    name: TName;
    title?: string;
    placeholder?: string;
    onChange?: (value: PathValue<T, Path<T>>) => void;
  } & TextInputProps
>;
export const InputTextComponent = <T extends {}>({
  control,
  name,
  title,
  onChange,
  style,
  ...rest
}: InputTextProps<T>) => {
  return (
    <View style={[styles.container, style]}>
      {!!title?.length && <TextComponent>{title}</TextComponent>}

      <Controller
        control={control}
        name={name}
        render={({
          field: {onChange: onChangeController, value},
          fieldState: {error},
        }) => (
          <>
            <TextInput
              style={styles.input}
              value={value?.toString()}
              onChangeText={text => {
                onChangeController(text as PathValue<T, Path<T>>);
                onChange?.(text as PathValue<T, Path<T>>);
              }}
              {...rest}
            />

            <ErrorComponent message={error?.message} />
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  input: {
    padding: valueStyles.padding3,
    borderBottomWidth: valueStyles.line,
    color: colors.neutral700,
  },
});
