import React, {FC} from 'react';
import {ComponentBaseModel} from 'models';
import {ActivityIndicatorComponent} from './activityIndicator.component';
import {Modal, StyleSheet, View} from 'react-native';
import {useIsLoading, utils} from 'utils';
import {colors} from 'values';

type LoaderProps = ComponentBaseModel;
export const LoaderComponent: FC<LoaderProps> = () => {
  const isLoading = useIsLoading();

  return (
    <Modal visible={isLoading} transparent>
      <View style={styles.container}>
        <ActivityIndicatorComponent size={90} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: utils.opacityColor(colors.black, 0.3),
    zIndex: 999999,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
