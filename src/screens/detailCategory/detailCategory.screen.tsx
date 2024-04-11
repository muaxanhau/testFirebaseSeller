import React from 'react';
import {MainStackNavigationModel, ScreenBaseModel} from 'models';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useGetCategoryRepo} from 'repositories';
import {utils} from 'utils';
import {
  ImageSharedComponent,
  ScreenLayoutComponent,
  TextComponent,
} from 'components';
import {StyleSheet} from 'react-native';
import {colors, valueStyles} from 'values';

export const DetailCategoryScreen: ScreenBaseModel = () => {
  const {params} =
    useRoute<RouteProp<MainStackNavigationModel, 'DetailCategory'>>();
  const {id} = params;
  const {category} = useGetCategoryRepo({id});

  return (
    <ScreenLayoutComponent gap paddingHorizontal>
      <TextComponent>{category?.name}</TextComponent>
      <TextComponent>{category?.description}</TextComponent>

      <ImageSharedComponent
        sharedTransitionTag={id}
        url={category?.image}
        style={styles.image}
      />
    </ScreenLayoutComponent>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: utils.opacityColor(colors.black, 0.5),
  },
  container: {
    marginTop: 'auto',
    height: utils.hp(70),
    backgroundColor: colors.white,
  },
  image: {
    width: '100%',
    height: utils.hp(30),
    resizeMode: 'cover',
    borderRadius: valueStyles.borderRadius,
  },
});
