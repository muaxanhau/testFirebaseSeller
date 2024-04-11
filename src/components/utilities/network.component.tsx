import {StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {ComponentBaseModel} from 'models';
import {useAppNetwork} from 'utils';
import {TextComponent, ViewAnimationComponent} from 'components/common';
import {colors, valueStyles} from 'values';
import {EnteringAnimationEnum, ExitingAnimationEnum} from 'models';

type NetworkProps = ComponentBaseModel;
export const NetworkComponent: FC<NetworkProps> = () => {
  const appNetwork = useAppNetwork();

  if (appNetwork === 'online') {
    return null;
  }

  return (
    <ViewAnimationComponent
      style={styles.container}
      entering={EnteringAnimationEnum.FLIP_IN_EASY_X}
      exiting={ExitingAnimationEnum.FLIP_OUT_EASY_X}>
      <TextComponent style={styles.text}>Disconnected</TextComponent>
    </ViewAnimationComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral300,
  },
  text: {
    textAlign: 'center',
    margin: valueStyles.margin2,
  },
});
