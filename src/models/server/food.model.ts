import {FirestoreIdBaseModel} from 'models';

export type FoodModel = {
  name: string;
  image: string;
  description: string;
  categoryId: string;
  subCategoryId: string;
};

export type FoodIdModel = FirestoreIdBaseModel<FoodModel>;
