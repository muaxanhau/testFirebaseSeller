import {FC, PropsWithChildren} from 'react';
import {ViewStyle} from 'react-native';
import {Prettify} from 'utils';

/**
 * screen
 */
export type ScreenBaseModel<T = {}> = FC<T>;

/**
 * component
 * don't need to use as FC<T> because we can not use in forwardRef
 */
export type ComponentBaseModel<T = {}> = Readonly<
  T & {
    style?: ViewStyle;
  }
>;
export type ComponentWithChildBaseModel<T = {}> = PropsWithChildren<
  ComponentBaseModel<T>
>;

/**
 * global store
 */
export type ActionStoreBaseModel<TAction> = Readonly<
  TAction & {
    reset: () => void;
  }
>;

/**
 * client collection for firebase model
 */
export type FirestoreIdBaseModel<T> = Prettify<{id: string} & T>;

/**
 * response from server
 */
type ResponseBaseModel<T> = {
  statusCode: number;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  timestamp: Date;
  message: string[];
  data: T;
};
export type SuccessResponseBaseModel<T = null> = ResponseBaseModel<T>;
export type ErrorResponseBaseModel = ResponseBaseModel<null>;

export type PaginationResponseBaseModel<T> = {
  totalPage: number;
  nextPage: number;
  prevPage: number;
} & T;
