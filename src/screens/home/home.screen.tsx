import React from 'react';
import {ScreenBaseModel} from 'models';
import {useMainStackNavigation} from 'utils';
import {
  ButtonComponent,
  ScreenLayoutComponent,
  TextComponent,
} from 'components';
import {usePushNotificationRepo, useSetupUserRepo} from 'repositories';

export const HomeScreen: ScreenBaseModel = () => {
  const navigation = useMainStackNavigation();
  const {} = useSetupUserRepo();
  const {pushNotification, isPending} = usePushNotificationRepo();

  const onPressProfile = () => navigation.navigate('Profile');
  const onPressItems = () => navigation.navigate('ListItems');
  const onPressCategories = () => navigation.navigate('ListCategories');
  const onPressTest = () => navigation.navigate('Test');

  return (
    <ScreenLayoutComponent paddingHorizontal gap scrollable>
      <TextComponent type="h1">Buyer</TextComponent>

      <ButtonComponent title="Profile" onPress={onPressProfile} />

      <ButtonComponent title="Items" color="success" onPress={onPressItems} />

      <ButtonComponent
        title="CRUD Categories"
        color="success"
        type="outline"
        onPress={onPressCategories}
      />

      <ButtonComponent
        title="Push Notification"
        color="fail"
        type="outline"
        onPress={pushNotification}
        isLoading={isPending}
      />

      <ButtonComponent
        title="Test"
        color="warning"
        type="outline"
        onPress={onPressTest}
      />
    </ScreenLayoutComponent>
  );
};
