import {StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {ComponentBaseModel} from 'models';
import {TextComponent} from 'components';
import {colors} from 'values';

type ErrorProps = ComponentBaseModel<{
  message?: string;
}>;
export const ErrorComponent: FC<ErrorProps> = ({message}) => {
  return <TextComponent style={styles.text}>{message ?? ' '}</TextComponent>;
};

const styles = StyleSheet.create({
  text: {
    color: colors.red,
  },
});
