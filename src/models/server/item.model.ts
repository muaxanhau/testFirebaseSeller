import {FirestoreIdBaseModel} from 'models';

export type ItemModel = {
  name: string;
  color: string;
  categoryId: string;
};
export type ItemIdModel = FirestoreIdBaseModel<ItemModel>;
