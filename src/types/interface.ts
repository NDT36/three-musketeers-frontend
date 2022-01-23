import { UserStatus } from './enum';

export interface IUserProfile {
  _id: string;
  email: string;
  status: UserStatus;
  updateAt: number;
  createdAt: number;
  avatar: string;
  name: string;
}
