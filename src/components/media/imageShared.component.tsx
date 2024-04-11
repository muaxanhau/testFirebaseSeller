import {Image, ImageProps} from 'react-native';
import React, {FC} from 'react';
import {ComponentBaseModel} from 'models';
import Animated from 'react-native-reanimated';
import {utils} from 'utils';

type ImageSharedProps = ComponentBaseModel<
  {
    sharedTransitionTag: string;
    url: string | undefined;
    disableOnAndroid?: boolean;
  } & ImageProps
>;
export const ImageSharedComponent: FC<ImageSharedProps> = ({
  sharedTransitionTag,
  url,
  disableOnAndroid = false,
  ...rest
}) => {
  if (utils.isAndroid() && disableOnAndroid) {
    // in case screen transition is slide horizontal, we usually have a problem on android
    // so if transition is slide horizontal, we should use default image
    return <Image source={utils.imageUrl(url)} {...rest} />;
  }

  return (
    <Animated.Image
      sharedTransitionTag={sharedTransitionTag}
      source={utils.imageUrl(url)}
      {...rest}
    />
  );
};
