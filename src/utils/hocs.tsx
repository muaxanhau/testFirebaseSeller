import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useAppQueryClient} from './hooks';

export const withProvider =
  (Component: FC): FC =>
  () => {
    const appQueryClient = useAppQueryClient();

    return (
      <QueryClientProvider client={appQueryClient}>
        <SafeAreaProvider>
          <Component />
        </SafeAreaProvider>
      </QueryClientProvider>
    );
  };

export const withNavigationContainer =
  (Component: FC): FC =>
  () => {
    return (
      <NavigationContainer>
        <GestureHandlerRootView style={{flex: 1}}>
          <Component />
        </GestureHandlerRootView>
      </NavigationContainer>
    );
  };
