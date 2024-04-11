import {FirestoreIdBaseModel} from 'models';

export type RestaurantModel = {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  rate: number;
  openAt: string;
  closeAt: string;
};

export type RestaurantIdModel = FirestoreIdBaseModel<RestaurantModel>;
