import React from 'react';
import {StyleSheet} from 'react-native';
import {ScreenBaseModel} from 'models';
import {ScreenLayoutComponent, TextComponent} from 'components';

export const SplashScreen: ScreenBaseModel = () => {
  return (
    <ScreenLayoutComponent style={styles.container}>
      <TextComponent type="h1">Logo</TextComponent>
    </ScreenLayoutComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
