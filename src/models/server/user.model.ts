import {RoleEnum} from 'models/enums';
import {FirestoreIdBaseModel} from 'models';

export type UserModel = {
  role: RoleEnum;
  deviceId?: string;
};
export type UserIdModel = FirestoreIdBaseModel<UserModel>;
