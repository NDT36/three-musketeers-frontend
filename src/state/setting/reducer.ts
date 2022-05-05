import { createReducer } from '@reduxjs/toolkit';
import { updateShowMoney } from './actions';

export interface ISettingState {
  isShowMoney: boolean;
}

export const initialState: ISettingState = {
  isShowMoney: true,
};

export default createReducer(initialState, (builder) =>
  builder.addCase(updateShowMoney, (state, { payload }) => {
    state.isShowMoney = payload;
  })
);
