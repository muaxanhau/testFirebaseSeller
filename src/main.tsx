import 'react-native-gesture-handler';
import React, {FC} from 'react';
import {StatusBar} from 'react-native';
import {MainStackNavigation} from 'navigations';
import {useFirstSetupApp, withNavigationContainer, withProvider} from 'utils';

export const Main: FC = withNavigationContainer(
  withProvider(() => {
    useFirstSetupApp();

    return (
      <>
        <StatusBar hidden translucent />

        <MainStackNavigation />
      </>
    );
  }),
);
