import {StyleSheet, Text, TextStyle} from 'react-native';
import React, {FC} from 'react';
import {ComponentWithChildBaseModel} from 'models';
import {commonStyles} from 'values';

type Type = keyof typeof styles;
type TextProps = ComponentWithChildBaseModel<{
  type?: Type;
  style?: TextStyle;
}>;
export const TextComponent: FC<TextProps> = ({
  children,
  type = 'default',
  style,
}) => {
  return <Text style={[styles[type], style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  default: commonStyles.textDefault,
  h1: commonStyles.textH1,
  h2: commonStyles.textH2,
  h3: commonStyles.textH3,
});
