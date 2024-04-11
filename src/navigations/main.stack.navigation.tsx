import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainStackNavigationModel} from 'models';
import {
  AddCategoryScreen,
  DetailCategoryScreen,
  EditCategoryScreen,
  HomeScreen,
  ListCartsScreen,
  ListCategoriesScreen,
  ListFoodsScreen,
  ListItemsScreen,
  LoginScreen,
  MapScreen,
  ProfileScreen,
  SignUpScreen,
  SplashScreen,
  TestScreen,
} from 'screens';

const Stack = createNativeStackNavigator<MainStackNavigationModel>();
export const MainStackNavigation: FC = () => (
  <Stack.Navigator
    initialRouteName={'Splash'}
    screenOptions={{
      headerShown: false,
      animation: 'ios',
    }}>
    <Stack.Screen name={'Splash'} component={SplashScreen} />
    <Stack.Screen name={'Login'} component={LoginScreen} />
    <Stack.Screen name={'SignUp'} component={SignUpScreen} />
    <Stack.Screen name={'Home'} component={HomeScreen} />
    <Stack.Screen name={'Profile'} component={ProfileScreen} />
    <Stack.Screen name={'ListCategories'} component={ListCategoriesScreen} />
    <Stack.Screen name={'AddCategory'} component={AddCategoryScreen} />
    <Stack.Screen name={'EditCategory'} component={EditCategoryScreen} />
    <Stack.Screen
      name={'DetailCategory'}
      component={DetailCategoryScreen}
      options={{
        presentation: 'transparentModal',
        animation: 'slide_from_bottom',
      }}
    />
    <Stack.Screen name={'Map'} component={MapScreen} />
    <Stack.Screen name={'ListItems'} component={ListItemsScreen} />
    <Stack.Screen name={'ListCarts'} component={ListCartsScreen} />
    <Stack.Screen name={'ListFoods'} component={ListFoodsScreen} />
    <Stack.Screen name={'Test'} component={TestScreen} />
  </Stack.Navigator>
);
