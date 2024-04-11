import {FirestoreIdBaseModel} from 'models';

export type CartModel = {
  userId: string;
  itemId: string;
  quantity: number;
  createdAt: Date;
  paidAt?: Date;
};
export type CartIdModel = FirestoreIdBaseModel<CartModel>;
