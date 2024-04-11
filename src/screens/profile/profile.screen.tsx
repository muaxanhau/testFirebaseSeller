import {StyleSheet, View} from 'react-native';
import React, {useRef} from 'react';
import {ScreenBaseModel} from 'models';
import {
  BottomSheetComponent,
  BottomSheetRefProps,
  ButtonComponent,
  ScreenLayoutComponent,
  TextComponent,
} from 'components';
import {useMainStackNavigation} from 'utils';
import {useGetUserSelfRepo, useLogoutRepo} from 'repositories';
import {colors} from 'values';

export const ProfileScreen: ScreenBaseModel = () => {
  const navigation = useMainStackNavigation();
  const {user} = useGetUserSelfRepo();
  const {logout, isPending} = useLogoutRepo();
  const refBottomSheet = useRef<BottomSheetRefProps>(null);

  const role = user?.role?.toUpperCase();

  return (
    <>
      <BottomSheetComponent ref={refBottomSheet}>
        <View style={styles.bsContainer} />
      </BottomSheetComponent>

      <ScreenLayoutComponent paddingHorizontal gap scrollable title="Profile">
        <TextComponent>Role: {role}</TextComponent>
        <ButtonComponent
          title="Map"
          onPress={() => navigation.navigate('Map')}
        />

        <ButtonComponent
          title="Open BS"
          type="outline"
          onPress={() => refBottomSheet.current?.open()}
        />

        <ButtonComponent
          title="Logout"
          color="fail"
          onPress={logout}
          isLoading={isPending}
        />
      </ScreenLayoutComponent>
    </>
  );
};

const styles = StyleSheet.create({
  bsContainer: {
    flex: 1,
    backgroundColor: colors.red300,
  },
});
