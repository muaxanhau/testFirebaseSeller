import {StyleSheet, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import {ComponentBaseModel} from 'models';
import {colors, valueStyles} from 'values';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const values = {
  gap: 6, // percent % of container's width
};
type ActivityIndicatorProps = ComponentBaseModel<{
  size?: number;
}>;
export const ActivityIndicatorComponent: FC<ActivityIndicatorProps> = ({
  size = 30,
  style,
}) => {
  const rotation = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${rotation.value}deg`,
      },
    ],
  }));

  useEffect(() => {
    rotation.value = withRepeat(
      withSequence(
        withTiming(360, {duration: 500, easing: Easing.linear}),
        withTiming(0, {duration: 0}),
        withDelay(2000, withTiming(0, {duration: 0})),
      ),
      -1,
      false,
    );
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {width: size, gap: (size * values.gap) / 100},
        style,
        rStyle,
      ]}>
      {/* 1 */}
      <View
        style={[
          styles.box,
          {backgroundColor: colors.green300, borderBottomLeftRadius: 0},
        ]}
      />
      {/* 4 */}
      <View
        style={[
          styles.box,
          {backgroundColor: colors.primary300, borderBottomRightRadius: 0},
        ]}
      />
      {/* 2 */}
      <View
        style={[
          styles.box,
          {backgroundColor: colors.yellow300, borderTopLeftRadius: 0},
        ]}
      />
      {/* 3 */}
      <View
        style={[
          styles.box,
          {backgroundColor: colors.red300, borderTopRightRadius: 0},
        ]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    flexWrap: 'wrap',
  },
  box: {
    width: `${50 - values.gap / 2}%`,
    aspectRatio: 1,
    borderRadius: valueStyles.borderRadius2,
  },
});
