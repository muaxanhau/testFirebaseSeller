import {KeyboardAvoidingView} from 'react-native';
import React, {useEffect} from 'react';
import {
  MainStackNavigationModel,
  ScreenBaseModel,
  editCategoryFormSchema,
} from 'models';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useEditCategoryRepo, useGetCategoryRepo} from 'repositories';
import {
  ButtonComponent,
  InputTextComponent,
  ScreenLayoutComponent,
  TextComponent,
} from 'components';
import {useHookForm, useMainStackNavigation} from 'utils';

export const EditCategoryScreen: ScreenBaseModel = () => {
  const navigation = useMainStackNavigation();
  const {
    params: {id},
  } = useRoute<RouteProp<MainStackNavigationModel, 'EditCategory'>>();
  const {category} = useGetCategoryRepo({id});
  const {control, handleSubmit, setDefaultValues} = useHookForm({
    schema: editCategoryFormSchema,
  });
  const {editCategory, isPending} = useEditCategoryRepo({
    onSuccess: () => navigation.navigate('ListCategories'),
  });

  const onPress = handleSubmit(newCategory =>
    editCategory({id, ...newCategory}),
  );

  useEffect(() => {
    setDefaultValues(category);
  }, [category]);

  return (
    <ScreenLayoutComponent paddingHorizontal gap>
      <TextComponent type="h2">Edit</TextComponent>

      <KeyboardAvoidingView>
        <InputTextComponent
          control={control}
          name={'name'}
          title="Name"
          placeholder="Aa..."
        />

        <InputTextComponent
          control={control}
          name={'description'}
          title="Description"
          placeholder="Aa..."
        />

        <InputTextComponent
          control={control}
          name={'origin'}
          title="Origin"
          placeholder="Aa..."
        />

        <ButtonComponent
          title="Submit"
          onPress={onPress}
          isLoading={isPending}
        />
      </KeyboardAvoidingView>
    </ScreenLayoutComponent>
  );
};
