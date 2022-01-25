import { updateProfileData } from './actions';
import { createReducer } from '@reduxjs/toolkit';
import { IUserProfile } from 'types/interface';

export interface IUserState {
  profile?: IUserProfile;
}

export const initialState: IUserState = {
  profile: undefined,
};

export default createReducer(initialState, (builder) =>
  builder.addCase(updateProfileData, (state, { payload }) => {
    state.profile = {
      ...state.profile,
      ...payload,
    };
  })
);
