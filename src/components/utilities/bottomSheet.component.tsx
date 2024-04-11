import {ComponentBaseModel} from 'models';
import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Modal, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  gestureHandlerRootHOC,
} from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {utils} from 'utils';
import {colors, commonStyles, valueStyles} from 'values';

export type BottomSheetRefProps = {
  isActive: () => boolean;
  scrollTo: (destination: number) => void;
  open: () => void;
  close: () => void;
};
type BottomSheetProps = ComponentBaseModel<{
  children?: React.ReactNode;
  height?: number;
  backgroundColor?: string;
  onOpen?: () => void;
  onClose?: () => void;
  paddingHorizontal?: boolean;
}>;
export const BottomSheetComponent = forwardRef<
  BottomSheetRefProps,
  BottomSheetProps
>(
  (
    {
      children,
      height = valueStyles.height / 2,
      backgroundColor = colors.white,
      onOpen = () => {},
      onClose = () => {},
      paddingHorizontal = false,
    },
    ref,
  ) => {
    //#region useHooks
    const [visible, setVisible] = useState<boolean>(false);
    const insets = useSafeAreaInsets();
    const context = useSharedValue({y: 0});
    const translateY = useSharedValue(0);
    const active = useSharedValue(false);
    //#endregion

    //#region constants
    const maxTranslateY = -(valueStyles.height - insets.top);
    //#endregion

    //#region func
    const isActive = () => active.value;
    const scrollTo = (destination: number) => {
      'worklet';

      const isInvalid = Math.abs(destination) > Math.abs(maxTranslateY);
      if (isInvalid) {
        return;
      }

      active.value = destination !== 0;
      translateY.value = withSpring(destination, {damping: 50});
    };
    const close = () => {
      onClose();

      setTimeout(() => {
        setVisible(prev => (prev = false));
      }, 300);
      scrollTo(0);
    };
    const open = () => {
      onOpen();

      setVisible(prev => (prev = true));
      scrollTo(-height);
    };
    //#endregion

    const dragGesture = Gesture.Pan()
      .onStart(() => {
        context.value = {y: translateY.value};
      })
      .onUpdate(e => {
        translateY.value = Math.max(
          e.translationY + context.value.y,
          maxTranslateY,
        );
      })
      .onEnd(() => {
        const isCloseThreshold = Math.abs(translateY.value) < height * (4 / 5);
        if (isCloseThreshold) {
          runOnJS(close)();

          return;
        }

        scrollTo(-height);
      });
    const rStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [maxTranslateY + 50, maxTranslateY],
        [valueStyles.borderRadius, valueStyles.borderRadius2],
        Extrapolation.CLAMP,
      );

      return {
        borderRadius,
        transform: [{translateY: translateY.value}],
      };
    });

    const BottomSheetWithGestureHandler = gestureHandlerRootHOC(() => (
      <>
        <TouchableWithoutFeedback onPress={close}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>

        <GestureDetector gesture={dragGesture}>
          <Animated.View style={[styles.container, {backgroundColor}, rStyle]}>
            <View
              style={{
                height: height - (insets.bottom || 2 * valueStyles.gap),
                paddingHorizontal: paddingHorizontal ? valueStyles.padding2 : 0,
              }}>
              <View style={styles.line} />

              {children}
            </View>
          </Animated.View>
        </GestureDetector>
      </>
    ));

    useImperativeHandle(
      ref,
      () => ({
        isActive,
        scrollTo,
        open,
        close,
      }),
      [scrollTo],
    );

    return (
      <Modal
        statusBarTranslucent={true}
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={close}>
        <BottomSheetWithGestureHandler />
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,

    backgroundColor: utils.opacityColor(colors.black, 0.5),
  },
  container: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: '100%',
    borderRadius: valueStyles.borderRadius,
    zIndex: 999,

    ...commonStyles.shadowTop,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: colors.neutral,
    borderRadius: 2,
    alignSelf: 'center',
    marginVertical: valueStyles.gap,

    ...commonStyles.shadow,
  },
});
