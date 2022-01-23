import { createAction } from '@reduxjs/toolkit';
import { IUserProfile } from 'types/interface';

export const updateProfileData = createAction<IUserProfile>('user/updateProfileData');
