import 'react-native-gesture-handler';
import React, {FC} from 'react';
import {StatusBar} from 'react-native';
import {MainStackNavigation} from 'navigations';
import {
  useEventPushNotification,
  useFirstSetupApp,
  withNavigationContainer,
  withProvider,
} from 'utils';
import {useQueryClient} from '@tanstack/react-query';
import {TriggerKeyPushNotificationEnum} from 'models';
import {KeyService} from 'repositories';

export const Main: FC = withNavigationContainer(
  withProvider(() => {
    useFirstSetupApp();

    const queryClient = useQueryClient();
    useEventPushNotification(TriggerKeyPushNotificationEnum.STATUS_FOOD, () =>
      queryClient.invalidateQueries({
        queryKey: [KeyService.GET_FOOD_SESSIONS],
      }),
    );

    return (
      <>
        <StatusBar hidden translucent />

        <MainStackNavigation />
      </>
    );
  }),
);
