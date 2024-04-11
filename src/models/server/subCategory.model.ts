import {FirestoreIdBaseModel} from 'models';

export type SubCategoryModel = {
  name: string;
  image: string;
  description: string;
};

export type SubCategoryIdModel = FirestoreIdBaseModel<SubCategoryModel>;
