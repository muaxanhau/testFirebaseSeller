import React from 'react';
import {StyleSheet} from 'react-native';
import {ScreenBaseModel} from 'models';
import {
  ButtonComponent,
  ScreenLayoutComponent,
  TextComponent,
} from 'components';
import {
  useTestQueryRepo,
  useTestMutationRepo,
  useUnauthorizeRepo,
} from 'repositories';

export const TestScreen: ScreenBaseModel = () => {
  const {refetch, isFetching} = useTestQueryRepo({});
  const {mutate, isPending} = useTestMutationRepo({});
  const {unauthorize, isPending: isLoadingAuthorize} = useUnauthorizeRepo();

  return (
    <ScreenLayoutComponent style={styles.container} title="Test" gap>
      <TextComponent type="h1">Test</TextComponent>

      <ButtonComponent
        title="Refetch"
        onPress={refetch}
        isLoading={isFetching}
      />
      <ButtonComponent title="Mutate" onPress={mutate} isLoading={isPending} />

      <ButtonComponent
        title="Force logout server"
        onPress={unauthorize}
        isLoading={isLoadingAuthorize}
        color="fail"
      />
    </ScreenLayoutComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
