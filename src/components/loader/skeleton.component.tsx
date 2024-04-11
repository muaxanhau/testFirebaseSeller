import {StyleSheet, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import {ComponentWithChildBaseModel} from 'models';

type SkeletonProps = ComponentWithChildBaseModel<{
  visible?: boolean;
}>;
export const SkeletonComponent: FC<SkeletonProps> = ({
  children,
  visible = true,
  style,
}) => {
  useEffect(() => {}, [visible]);

  return <View style={style}>{children}</View>;
};

const styles = StyleSheet.create({});
