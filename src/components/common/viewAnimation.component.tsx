import {EnteringAnimationEnum, ExitingAnimationEnum} from 'models';
import {ComponentWithChildBaseModel} from 'models';
import React, {FC} from 'react';
import Animated, {
  BounceIn,
  BounceInDown,
  BounceInLeft,
  BounceInRight,
  BounceInUp,
  BounceOut,
  BounceOutDown,
  BounceOutLeft,
  BounceOutRight,
  BounceOutUp,
  FadeIn,
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
  FadeOut,
  FadeOutDown,
  FadeOutLeft,
  FadeOutRight,
  FadeOutUp,
  FlipInEasyX,
  FlipInEasyY,
  FlipInXDown,
  FlipInXUp,
  FlipInYLeft,
  FlipInYRight,
  FlipOutEasyX,
  FlipOutEasyY,
  FlipOutXDown,
  FlipOutXUp,
  FlipOutYLeft,
  FlipOutYRight,
  LinearTransition,
  LightSpeedInLeft,
  LightSpeedInRight,
  LightSpeedOutLeft,
  LightSpeedOutRight,
  PinwheelIn,
  PinwheelOut,
  RollInLeft,
  RollInRight,
  RollOutLeft,
  RollOutRight,
  RotateInDownLeft,
  RotateInDownRight,
  RotateInUpLeft,
  RotateInUpRight,
  RotateOutDownLeft,
  RotateOutDownRight,
  RotateOutUpLeft,
  RotateOutUpRight,
  SlideInDown,
  SlideInLeft,
  SlideInRight,
  SlideInUp,
  SlideOutDown,
  SlideOutLeft,
  SlideOutRight,
  SlideOutUp,
  StretchInX,
  StretchInY,
  StretchOutX,
  StretchOutY,
  ZoomIn,
  ZoomInDown,
  ZoomInEasyDown,
  ZoomInEasyUp,
  ZoomInLeft,
  ZoomInRight,
  ZoomInRotate,
  ZoomInUp,
  ZoomOut,
  ZoomOutDown,
  ZoomOutEasyDown,
  ZoomOutEasyUp,
  ZoomOutLeft,
  ZoomOutRight,
  ZoomOutRotate,
  ZoomOutUp,
} from 'react-native-reanimated';

const enteringList = {
  [EnteringAnimationEnum.UNDEFINED]: undefined,

  [EnteringAnimationEnum.FADE_IN]: FadeIn,
  [EnteringAnimationEnum.FADE_IN_RIGHT]: FadeInRight,
  [EnteringAnimationEnum.FADE_IN_LEFT]: FadeInLeft,
  [EnteringAnimationEnum.FADE_IN_UP]: FadeInUp,
  [EnteringAnimationEnum.FADE_IN_DOWN]: FadeInDown,

  [EnteringAnimationEnum.BOUNCE_IN]: BounceIn,
  [EnteringAnimationEnum.BOUNCE_IN_RIGHT]: BounceInRight,
  [EnteringAnimationEnum.BOUNCE_IN_LEFT]: BounceInLeft,
  [EnteringAnimationEnum.BOUNCE_IN_UP]: BounceInUp,
  [EnteringAnimationEnum.BOUNCE_IN_DOWN]: BounceInDown,

  [EnteringAnimationEnum.FLIP_IN_Y_RIGHT]: FlipInYRight,
  [EnteringAnimationEnum.FLIP_IN_Y_LEFT]: FlipInYLeft,
  [EnteringAnimationEnum.FLIP_IN_X_UP]: FlipInXUp,
  [EnteringAnimationEnum.FLIP_IN_X_DOWN]: FlipInXDown,
  [EnteringAnimationEnum.FLIP_IN_EASY_X]: FlipInEasyX,
  [EnteringAnimationEnum.FLIP_IN_EASY_Y]: FlipInEasyY,

  [EnteringAnimationEnum.STRETCH_IN_X]: StretchInX,
  [EnteringAnimationEnum.STRETCH_IN_Y]: StretchInY,

  [EnteringAnimationEnum.ZOOM_IN]: ZoomIn,
  [EnteringAnimationEnum.ZOOM_IN_ROTATE]: ZoomInRotate,
  [EnteringAnimationEnum.ZOOM_IN_RIGHT]: ZoomInRight,
  [EnteringAnimationEnum.ZOOM_IN_LEFT]: ZoomInLeft,
  [EnteringAnimationEnum.ZOOM_IN_UP]: ZoomInUp,
  [EnteringAnimationEnum.ZOOM_IN_DOWN]: ZoomInDown,
  [EnteringAnimationEnum.ZOOM_IN_EASY_UP]: ZoomInEasyUp,
  [EnteringAnimationEnum.ZOOM_IN_EASY_DOWN]: ZoomInEasyDown,

  [EnteringAnimationEnum.SLIDE_IN_RIGHT]: SlideInRight,
  [EnteringAnimationEnum.SLIDE_IN_LEFT]: SlideInLeft,
  [EnteringAnimationEnum.SLIDE_IN_UP]: SlideInUp,
  [EnteringAnimationEnum.SLIDE_IN_DOWN]: SlideInDown,

  [EnteringAnimationEnum.LIGHT_SPEED_IN_RIGHT]: LightSpeedInRight,
  [EnteringAnimationEnum.LIGHT_SPEED_IN_LEFT]: LightSpeedInLeft,

  [EnteringAnimationEnum.PINWHEEL_IN]: PinwheelIn,

  [EnteringAnimationEnum.ROLL_IN_LEFT]: RollInLeft,
  [EnteringAnimationEnum.ROLL_IN_RIGHT]: RollInRight,

  [EnteringAnimationEnum.ROTATE_IN_DOWN_LEFT]: RotateInDownLeft,
  [EnteringAnimationEnum.ROTATE_IN_DOWN_RIGHT]: RotateInDownRight,
  [EnteringAnimationEnum.ROTATE_IN_UP_LEFT]: RotateInUpLeft,
  [EnteringAnimationEnum.ROTATE_IN_UP_RIGHT]: RotateInUpRight,
};
const exitingList = {
  [ExitingAnimationEnum.UNDEFINED]: undefined,

  [ExitingAnimationEnum.FADE_OUT]: FadeOut,
  [ExitingAnimationEnum.FADE_OUT_RIGHT]: FadeOutRight,
  [ExitingAnimationEnum.FADE_OUT_LEFT]: FadeOutLeft,
  [ExitingAnimationEnum.FADE_OUT_UP]: FadeOutUp,
  [ExitingAnimationEnum.FADE_OUT_DOWN]: FadeOutDown,

  [ExitingAnimationEnum.BOUNCE_OUT]: BounceOut,
  [ExitingAnimationEnum.BOUNCE_OUT_RIGHT]: BounceOutRight,
  [ExitingAnimationEnum.BOUNCE_OUT_LEFT]: BounceOutLeft,
  [ExitingAnimationEnum.BOUNCE_OUT_UP]: BounceOutUp,
  [ExitingAnimationEnum.BOUNCE_OUT_DOWN]: BounceOutDown,

  [ExitingAnimationEnum.FLIP_OUT_Y_RIGHT]: FlipOutYRight,
  [ExitingAnimationEnum.FLIP_OUT_Y_LEFT]: FlipOutYLeft,
  [ExitingAnimationEnum.FLIP_OUT_X_UP]: FlipOutXUp,
  [ExitingAnimationEnum.FLIP_OUT_X_DOWN]: FlipOutXDown,
  [ExitingAnimationEnum.FLIP_OUT_EASY_X]: FlipOutEasyX,
  [ExitingAnimationEnum.FLIP_OUT_EASY_Y]: FlipOutEasyY,

  [ExitingAnimationEnum.STRETCH_OUT_X]: StretchOutX,
  [ExitingAnimationEnum.STRETCH_OUT_Y]: StretchOutY,

  [ExitingAnimationEnum.ZOOM_OUT]: ZoomOut,
  [ExitingAnimationEnum.ZOOM_OUT_ROTATE]: ZoomOutRotate,
  [ExitingAnimationEnum.ZOOM_OUT_RIGHT]: ZoomOutRight,
  [ExitingAnimationEnum.ZOOM_OUT_LEFT]: ZoomOutLeft,
  [ExitingAnimationEnum.ZOOM_OUT_UP]: ZoomOutUp,
  [ExitingAnimationEnum.ZOOM_OUT_DOWN]: ZoomOutDown,
  [ExitingAnimationEnum.ZOOM_OUT_EASY_UP]: ZoomOutEasyUp,
  [ExitingAnimationEnum.ZOOM_OUT_EASY_DOWN]: ZoomOutEasyDown,

  [ExitingAnimationEnum.SLIDE_OUT_RIGHT]: SlideOutRight,
  [ExitingAnimationEnum.SLIDE_OUT_LEFT]: SlideOutLeft,
  [ExitingAnimationEnum.SLIDE_OUT_UP]: SlideOutUp,
  [ExitingAnimationEnum.SLIDE_OUT_DOWN]: SlideOutDown,

  [ExitingAnimationEnum.LIGHT_SPEED_OUT_RIGHT]: LightSpeedOutRight,
  [ExitingAnimationEnum.LIGHT_SPEED_OUT_LEFT]: LightSpeedOutLeft,

  [ExitingAnimationEnum.PINWHEEL_OUT]: PinwheelOut,

  [ExitingAnimationEnum.ROLL_OUT_LEFT]: RollOutLeft,
  [ExitingAnimationEnum.ROLL_OUT_RIGHT]: RollOutRight,

  [ExitingAnimationEnum.ROTATE_OUT_DOWN_LEFT]: RotateOutDownLeft,
  [ExitingAnimationEnum.ROTATE_OUT_DOWN_RIGHT]: RotateOutDownRight,
  [ExitingAnimationEnum.ROTATE_OUT_UP_LEFT]: RotateOutUpLeft,
  [ExitingAnimationEnum.ROTATE_OUT_UP_RIGHT]: RotateOutUpRight,
};

type ViewAnimationProps = ComponentWithChildBaseModel<{
  entering?: EnteringAnimationEnum;
  exiting?: ExitingAnimationEnum;
  delay?: number;
}>;
export const ViewAnimationComponent: FC<ViewAnimationProps> = ({
  children,
  style,
  entering = EnteringAnimationEnum.UNDEFINED,
  exiting = ExitingAnimationEnum.UNDEFINED,
  delay = 0,
}) => {
  return (
    <Animated.View
      style={style}
      entering={enteringList[entering]?.delay(delay)}
      exiting={exitingList[exiting]}
      layout={LinearTransition.delay(100)}>
      {children}
    </Animated.View>
  );
};
