import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScreenBaseModel} from 'models';
import {ScreenLayoutComponent} from 'components';
import {StatusFoodsListComponent} from './components';

export const StatusFoodsScreen: ScreenBaseModel = () => {
  return (
    <ScreenLayoutComponent gap title="Seller - Buyer" disablePaddingTop>
      <StatusFoodsListComponent />
    </ScreenLayoutComponent>
  );
};

const styles = StyleSheet.create({});
