export type MainStackNavigationModel = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
  SignUp: undefined;
  Profile: undefined;
  ListCategories: undefined;
  AddCategory: undefined;
  EditCategory: {
    id: string;
  };
  DetailCategory: {
    id: string;
  };
  Map: undefined;
  ListItems: undefined;
  ListCarts: undefined;
  ListFoods: {
    restaurantId: string;
    restaurantName: string;
  };
  Test: undefined;
};
